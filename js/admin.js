/**
 * RegaloMágico - Panel de administración
 */

const ADMIN_SESSION_KEY = 'regalomagico_admin_session';

let productImages = [];
let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!checkLogin()) {
    showLogin();
  } else {
    showAdminPanel();
    initAdmin();
  }
});

function checkLogin() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-panel').style.display = 'none';
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('login-usuario').value.trim();
  const pass = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');

  if (user === ADMIN_CREDENTIALS.usuario && pass === ADMIN_CREDENTIALS.contraseña) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    errorEl.style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'flex';
    initAdmin();
  } else {
    errorEl.style.display = 'block';
  }
}

function logout() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-panel').style.display = 'none';
  document.getElementById('login-usuario').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').style.display = 'none';
}

function showAdminPanel() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'flex';
  document.getElementById('btn-logout').addEventListener('click', logout);
}

async function initAdmin() {
  const ok = initFirebase();
  if (!ok || !USE_FIREBASE) {
    document.getElementById('firebase-notice').style.display = 'block';
    document.getElementById('btn-new-product').style.display = 'none';
    document.getElementById('products-list').innerHTML = '<div class="empty-state"><p>Configura Firebase en <code>js/firebase-config.js</code> para gestionar productos desde aquí.</p><p><a href="index.html">Ver tienda con productos de ejemplo</a></p></div>';
    bindEvents();
    return;
  }
  await loadProducts();
  bindEvents();
}

async function loadProducts() {
  const list = document.getElementById('products-list');
  list.innerHTML = '<div class="loading">Cargando productos...</div>';
  try {
    const products = await getProducts();
    if (products.length === 0) {
      list.innerHTML = '<div class="empty-state"><p>No hay productos. Haz clic en "Nuevo producto" para agregar el primero.</p></div>';
      return;
    }
    list.innerHTML = products.map(p => renderProductCard(p)).join('');
  } catch (e) {
    list.innerHTML = `<div class="notice notice-warning">Error al cargar: ${e.message}</div>`;
  }
}

function renderProductCard(p) {
  const fotos = p.fotos && p.fotos.length > 0 ? p.fotos : [];
  const imgContent = fotos[0]
    ? `<img src="${fotos[0]}" alt="${p.nombre}">`
    : `<span class="placeholder">${CATEGORIAS.find(c => c.id === p.categoria)?.icono || '🎁'}</span>`;
  return `
    <div class="admin-product-card" data-id="${p.id}">
      <div class="img-wrap">${imgContent}</div>
      <div class="body">
        <h3>${p.nombre}</h3>
        <p class="meta">$${(p.precio || 0).toLocaleString('es-CO')} • Stock: ${p.cantidad ?? 1}</p>
        <div class="actions">
          <button class="btn btn-primary btn-sm btn-edit" data-id="${p.id}">Editar</button>
          <button class="btn btn-danger btn-sm btn-delete" data-id="${p.id}">Eliminar</button>
        </div>
      </div>
    </div>
  `;
}

function bindEvents() {
  const btnNew = document.getElementById('btn-new-product');
  if (btnNew) btnNew.addEventListener('click', () => openModal());
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('btn-cancel').addEventListener('click', closeModal);
  document.getElementById('product-modal-overlay').addEventListener('click', closeModal);
  document.getElementById('product-form').addEventListener('submit', handleSubmit);

  document.getElementById('image-upload-area').addEventListener('click', () => document.getElementById('product-images').click());
  document.getElementById('product-images').addEventListener('change', handleImageSelect);

  document.getElementById('products-list').addEventListener('click', e => {
    if (e.target.closest('.btn-edit')) {
      openModal(e.target.closest('.btn-edit').dataset.id);
    } else if (e.target.closest('.btn-delete')) {
      handleDelete(e.target.closest('.btn-delete').dataset.id);
    }
  });
}

function openModal(id = null) {
  editingId = id;
  document.getElementById('modal-title').textContent = id ? 'Editar producto' : 'Nuevo producto';
  document.getElementById('product-form').reset();
  document.getElementById('product-id').value = id || '';
  productImages = [];

  if (id) {
    getProducts().then(products => {
      const p = products.find(pr => pr.id === id);
      if (p) {
        document.getElementById('product-name').value = p.nombre;
        document.getElementById('product-category').value = p.categoria;
        document.getElementById('product-price').value = p.precio;
        document.getElementById('product-stock').value = p.cantidad ?? 1;
        document.getElementById('product-contenido').value = p.contenido || '';
        document.getElementById('product-desc').value = p.descripcion || '';
        if (p.fotos && p.fotos.length > 0) {
          productImages = p.fotos.map(url => ({ url, file: null }));
          renderImagePreview();
        }
      }
    });
  } else {
    document.getElementById('image-preview').innerHTML = '';
  }

  document.getElementById('product-modal-overlay').classList.add('active');
}

function closeModal() {
  document.getElementById('product-modal-overlay').classList.remove('active');
  editingId = null;
  productImages = [];
}

function handleImageSelect(e) {
  const files = Array.from(e.target.files || []);
  const allowed = files.slice(0, 5);
  allowed.forEach(f => {
    if (f.type.startsWith('image/')) productImages.push({ file: f, url: null });
  });
  renderImagePreview();
  e.target.value = '';
}

function renderImagePreview() {
  const container = document.getElementById('image-preview');
  container.innerHTML = '';
  productImages.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'image-preview-item';
    const img = document.createElement('img');
    if (item.url) img.src = item.url;
    else img.src = URL.createObjectURL(item.file);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'remove';
    btn.textContent = '×';
    btn.onclick = () => {
      productImages.splice(i, 1);
      renderImagePreview();
    };
    div.appendChild(img);
    div.appendChild(btn);
    container.appendChild(div);
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  const contenido = document.getElementById('product-contenido').value.trim();
  const descripcion = document.getElementById('product-desc').value.trim();
  if (!contenido && !descripcion) {
    alert('Agrega el contenido del detalle o la descripción.');
    return;
  }

  const btn = document.getElementById('btn-save');
  btn.disabled = true;
  btn.textContent = 'Guardando...';

  const data = {
    nombre: document.getElementById('product-name').value.trim(),
    categoria: document.getElementById('product-category').value,
    precio: parseInt(document.getElementById('product-price').value) || 0,
    cantidad: parseInt(document.getElementById('product-stock').value) || 1,
    contenido,
    descripcion
  };

  try {
    const productId = editingId || await addProduct(data);

    const filesToUpload = productImages.filter(i => i.file);
    if (filesToUpload.length > 0) {
      const urls = await uploadMultipleImages(filesToUpload.map(i => i.file), productId);
      const existingUrls = (productImages.filter(i => i.url).map(i => i.url)) || [];
      data.fotos = [...existingUrls, ...urls];
    } else if (productImages.length > 0) {
      data.fotos = productImages.map(i => i.url);
    }

    if (editingId) {
      await updateProduct(editingId, data);
    } else if (data.fotos && data.fotos.length > 0) {
      await updateProduct(productId, { fotos: data.fotos });
    }

    closeModal();
    await loadProducts();
  } catch (err) {
    alert('Error al guardar: ' + err.message);
  }
  btn.disabled = false;
  btn.textContent = 'Guardar producto';
}

async function handleDelete(id) {
  if (!confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return;
  try {
    await deleteProduct(id);
    await loadProducts();
  } catch (e) {
    alert('Error: ' + e.message);
  }
}
