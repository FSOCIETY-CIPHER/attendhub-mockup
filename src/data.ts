/**
 * Hard-coded demo content for the design mockup.
 * No API, no model. Numbers mirror the real artefact's shape so the flow feels honest.
 */

export const FIXTURE = {
  id: "FAP-2419",
  competition: "GAA Football All-Ireland SFC",
  round: "Final",
  homeCode: "DUB",
  homeName: "Dublin",
  awayCode: "KER",
  awayName: "Kerry",
  venue: "Croke Park",
  city: "Dublin 3",
  capacity: 82300,
  kickoff: "Sun, 28 Jul 2024",
  kickoffTime: "15:30",
  durationNote: "Throw-in 15:30",
};

export const PREDICTION = {
  attendance: 68420,
  lower: 61200,
  upper: 74800,
  level: 90,
  method: "split-conformal",
  occupancy: 0.831,
  modelId: "OLS",
  modelVersion: "v1.0.0",
  baseline: 47250,
};

export type Factor = {
  id: string;
  label: string;
  detail: string;
  value: string;
  contribution: number;
  active: boolean;
  tag: "Match importance" | "Schedule" | "Form" | "Venue";
};

export const FACTORS: Factor[] = [
  {
    id: "derby",
    label: "Rivalry / marquee fixture",
    detail: "Dublin v Kerry classified as a marquee pairing",
    value: "Yes",
    contribution: 6140,
    active: true,
    tag: "Match importance",
  },
  {
    id: "stage",
    label: "Season stage",
    detail: "Final — latest possible stage of the championship",
    value: "1.00",
    contribution: 5900,
    active: true,
    tag: "Match importance",
  },
  {
    id: "position",
    label: "Home league position",
    detail: "Dublin ranked 1st going into the fixture",
    value: "1st",
    contribution: 4610,
    active: true,
    tag: "Form",
  },
  {
    id: "weekend",
    label: "Weekend afternoon throw-in",
    detail: "Sunday 15:30 — peak attendance window",
    value: "Sun 15:30",
    contribution: 3280,
    active: true,
    tag: "Schedule",
  },
  {
    id: "awayform",
    label: "Away rolling form (last 5)",
    detail: "Kerry on 12 of a possible 15 points",
    value: "12 / 15",
    contribution: 1240,
    active: true,
    tag: "Form",
  },
  {
    id: "weather",
    label: "Match-day weather",
    detail: "Not available in this build — excluded from the model",
    value: "Excluded",
    contribution: 0,
    active: false,
    tag: "Venue",
  },
];

export const RECENT = [
  {
    id: "FAP-2418",
    home: "SHA",
    away: "BOH",
    venue: "Tallaght Stadium",
    date: "12 Jul 2024",
    attendance: 7842,
    capacity: 8000,
  },
  {
    id: "FAP-2417",
    home: "DUB",
    away: "GAL",
    venue: "Croke Park",
    date: "30 Jun 2024",
    attendance: 54310,
    capacity: 82300,
  },
];

export const MODELS = [
  { name: "OLS regression", mae: 6886, rmse: 8779, r2: 0.733, selected: true, kind: "Headline" },
  { name: "Ridge regression", mae: 7687, rmse: 9563, r2: 0.666, selected: false, kind: "Benchmark" },
  { name: "Random forest", mae: 8397, rmse: 11626, r2: 0.506, selected: false, kind: "Benchmark" },
  { name: "Hist. gradient boosting", mae: 8672, rmse: 11825, r2: 0.489, selected: false, kind: "Benchmark" },
  { name: "Home-club mean", mae: 11206, rmse: 14148, r2: 0.306, selected: false, kind: "Baseline" },
];

export const DATA_SUMMARY = {
  rows: 1139,
  train: 759,
  validation: 250,
  test: 130,
  sources: [
    { name: "football-data.co.uk", detail: "Seasons 2000-01, 2001-02", status: "Verified" },
    { name: "FootyStats sample", detail: "Season 2018-19", status: "Verified" },
    { name: "Stadium capacity table", detail: "Project-maintained, versioned", status: "Verified" },
  ],
  gaps: [
    "Recent EPL seasons publish no match-level attendance column.",
    "Ticket price, weather and fan engagement are excluded, not imputed.",
  ],
};

export const nf = (n: number) => n.toLocaleString("en-IE");
