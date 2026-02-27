/**
 * RegaloMágico - Firebase Firestore & Storage
 * Con fallback a localStorage cuando Firebase no está configurado
 */

const STORAGE_KEY = 'regalomagico_productos';
let db, storage;

function initFirebase() {
  if (typeof firebase === 'undefined' || !FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'TU_API_KEY') {
    return false;
  }
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    storage = firebase.storage();
    return true;
  } catch (e) {
    console.warn('Firebase no configurado:', e.message);
    return false;
  }
}

/* --- Modo localStorage (cuando no hay Firebase) --- */
function getLocalProducts() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalProducts(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function generateId() {
  return 'loc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
}

async function getProducts() {
  // Firebase: usar colección remota
  if (USE_FIREBASE && db) {
    const snapshot = await db.collection('productos').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        ...d,
        precio: d.precio || 0,
        cantidad: d.cantidad ?? 1,
        contenido: d.contenido || '',
        descripcion: d.descripcion || ''
      };
    });
  }

  // Modo local: combinar catálogo estático + productos creados desde el panel
  const base = Array.isArray(PRODUCTOS)
    ? PRODUCTOS.map((p, i) => ({ ...p, id: p.id || i + 1 }))
    : [];

  const extras = getLocalProducts();
  if (!extras || extras.length === 0) return base;

  const map = new Map(base.map(p => [String(p.id), p]));
  extras.forEach(p => {
    if (p && p.id != null) {
      map.set(String(p.id), p);
    }
  });
  return Array.from(map.values());
}

async function addProduct(data) {
  if (USE_FIREBASE && db) {
    const ref = await db.collection('productos').add({
      ...data,
      activo: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return ref.id;
  }
  const id = generateId();
  const arr = getLocalProducts();
  arr.unshift({
    id,
    ...data,
    activo: true,
    createdAt: Date.now(),
    fotos: data.fotos || []
  });
  saveLocalProducts(arr);
  return id;
}

async function updateProduct(id, data) {
  if (USE_FIREBASE && db) {
    await db.collection('productos').doc(id).update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return;
  }
  const arr = getLocalProducts();
  const idx = arr.findIndex(p => p.id === id);
  if (idx >= 0) {
    arr[idx] = { ...arr[idx], ...data, updatedAt: Date.now() };
    saveLocalProducts(arr);
  }
}

async function deleteProduct(id) {
  if (USE_FIREBASE && db) {
    await db.collection('productos').doc(id).delete();
    return;
  }
  const arr = getLocalProducts().filter(p => p.id !== id);
  saveLocalProducts(arr);
}

async function uploadProductImage(file, productId) {
  if (USE_FIREBASE && storage) {
    const name = `productos/${productId}/${Date.now()}_${file.name}`;
    const ref = storage.ref(name);
    await ref.put(file);
    return await ref.getDownloadURL();
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadMultipleImages(files, productId) {
  const urls = [];
  for (const file of files) {
    const url = await uploadProductImage(file, productId);
    urls.push(url);
  }
  return urls;
}
