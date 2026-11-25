import React from 'react';

export const WavyNetworkLines: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1000 1000"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    className={`pointer-events-none select-none animate-bg-lines-drift ${className}`}
  >
    <g fill="none" stroke="#443984" strokeWidth="4.5" strokeLinecap="round" opacity="0.65">
      <path d="M -40 20 C 260 40, 480 140, 560 360 C 620 520, 520 620, 740 680 C 900 720, 960 840, 940 1040" />
      <path d="M -40 90 C 220 120, 380 260, 340 460 C 300 660, 480 740, 740 700 C 920 675, 970 780, 900 1040" />
      <path d="M -40 165 C 180 210, 320 350, 275 560 C 235 740, 460 800, 720 820 C 810 830, 770 960, 740 1040" />
      <path d="M -40 280 C 120 330, 250 450, 250 640 C 250 820, 520 820, 620 960 L 645 1040" />
      <path d="M -40 440 C 140 480, 230 580, 240 740 C 250 860, 480 860, 505 1040" />
      <path d="M -40 610 C 140 650, 240 770, 240 1040" />
      <path d="M 620 630 C 780 620, 920 630, 1040 720" />
      <path d="M 945 1040 L 1030 850" />
    </g>
    <g
      fill="none"
      stroke="#5C4FA8"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeDasharray="90 330"
      opacity="0.55"
      className="animate-bg-lines-flow"
    >
      <path d="M -40 20 C 260 40, 480 140, 560 360 C 620 520, 520 620, 740 680 C 900 720, 960 840, 940 1040" />
      <path d="M -40 90 C 220 120, 380 260, 340 460 C 300 660, 480 740, 740 700 C 920 675, 970 780, 900 1040" />
      <path d="M -40 165 C 180 210, 320 350, 275 560 C 235 740, 460 800, 720 820 C 810 830, 770 960, 740 1040" />
      <path d="M -40 280 C 120 330, 250 450, 250 640 C 250 820, 520 820, 620 960 L 645 1040" />
      <path d="M -40 440 C 140 480, 230 580, 240 740 C 250 860, 480 860, 505 1040" />
      <path d="M -40 610 C 140 650, 240 770, 240 1040" />
      <path d="M 620 630 C 780 620, 920 630, 1040 720" />
    </g>
    <g fill="#443984" opacity="0.75">
      <circle cx="484" cy="153" r="14" />
      <circle cx="437" cy="534" r="14" />
      <circle cx="742" cy="856" r="14" />
    </g>
  </svg>
);

export const ComputerGearsWireframe: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 220 190"
    fill="none"
    aria-hidden="true"
    className={`pointer-events-none select-none animate-float-right ${className}`}
  >
    <g stroke="#564AA0" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="26" y="42" width="18" height="42" rx="3" transform="skewY(-22)" />
      <path d="M 24 44 L 38 37 L 38 78 L 24 85 Z" />
      <path d="M 16 41 L 24 44 L 24 85 L 16 81 Z" />
      <path d="M 52 24 L 146 66 L 146 130 L 52 88 Z" />
      <path d="M 57 32 L 141 70 L 141 116 L 57 78 Z" />
      <path d="M 116 74 L 128 96" strokeWidth="2.4" />
      <path d="M 124 73 L 134 91" strokeWidth="2.4" />
      <path d="M 92 106 L 92 128 L 78 138 L 104 150 L 118 140 L 106 134 L 106 112" />
      <path d="M 70 139 L 102 154 L 122 142 L 106 134" />
      <g transform="translate(168, 42)">
        <g className="animate-spin-cw" style={{ transformOrigin: '0px 0px' }}>
          <circle cx="0" cy="0" r="10" />
          <path d="M -4 -20 L 4 -20 L 5 -14 L 10 -12 L 15 -15 L 20 -10 L 16 -4 L 17 2 L 22 5 L 20 12 L 14 11 L 10 15 L 11 20 L 4 22 L 1 16 L -5 16 L -9 21 L -15 17 L -13 11 L -17 7 L -22 7 L -21 0 L -16 -2 L -14 -8 L -18 -13 L -12 -18 L -7 -14 L -3 -16 Z" />
        </g>
      </g>
      <g transform="translate(174, 96) scale(0.75)">
        <g className="animate-spin-ccw" style={{ transformOrigin: '0px 0px' }}>
          <circle cx="0" cy="0" r="10" />
          <path d="M -4 -20 L 4 -20 L 5 -14 L 10 -12 L 15 -15 L 20 -10 L 16 -4 L 17 2 L 22 5 L 20 12 L 14 11 L 10 15 L 11 20 L 4 22 L 1 16 L -5 16 L -9 21 L -15 17 L -13 11 L -17 7 L -22 7 L -21 0 L -16 -2 L -14 -8 L -18 -13 L -12 -18 L -7 -14 L -3 -16 Z" />
        </g>
      </g>
      <path
        d="M 106 28 L 132 18 L 172 18 M 176 122 L 176 154 L 122 144"
        strokeDasharray="5 6"
        strokeWidth="2.6"
      />
    </g>
  </svg>
);

