/**
 * RegaloMágico - Tienda virtual de regalos
 * Compra por WhatsApp sin pasarela de pagos
 */

let PRODUCTOS_ACTUAL = [];

document.addEventListener('DOMContentLoaded', async () => {
  Cart.init();
  renderCategories();
  await loadProducts();
  renderFilterButtons();
  bindNav();
  bindWhatsApp();
  bindProductModal();
  bindMenuToggle();
});

async function loadProducts() {
  if (typeof USE_FIREBASE !== 'undefined' && USE_FIREBASE && initFirebase()) {
    try {
      PRODUCTOS_ACTUAL = await getProducts();
    } catch (e) {
      console.warn('Error cargando desde Firebase, usando productos estáticos:', e);
      PRODUCTOS_ACTUAL = PRODUCTOS.map((p, i) => ({ ...p, id: p.id || i + 1 }));
    }
  } else {
    PRODUCTOS_ACTUAL = PRODUCTOS.map((p, i) => ({ ...p, id: p.id || i + 1 }));
  }
  renderProducts();
}

// Categorías
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIAS.map(cat => `
    <div class="category-card" data-filter="${cat.id}">
      <span class="icon">${cat.icono}</span>
      <h3>${cat.nombre}</h3>
    </div>
  `).join('');

  grid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      const btn = document.querySelector(`.filter-btn[data-filter="${card.dataset.filter}"]`);
      if (btn) btn.classList.add('active');
      filterProducts(card.dataset.filter);
      document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Filtros
function renderFilterButtons() {
  const container = document.getElementById('products-filter');
  if (!container) return;
  const btns = '<button class="filter-btn active" data-filter="todos">Todos</button>' +
    CATEGORIAS.map(c => `<button class="filter-btn" data-filter="${c.id}">${c.nombre}</button>`).join('');
  container.innerHTML = btns;

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      filterProducts(btn.dataset.filter);
    });
  });
}

// Productos
function renderProducts(filter = 'todos') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const list = filter === 'todos' ? PRODUCTOS_ACTUAL : PRODUCTOS_ACTUAL.filter(p => p.categoria === filter);

  const getProductImg = (p) => {
    const fallback = (p.emoji || '🎁').replace(/"/g, '&quot;');
    if (p.fotos && p.fotos.length > 0) {
      return `<img src="${p.fotos[0]}" alt="${p.nombre}" data-fallback="${fallback}" onerror="this.outerHTML='<span class=img-fallback>'+this.dataset.fallback+'</span>'">`;
    }
    return fallback;
  };

  grid.innerHTML = list.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image ${p.fotos && p.fotos.length ? 'has-img' : ''}">${getProductImg(p)}</div>
      <div class="product-info">
        <h3>${p.nombre}</h3>
        <span class="category">${CATEGORIAS.find(c => c.id === p.categoria)?.nombre || p.categoria}</span>
        <p class="price">$${(p.precio || 0).toLocaleString('es-CO')}</p>
        <div class="product-actions">
          <button class="btn btn-outline add-cart" data-id="${p.id}">Agregar</button>
          <button class="btn btn-primary view-detail" data-id="${p.id}">Ver más</button>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const prod = PRODUCTOS_ACTUAL.find(p => String(p.id) === String(id));
      if (prod) Cart.add(prod);
      document.getElementById('cart-btn')?.click();
    });
  });

  grid.querySelectorAll('.view-detail, .product-card').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('.add-cart')) return;
      const card = e.target.closest('.product-card');
      if (card) openProductModal(card.dataset.id);
    });
  });
}

function filterProducts(filter) {
  renderProducts(filter);
}

