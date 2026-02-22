import { addDays, toISODate } from './date';

const average = (values) => {
  if (!values.length) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round(total / values.length);
};

export const getCyclePredictions = (cycleLogs, fallbackCycleLength = 28) => {
  if (!cycleLogs.length) {
    const today = new Date();
    const nextPeriodDate = addDays(today, fallbackCycleLength);
    const ovulationDate = addDays(nextPeriodDate, -14);
    return {
      nextPeriodDate: toISODate(nextPeriodDate),
      ovulationDate: toISODate(ovulationDate),
      fertileStart: toISODate(addDays(ovulationDate, -2)),
      fertileEnd: toISODate(addDays(ovulationDate, 2)),
      avgCycleLength: fallbackCycleLength,
    };
  }

  const sorted = [...cycleLogs].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const lastThree = sorted.slice(-3);
  const avgCycleLength = average(lastThree.map((entry) => entry.cycleLength).filter(Boolean)) || fallbackCycleLength;
  const latestStartDate = sorted[sorted.length - 1].startDate;
  const nextPeriodDate = addDays(`${latestStartDate}T00:00:00`, avgCycleLength);
  const ovulationDate = addDays(nextPeriodDate, -14);

  return {
    nextPeriodDate: toISODate(nextPeriodDate),
    ovulationDate: toISODate(ovulationDate),
    fertileStart: toISODate(addDays(ovulationDate, -2)),
    fertileEnd: toISODate(addDays(ovulationDate, 2)),
    avgCycleLength,
  };
};
