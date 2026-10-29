import React from 'react';
import { ArchitecturalProject, SpatialZone } from '../data/projects';

interface HeroPavilionViewportProps {
  solarHour: number; // 6 to 21
  viewMode: 'perspective' | 'section' | 'nocturnal';
}

export const HeroPavilionViewport: React.FC<HeroPavilionViewportProps> = ({
  solarHour,
  viewMode,
}) => {
  // Compute sun position & shadow length from solarHour (6:00 to 21:00)
  const normalizedHour = (solarHour - 6) / 15; // 0 at 6:00, 0.5 at 13:30, 1 at 21:00
  const sunX = 80 + normalizedHour * 440;
  const sunY = viewMode === 'nocturnal' ? 210 : 60 + Math.pow(normalizedHour - 0.45, 2) * 260;
  const isNight = viewMode === 'nocturnal' || solarHour >= 19.5 || solarHour <= 6.5;
  const shadowSkew = (normalizedHour - 0.45) * 140;
  const interiorGlowOpacity = isNight ? 0.92 : solarHour > 17 ? 0.65 : 0.28;

  if (viewMode === 'section') {
    return (
      <svg
        viewBox="0 0 640 480"
        className="w-full h-full bg-[#0B0E13] select-none"
        role="img"
        aria-label="Longitudinal architectural section cut of Kamo River Sanctuary"
      >
        <defs>
          <pattern id="secGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(244, 239, 232, 0.04)"
              strokeWidth="1"
            />
          </pattern>
          <pattern id="earthHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(184, 146, 90, 0.22)" strokeWidth="1" />
          </pattern>
          <linearGradient id="lightShaft" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#EAC083" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#EAC083" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <rect width="640" height="480" fill="url(#secGrid)" />

        {/* Datum Lines */}
        <line x1="24" y1="120" x2="616" y2="120" stroke="rgba(184,146,90,0.3)" strokeDasharray="3 3" />
        <text x="32" y="113" fill="#D2AE78" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1.5">
          ROOF PARAPET +6.20M
        </text>

        <line x1="24" y1="250" x2="616" y2="250" stroke="rgba(244,239,232,0.22)" strokeDasharray="4 4" />
        <text x="32" y="243" fill="rgba(244,239,232,0.55)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1.5">
          COURTYARD DATUM ±0.00M
        </text>

        <line x1="24" y1="365" x2="616" y2="365" stroke="rgba(184,146,90,0.25)" strokeDasharray="2 4" />
        <text x="32" y="358" fill="rgba(244,239,232,0.45)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1.5">
          PINACOTHECA VAULT -2.40M
        </text>

        {/* Subterranean Earth Hatch */}
        <rect x="40" y="365" width="560" height="75" fill="url(#earthHatch)" stroke="rgba(184,146,90,0.3)" />
        <rect x="95" y="275" width="220" height="90" fill="#12151B" stroke="#B8925A" strokeWidth="1.2" />

        {/* Zenithal Light Shaft */}
        <polygon
          points={`${280 + shadowSkew * 0.2},120 ${335 + shadowSkew * 0.2},120 ${365 - shadowSkew * 0.4},250 ${250 - shadowSkew * 0.4},250`}
          fill="url(#lightShaft)"
        />

        {/* Monolithic Cantilevered Roof Slab */}
        <rect x="85" y="102" width="475" height="22" fill="#272A30" stroke="#F4EFE8" strokeWidth="1.2" />
        {/* Clerestory Void */}
        <rect x="280" y="100" width="55" height="26" fill="#0B0E13" stroke="#D2AE78" strokeWidth="1" />

        {/* Left Retaining Core */}
        <rect x="85" y="124" width="28" height="241" fill="#272A30" stroke="#F4EFE8" strokeWidth="1" />

        {/* Central Impluvium Water Basin */}
        <rect x="235" y="242" width="135" height="14" fill="rgba(184, 146, 90, 0.28)" stroke="#D2AE78" strokeWidth="1" />

        {/* Right Cantilever Column & Overhang */}
        <rect x="415" y="124" width="16" height="126" fill="#B8925A" />
        <line x1="431" y1="145" x2="560" y2="145" stroke="#D2AE78" strokeWidth="1" strokeDasharray="2 2" />
        <text x="452" y="162" fill="#EAC083" fontSize="9" fontFamily="JetBrains Mono">
          CANTILEVER 9.40M
        </text>

        {/* Dimension Annotations */}
        <g stroke="rgba(244,239,232,0.4)" strokeWidth="0.8">
          <line x1="85" y1="75" x2="560" y2="75" />
          <line x1="85" y1="68" x2="85" y2="82" />
          <line x1="560" y1="68" x2="560" y2="82" />
        </g>
        <text x="322" y="68" textAnchor="middle" fill="#F4EFE8" fontSize="10" fontFamily="JetBrains Mono">
          OVERALL LONGITUDINAL SPAN: 42.80 METERS
        </text>

        {/* Section Title Block */}
        <rect x="40" y="416" width="560" height="36" fill="#12151B" stroke="rgba(244,239,232,0.15)" />
        <text x="54" y="438" fill="#F4EFE8" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.5">
          SECTION A-A · KAMO RIVER SANCTUARY · SCALE 1:100
        </text>
        <text x="584" y="438" textAnchor="end" fill="#B8925A" fontSize="10" fontFamily="JetBrains Mono">
          SOLAR ANGLE: {Math.round(72 - Math.abs(solarHour - 13) * 6)}°
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 480"
      className="w-full h-full bg-[#0B0E13] select-none"
      role="img"
      aria-label="Architectural perspective rendering of cantilevered basalt and bronze pavilion"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          {isNight ? (
            <>
              <stop offset="0%" stopColor="#07090D" />
              <stop offset="65%" stopColor="#0E121A" />
              <stop offset="100%" stopColor="#171B24" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0E1116" />
              <stop offset="55%" stopColor="#181C24" />
              <stop offset="100%" stopColor="#26221E" />
            </>
          )}
        </linearGradient>

        <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EAC083" stopOpacity={isNight ? '0.18' : '0.45'} />
          <stop offset="50%" stopColor="#B8925A" stopOpacity={isNight ? '0.06' : '0.14'} />
          <stop offset="100%" stopColor="#0E1116" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="warmInterior" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFDEAE" stopOpacity={interiorGlowOpacity} />
          <stop offset="55%" stopColor="#B8925A" stopOpacity={interiorGlowOpacity * 0.75} />
          <stop offset="100%" stopColor="#291800" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="waterMirror" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B0E13" />
          <stop offset="40%" stopColor="#141820" />
          <stop offset="100%" stopColor="#090B0F" />
        </linearGradient>
      </defs>

      {/* Sky Canvas */}
      <rect width="640" height="330" fill="url(#skyGrad)" />

      {/* Subtle Architectural Axis Lines */}
      <line x1="0" y1="145" x2="640" y2="145" stroke="rgba(244,239,232,0.04)" strokeWidth="1" />
      <line x1="420" y1="0" x2="420" y2="480" stroke="rgba(184,146,90,0.07)" strokeWidth="1" />

      {/* Celestial Body & Atmospheric Halo */}
      <circle cx={sunX} cy={sunY} r="150" fill="url(#sunHalo)" />
      <circle
        cx={sunX}
        cy={sunY}
        r={isNight ? '10' : '16'}
        fill={isNight ? '#F4EFE8' : '#EAC083'}
        fillOpacity={isNight ? '0.75' : '0.9'}
      />

      {/* Distant Mountain / Kyoto Escarpment Silhouette */}
      <polygon
        points="0,330 0,245 140,210 295,250 470,218 640,255 640,330"
        fill="#101319"
        stroke="rgba(244,239,232,0.05)"
      />

      {/* Sub-base Plinth */}
      <rect x="44" y="308" width="510" height="24" fill="#181B22" stroke="rgba(244,239,232,0.12)" />

      {/* Main Architectural Volume — Left Basalt Monolith Core */}
      <rect x="64" y="168" width="185" height="140" fill="#15181F" stroke="rgba(244,239,232,0.16)" />
      {/* Vertical Board-Formed Concrete Joints */}
      <line x1="100" y1="168" x2="100" y2="308" stroke="rgba(244,239,232,0.05)" />
      <line x1="136" y1="168" x2="136" y2="308" stroke="rgba(244,239,232,0.05)" />
      <line x1="172" y1="168" x2="172" y2="308" stroke="rgba(244,239,232,0.05)" />
      <line x1="208" y1="168" x2="208" y2="308" stroke="rgba(244,239,232,0.05)" />

      {/* Recessed Glazed Gallery Sanctuary (Right Cantilevered Wing) */}
      <rect x="249" y="182" width="245" height="126" fill="url(#warmInterior)" />

      {/* Interior Hinoki Slatted Ceiling Perspective Lines */}
      <line x1="249" y1="194" x2="494" y2="194" stroke="rgba(14,17,22,0.45)" strokeWidth="2" />
      <line x1="249" y1="202" x2="494" y2="202" stroke="rgba(14,17,22,0.35)" strokeWidth="1.5" />

      {/* Slender Bronze Mullions & Pivot Louvers */}
      {[285, 325, 365, 405, 445, 478].map((xPos) => (
        <line
          key={xPos}
          x1={xPos}
          y1="182"
          x2={xPos}
          y2="308"
          stroke="#B8925A"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
      ))}

      {/* Dynamic Cast Shadow From Cantilever Roof */}
      <polygon
        points={`249,182 556,182 ${556 + shadowSkew * 0.25},${214 + (1 - Math.abs(normalizedHour - 0.5)) * 28} 249,225`}
        fill="rgba(7, 9, 13, 0.55)"
      />

      {/* Primary Upper Cantilevered Basalt Fascia Slab */}
      <polygon
        points="48,144 584,144 568,182 48,182"
        fill="#1E222B"
        stroke="rgba(244,239,232,0.22)"
        strokeWidth="1"
      />
      {/* Bronze Drip-Edge Trim along Cantilever */}
      <line x1="48" y1="182" x2="568" y2="182" stroke="#B8925A" strokeWidth="2" />

      {/* Narrow Vertical Sanctuary Aperture in Concrete Core */}
      <rect x="148" y="196" width="14" height="112" fill="url(#warmInterior)" stroke="#B8925A" strokeWidth="0.8" />

      {/* Foreground Black Basalt Reflecting Impluvium */}
      <rect x="0" y="330" width="640" height="150" fill="url(#waterMirror)" />
      <line x1="0" y1="330" x2="640" y2="330" stroke="rgba(184,146,90,0.4)" strokeWidth="1" />

      {/* Warm Caustic Reflections on Water Surface */}
      <rect
        x={252 + shadowSkew * 0.08}
        y="334"
        width="238"
        height="88"
        fill="url(#warmInterior)"
        opacity={isNight ? '0.42' : '0.22'}
      />
      {[344, 358, 375, 396, 420].map((yLine, idx) => (
        <line
          key={yLine}
          x1={180 + idx * 14}
          y1={yLine}
          x2={520 - idx * 12}
          y2={yLine}
          stroke="#D2AE78"
          strokeOpacity={0.28 - idx * 0.04}
          strokeWidth="1"
        />
      ))}

      {/* Stepping Stones Across Reflecting Basin */}
      {[120, 172, 224, 276].map((stoneX) => (
        <rect
          key={stoneX}
          x={stoneX}
          y="362"
          width="36"
          height="10"
          fill="#262A34"
          stroke="rgba(244,239,232,0.2)"
          strokeWidth="0.8"
        />
      ))}

      {/* Top Overlay Technical HUD */}
      <g>
        <text x="24" y="32" fill="rgba(244,239,232,0.5)" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.8">
          AL-GHANI BUILDERS · AL REHMAN GARDEN PHASE 7 LAHORE
        </text>
        <text x="616" y="32" textAnchor="end" fill="#D2AE78" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.5">
          {isNight ? 'NOCTURNAL ILLUMINATION' : `SOLAR AZIMUTH ${Math.floor(solarHour)}:00 PKT`}
        </text>
      </g>
    </svg>
  );
};

export const ProjectMonographPlate: React.FC<{
  variant: ArchitecturalProject['plateVariant'];
  className?: string;
}> = ({ variant, className = '' }) => {
  switch (variant) {
    case 'kyoto':
      return (
        <svg viewBox="0 0 600 400" className={`w-full h-full bg-[#0E1116] ${className}`} role="img" aria-label="Kamo River Courtyard Sanctuary architectural plate">
          <defs>
            <linearGradient id="kyotoGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EAC083" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#5C4216" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="#0E1116" />
          {/* Background vertical timber screen */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1={60 + i * 20}
              y1="40"
              x2={60 + i * 20}
              y2="270"
              stroke="rgba(184,146,90,0.08)"
              strokeWidth="1"
            />
          ))}
          {/* Cantilevered Roof Planes */}
          <polygon points="40,115 560,115 540,148 40,148" fill="#1D2025" stroke="rgba(244,239,232,0.22)" />
          <line x1="40" y1="148" x2="540" y2="148" stroke="#B8925A" strokeWidth="1.5" />
          {/* Basalt Wall & Illuminated Tea Room */}
          <rect x="65" y="148" width="180" height="122" fill="#14171D" stroke="rgba(244,239,232,0.14)" />
          <rect x="245" y="148" width="245" height="122" fill="url(#kyotoGlow)" />
          {[285, 325, 365, 405, 445].map((x) => (
            <line key={x} x1={x} y1="148" x2={x} y2="270" stroke="#0E1116" strokeWidth="2" />
          ))}
          {/* Water Courtyard Mirror */}
          <rect x="0" y="270" width="600" height="130" fill="#0A0C10" />
          <line x1="0" y1="270" x2="600" y2="270" stroke="rgba(184,146,90,0.45)" />
          <rect x="245" y="274" width="245" height="65" fill="url(#kyotoGlow)" opacity="0.28" />
          <line x1="190" y1="310" x2="510" y2="310" stroke="#D2AE78" strokeOpacity="0.3" />
        </svg>
      );

    case 'valais':
      return (
        <svg viewBox="0 0 600 400" className={`w-full h-full bg-[#111319] ${className}`} role="img" aria-label="Fondation Valais Monolith architectural plate">
          <defs>
            <linearGradient id="valaisShaft" x1="0" y1="0" x2="0.2" y2="1">
              <stop offset="0%" stopColor="#FFDEAE" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#111319" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="#0D1015" />
          {/* Steep Alpine Escarpment Strata */}
          <polygon points="0,340 0,110 240,55 440,125 600,70 600,340" fill="#171A21" stroke="rgba(244,239,232,0.12)" />
          {/* Five Vertical Light Chimneys */}
          {[130, 215, 300, 385, 470].map((x, idx) => (
            <g key={x}>
              <rect
                x={x}
                y={75 - (idx % 2) * 18}
                width="38"
                height="245"
                fill="#22262F"
                stroke="rgba(244,239,232,0.22)"
              />
              <rect x={x + 8} y={75 - (idx % 2) * 18} width="22" height="245" fill="url(#valaisShaft)" />
              <line x1={x} y1={75 - (idx % 2) * 18} x2={x + 38} y2={75 - (idx % 2) * 18} stroke="#B8925A" strokeWidth="2" />
            </g>
          ))}
          {/* Subterranean Entrance Portal */}
          <rect x="255" y="245" width="90" height="75" fill="#090B0E" stroke="#B8925A" strokeWidth="1.5" />
          <rect x="275" y="265" width="50" height="55" fill="#EAC083" fillOpacity="0.35" />
          <line x1="0" y1="320" x2="600" y2="320" stroke="rgba(184,146,90,0.4)" />
        </svg>
      );

    case 'obsidian':
      return (
        <svg viewBox="0 0 600 400" className={`w-full h-full bg-[#0E1116] ${className}`} role="img" aria-label="Villa Obsidian Cliffside architectural plate">
          <rect width="600" height="400" fill="#0B0E13" />
          {/* Mediterranean Horizon Line */}
          <line x1="0" y1="245" x2="600" y2="245" stroke="rgba(184,146,90,0.35)" strokeWidth="1" />
          <rect x="0" y="245" width="600" height="155" fill="#0F131A" />
          {/* Cliff Face on Left */}
          <polygon points="0,60 210,120 265,400 0,400" fill="#181B22" stroke="rgba(244,239,232,0.14)" />
          {/* Three Stepped Cantilevered Travertine & Bronze Plinths */}
          <rect x="110" y="105" width="330" height="32" fill="#2A2723" stroke="#D2AE78" strokeWidth="1" />
          <rect x="145" y="137" width="260" height="38" fill="#EAC083" fillOpacity="0.4" />
          <rect x="130" y="175" width="395" height="28" fill="#322E29" stroke="#F4EFE8" strokeWidth="1" />
          <rect x="175" y="203" width="290" height="42" fill="#EAC083" fillOpacity="0.28" />
          {/* Deep Structural Pier */}
          <rect x="210" y="203" width="28" height="197" fill="#1F232B" stroke="rgba(184,146,90,0.35)" />
        </svg>
      );

    case 'kronos':
      return (
        <svg viewBox="0 0 600 400" className={`w-full h-full bg-[#0E1116] ${className}`} role="img" aria-label="Atelier Kronos Horological Campus architectural plate">
          <rect width="600" height="400" fill="#0D1016" />
          {/* Precision Radial Horological Grid */}
          <circle cx="300" cy="210" r="150" fill="none" stroke="rgba(184,146,90,0.15)" strokeDasharray="3 3" />
          <circle cx="300" cy="210" r="105" fill="none" stroke="rgba(244,239,232,0.08)" />
          {/* North-Lit Sawtooth Skylight Roof Profile */}
          <polygon
            points="70,175 160,120 160,175 250,120 250,175 340,120 340,175 430,120 430,175 520,120 520,175"
            fill="#1D212A"
            stroke="#D2AE78"
            strokeWidth="1.2"
          />
          {/* Glazed Horology Atelier */}
          <rect x="70" y="175" width="450" height="125" fill="#151921" stroke="rgba(244,239,232,0.22)" />
          {/* Bronze Diagrid Structural Frame */}
          {[70, 145, 220, 295, 370, 445].map((x) => (
            <g key={x}>
              <line x1={x} y1="175" x2={x + 75} y2="300" stroke="#B8925A" strokeWidth="1.2" strokeOpacity="0.65" />
              <line x1={x + 75} y1="175" x2={x} y2="300" stroke="#B8925A" strokeWidth="1.2" strokeOpacity="0.65" />
            </g>
          ))}
          <rect x="195" y="205" width="210" height="95" fill="#EAC083" fillOpacity="0.24" stroke="#D2AE78" />
          <line x1="40" y1="300" x2="560" y2="300" stroke="#B8925A" strokeWidth="1.5" />
        </svg>
      );

    case 'svalbard':
      return (
        <svg viewBox="0 0 600 400" className={`w-full h-full bg-[#0E1116] ${className}`} role="img" aria-label="Svalbard Acoustic Listening Pavilion architectural plate">
          <rect width="600" height="400" fill="#0B0E14" />
          {/* Polar Horizon & Glacial Fjord */}
          <polygon points="0,285 160,240 370,268 600,225 600,285" fill="#171C26" />
          {/* Elevated Naval Brass Monolith */}
          <polygon
            points="145,135 465,110 465,245 145,245"
            fill="#2A2218"
            stroke="#D2AE78"
            strokeWidth="1.5"
          />
          {/* Parabolic Acoustic Horn Aperture */}
          <circle cx="355" cy="182" r="38" fill="#12151B" stroke="#EAC083" strokeWidth="1.5" />
          <circle cx="355" cy="182" r="22" fill="#090B0E" stroke="#B8925A" strokeWidth="1" />
          <circle cx="355" cy="182" r="8" fill="#EAC083" fillOpacity="0.8" />
          {/* Warm Horizon Slit Window */}
          <rect x="175" y="185" width="115" height="16" fill="#FFDEAE" fillOpacity="0.75" />
          {/* Thermally Broken Permafrost Pilings */}
          {[175, 235, 295, 355, 435].map((x) => (
            <line key={x} x1={x} y1="245" x2={x} y2="295" stroke="#9B8F81" strokeWidth="3" />
          ))}
          <line x1="0" y1="295" x2="600" y2="295" stroke="rgba(244,239,232,0.22)" />
        </svg>
      );

    case 'atacama':
      return (
        <svg viewBox="0 0 600 400" className={`w-full h-full bg-[#0E1116] ${className}`} role="img" aria-label="Atacama Basalt Astronomical Sanctuary architectural plate">
          <rect width="600" height="400" fill="#0A0C10" />
          {/* Starfield & Celestial Arcs */}
          <path d="M 120 40 A 240 240 0 0 1 480 40" fill="none" stroke="rgba(234,192,131,0.18)" strokeDasharray="2 6" />
          <path d="M 80 85 A 290 290 0 0 1 520 85" fill="none" stroke="rgba(244,239,232,0.12)" strokeDasharray="4 4" />
          <circle cx="300" cy="95" r="3" fill="#EAC083" />
          {/* Earth-Sheltered Circular Basalt Ring */}
          <polygon points="45,275 135,195 465,195 555,275" fill="#231D19" stroke="#B8925A" strokeWidth="1.2" />
          {/* Central 16m Sky Oculus Opening */}
          <ellipse cx="300" cy="195" rx="115" ry="22" fill="#090B10" stroke="#EAC083" strokeWidth="1.5" />
          {/* Inner Warm Amber Sanctuary Slot */}
          <rect x="165" y="238" width="270" height="8" fill="#EAC083" fillOpacity="0.7" />
          <line x1="0" y1="275" x2="600" y2="275" stroke="rgba(184,146,90,0.45)" />
        </svg>
      );
  }
};

