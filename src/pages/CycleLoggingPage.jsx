import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dayDiff } from '../utils/date';

const symptomOptions = ['Cramps', 'Acne', 'Hair growth', 'Mood swings', 'Weight gain', 'Headache', 'Fatigue'];

const initialForm = {
  startDate: '',
  endDate: '',
  flow: 'Medium',
  symptoms: [],
};

export default function CycleLoggingPage({ logs, setLogs }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSymptom = (symptom) => {
    setForm((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((item) => item !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (new Date(form.endDate) < new Date(form.startDate)) {
      window.alert('End date must be on or after start date.');
      return;
    }

    const sortedLogs = [...logs].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    const previousStart = sortedLogs[sortedLogs.length - 1]?.startDate;
    const cycleLength = previousStart
      ? dayDiff(`${previousStart}T00:00:00`, `${form.startDate}T00:00:00`)
      : 28;

    const nextEntry = {
      startDate: form.startDate,
      endDate: form.endDate,
      flow: form.flow,
      symptoms: form.symptoms,
      cycleLength,
    };

    setLogs([...logs, nextEntry]);
    navigate('/dashboard');
  };

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Log a cycle entry</h2>
      <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-1 text-sm">
          Period start date
          <input
            className="rounded-xl border border-rose/20 px-3 py-2"
            type="date"
            name="startDate"
            value={form.startDate}
            required
            onChange={updateField}
          />
        </label>

        <label className="grid gap-1 text-sm">
          Period end date
          <input
            className="rounded-xl border border-rose/20 px-3 py-2"
            type="date"
            name="endDate"
            value={form.endDate}
            required
            onChange={updateField}
          />
        </label>

        <label className="grid gap-1 text-sm">
          Flow intensity
          <select
            className="rounded-xl border border-rose/20 px-3 py-2"
            name="flow"
            value={form.flow}
            onChange={updateField}
          >
            <option>Light</option>
            <option>Medium</option>
            <option>Heavy</option>
          </select>
        </label>

        <fieldset>
          <legend className="mb-2 text-sm">Symptoms</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {symptomOptions.map((symptom) => (
              <label key={symptom} className="flex items-center gap-2 rounded-xl bg-rose/5 p-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.symptoms.includes(symptom)}
                  onChange={() => toggleSymptom(symptom)}
                />
                {symptom}
              </label>
            ))}
          </div>
        </fieldset>

        <button className="rounded-xl bg-rose px-4 py-3 font-medium text-white hover:bg-rose/90" type="submit">
          Save Cycle Entry
        </button>
      </form>
    </section>
  );
}
