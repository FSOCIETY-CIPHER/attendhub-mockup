# AttendHub · Design Mockup

Interactive design prototype for the Football Attendance Predictor MSc artefact (Dublin Business School).

**Live preview:** https://attendhub-mockup.vercel.app

## What this is

A hard-coded visual mockup to validate layout, flow, and responsive behaviour before wiring the real API and model. Every number on screen is fabricated for demonstration.

## Modes

- **Mobile** — tap-through phone flow
- **Desktop** — sidebar navigation, multi-column dashboard (CSS container queries)
- **All screens** — 9-screen showcase grid

## Local dev

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
npx vercel deploy --prod
```

## Related

The production application (real OLS model, FastAPI, data pipeline) lives in a separate repository.