// Modal producto
function bindProductModal() {
  const overlay = document.getElementById('product-modal-overlay');
  const modal = document.getElementById('product-modal');
  const content = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');

  const close = () => {
    overlay?.classList.remove('active');
    modal?.classList.remove('active');
  };

  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function openProductModal(id) {
  const p = PRODUCTOS_ACTUAL.find(pr => String(pr.id) === String(id));
  if (!p) return;
  const cat = CATEGORIAS.find(c => c.id === p.categoria);
  const content = document.getElementById('modal-content');
  const modal = document.getElementById('product-modal');
  const overlay = document.getElementById('product-modal-overlay');

  const imgContent = p.fotos && p.fotos.length > 0
    ? `<div class="modal-gallery"><img src="${p.fotos[0]}" alt="${p.nombre}">${p.fotos.length > 1 ? `<span class="gallery-count">+${p.fotos.length - 1}</span>` : ''}</div>`
    : `<div class="modal-product-image">${p.emoji || '🎁'}</div>`;

  const fullDesc = [p.contenido, p.descripcion].filter(Boolean).join('\n\n');

  content.innerHTML = `
    ${imgContent}
    <div class="modal-product-info">
      <h2>${p.nombre}</h2>
      <span class="modal-price">$${(p.precio || 0).toLocaleString('es-CO')}</span>
      <p class="category">${cat?.nombre || p.categoria}</p>
      <div class="modal-desc">${fullDesc ? fullDesc.replace(/\n/g, '<br>') : ''}</div>
      <button class="btn btn-whatsapp btn-block add-from-modal" data-id="${p.id}">
        <svg viewBox="0 0 32 32" width="20" height="20"><path fill="currentColor" d="M16 0C7.164 0 0 7.164 0 16c0 2.82.738 5.5 2.028 7.825L.472 30.852l7.225-1.898A15.9 15.9 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0z"/></svg>
        Agregar al carrito
      </button>
    </div>
  `;

  content.querySelector('.add-from-modal')?.addEventListener('click', () => {
    Cart.add(p);
    overlay?.classList.remove('active');
    modal?.classList.remove('active');
    document.getElementById('cart-btn')?.click();
  });

  overlay?.classList.add('active');
  modal?.classList.add('active');
}

// WhatsApp
function buildWhatsAppUrl(items, isOrder = false) {
  const link = CONFIG.whatsappLink || '';
  const num = (CONFIG.whatsappNumber || '').replace(/\D/g, '');

  let text = '';
  if (items && items.length > 0) {
    text = CONFIG.orderMessage + '\n\n*Mi pedido:*\n';
    items.forEach(i => {
      text += `• ${i.nombre} x${i.quantity} - $${(i.precio * i.quantity).toLocaleString('es-CO')}\n`;
    });
    text += `\n*Total: $${Cart.getTotal().toLocaleString('es-CO')}*`;
  } else {
    text = '¡Hola! Me gustaría información sobre los productos de RegaloMágico.';
  }

  // Si hay número, usar wa.me/numero para mensaje pre-llenado
  if (num) {
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  }
  // Si hay link (ej. wa.me/qr/...), intentar añadir el mensaje como parámetro
  if (link) {
    const sep = link.includes('?') ? '&' : '?';
    return `${link}${sep}text=${encodeURIComponent(text)}`;
  }
  return 'https://wa.me/';
}

function bindWhatsApp() {
  const floatBtn = document.getElementById('whatsapp-float');
  const contactBtn = document.getElementById('contact-whatsapp');
  const checkoutBtn = document.getElementById('checkout-whatsapp');

  floatBtn?.addEventListener('click', e => {
    e.preventDefault();
    const url = Cart.items.length > 0 ? buildWhatsAppUrl(Cart.items, true) : buildWhatsAppUrl([]);
    window.open(url, '_blank');
  });

  contactBtn?.addEventListener('click', e => {
    e.preventDefault();
    window.open(buildWhatsAppUrl([]), '_blank');
  });

  checkoutBtn?.addEventListener('click', () => {
    if (Cart.items.length === 0) return;
    window.open(buildWhatsAppUrl(Cart.items, true), '_blank');
    Cart.clear();
    document.getElementById('cart-overlay')?.click();
  });
}

// Navegación suave
function bindNav() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.nav')?.classList.remove('active');
      }
    });
  });
}

// Menú móvil
function bindMenuToggle() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.nav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('active'));
}
