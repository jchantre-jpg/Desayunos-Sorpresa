/**
 * RegaloMágico - Firebase Firestore & Storage
 * Gestión de productos en la nube
 */

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

async function getProducts() {
  if (!db) return [];
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

async function addProduct(data) {
  if (!db) throw new Error('Firebase no inicializado');
  const ref = await db.collection('productos').add({
    ...data,
    activo: true,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  return ref.id;
}

async function updateProduct(id, data) {
  if (!db) throw new Error('Firebase no inicializado');
  await db.collection('productos').doc(id).update({
    ...data,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

async function deleteProduct(id) {
  if (!db) throw new Error('Firebase no inicializado');
  await db.collection('productos').doc(id).delete();
}

async function uploadProductImage(file, productId) {
  if (!storage) throw new Error('Firebase Storage no inicializado');
  const name = `productos/${productId}/${Date.now()}_${file.name}`;
  const ref = storage.ref(name);
  await ref.put(file);
  return await ref.getDownloadURL();
}

async function uploadMultipleImages(files, productId) {
  const urls = [];
  for (const file of files) {
    const url = await uploadProductImage(file, productId);
    urls.push(url);
  }
  return urls;
}
