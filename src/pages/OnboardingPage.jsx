import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserProfile } from '../utils/storage';

const initialForm = {
  age: '',
  averageCycleLength: 28,
  averagePeriodLength: 5,
  lastPeriodStartDate: '',
  irregularCycles: 'No',
  diagnosedPCOS: 'No',
};

export default function OnboardingPage({ onProfileCreated }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setUserProfile(form);
    onProfileCreated(form);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8fb] to-[#fceef4] px-4 py-8">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-plum">Welcome to Ovula</h1>
        <p className="mt-2 text-sm text-slate-500">A private cycle tracker that keeps all your data on this device.</p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-1 text-sm">
            Age
            <input
              className="rounded-xl border border-rose/20 px-3 py-2"
              type="number"
              name="age"
              value={form.age}
              required
              min="10"
              onChange={onChange}
            />
          </label>

          <label className="grid gap-1 text-sm">
            Average cycle length (days)
            <input
              className="rounded-xl border border-rose/20 px-3 py-2"
              type="number"
              name="averageCycleLength"
              value={form.averageCycleLength}
              required
              onChange={onChange}
            />
          </label>

          <label className="grid gap-1 text-sm">
            Average period length (days)
            <input
              className="rounded-xl border border-rose/20 px-3 py-2"
              type="number"
              name="averagePeriodLength"
              value={form.averagePeriodLength}
              required
              onChange={onChange}
            />
          </label>

          <label className="grid gap-1 text-sm">
            Last period start date
            <input
              className="rounded-xl border border-rose/20 px-3 py-2"
              type="date"
              name="lastPeriodStartDate"
              value={form.lastPeriodStartDate}
              required
              onChange={onChange}
            />
          </label>

          <label className="grid gap-1 text-sm">
            Irregular cycles?
            <select
              className="rounded-xl border border-rose/20 px-3 py-2"
              name="irregularCycles"
              value={form.irregularCycles}
              onChange={onChange}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            Diagnosed PCOS?
            <select
              className="rounded-xl border border-rose/20 px-3 py-2"
              name="diagnosedPCOS"
              value={form.diagnosedPCOS}
              onChange={onChange}
            >
              <option>Yes</option>
              <option>No</option>
              <option>Unsure</option>
            </select>
          </label>

          <button className="mt-2 rounded-xl bg-rose px-4 py-3 font-medium text-white hover:bg-rose/90" type="submit">
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
