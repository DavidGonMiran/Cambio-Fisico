// CUADERNO FISICO — logica compartida (pestañas, checkboxes, notas,
// medidor de progreso y gráficos Chart.js). Se enlaza desde cada
// rutinas/rutina_semXX.html, igual que app.js en el proyecto Mundial.

function switchTab(id, btn) {
  document.querySelectorAll('.tc').forEach((p) => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  initExercises();
  initCharts();
});

// ---------- Ejercicios: checkboxes + notas con memoria por semana ----------
function initExercises() {
  const week = document.body.dataset.week || 'sin-semana';
  const storageKey = `cuaderno-fisico-${week}`;
  const state = loadState(storageKey);

  document.querySelectorAll('.exercise input[type="checkbox"]').forEach((box) => {
    const id = box.dataset.id;
    if (state.checked && state.checked[id]) {
      box.checked = true;
      box.closest('.exercise').classList.add('done');
    }
    box.addEventListener('change', () => {
      box.closest('.exercise').classList.toggle('done', box.checked);
      state.checked = state.checked || {};
      state.checked[id] = box.checked;
      saveState(storageKey, state);
    });
  });

  document.querySelectorAll('.exercise__notes').forEach((area) => {
    const id = area.dataset.id;
    if (state.notes && state.notes[id]) area.value = state.notes[id];
    area.addEventListener('input', () => {
      state.notes = state.notes || {};
      state.notes[id] = area.value;
      saveState(storageKey, state);
    });
  });
}

function loadState(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveState(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    /* almacenamiento no disponible, se ignora */
  }
}

// ---------- Gráficos de la pestaña Progreso ----------
// PROGRESS_DATA es un objeto {{...}} que cada rutina_semXX.html define
// inline con los datos reales tomados del Excel (peso y % graso por semana).
function initCharts() {
  if (typeof Chart === 'undefined' || typeof PROGRESS_DATA === 'undefined') return;

  const weightCanvas = document.getElementById('weightChart');
  if (weightCanvas) {
    new Chart(weightCanvas, {
      type: 'line',
      data: {
        labels: PROGRESS_DATA.labels,
        datasets: [
          {
            label: 'Peso (kg)',
            data: PROGRESS_DATA.peso,
            borderColor: '#F0B840',
            backgroundColor: 'rgba(240,184,64,.12)',
            fill: true,
            tension: 0.3,
            yAxisID: 'y'
          },
          {
            label: '% Graso',
            data: PROGRESS_DATA.graso,
            borderColor: '#00D084',
            backgroundColor: 'rgba(0,208,132,.08)',
            fill: true,
            tension: 0.3,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: '#7A8699', font: { family: 'JetBrains Mono', size: 10 } } }
        },
        scales: {
          x: { ticks: { color: '#7A8699', font: { family: 'JetBrains Mono', size: 10 } }, grid: { color: '#232830' } },
          y: { position: 'left', ticks: { color: '#F0B840', font: { family: 'JetBrains Mono', size: 10 } }, grid: { color: '#232830' } },
          y1: { position: 'right', ticks: { color: '#00D084', font: { family: 'JetBrains Mono', size: 10 } }, grid: { display: false } }
        }
      }
    });
  }

  const adherenceCanvas = document.getElementById('adherenceChart');
  if (adherenceCanvas) {
    new Chart(adherenceCanvas, {
      type: 'bar',
      data: {
        labels: PROGRESS_DATA.labels,
        datasets: [{
          label: 'Adherencia dieta (%)',
          data: PROGRESS_DATA.adherencia,
          backgroundColor: '#2F6FED'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#7A8699', font: { family: 'JetBrains Mono', size: 10 } }, grid: { display: false } },
          y: { ticks: { color: '#7A8699', font: { family: 'JetBrains Mono', size: 10 } }, grid: { color: '#232830' }, suggestedMax: 100 }
        }
      }
    });
  }
}
