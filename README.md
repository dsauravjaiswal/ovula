# Ovula

Ovula is a privacy-first menstrual cycle tracking MVP built with React + Vite, Tailwind CSS, and Chart.js.

## Features

- Onboarding profile saved locally in `ovula_user_profile`.
- Dashboard with:
  - Predicted next period countdown
  - Ovulation date and fertile window
  - Cycle health score badge
  - PCOS irregularity alert trigger
  - Line chart of last six cycle lengths
- Cycle logging saved locally in `ovula_cycle_logs`.
- Settings page with one-click data wipe.
- No backend, no auth, and no external APIs.

## Tech stack

- React (Vite)
- Tailwind CSS
- Chart.js (`react-chartjs-2`)
- React Router
- LocalStorage persistence

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
