/**
 * Aplicación de Registro de Asistencia - Electiva 5
 */

document.addEventListener('DOMContentLoaded', async () => {
  await initDB();

  // Establecer fecha por defecto
  document.getElementById('fecha').valueAsDate = new Date();

  await cargarEstudiantes();

  // Event listeners
  document.getElementById('btn-guardar').addEventListener('click', guardarAsistencia);
  document.getElementById('btn-exportar').addEventListener('click', exportarCSV);
  document.getElementById('btn-agregar').addEventListener('click', () => abrirModalEstudiante());
  document.getElementById('btn-estadisticas').addEventListener('click', abrirModalEstadisticas);

  document.getElementById('form-estudiante').addEventListener('submit', guardarEstudiante);
  document.getElementById('buscar').addEventListener('input', filtrarEstudiantes);

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => cerrarModales());
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) cerrarModales();
  });
});

let estudiantesData = [];
let estadoAsistencia = {}; // { estudianteId: 'presente' | 'ausente' }

async function cargarEstudiantes() {
  estudiantesData = await obtenerEstudiantes();
  const fecha = document.getElementById('fecha').value;
  if (fecha) {
    const asistencia = await obtenerAsistenciaPorFecha(fecha);
    estadoAsistencia = {};
    asistencia.forEach(a => { estadoAsistencia[a.estudianteId] = a.estado; });
  } else {
    estadoAsistencia = {};
  }
  renderizarTabla();
}

function renderizarTabla() {
  const tbody = document.getElementById('tabla-body');
  const busqueda = document.getElementById('buscar').value.toLowerCase();

  let estudiantesFiltrados = estudiantesData;
  if (busqueda) {
    estudiantesFiltrados = estudiantesData.filter(e =>
      e.nombre.toLowerCase().includes(busqueda) ||
      (e.documento || '').toLowerCase().includes(busqueda)
    );
  }

  if (estudiantesFiltrados.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No hay estudiantes. Haz clic en "+ Agregar Estudiante" para empezar.</td></tr>';
    return;
  }

  tbody.innerHTML = estudiantesFiltrados.map(est => {
    const estado = estadoAsistencia[est.id] || '';
    const claseSelect = estado === 'presente' ? 'presente' : estado === 'ausente' ? 'ausente' : '';
    return `
      <tr data-id="${est.id}">
        <td>${est.documento || '-'}</td>
        <td>${est.nombre}</td>
        <td>${est.correo || '-'}</td>
        <td>
          <select class="select-asistencia ${claseSelect}" data-id="${est.id}">
            <option value="">--</option>
            <option value="presente" ${estado === 'presente' ? 'selected' : ''}>Presente</option>
            <option value="ausente" ${estado === 'ausente' ? 'selected' : ''}>Ausente</option>
          </select>
        </td>
        <td>
          <button class="btn btn-small btn-secondary" onclick="editarEstudiante(${est.id})">Editar</button>
          <button class="btn btn-small btn-eliminar" onclick="eliminarEstudianteConfirmar(${est.id})">Eliminar</button>
        </td>
      </tr>
    `;
  }).join('');

  // Actualizar clases al cambiar select
  tbody.querySelectorAll('.select-asistencia').forEach(sel => {
    sel.addEventListener('change', (e) => {
      sel.className = 'select-asistencia ' + (e.target.value === 'presente' ? 'presente' : e.target.value === 'ausente' ? 'ausente' : '');
      estadoAsistencia[parseInt(sel.dataset.id)] = e.target.value || undefined;
    });
  });
}

function filtrarEstudiantes() {
  renderizarTabla();
}

async function guardarAsistencia() {
  const fecha = document.getElementById('fecha').value;
  const clase = document.getElementById('clase').value || 'Sesión';
  if (!fecha) {
    alert('Selecciona una fecha.');
    return;
  }

  const registros = [];
  for (const [estudianteIdStr, estado] of Object.entries(estadoAsistencia)) {
    if (estado) {
      const estudianteId = parseInt(estudianteIdStr);
      registros.push({
        fecha,
        clase,
        estudianteId,
        estado,
        fechaRegistro: new Date().toISOString()
      });
    }
  }

  try {
    for (const reg of registros) {
      const existente = (await obtenerAsistenciaPorFecha(fecha)).find(a => a.estudianteId === reg.estudianteId);
      reg.id = existente ? existente.id : undefined;
      await guardarRegistroAsistencia(reg);
    }
    alert(`Asistencia guardada para ${registros.length} estudiante(s).`);
  } catch (err) {
    alert('Error al guardar: ' + err.message);
  }
}

