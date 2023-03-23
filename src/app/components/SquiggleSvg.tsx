export default function SquiggleSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0">
      <defs>
        <filter id="squiggle">
          <feTurbulence
            type="fractalNoise"
            id="turbulence"
            baseFrequency=".15"
            numOctaves="6"
          />
          <feDisplacementMap id="displacement" in="SourceGraphic" scale="15" />
        </filter>
      </defs>
    </svg>
  );
}
