# Configuración de Firebase

Para que el administrador pueda **agregar, editar y eliminar productos** con fotos desde el panel de administración, debes configurar Firebase.

---

## 1. Crear proyecto en Firebase

1. Entra a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en **Crear proyecto** (o usa uno existente)
3. Dale un nombre (ej: `regalomagico` o `desayunos-sorpresas`)
4. Puedes desactivar Google Analytics si no lo necesitas
5. Haz clic en **Crear proyecto**

---

## 2. Habilitar Firestore

1. En el menú lateral: **Build** → **Firestore Database**
2. Haz clic en **Crear base de datos**
3. Elige modo **Producción**
4. Selecciona la ubicación más cercana (ej: `southamerica-east1` para Brasil)
5. Haz clic en **Habilitar**

### Reglas de seguridad (Firestore)

En **Reglas**, usa:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

> **Nota:** Estas reglas permiten leer y escribir a todos. Para producción, configura autenticación de Firebase y restringe escritura solo a usuarios autenticados.

---

## 3. Habilitar Storage

1. En el menú lateral: **Build** → **Storage**
2. Haz clic en **Comenzar**
3. Acepta las reglas por defecto y elige la misma región

### Reglas de Storage

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /productos/{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

---

## 4. Registrar la app web

1. En la página principal del proyecto: **Proyecto** → icono **</>** (Web)
2. Nombre de la app: `RegaloMágico` (o el que prefieras)
3. No marques Firebase Hosting por ahora
4. Haz clic en **Registrar app**
5. Copia el objeto `firebaseConfig` que aparece

---

## 5. Configurar en el proyecto

1. Abre `js/firebase-config.js`
2. Reemplaza `FIREBASE_CONFIG` con tus datos:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

3. Cambia `USE_FIREBASE` a `true`:

```javascript
const USE_FIREBASE = true;
```

---

## 6. Crear colección en Firestore

1. En **Firestore** → **Iniciar colección**
2. ID de colección: `productos`
3. No agregues documentos; el admin los creará desde el panel

---

## 7. Usar el panel de administración

1. Abre `admin.html` en el navegador
2. Haz clic en **Nuevo producto**
3. Completa: nombre, categoría, precio, cantidad, descripción
4. Sube una o varias fotos (máx. 5)
5. Guarda

Los productos se mostrarán automáticamente en la tienda principal.

---

## Resumen de estructura de datos

**Colección `productos`:**

| Campo     | Tipo   | Descripción                    |
|----------|--------|--------------------------------|
| nombre   | string | Nombre del producto            |
| categoria| string | ID de categoría                |
| precio   | number | Precio en pesos                |
| cantidad | number | Stock disponible               |
| descripcion | string | Descripción detallada       |
| fotos    | array  | URLs de imágenes en Storage    |
| activo   | boolean| Si está visible en la tienda   |
| createdAt| timestamp | Fecha de creación          |
