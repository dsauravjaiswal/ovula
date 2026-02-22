import { useNavigate } from 'react-router-dom';
import { clearAllData } from '../utils/storage';

export default function SettingsPage({ resetState }) {
  const navigate = useNavigate();

  const deleteData = () => {
    clearAllData();
    resetState();
    navigate('/');
  };

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Settings</h2>
      <p className="mt-2 text-sm text-slate-500">Your data is stored only on this device.</p>
      <button
        type="button"
        className="mt-4 rounded-xl bg-rose-600 px-4 py-3 text-sm font-medium text-white hover:bg-rose-700"
        onClick={deleteData}
      >
        Delete all data
      </button>
    </section>
  );
}
