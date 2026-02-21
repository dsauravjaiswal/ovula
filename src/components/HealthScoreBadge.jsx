const statusStyles = {
  Green: 'bg-emerald-100 text-emerald-700',
  Yellow: 'bg-amber-100 text-amber-700',
  Red: 'bg-rose-100 text-rose-700',
};

export default function HealthScoreBadge({ score, status }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">Cycle Health Score</p>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-3xl font-semibold">{score}</span>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}>{status}</span>
      </div>
    </div>
  );
}
