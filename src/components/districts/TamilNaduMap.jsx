import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TamilNaduMap({ districts, selectedDistrict, onSelectDistrict }) {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const { language } = useApp();

  return (
    <div className="relative w-full bg-slate-900 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl border border-slate-800 flex flex-col items-center">
      {/* Map Header */}
      <div className="w-full flex items-center justify-between mb-4 z-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Interactive Visualizer
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-1">
            Stylized Map of Tamil Nadu
          </h4>
        </div>
        <div className="text-right text-xs text-slate-400">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
          <span>Click any district pin</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full max-w-[480px] aspect-4/5 flex items-center justify-center my-2">
        <svg
          viewBox="0 0 500 600"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.6))" }}
        >
          {/* Stylized State Polygon Outline representing Tamil Nadu's geographical contour */}
          <defs>
            <linearGradient id="tnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#047857" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Realistic geographic outline contour of Tamil Nadu */}
          <path
            d="M 280,45 
               C 320,50 360,65 375,90 
               C 385,120 370,160 360,190 
               C 350,220 370,250 355,280 
               C 340,310 330,340 310,365 
               C 290,390 280,420 250,450 
               C 230,480 200,510 180,545 
               C 165,540 155,515 150,490 
               C 145,460 140,430 145,395 
               C 150,360 120,330 115,290 
               C 110,250 95,220 110,190 
               C 125,165 160,150 185,130 
               C 210,110 245,60 280,45 Z"
            fill="url(#tnGradient)"
            stroke="#10b981"
            strokeWidth="3"
            strokeDasharray="4 2"
            className="transition-all duration-300"
          />

          {/* Coastal Water Ribbons (Bay of Bengal / Indian Ocean) */}
          <path
            d="M 375,90 Q 380,200 365,280 T 260,460 T 180,545"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeDasharray="6 4"
          />

          {/* Cauvery River Vector Stream */}
          <path
            d="M 120,200 Q 180,220 225,240 T 290,280 T 360,290"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="2.5"
            strokeOpacity="0.7"
          />

          {/* District Pins & Hotspots */}
          {districts.map((d) => {
            const isSelected = selectedDistrict?.id === d.id;
            const isHovered = hoveredDistrict?.id === d.id;
            const cx = d.svgPos?.cx || 250;
            const cy = d.svgPos?.cy || 300;

            return (
              <g
                key={d.id}
                onClick={() => onSelectDistrict(d)}
                onMouseEnter={() => setHoveredDistrict(d)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className="cursor-pointer transition-all duration-200"
              >
                {/* Active halo */}
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="18"
                    fill="#34d399"
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Outer ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 11 : isHovered ? 9 : 7}
                  fill={isSelected ? "#10b981" : isHovered ? "#38bdf8" : "#ffffff"}
                  stroke={isSelected ? "#064e3b" : "#0f172a"}
                  strokeWidth="2.5"
                  className="transition-all duration-150 shadow-lg"
                />

                {/* Center dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 4.5 : 2.5}
                  fill={isSelected ? "#ffffff" : "#064e3b"}
                />

                {/* District Name Label */}
                <text
                  x={cx}
                  y={cy - 12}
                  textAnchor="middle"
                  fill={isSelected ? "#34d399" : isHovered ? "#ffffff" : "#e2e8f0"}
                  fontSize={isSelected ? "11" : "9.5"}
                  fontWeight={isSelected ? "700" : "500"}
                  className="pointer-events-none select-none drop-shadow-md"
                >
                  {language === 'ta' && d.nameTa ? d.nameTa : d.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Tooltip Card */}
        {hoveredDistrict && (
          <div className="absolute top-2 right-2 bg-slate-950/95 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs max-w-[200px] pointer-events-none z-20 backdrop-blur-md animate-fadeIn">
            <div className="font-bold text-emerald-400">{hoveredDistrict.name}</div>
            <div className="text-[11px] text-slate-300 mt-0.5">{hoveredDistrict.zone} Zone</div>
            <div className="text-[10px] text-slate-400 mt-1">Pop: {hoveredDistrict.population}</div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Selected District</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
            <span>Key Hubs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-cyan-400"></span>
            <span>Cauvery River</span>
          </div>
        </div>
        <div>
          Demo Map Visualizer
        </div>
      </div>
    </div>
  );
}