interface InteractiveBlueprintCanvasProps {
  project: ArchitecturalProject;
  selectedZoneId: string;
  onSelectZone: (zone: SpatialZone) => void;
  showGrid: boolean;
  showDaylightVectors: boolean;
  showAcousticZones: boolean;
}

export const InteractiveBlueprintCanvas: React.FC<InteractiveBlueprintCanvasProps> = ({
  project,
  selectedZoneId,
  onSelectZone,
  showGrid,
  showDaylightVectors,
  showAcousticZones,
}) => {
  return (
    <div className="relative w-full aspect-[16/10] bg-[#0B0E13] border border-[rgba(244,239,232,0.12)] rounded-none overflow-hidden select-none">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full"
        role="img"
        aria-label={`Interactive architectural floorplan for ${project.title}`}
      >
        <defs>
          <pattern id="bpMinorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(244, 239, 232, 0.03)" strokeWidth="0.7" />
          </pattern>
          <pattern id="bpMajorGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#bpMinorGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(184, 146, 90, 0.11)" strokeWidth="1" />
          </pattern>
          <pattern id="acousticWave" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(234, 192, 131, 0.16)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Structural Grid Layer */}
        {showGrid && <rect width="800" height="500" fill="url(#bpMajorGrid)" />}

        {/* Column Axis Callouts (A - G, 01 - 05) */}
        {showGrid && (
          <g fill="rgba(244,239,232,0.35)" fontSize="9" fontFamily="JetBrains Mono">
            {[100, 200, 300, 400, 500, 600, 700].map((x, idx) => (
              <g key={x}>
                <circle cx={x} cy="26" r="8" fill="#12151B" stroke="rgba(184,146,90,0.35)" />
                <text x={x} y="29" textAnchor="middle">
                  {String.fromCharCode(65 + idx)}
                </text>
              </g>
            ))}
            {[100, 200, 300, 400].map((y, idx) => (
              <g key={y}>
                <circle cx="26" cy={y} r="8" fill="#12151B" stroke="rgba(184,146,90,0.35)" />
                <text x="26" y={y + 3} textAnchor="middle">
                  0{idx + 1}
                </text>
              </g>
            ))}
          </g>
        )}

        {/* Outer Site Envelope Perimeter */}
        <rect
          x="56"
          y="46"
          width="688"
          height="392"
          fill="rgba(18, 21, 27, 0.65)"
          stroke="rgba(244, 239, 232, 0.28)"
          strokeWidth="2"
        />

        {/* Section Cut Axis Line A-A */}
        <line
          x1="44"
          y1="242"
          x2="756"
          y2="242"
          stroke="rgba(184, 146, 90, 0.45)"
          strokeWidth="1"
          strokeDasharray="8 4 2 4"
        />
        <text x="738" y="234" textAnchor="end" fill="#B8925A" fontSize="9" fontFamily="JetBrains Mono">
          SECTION A-A
        </text>

        {/* Daylight & Solar Vectors Layer */}
        {showDaylightVectors && (
          <g>
            {[160, 280, 400, 520, 640].map((vx) => (
              <g key={vx} opacity="0.7">
                <line
                  x1={vx}
                  y1="438"
                  x2={vx - 38}
                  y2="75"
                  stroke="#EAC083"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <polygon points={`${vx - 38},75 ${vx - 41},85 ${vx - 33},84`} fill="#EAC083" />
              </g>
            ))}
            <text x="68" y="428" fill="#EAC083" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1.2">
              SOLAR EQUINOX VECTORS · AZIMUTH 180° SOUTH
            </text>
          </g>
        )}

        {/* Interactive Spatial Zones */}
        {project.zones.map((zone) => {
          const zx = (zone.x / 100) * 800;
          const zy = (zone.y / 100) * 500;
          const zw = (zone.w / 100) * 800;
          const zh = (zone.h / 100) * 500;
          const isSelected = zone.id === selectedZoneId;

          return (
            <g
              key={zone.id}
              onClick={() => onSelectZone(zone)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${zone.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectZone(zone);
                }
              }}
            >
              {/* Zone Structural Walls */}
              <rect
                x={zx}
                y={zy}
                width={zw}
                height={zh}
                fill={
                  isSelected
                    ? 'rgba(184, 146, 90, 0.16)'
                    : showAcousticZones
                    ? 'url(#acousticWave)'
                    : 'rgba(23, 27, 35, 0.85)'
                }
                stroke={isSelected ? '#D2AE78' : 'rgba(244, 239, 232, 0.35)'}
                strokeWidth={isSelected ? '2' : '1.2'}
              />

              {/* Corner Structural Columns */}
              <rect x={zx - 3} y={zy - 3} width="6" height="6" fill="#F4EFE8" />
              <rect x={zx + zw - 3} y={zy - 3} width="6" height="6" fill="#F4EFE8" />
              <rect x={zx - 3} y={zy + zh - 3} width="6" height="6" fill="#F4EFE8" />
              <rect x={zx + zw - 3} y={zy + zh - 3} width="6" height="6" fill="#F4EFE8" />

              {/* Zone Code & Area Callout */}
              <text
                x={zx + 14}
                y={zy + 24}
                fill={isSelected ? '#EAC083' : 'rgba(244,239,232,0.55)'}
                fontSize="10"
                fontFamily="JetBrains Mono"
                letterSpacing="1.2"
              >
                {zone.code} · {zone.level}
              </text>
              <text
                x={zx + 14}
                y={zy + 44}
                fill="#F4EFE8"
                fontSize="13"
                fontFamily="Playfair Display"
              >
                {zone.name}
              </text>
              <text
                x={zx + 14}
                y={zy + zh - 14}
                fill={isSelected ? '#D2AE78' : 'rgba(244,239,232,0.45)'}
                fontSize="10"
                fontFamily="JetBrains Mono"
              >
                {zone.areaSqm} M² · H: {zone.ceilingHeightM}M {showAcousticZones ? `· RT60: ${zone.acousticRt60}` : ''}
              </text>
            </g>
          );
        })}

        {/* Blueprint Title Block Footer */}
        <rect x="56" y="450" width="688" height="34" fill="#12151B" stroke="rgba(244,239,232,0.16)" />
        <text x="70" y="471" fill="#F4EFE8" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1.4">
          DWG NO: {project.accessionCode} · {project.title.toUpperCase()}
        </text>
        <text x="730" y="471" textAnchor="end" fill="#B8925A" fontSize="10" fontFamily="JetBrains Mono">
          COORDINATES: {project.coordinates}
        </text>
      </svg>
    </div>
  );
};
