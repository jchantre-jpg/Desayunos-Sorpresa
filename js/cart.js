/**
 * RegaloMágico - Carrito de compras
 */

const Cart = {
  items: [],
  storageKey: 'regalomagico_cart',

  init() {
    this.load();
    this.renderCount();
    this.bindEvents();
  },

  load() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      this.items = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.items = [];
    }
  },

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.renderCount();
  },

  add(product, quantity = 1) {
    const exist = this.items.find(i => i.id === product.id);
    if (exist) exist.quantity += quantity;
    else this.items.push({ ...product, quantity });
    this.save();
    this.renderSidebar();
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.renderSidebar();
  },

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + delta);
    this.save();
    this.renderSidebar();
  },

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.precio * i.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
    this.renderSidebar();
  },

  renderCount() {
    const el = document.getElementById('cart-count');
    if (el) el.textContent = this.items.reduce((s, i) => s + i.quantity, 0);
  },

  renderSidebar() {
    const empty = document.getElementById('cart-empty');
    const items = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    const total = document.getElementById('cart-total');

    if (this.items.length === 0) {
      if (empty) empty.style.display = 'block';
      if (items) items.innerHTML = '';
      if (footer) footer.style.display = 'none';
      return;
    }

    if (empty) empty.style.display = 'none';
    if (footer) footer.style.display = 'block';
    if (total) total.textContent = '$' + this.getTotal().toLocaleString('es-CO');

    if (items) {
      items.innerHTML = this.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-image">${item.emoji || '🎁'}</div>
          <div class="cart-item-info">
            <h4>${item.nombre}</h4>
            <span class="price">$${(item.precio * item.quantity).toLocaleString('es-CO')}</span>
            <div class="cart-item-qty">
              <button type="button" data-action="minus">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-action="plus">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-action="remove" aria-label="Eliminar">×</button>
        </div>
      `).join('');

      items.querySelectorAll('.cart-item').forEach(row => {
        const id = parseInt(row.dataset.id);
        row.querySelector('[data-action="minus"]')?.addEventListener('click', () => this.updateQty(id, -1));
        row.querySelector('[data-action="plus"]')?.addEventListener('click', () => this.updateQty(id, 1));
        row.querySelector('[data-action="remove"]')?.addEventListener('click', () => this.remove(id));
      });
    }
  },

  bindEvents() {
    const overlay = document.getElementById('cart-overlay');
    const sidebar = document.getElementById('cart-sidebar');
    const openBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('cart-close');

    const open = () => {
      this.renderSidebar();
      overlay?.classList.add('active');
      sidebar?.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      overlay?.classList.remove('active');
      sidebar?.classList.remove('active');
      document.body.style.overflow = '';
    };

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
  }
};