function exportarCSV() {
  const fecha = document.getElementById('fecha').value;
  if (!fecha) {
    alert('Selecciona una fecha.');
    return;
  }

  const headers = ['Documento', 'Nombre', 'Correo', 'Estado', 'Fecha'];
  const filas = estudiantesData.map(est => {
    const estado = estadoAsistencia[est.id] || 'Sin registrar';
    return [est.documento || '', est.nombre, est.correo || '', estado, fecha];
  });

  const csv = [headers.join(','), ...filas.map(f => f.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `asistencia_${fecha}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function abrirModalEstudiante(estudiante = null) {
  const modal = document.getElementById('modal-estudiante');
  const form = document.getElementById('form-estudiante');
  form.reset();
  document.getElementById('modal-titulo').textContent = estudiante ? 'Editar Estudiante' : 'Agregar Estudiante';
  document.getElementById('estudiante-id').value = estudiante ? estudiante.id : '';
  if (estudiante) {
    document.getElementById('documento').value = estudiante.documento || '';
    document.getElementById('nombre').value = estudiante.nombre || '';
    document.getElementById('correo').value = estudiante.correo || '';
  }
  modal.classList.add('activo');
}

async function guardarEstudiante(e) {
  e.preventDefault();
  const id = document.getElementById('estudiante-id').value;
  const estudiante = {
    documento: document.getElementById('documento').value.trim(),
    nombre: document.getElementById('nombre').value.trim(),
    correo: document.getElementById('correo').value.trim() || null
  };

  try {
    if (id) {
      estudiante.id = parseInt(id);
      await actualizarEstudiante(estudiante);
    } else {
      await agregarEstudiante(estudiante);
    }
    cerrarModales();
    await cargarEstudiantes();
  } catch (err) {
    if (err.name === 'ConstraintError') {
      alert('Ya existe un estudiante con ese documento.');
    } else {
      alert('Error al guardar: ' + err.message);
    }
  }
}

function editarEstudiante(id) {
  const est = estudiantesData.find(e => e.id === id);
  if (est) abrirModalEstudiante(est);
}

async function eliminarEstudianteConfirmar(id) {
  if (!confirm('¿Eliminar este estudiante?')) return;
  await eliminarEstudiante(id);
  await cargarEstudiantes();
}

async function abrirModalEstadisticas() {
  const asistencia = await obtenerTodaAsistencia();
  const conteo = {};
  asistencia.forEach(a => {
    if (!conteo[a.estudianteId]) conteo[a.estudianteId] = { presente: 0, ausente: 0 };
    conteo[a.estudianteId][a.estado] = (conteo[a.estudianteId][a.estado] || 0) + 1;
  });

  const fechas = [...new Set(asistencia.map(a => a.fecha))];
  const totalSesiones = fechas.length;

  let html = '';
  for (const est of estudiantesData) {
    const c = conteo[est.id] || { presente: 0, ausente: 0 };
    const total = c.presente + c.ausente;
    const porc = total > 0 ? Math.round((c.presente / total) * 100) : 0;
    html += `
      <div class="stat-card">
        <span class="stat-label">${est.nombre}</span>
        <span class="stat-value">${porc}%</span>
      </div>
      <small style="grid-column:1/-1; color:var(--text-muted);">Presente: ${c.presente} | Ausente: ${c.ausente}</small>
    `;
  }
  html += `<div class="stat-card" style="grid-column:1/-1; margin-top:1rem;"><span class="stat-label">Total sesiones registradas</span><span class="stat-value">${totalSesiones}</span></div>`;

  document.getElementById('estadisticas-contenido').innerHTML = html || '<p>No hay datos de asistencia aún.</p>';
  document.getElementById('modal-estadisticas').classList.add('activo');
}

function cerrarModales() {
  document.querySelectorAll('.modal.activo').forEach(m => m.classList.remove('activo'));
}

// Para recargar al cambiar fecha
document.getElementById('fecha').addEventListener('change', cargarEstudiantes);
