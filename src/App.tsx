import { useMemo, useState } from "react";
import {
  ArrowRight,
  Battery,
  Calendar,
  ChartIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cloud,
  HomeIcon,
  Info,
  ListIcon,
  Logo,
  Search,
  Share,
  Signal,
  Sliders,
  Stadium,
  Swap,
  TrendUp,
  Trophy,
  UserIcon,
  Wifi,
} from "./icons";
import { DATA_SUMMARY, FACTORS, FIXTURE, MODELS, PREDICTION, RECENT, nf } from "./data";

type ScreenId =
  | "splash"
  | "home"
  | "result"
  | "factors"
  | "review"
  | "success"
  | "fixtures"
  | "models"
  | "data";

type Ctx = {
  go: (s: ScreenId) => void;
  active: string[];
  toggle: (id: string) => void;
  total: number;
};

/**
 * A screen is described declaratively so the same definition can be composed by
 * the mobile shell (bottom nav) and the desktop shell (sidebar) without forking.
 */
type ScreenDef = {
  title: string;
  back?: ScreenId;
  actions?: React.ReactNode;
  hero?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  fullBleed?: boolean;
};

const TABS: Array<[ScreenId, string, React.ReactNode]> = [
  ["home", "Home", <HomeIcon key="h" />],
  ["fixtures", "Fixtures", <ListIcon key="f" />],
  ["models", "Models", <ChartIcon key="m" />],
  ["data", "Data", <UserIcon key="d" />],
];

const TAB_OF: Partial<Record<ScreenId, ScreenId>> = {
  home: "home",
  result: "home",
  factors: "home",
  review: "home",
  success: "home",
  fixtures: "fixtures",
  models: "models",
  data: "data",
};

/* ------------------------------------------------------------------ shell */

function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <span className="icons">
        <Signal />
        <Wifi />
        <Battery />
      </span>
    </div>
  );
}

