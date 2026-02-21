const STORAGE_KEY = 'ovula_entries_v1';

const periodForm = document.getElementById('period-form');
const historyList = document.getElementById('history');
const statsEl = document.getElementById('stats');
const clearBtn = document.getElementById('clear-data');
const template = document.getElementById('entry-template');

const loadEntries = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveEntries = (entries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const dayDiff = (start, end) => {
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)) + 1);
};

const formatDate = (dateStr) => new Date(`${dateStr}T00:00:00`).toLocaleDateString();

const computeStats = (entries) => {
  if (!entries.length) {
    return {
      avgCycle: '-',
      avgPeriod: '-',
      nextPeriod: '-',
      commonSymptoms: '-',
    };
  }

  const sorted = [...entries].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const periodLengths = sorted.map((entry) =>
    dayDiff(new Date(`${entry.startDate}T00:00:00`), new Date(`${entry.endDate}T00:00:00`))
  );

  const cycleLengths = [];
  for (let i = 1; i < sorted.length; i += 1) {
    const prevStart = new Date(`${sorted[i - 1].startDate}T00:00:00`);
    const currentStart = new Date(`${sorted[i].startDate}T00:00:00`);
    cycleLengths.push(dayDiff(prevStart, currentStart) - 1);
  }

  const avg = (arr) =>
    arr.length ? (arr.reduce((sum, n) => sum + n, 0) / arr.length).toFixed(1) : '-';

  const latestStart = new Date(`${sorted[sorted.length - 1].startDate}T00:00:00`);
  const avgCycle = avg(cycleLengths);
  let nextPeriod = '-';
  if (avgCycle !== '-') {
    latestStart.setDate(latestStart.getDate() + Math.round(Number(avgCycle)));
    nextPeriod = latestStart.toLocaleDateString();
  }

  const symptomCounts = {};
  sorted.forEach((entry) => {
    entry.symptoms
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
      .forEach((symptom) => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
  });

  const commonSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name)
    .join(', ') || '-';

  return {
    avgCycle: avgCycle === '-' ? '-' : `${avgCycle} days`,
    avgPeriod: `${avg(periodLengths)} days`,
    nextPeriod,
    commonSymptoms,
  };
};

const renderStats = (entries) => {
  const stats = computeStats(entries);
  statsEl.innerHTML = `
    <h2>Cycle insights</h2>
    <div class="stats-grid">
      <article class="stat">
        <span>Average cycle</span>
        <strong>${stats.avgCycle}</strong>
      </article>
      <article class="stat">
        <span>Average period length</span>
        <strong>${stats.avgPeriod}</strong>
      </article>
      <article class="stat">
        <span>Predicted next period</span>
        <strong>${stats.nextPeriod}</strong>
      </article>
      <article class="stat">
        <span>Common symptoms</span>
        <strong>${stats.commonSymptoms}</strong>
      </article>
    </div>
  `;
};

const renderHistory = (entries) => {
  historyList.innerHTML = '';

  if (!entries.length) {
    const empty = document.createElement('li');
    empty.textContent = 'No period entries yet. Start by logging your latest period.';
    empty.className = 'empty';
    historyList.appendChild(empty);
    return;
  }

  const sorted = [...entries].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  sorted.forEach((entry) => {
    const item = template.content.firstElementChild.cloneNode(true);
    item.querySelector('.dates').textContent = `${formatDate(entry.startDate)} — ${formatDate(entry.endDate)}`;
    item.querySelector('.meta').textContent = `Flow: ${entry.flow} · Symptoms: ${entry.symptoms.join(', ') || 'none'}`;
    item.querySelector('.delete').addEventListener('click', () => {
      const nextEntries = loadEntries().filter((current) => current.id !== entry.id);
      saveEntries(nextEntries);
      render(nextEntries);
    });
    historyList.appendChild(item);
  });
};

const render = (entries = loadEntries()) => {
  renderStats(entries);
  renderHistory(entries);
};

periodForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const flow = document.getElementById('flow').value;
  const symptoms = document
    .getElementById('symptoms')
    .value.split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!startDate || !endDate || new Date(endDate) < new Date(startDate)) {
    alert('Please provide a valid date range.');
    return;
  }

  const entries = loadEntries();
  entries.push({
    id: crypto.randomUUID(),
    startDate,
    endDate,
    flow,
    symptoms,
  });

  saveEntries(entries);
  periodForm.reset();
  render(entries);
});

clearBtn.addEventListener('click', () => {
  if (!confirm('Clear all saved period data?')) return;
  localStorage.removeItem(STORAGE_KEY);
  render([]);
});

render();
