export default function PCOSAlertBanner() {
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-sm">
      <p className="text-sm font-medium">
        Your recent cycle patterns suggest irregularity. Consider PCOS screening.
      </p>
      <button
        type="button"
        className="mt-3 rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        Explore PCOSCheck™
      </button>
    </div>
  );
}
