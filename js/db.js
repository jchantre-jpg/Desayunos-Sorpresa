/**
 * Base de datos IndexedDB para el registro de asistencia
 * Persistencia local en el navegador
 */

const DB_NAME = 'AsistenciaElectiva5';
const DB_VERSION = 1;
const STORE_ESTUDIANTES = 'estudiantes';
const STORE_ASISTENCIA = 'asistencia';

let db = null;

/**
 * Inicializa la conexión a IndexedDB
 */
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_ESTUDIANTES)) {
        const storeEst = database.createObjectStore(STORE_ESTUDIANTES, { keyPath: 'id', autoIncrement: true });
        storeEst.createIndex('documento', 'documento', { unique: true });
        storeEst.createIndex('nombre', 'nombre', { unique: false });
      }
      if (!database.objectStoreNames.contains(STORE_ASISTENCIA)) {
        const storeAsis = database.createObjectStore(STORE_ASISTENCIA, { keyPath: 'id', autoIncrement: true });
        storeAsis.createIndex('fecha', 'fecha', { unique: false });
        storeAsis.createIndex('estudianteId', 'estudianteId', { unique: false });
        storeAsis.createIndex('fecha_estudiante', ['fecha', 'estudianteId'], { unique: true });
      }
    };
  });
}

/**
 * Obtener todos los estudiantes
 */
async function obtenerEstudiantes() {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_ESTUDIANTES, 'readonly');
    const store = tx.objectStore(STORE_ESTUDIANTES);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Agregar estudiante
 */
async function agregarEstudiante(estudiante) {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_ESTUDIANTES, 'readwrite');
    const store = tx.objectStore(STORE_ESTUDIANTES);
    const request = store.add(estudiante);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Actualizar estudiante
 */
async function actualizarEstudiante(estudiante) {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_ESTUDIANTES, 'readwrite');
    const store = tx.objectStore(STORE_ESTUDIANTES);
    const request = store.put(estudiante);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Eliminar estudiante
 */
async function eliminarEstudiante(id) {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_ESTUDIANTES, 'readwrite');
    const store = tx.objectStore(STORE_ESTUDIANTES);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Obtener asistencia por fecha
 */
async function obtenerAsistenciaPorFecha(fecha) {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_ASISTENCIA, 'readonly');
    const store = tx.objectStore(STORE_ASISTENCIA);
    const index = store.index('fecha');
    const request = index.getAll(fecha);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Guardar registro de asistencia
 */
async function guardarRegistroAsistencia(registro) {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_ASISTENCIA, 'readwrite');
    const store = tx.objectStore(STORE_ASISTENCIA);
    const request = store.put(registro);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Obtener toda la asistencia (para estadísticas)
 */
async function obtenerTodaAsistencia() {
  if (!db) await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_ASISTENCIA, 'readonly');
    const store = tx.objectStore(STORE_ASISTENCIA);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