export const AiBrainHeadWireframe: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 210 180"
    fill="none"
    aria-hidden="true"
    className={`pointer-events-none select-none animate-float-left ${className}`}
  >
    <g stroke="#564AA0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 46 160 L 46 132 C 24 118, 18 86, 26 62 C 36 32, 68 20, 96 26 C 122 32, 134 52, 134 72 L 148 92 L 136 98 L 136 116 C 136 126, 126 132, 112 132 L 104 132 L 104 160 Z" />
      <path d="M 52 94 C 38 92, 34 74, 46 66 C 44 50, 62 40, 76 46 C 88 36, 110 42, 112 58 C 124 66, 118 88, 102 90 C 96 102, 74 102, 68 92 Z" strokeWidth="3.2" />
      <path d="M 122 54 L 138 36 L 154 36" />
      <circle cx="160" cy="36" r="5" fill="#06C8E8" className="animate-ray-pulse" />
      <path d="M 134 72 L 172 72 L 182 60" />
      <circle cx="186" cy="56" r="5" fill="#564AA0" />
      <path d="M 140 88 L 166 88 L 176 98" />
      <circle cx="181" cy="102" r="5" fill="#06C8E8" className="animate-ray-pulse" />
      <path d="M 136 106 L 154 106 L 164 122" />
      <circle cx="168" cy="127" r="5" fill="#564AA0" />
    </g>
    <text
      x="78"
      y="80"
      textAnchor="middle"
      fill="#564AA0"
      fontWeight="800"
      fontSize="26"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      IA
    </text>
  </svg>
);

export const AiChipCloudWireframe: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 220 170"
    fill="none"
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
  >
    <g stroke="#443982" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 38 106 C 16 106, 12 72, 34 62 C 36 30, 74 12, 108 26 C 128 8, 174 18, 178 52 C 204 58, 204 104, 172 106 Z" />
      <rect x="74" y="42" width="56" height="56" rx="4" />
      <path d="M 88 42 L 88 26 M 102 42 L 102 26 M 116 42 L 116 26" />
      <path d="M 74 58 L 58 58 M 74 72 L 58 72 M 74 86 L 58 86" />
      <path d="M 130 58 L 146 58 M 130 72 L 146 72 M 130 86 L 146 86" />
      <path d="M 88 98 L 88 124 L 68 140 M 102 98 L 102 142 M 116 98 L 116 124 L 136 140" />
      <circle cx="64" cy="144" r="4.5" />
      <circle cx="102" cy="148" r="4.5" />
      <circle cx="140" cy="144" r="4.5" />
    </g>
    <text
      x="102"
      y="79"
      textAnchor="middle"
      fill="#443982"
      fontWeight="800"
      fontSize="26"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      AI
    </text>
  </svg>
);
