import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CycleLengthChart from '../components/CycleLengthChart';
import HealthScoreBadge from '../components/HealthScoreBadge';
import PCOSAlertBanner from '../components/PCOSAlertBanner';
import { formatHumanDate } from '../utils/date';
import { detectPCOSRisk, getCycleHealthScore } from '../utils/health';
import { getCyclePredictions } from '../utils/predictionEngine';

const dateCountdown = (targetISO) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(`${targetISO}T00:00:00`);
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

export default function DashboardPage({ profile, logs }) {
  const navigate = useNavigate();

  const predictions = useMemo(
    () => getCyclePredictions(logs, Number(profile.averageCycleLength || 28)),
    [logs, profile.averageCycleLength]
  );
  const health = useMemo(
    () => getCycleHealthScore(logs, predictions.avgCycleLength),
    [logs, predictions.avgCycleLength]
  );
  const showPCOSAlert = useMemo(() => detectPCOSRisk(logs), [logs]);
  const daysRemaining = dateCountdown(predictions.nextPeriodDate);

  return (
    <div className="grid gap-4">
      {showPCOSAlert ? <PCOSAlertBanner /> : null}

      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Next Predicted Period</p>
          <p className="mt-1 text-2xl font-semibold text-plum">{formatHumanDate(predictions.nextPeriodDate)}</p>
          <p className="mt-2 text-sm text-slate-600">
            {daysRemaining >= 0 ? `${daysRemaining} day(s) remaining` : 'Period window is ongoing or passed'}
          </p>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Ovulation Date</p>
          <p className="mt-1 text-2xl font-semibold text-plum">{formatHumanDate(predictions.ovulationDate)}</p>
          <p className="mt-2 text-sm text-slate-600">
            Fertile Window: {formatHumanDate(predictions.fertileStart)} - {formatHumanDate(predictions.fertileEnd)}
          </p>
        </article>
      </section>

      <HealthScoreBadge score={health.score} status={health.status} />

      <button
        className="rounded-xl bg-rose px-4 py-3 font-medium text-white hover:bg-rose/90"
        type="button"
        onClick={() => navigate('/log-cycle')}
      >
        Log Period
      </button>

      <CycleLengthChart logs={logs} />
    </div>
  );
}
