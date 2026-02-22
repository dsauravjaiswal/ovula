import { dayDiff } from './date';

const getStatus = (score) => {
  if (score >= 80) return 'Green';
  if (score >= 60) return 'Yellow';
  return 'Red';
};

export const getCycleHealthScore = (cycleLogs, avgCycleLength) => {
  let score = 100;

  if (avgCycleLength > 35) score -= 10;

  const sorted = [...cycleLogs].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  let hasLargeGap = false;
  for (let i = 1; i < sorted.length; i += 1) {
    if (dayDiff(`${sorted[i - 1].startDate}T00:00:00`, `${sorted[i].startDate}T00:00:00`) > 60) {
      hasLargeGap = true;
      break;
    }
  }
  if (hasLargeGap) score -= 15;

  const heavyFlowCount = sorted.filter((entry) => entry.flow === 'Heavy').length;
  if (heavyFlowCount >= 2) score -= 10;

  const acneHairGrowthCount = sorted.filter(
    (entry) => entry.symptoms.includes('Acne') && entry.symptoms.includes('Hair growth')
  ).length;
  if (acneHairGrowthCount >= 2) score -= 10;

  return {
    score: Math.max(0, score),
    status: getStatus(score),
  };
};

export const detectPCOSRisk = (cycleLogs) => {
  if (!cycleLogs.length) return false;

  const sorted = [...cycleLogs].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const over35Count = sorted.filter((entry) => entry.cycleLength > 35).length;

  let missedCycles = 0;
  for (let i = 1; i < sorted.length; i += 1) {
    const gap = dayDiff(`${sorted[i - 1].startDate}T00:00:00`, `${sorted[i].startDate}T00:00:00`);
    if (gap > 60) missedCycles += 1;
  }

  const heavyFlowCount = sorted.filter((entry) => entry.flow === 'Heavy').length;
  const acneHairGrowthCount = sorted.filter(
    (entry) => entry.symptoms.includes('Acne') && entry.symptoms.includes('Hair growth')
  ).length;

  return over35Count >= 3 || missedCycles >= 2 || heavyFlowCount >= 2 || acneHairGrowthCount >= 2;
};