function Sidebar({ current, go }: { current: ScreenId; go: (s: ScreenId) => void }) {
  const tab = TAB_OF[current];
  return (
    <aside className="side">
      <div className="side-brand">
        <Logo size={26} />
        <span>AttendHub</span>
      </div>
      <button className="side-cta" onClick={() => go("home")}>
        + New forecast
      </button>
      <nav className="side-nav">
        {TABS.map(([id, label, icon]) => (
          <button key={id} className={`side-item ${tab === id ? "active" : ""}`} onClick={() => go(id)}>
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="side-foot">
        <div className="side-user">
          <span className="side-avatar">FL</span>
          <div>
            <div className="side-user-name">Frederick Lewis</div>
            <div className="side-user-role">Operations planning</div>
          </div>
        </div>
        <p className="side-note">Prototype build · hard-coded data</p>
      </div>
    </aside>
  );
}

function BottomNav({ current, go }: { current: ScreenId; go: (s: ScreenId) => void }) {
  const tab = TAB_OF[current];
  return (
    <div className="bottomnav">
      {TABS.map(([id, label, icon]) => (
        <button key={id} className={`navitem ${tab === id ? "active" : ""}`} onClick={() => go(id)}>
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function AppShell({ screen, def, go }: { screen: ScreenId; def: ScreenDef; go: (s: ScreenId) => void }) {
  if (def.fullBleed) {
    return (
      <div className="app-shell">
        <div className="app app-bleed">{def.content}</div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app">
        <Sidebar current={screen} go={go} />
        <div className="main">
          <header className="topbar">
            {def.back ? (
              <button className="icon-btn topbar-back" onClick={() => go(def.back!)} aria-label="Back">
                <ChevronLeft />
              </button>
            ) : null}
            <span className="topbar-title">{def.title}</span>
            <span className="topbar-actions">{def.actions}</span>
          </header>
          {def.hero}
          <div className="scroll">
            <div className="page">{def.content}</div>
            {def.footer ? <div className="footer-inline">{def.footer}</div> : null}
          </div>
          {def.footer ? <div className="footer-cta">{def.footer}</div> : null}
          <BottomNav current={screen} go={go} />
        </div>
      </div>
    </div>
  );
}

function Phone({ screen, def, go }: { screen: ScreenId; def: ScreenDef; go: (s: ScreenId) => void }) {
  return (
    <div className="phone">
      <div className="phone-status">
        <StatusBar />
      </div>
      <div className="phone-screen">
        <AppShell screen={screen} def={def} go={go} />
      </div>
      <div className="homebar">
        <i />
      </div>
    </div>
  );
}

function DesktopFrame({
  screen,
  def,
  go,
}: {
  screen: ScreenId;
  def: ScreenDef;
  go: (s: ScreenId) => void;
}) {
  return (
    <div className="window">
      <div className="window-bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="window-url">attendhub.app/{screen === "home" ? "" : screen}</span>
      </div>
      <div className="window-screen">
        <AppShell screen={screen} def={def} go={go} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- screens */

function splashScreen({ go }: Ctx): ScreenDef {
  return {
    title: "Welcome",
    fullBleed: true,
    content: (
      <div className="splash">
        <div className="splash-photo" style={{ backgroundImage: "url(/img/croke-park-aerial.png)" }} />
        <div className="splash-veil" />
        <div className="splash-logo">
          <Logo size={26} />
          AttendHub
        </div>
        <div className="splash-body">
          <div className="splash-kicker">Croke Park · Dublin</div>
          <h1 className="splash-title">
            Know your
            <br />
            matchday crowd
          </h1>
          <p className="splash-sub">
            Pre-match attendance forecasts with honest uncertainty — built for stewarding, catering and
            capacity planning.
          </p>
          <button className="splash-cta" onClick={() => go("home")} aria-label="Get started">
            <ArrowRight />
          </button>
        </div>
      </div>
    ),
  };
}

function homeScreen({ go }: Ctx): ScreenDef {
  return {
    title: "Forecast a fixture",
    hero: (
      <div className="greet">
        <div className="hi">Hi, Frederick</div>
        <div className="big">Forecast a fixture</div>
      </div>
    ),
    content: (
      <>
        <div className="card span-2">
          <div className="tabs">
            <div className="tab active">Scheduled fixture</div>
            <div className="tab">Custom match</div>
          </div>

          <div className="setup-grid">
            <div className="club-pair">
              <div className="field-grid">
                <button className="field">
                  <div className="k">Home club</div>
                  <div className="v">Dublin · DUB</div>
                </button>
                <button className="field">
                  <div className="k">Away club</div>
                  <div className="v">Kerry · KER</div>
                </button>
              </div>
              <div className="swap">
                <Swap />
              </div>
            </div>

            <button className="field">
              <div className="k">Match date</div>
              <div className="v">
                Sun, 28 Jul 2024 <Calendar />
              </div>
            </button>

            <div className="field-grid">
              <button className="field">
                <div className="k">Throw-in</div>
                <div className="v">15:30</div>
              </button>
              <button className="field">
                <div className="k">Venue</div>
                <div className="v">Croke Park</div>
              </button>
            </div>
          </div>

          <button className="btn predict-btn" onClick={() => go("result")}>
            Predict attendance
          </button>
        </div>

        <div className="row span-2 section-head">
          <h2 className="h2">Recent forecasts</h2>
          <button className="link-btn">See all</button>
        </div>

        {RECENT.map((r) => (
          <div className="card tight" key={r.id}>
            <div className="row" style={{ marginBottom: 8 }}>
              <span className="mono muted">{r.id}</span>
              <span className="muted">{r.date}</span>
            </div>
            <div className="row">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="crest">{r.home}</span>
                <span className="muted">v</span>
                <span className="crest">{r.away}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 17, fontWeight: 800 }}>{nf(r.attendance)}</div>
                <div className="muted">{Math.round((r.attendance / r.capacity) * 100)}% of capacity</div>
              </div>
            </div>
            <div className="bar-mini" style={{ marginTop: 10 }}>
              <i style={{ width: `${(r.attendance / r.capacity) * 100}%` }} />
            </div>
          </div>
        ))}
      </>
    ),
  };
}

const BARCODE = Array.from({ length: 46 }, (_, i) => 1 + ((i * 7) % 4) * 0.9);

function resultScreen({ go, total }: Ctx): ScreenDef {
  const min = 50000;
  const span = FIXTURE.capacity - min;
  const pct = (v: number) => ((v - min) / span) * 100;
  const occupancy = total / FIXTURE.capacity;

  return {
    title: `Forecast · ${FIXTURE.id}`,
    back: "home",
    actions: (
      <button className="icon-btn" aria-label="Share">
        <Share />
      </button>
    ),
    hero: (
      <div className="hero-blue">
        <div className="route">
          <div>
            <div className="code">{FIXTURE.homeCode}</div>
            <div className="name">{FIXTURE.homeName}</div>
          </div>
          <div className="mid">
            <div className="line">
              <span className="dashline" />
              <Stadium size={15} />
              <span className="dashline" />
            </div>
            <small>{FIXTURE.venue}</small>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="code">{FIXTURE.awayCode}</div>
            <div className="name">{FIXTURE.awayName}</div>
          </div>
        </div>
        <div className="ticket-strap">
          <div>
            {FIXTURE.kickoff}
            <b>{FIXTURE.kickoffTime} throw-in</b>
          </div>
          <div style={{ textAlign: "right" }}>
            All-Ireland SFC
            <b>{FIXTURE.round}</b>
          </div>
        </div>
      </div>
    ),
    content: (
      <>
        <div className="card ticket-card">
          <div className="notch-l" />
          <div className="notch-r" />
          <div className="row">
            <span className="label">Predicted attendance</span>
            <span className="chip">
              {PREDICTION.modelId} {PREDICTION.modelVersion}
            </span>
          </div>
          <div className="bignum" style={{ marginTop: 8 }}>
            {nf(total)}
          </div>
          <div className="muted" style={{ marginTop: 4 }}>
            spectators · {Math.round(occupancy * 100)}% of {nf(FIXTURE.capacity)} capacity
          </div>
          <div className="meter">
            <i style={{ width: `${occupancy * 100}%` }} />
          </div>

          <div className="dashed" />

          <div className="row">
            <span className="label">{PREDICTION.level}% prediction interval</span>
            <span className="muted mono">{PREDICTION.method}</span>
          </div>
          <div className="interval">
            <div className="track" />
            <div
              className="band"
              style={{
                left: `${pct(PREDICTION.lower)}%`,
                width: `${pct(PREDICTION.upper) - pct(PREDICTION.lower)}%`,
              }}
            />
            <div className="pin" style={{ left: `${pct(total)}%` }} />
            <span className="end" style={{ left: 0 }}>
              {nf(PREDICTION.lower)}
            </span>
            <span className="end" style={{ right: 0 }}>
              {nf(PREDICTION.upper)}
            </span>
          </div>

          <div className="dashed" />

          <div className="kv-grid">
            <div className="kv">
              <div className="k">Venue</div>
              <div className="v">{FIXTURE.venue}</div>
            </div>
            <div className="kv">
              <div className="k">Capacity</div>
              <div className="v">{nf(FIXTURE.capacity)}</div>
            </div>
            <div className="kv">
              <div className="k">Competition</div>
              <div className="v">All-Ireland SFC</div>
            </div>
            <div className="kv">
              <div className="k">Stage</div>
              <div className="v">{FIXTURE.round}</div>
            </div>
          </div>

          <div className="dashed" />
          <div className="barcode">
            {BARCODE.map((w, i) => (
              <i key={i} style={{ flexGrow: w, height: i % 5 === 0 ? "100%" : "82%" }} />
            ))}
          </div>
          <div className="mono muted" style={{ textAlign: "center", marginTop: 6 }}>
            {FIXTURE.id} · dataset sha256:4b1c…9ef2
          </div>
        </div>

        <div className="stack">
          <div className="card tight">
            <div className="row">
              <div>
                <div className="label">Driver factors</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 3 }}>
                  5 applied · 1 unavailable
                </div>
              </div>
              <button className="btn sm ghost" onClick={() => go("factors")}>
                Adjust
              </button>
            </div>
          </div>

          <div className="card tight">
            <div className="label" style={{ marginBottom: 10 }}>
              Top contributions
            </div>
            {FACTORS.filter((f) => f.contribution > 0)
              .slice(0, 4)
              .map((f) => (
                <div key={f.id} style={{ marginBottom: 10 }}>
                  <div className="row">
                    <span style={{ fontSize: 12.5, fontWeight: 600 }}>{f.label}</span>
                    <span className="mono" style={{ fontSize: 12, color: "var(--green)" }}>
                      +{nf(f.contribution)}
                    </span>
                  </div>
                  <div className="bar-mini" style={{ marginTop: 5 }}>
                    <i style={{ width: `${(f.contribution / 6140) * 100}%` }} />
                  </div>
                </div>
              ))}
          </div>

          <div className="card tight note">
            <span className="note-icon">
              <Info />
            </span>
            <p className="muted" style={{ margin: 0 }}>
              Association, not causation. Interval covers 90% of held-out residuals, not worst-case
              scenarios.
            </p>
          </div>
        </div>
      </>
    ),
    footer: (
      <button className="btn" onClick={() => go("review")}>
        Review &amp; save forecast
      </button>
    ),
  };
}

const FACTOR_ICON: Record<string, React.ReactNode> = {
  derby: <Trophy />,
  stage: <TrendUp />,
  position: <ChartIcon size={22} stroke={1.9} />,
  weekend: <Clock />,
  awayform: <TrendUp />,
  weather: <Cloud />,
};

function factorsScreen({ go, active, toggle, total }: Ctx): ScreenDef {
  const tags = ["All factors", "Match importance", "Schedule", "Form", "Venue"];
  return {
    title: "Adjust factors",
    back: "result",
    content: (
      <>
        <div className="span-2 stack-row">
          <div className="search">
            <Search />
            <span style={{ flex: 1 }}>Search factors…</span>
            <Sliders />
          </div>
          <div className="filters">
            {tags.map((t, i) => (
              <span key={t} className={`filter ${i === 0 ? "active" : ""}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="card span-2 factor-list">
          {FACTORS.map((f) => {
            const on = active.includes(f.id);
            const unavailable = f.contribution === 0;
            return (
              <div className="factor" key={f.id}>
                <div className="factor-thumb">{FACTOR_ICON[f.id]}</div>
                <div className="factor-main">
                  <div className="factor-title">{f.label}</div>
                  <div className="factor-detail">{f.detail}</div>
                  <div className="factor-foot">
                    <span className={`contrib ${unavailable ? "zero" : "pos"}`}>
                      {unavailable ? "No data" : `+${nf(f.contribution)}`}
                    </span>
                    {unavailable ? (
                      <span className="toggle off">Excluded</span>
                    ) : (
                      <button className={`toggle ${on ? "on" : ""}`} onClick={() => toggle(f.id)}>
                        {on ? "Applied" : "Apply"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="muted span-2" style={{ margin: "0 4px" }}>
          Toggling a factor re-runs the linear model. Excluded factors have no verified source in this
          build and are never imputed.
        </p>
      </>
    ),
    footer: (
      <div className="foot-split">
        <div>
          <div className="muted">Revised forecast</div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>{nf(total)}</div>
        </div>
        <button className="btn sm" style={{ padding: "12px 28px" }} onClick={() => go("review")}>
          Continue
        </button>
      </div>
    ),
  };
}

function reviewScreen({ go, active, total }: Ctx): ScreenDef {
  const applied = FACTORS.filter((f) => active.includes(f.id));
  return {
    title: "Review forecast",
    back: "factors",
    content: (
      <>
        <div className="card">
          <div className="label" style={{ marginBottom: 10 }}>
            Contribution breakdown
          </div>
          <div className="row" style={{ marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>Venue &amp; club baseline</div>
              <div className="muted">Croke Park · Dublin home matches</div>
            </div>
            <span className="mono" style={{ fontWeight: 700 }}>
              {nf(PREDICTION.baseline)}
            </span>
          </div>
          {applied.map((f) => (
            <div className="row" key={f.id} style={{ marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{f.label}</div>
                <div className="muted">{f.value}</div>
              </div>
              <span className="mono" style={{ fontWeight: 700, color: "var(--green)" }}>
                +{nf(f.contribution)}
              </span>
            </div>
          ))}
          <div className="dashed" />
          <div className="row">
            <span style={{ fontWeight: 800, fontSize: 15 }}>Predicted attendance</span>
            <span style={{ fontWeight: 800, fontSize: 17, color: "var(--blue-deep)" }}>{nf(total)}</span>
          </div>
          <div className="row" style={{ marginTop: 6 }}>
            <span className="muted">90% interval</span>
            <span className="muted mono">
              {nf(PREDICTION.lower)} – {nf(PREDICTION.upper)}
            </span>
          </div>
        </div>

        <div className="stack">
          <div className="card tight">
            <div className="label" style={{ marginBottom: 10 }}>
              Fixture
            </div>
            <div className="row">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  {FIXTURE.homeName} v {FIXTURE.awayName}
                </div>
                <div className="muted">
                  {FIXTURE.venue} · {FIXTURE.kickoff}, {FIXTURE.kickoffTime}
                </div>
              </div>
              <span className="crest">{FIXTURE.homeCode}</span>
            </div>
          </div>

          <div className="card tight">
            <div className="row">
              <div>
                <div className="label">Model</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 3 }}>OLS regression · v1.0.0</div>
                <div className="muted">Validation MAE 6,886 · selected on validation</div>
              </div>
              <button className="btn sm ghost" onClick={() => go("models")}>
                Compare
              </button>
            </div>
          </div>

          <div className="card tight">
            <div className="row">
              <div>
                <div className="label">Saved by</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 3 }}>Frederick Lewis</div>
                <div className="muted">Operations planning · Croke Park</div>
              </div>
              <span className="link-btn">Edit</span>
            </div>
          </div>
        </div>
      </>
    ),
    footer: (
      <button className="btn" onClick={() => go("success")}>
        Save forecast · {nf(total)}
      </button>
    ),
  };
}

function successScreen({ go, total }: Ctx): ScreenDef {
  return {
    title: "Forecast saved",
    content: (
      <div className="success span-2">
        <svg width="188" height="150" viewBox="0 0 188 150" fill="none">
          <ellipse cx="94" cy="136" rx="66" ry="7" fill="#3b7ad9" opacity="0.12" />
          <rect x="58" y="26" width="72" height="104" rx="12" fill="#e3edfc" stroke="#3b7ad9" strokeWidth="2.5" />
          <rect x="70" y="42" width="48" height="6" rx="3" fill="#3b7ad9" opacity="0.45" />
          <rect x="70" y="56" width="34" height="6" rx="3" fill="#3b7ad9" opacity="0.28" />
          <circle cx="94" cy="92" r="20" fill="#3b7ad9" />
          <path d="M85 92.5l6.5 6.5L104 86" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 118V78c0-3 2-5 5-5h14c3 0 5 2 5 5v40" stroke="#3b7ad9" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M31 84h13M31 94h13M31 104h13" stroke="#3b7ad9" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
          <path d="M138 118V78c0-3 2-5 5-5h14c3 0 5 2 5 5v40" stroke="#3b7ad9" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M143 84h13M143 94h13M143 104h13" stroke="#3b7ad9" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
        </svg>
        <h2>Forecast saved successfully!</h2>
        <p>
          {nf(total)} spectators predicted for
          <br />
          <span className="link">Dublin v Kerry · Croke Park</span>
        </p>
        <p className="muted" style={{ marginTop: 14, maxWidth: 380 }}>
          Stored with model version, dataset hash and the exact inputs used, so it can be audited later.
        </p>
      </div>
    ),
    footer: (
      <div className="foot-actions">
        <button className="btn" onClick={() => go("home")}>
          Back to home
        </button>
        <button className="btn ghost" onClick={() => go("models")}>
          View model evidence
        </button>
      </div>
    ),
  };
}

function fixturesScreen({ go }: Ctx): ScreenDef {
  const rows = [
    { h: "Dublin", a: "Kerry", v: "Croke Park", d: "Sun 28 Jul · 15:30", p: 68420, c: 82300, tag: "Final" },
    { h: "Shamrock Rovers", a: "Bohemians", v: "Tallaght Stadium", d: "Fri 2 Aug · 19:45", p: 7840, c: 8000, tag: "Derby" },
    { h: "Cork City", a: "Galway Utd", v: "Turner's Cross", d: "Sat 3 Aug · 17:00", p: 4180, c: 7365, tag: "League" },
    { h: "Derry City", a: "Sligo Rovers", v: "Brandywell", d: "Sun 4 Aug · 16:00", p: 3260, c: 3700, tag: "League" },
  ];
  return {
    title: "Upcoming fixtures",
    content: (
      <>
        <div className="filters span-2">
          {["All", "This week", "Croke Park", "Derbies"].map((t, i) => (
            <span key={t} className={`filter ${i === 0 ? "active" : ""}`}>
              {t}
            </span>
          ))}
        </div>
        {rows.map((r) => (
          <button className="card tight fixture-card" key={r.h} onClick={() => go("result")}>
            <div className="row" style={{ marginBottom: 8 }}>
              <span className="chip">{r.tag}</span>
              <span className="muted">{r.d}</span>
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 700 }}>
              {r.h} <span className="muted" style={{ fontWeight: 500 }}>v</span> {r.a}
            </div>
            <div className="muted" style={{ marginTop: 2 }}>
              {r.v}
            </div>
            <div className="row" style={{ marginTop: 10 }}>
              <div style={{ flex: 1 }}>
                <div className="bar-mini">
                  <i style={{ width: `${(r.p / r.c) * 100}%` }} />
                </div>
              </div>
              <span style={{ fontWeight: 800, fontSize: 14 }}>{nf(r.p)}</span>
              <ChevronRight />
            </div>
          </button>
        ))}
      </>
    ),
  };
}

function modelsScreen(_: Ctx): ScreenDef {
  const worst = Math.max(...MODELS.map((m) => m.mae));
  return {
    title: "Model comparison",
    content: (
      <>
        <div className="card">
          <div className="row">
            <div>
              <div className="label">Selected for deployment</div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>OLS regression</div>
            </div>
            <span className="chip green">
              <Check size={12} /> Headline
            </span>
          </div>
          <div className="divider" />
          <div className="kv-grid">
            <div className="kv">
              <div className="k">Test MAE</div>
              <div className="v">6,886</div>
            </div>
            <div className="kv">
              <div className="k">Test RMSE</div>
              <div className="v">8,779</div>
            </div>
            <div className="kv">
              <div className="k">Test R²</div>
              <div className="v">0.733</div>
            </div>
            <div className="kv">
              <div className="k">Test matches</div>
              <div className="v">130</div>
            </div>
          </div>
        </div>

        <div className="card tight note">
          <span className="note-icon">
            <Info />
          </span>
          <p className="muted" style={{ margin: 0 }}>
            OLS is kept as the headline model because it beat every benchmark on validation MAE and stays
            interpretable. The test split was scored once, after the model was frozen.
          </p>
        </div>

        <div className="card span-2">
          <div className="label" style={{ marginBottom: 10 }}>
            Validation error · lower is better
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>Model</th>
                <th className="col-wide">Relative error</th>
                <th style={{ textAlign: "right" }}>MAE</th>
                <th style={{ textAlign: "right" }} className="col-wide">
                  RMSE
                </th>
                <th style={{ textAlign: "right" }}>R²</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m) => (
                <tr key={m.name} className={m.selected ? "sel" : ""}>
                  <td>
                    {m.name}
                    <div className="bar-mini grey col-narrow" style={{ marginTop: 6, width: "92%" }}>
                      <i
                        style={{
                          width: `${(m.mae / worst) * 100}%`,
                          background: m.selected ? "var(--blue)" : undefined,
                        }}
                      />
                    </div>
                  </td>
                  <td className="col-wide">
                    <div className="bar-mini grey">
                      <i
                        style={{
                          width: `${(m.mae / worst) * 100}%`,
                          background: m.selected ? "var(--blue)" : undefined,
                        }}
                      />
                    </div>
                  </td>
                  <td className="num">{nf(m.mae)}</td>
                  <td className="num col-wide">{nf(m.rmse)}</td>
                  <td className="num">{m.r2.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  };
}

function dataScreen(_: Ctx): ScreenDef {
  const splits: Array<[string, number, string]> = [
    ["Train", DATA_SUMMARY.train, "2000-01, 2001-02"],
    ["Validation", DATA_SUMMARY.validation, "2018-19 · rounds 1–25"],
    ["Test", DATA_SUMMARY.test, "2018-19 · rounds 26–38"],
  ];
  return {
    title: "Data & provenance",
    content: (
      <>
        <div className="card">
          <div className="row">
            <div>
              <div className="label">Model-ready matches</div>
              <div className="bignum" style={{ fontSize: 34, marginTop: 6 }}>
                {nf(DATA_SUMMARY.rows)}
              </div>
            </div>
            <span className="chip green">Verified sources</span>
          </div>
          <div className="divider" />
          {splits.map(([name, n, detail]) => (
            <div className="row" key={name} style={{ marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{name}</div>
                <div className="muted">{detail}</div>
              </div>
              <span className="mono" style={{ fontWeight: 700 }}>
                {n}
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="label" style={{ marginBottom: 10 }}>
            Sources
          </div>
          {DATA_SUMMARY.sources.map((s) => (
            <div className="row" key={s.name} style={{ marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{s.name}</div>
                <div className="muted">{s.detail}</div>
              </div>
              <span className="chip green">{s.status}</span>
            </div>
          ))}
        </div>

        <div className="card span-2">
          <div className="label" style={{ marginBottom: 10 }}>
            Declared gaps
          </div>
          {DATA_SUMMARY.gaps.map((g) => (
            <div key={g} style={{ display: "flex", gap: 9, marginBottom: 9 }}>
              <span className="note-icon">
                <Info />
              </span>
              <p className="muted" style={{ margin: 0 }}>
                {g}
              </p>
            </div>
          ))}
        </div>
      </>
    ),
  };
}

/* ------------------------------------------------------------------- app */

const SCREENS: Record<
  ScreenId,
  { build: (c: Ctx) => ScreenDef; label: string; note: string }
> = {
  splash: { build: splashScreen, label: "Onboarding", note: "Croke Park hero" },
  home: { build: homeScreen, label: "Home", note: "Fixture setup + recent" },
  result: { build: resultScreen, label: "Forecast", note: "Prediction + interval" },
  factors: { build: factorsScreen, label: "Adjust factors", note: "Toggle model drivers" },
  review: { build: reviewScreen, label: "Review", note: "Contribution breakdown" },
  success: { build: successScreen, label: "Saved", note: "Confirmation" },
  fixtures: { build: fixturesScreen, label: "Fixtures", note: "Upcoming Irish fixtures" },
  models: { build: modelsScreen, label: "Models", note: "Benchmarks vs baseline" },
  data: { build: dataScreen, label: "Data", note: "Provenance + gaps" },
};

const SHOWCASE_ORDER: ScreenId[] = [
  "splash",
  "home",
  "result",
  "factors",
  "review",
  "success",
  "fixtures",
  "models",
  "data",
];

type Mode = "phone" | "desktop" | "grid";

export default function App() {
  const [mode, setMode] = useState<Mode>("phone");
  const [screen, setScreen] = useState<ScreenId>("splash");
  const [active, setActive] = useState<string[]>(FACTORS.filter((f) => f.active).map((f) => f.id));

  const total = useMemo(
    () =>
      PREDICTION.baseline +
      FACTORS.filter((f) => active.includes(f.id)).reduce((sum, f) => sum + f.contribution, 0),
    [active]
  );

  const ctx: Ctx = {
    go: setScreen,
    active,
    total,
    toggle: (id) =>
      setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
  };

  const modes: Array<[Mode, string]> = [
    ["phone", "Mobile"],
    ["desktop", "Desktop"],
    ["grid", "All screens"],
  ];

  return (
    <div className="site">
      <div className="brand">
        <span style={{ color: "var(--blue)" }}>
          <Logo size={46} />
        </span>
        <span className="brand-name">
          Attend<span>Hub</span>
        </span>
      </div>
      <p className="tagline">
        Design mockup for the Football Attendance Predictor — MSc Data Analytics artefact, Dublin Business
        School. One responsive codebase: the same screens adapt from phone to desktop.
      </p>
      <div className="disclaimer">
        <strong>This is a visual prototype.</strong> Every number on these screens is hard-coded to
        demonstrate layout and flow only. No model, API or database is connected yet. The real artefact
        trains an OLS model on verified historical attendance and will replace these placeholders once the
        design is approved.
      </div>

      <div className="modes">
        {modes.map(([m, label]) => (
          <button key={m} className={`mode-btn ${mode === m ? "active" : ""}`} onClick={() => setMode(m)}>
            {label}
          </button>
        ))}
      </div>

      {mode === "phone" && (
        <div className="interactive-wrap">
          <Phone screen={screen} def={SCREENS[screen].build(ctx)} go={setScreen} />
          <p className="hint">
            Tap through the screens as you would on a phone ·{" "}
            <button className="reset-link" onClick={() => setScreen("splash")}>
              restart flow
            </button>
          </p>
        </div>
      )}

      {mode === "desktop" && (
        <div className="interactive-wrap wide">
          <DesktopFrame screen={screen} def={SCREENS[screen].build(ctx)} go={setScreen} />
          <p className="hint">
            Same components, wider container — sidebar navigation and multi-column layout ·{" "}
            <button className="reset-link" onClick={() => setScreen("splash")}>
              restart flow
            </button>
          </p>
        </div>
      )}

      {mode === "grid" && (
        <div className="showcase">
          {SHOWCASE_ORDER.map((id) => (
            <div className="showcase-item" key={id}>
              <div className="scaler">
                <Phone screen={id} def={SCREENS[id].build({ ...ctx, go: () => setScreen(id) })} go={() => setScreen(id)} />
              </div>
              <div className="showcase-label">
                {SCREENS[id].label}
                <small>{SCREENS[id].note}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
