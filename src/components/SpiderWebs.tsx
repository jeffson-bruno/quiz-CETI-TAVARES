import React from 'react';
import { motion } from 'motion/react';

/**
 * Teia circular radial baseada nas teias do lado esquerdo da imagem de referência.
 * Usada quando o boneco acerta e joga a teia na resposta certa.
 */
export const CircularSpiderWeb: React.FC<{ className?: string; delay?: number }> = ({
  className = '',
  delay = 0.16,
}) => {
  const spokes = [0, 45, 90, 135, 180, 225, 270, 315];

  const getPoint = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: 60 + Math.cos(rad) * radius,
      y: 60 + Math.sin(rad) * radius,
    };
  };

  const buildRing = (radius: number, sag: number) =>
    spokes
      .map((angle, idx) => {
        const nextAngle = spokes[(idx + 1) % spokes.length];
        const start = getPoint(angle, radius);
        const end = getPoint(nextAngle, radius);
        const midAngle = angle + 22.5;
        const ctrl = getPoint(midAngle, radius * sag);
        return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${ctrl.x.toFixed(1)} ${ctrl.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <motion.svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      initial={{ scale: 0, opacity: 0, rotate: -25 }}
      animate={{ scale: [0, 1.12, 1], opacity: 0.92, rotate: 0 }}
      transition={{ duration: 0.36, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none select-none ${className}`}
    >
      <g stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
        {/* Raios principais */}
        {spokes.map((angle) => {
          const end = getPoint(angle, 55);
          return (
            <line
              key={angle}
              x1="60"
              y1="60"
              x2={end.x.toFixed(1)}
              y2={end.y.toFixed(1)}
              strokeWidth="2.1"
            />
          );
        })}

        {/* Anéis côncavos concêntricos */}
        <path d={buildRing(14, 0.88)} strokeWidth="1.6" />
        <path d={buildRing(26, 0.85)} strokeWidth="1.7" />
        <path d={buildRing(39, 0.84)} strokeWidth="1.8" />
        <path d={buildRing(52, 0.82)} strokeWidth="2" />

        {/* Núcleo central da teia */}
        <circle cx="60" cy="60" r="3.6" fill="#FFFFFF" />
        <circle cx="74" cy="60" r="2.2" fill="#FFFFFF" />
      </g>
    </motion.svg>
  );
};

/**
 * Teia de canto vinda do lado direito baseada nas teias do lado direito da imagem de referência.
 * Usada quando o usuário erra: a teia do lado direito gruda na resposta certa.
 */
export const CornerRightSpiderWeb: React.FC<{ className?: string; delay?: number }> = ({
  className = '',
  delay = 0.08,
}) => {
  const angles = [180, 152, 124, 96];

  const getPoint = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: 112 + Math.cos(rad) * radius,
      y: 8 + Math.sin(rad) * radius,
    };
  };

  const buildArc = (radius: number, sag: number) =>
    angles
      .slice(0, -1)
      .map((angle, idx) => {
        const nextAngle = angles[idx + 1];
        const start = getPoint(angle, radius);
        const end = getPoint(nextAngle, radius);
        const midAngle = (angle + nextAngle) / 2;
        const ctrl = getPoint(midAngle, radius * sag);
        return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} Q ${ctrl.x.toFixed(1)} ${ctrl.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <motion.svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      style={{ transformOrigin: '93% 7%' }}
      initial={{ scale: 0, opacity: 0, x: 24 }}
      animate={{ scale: [0, 1.08, 1], opacity: 0.95, x: 0 }}
      transition={{ duration: 0.38, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none select-none ${className}`}
    >
      <g stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
        {/* Fio âncora vindo da borda direita */}
        <line x1="112" y1="8" x2="120" y2="2" strokeWidth="2.4" />

        {/* Raios partindo do canto direito */}
        {angles.map((angle) => {
          const end = getPoint(angle, 102);
          return (
            <line
              key={angle}
              x1="112"
              y1="8"
              x2={end.x.toFixed(1)}
              y2={end.y.toFixed(1)}
              strokeWidth="2.3"
            />
          );
        })}

        {/* Arcos côncavos entre os raios */}
        <path d={buildArc(24, 0.86)} strokeWidth="1.7" />
        <path d={buildArc(46, 0.85)} strokeWidth="1.8" />
        <path d={buildArc(70, 0.84)} strokeWidth="1.9" />
        <path d={buildArc(96, 0.82)} strokeWidth="2.1" />

        {/* Ponto de fixação no canto */}
        <circle cx="112" cy="8" r="3.5" fill="#FFFFFF" />
      </g>
    </motion.svg>
  );
};
