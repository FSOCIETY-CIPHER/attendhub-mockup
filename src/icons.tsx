type P = { size?: number; stroke?: number };

const base = (size: number, stroke: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const ArrowRight = ({ size = 22, stroke = 2.4 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M5 12h13M12 5l7 7-7 7" />
  </svg>
);

export const ChevronLeft = ({ size = 20, stroke = 2.2 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const ChevronRight = ({ size = 16, stroke = 2.2 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const Share = ({ size = 19, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M12 15V3m0 0L8 7m4-4l4 4" />
    <path d="M4 14v5a2 2 0 002 2h12a2 2 0 002-2v-5" />
  </svg>
);

export const Calendar = ({ size = 16, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const Search = ({ size = 16, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const Sliders = ({ size = 16, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
    <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="8" cy="18" r="2" fill="currentColor" stroke="none" />
  </svg>
);

export const HomeIcon = ({ size = 19, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z" />
  </svg>
);

export const ListIcon = ({ size = 19, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
);

export const ChartIcon = ({ size = 19, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export const UserIcon = ({ size = 19, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5" />
  </svg>
);

export const Check = ({ size = 16, stroke = 2.6 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const Swap = ({ size = 15, stroke = 2.2 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M7 4v13M7 17l-3-3M17 20V7M17 7l3 3" />
  </svg>
);

export const Trophy = ({ size = 22, stroke = 1.9 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M8 4h8v5a4 4 0 01-8 0z" />
    <path d="M8 5H5v1a3 3 0 003 3M16 5h3v1a3 3 0 01-3 3" />
    <path d="M12 13v4M9 21h6M10 21v-2h4v2" />
  </svg>
);

export const Clock = ({ size = 22, stroke = 1.9 }: P) => (
  <svg {...base(size, stroke)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const TrendUp = ({ size = 22, stroke = 1.9 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);

export const Cloud = ({ size = 22, stroke = 1.9 }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.5 1.5A3.5 3.5 0 0117 18z" />
  </svg>
);

export const Stadium = ({ size = 22, stroke = 1.9 }: P) => (
  <svg {...base(size, stroke)}>
    <ellipse cx="12" cy="9" rx="9" ry="4" />
    <path d="M3 9v5c0 2.2 4 4 9 4s9-1.8 9-4V9" />
    <ellipse cx="12" cy="9" rx="4" ry="1.6" />
  </svg>
);

export const Info = ({ size = 14, stroke = 2 }: P) => (
  <svg {...base(size, stroke)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.6v.6" />
  </svg>
);

export const Wifi = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path
      d="M8 9.6l1.7 1.7L8 13 6.3 11.3 8 9.6z"
      fill="currentColor"
      transform="translate(0,-2.3)"
    />
    <path d="M1 4.2a10 10 0 0114 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.5 6.7a6.4 6.4 0 019 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Signal = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
    <rect x="0" y="7.5" width="3" height="4.5" rx="1" />
    <rect x="4.5" y="5" width="3" height="7" rx="1" />
    <rect x="9" y="2.5" width="3" height="9.5" rx="1" />
    <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.35" />
  </svg>
);

export const Battery = () => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
    <rect x="0.5" y="0.5" width="21" height="11" rx="3.2" stroke="currentColor" opacity="0.5" />
    <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
    <path d="M23 4.2v3.6a2 2 0 000-3.6z" fill="currentColor" opacity="0.5" />
  </svg>
);

export const Logo = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 5c10.5 0 19 4.3 19 9.6 0 3.2-3.1 6-7.9 7.8L24 44 12.9 22.4C8.1 20.6 5 17.8 5 14.6 5 9.3 13.5 5 24 5z"
      fill="currentColor"
      opacity="0.18"
    />
    <path d="M24 10L12 40h7.4l4.6-12.4L28.6 40H36L24 10z" fill="currentColor" />
    <ellipse cx="24" cy="14.6" rx="19" ry="9.6" stroke="currentColor" strokeWidth="2.6" />
  </svg>
);
