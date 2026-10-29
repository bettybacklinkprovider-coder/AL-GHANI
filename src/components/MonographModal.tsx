import React, { useEffect } from 'react';
import { X, ArrowUpRight, Compass, Layers } from 'lucide-react';
import { ArchitecturalProject } from '../data/projects';
import { ProjectMonographPlate } from './ArchitecturalPlates';

interface MonographModalProps {
  project: ArchitecturalProject | null;
  onClose: () => void;
  onInspectInBlueprint: (project: ArchitecturalProject) => void;
  onCommissionTypology: (project: ArchitecturalProject) => void;
}

export const MonographModal: React.FC<MonographModalProps> = ({
  project,
  onClose,
  onInspectInBlueprint,
  onCommissionTypology,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="monograph-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#171B23] text-[#F4EFE8] border border-[rgba(244,239,232,0.14)] rounded-3xl shadow-[0_30px_60px_-20px_rgba(7,9,12,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Curatorial Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 bg-[#171B23]/95 backdrop-blur-md border-b border-[rgba(244,239,232,0.08)]">
          <div className="flex items-center gap-3 text-xs tracking-[0.16em] text-[#D2AE78] font-mono">
            <span>{project.accessionCode}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#F4EFE8] border border-[rgba(244,239,232,0.16)] rounded-lg hover:border-[#D2AE78] hover:text-[#D2AE78] transition-colors cursor-pointer"
            aria-label="Close monograph"
          >
            <span>Close Folio</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Monograph Content Body */}
        <div className="p-6 md:p-10 lg:p-12 space-y-10">
          {/* Header Block */}
          <div className="space-y-3 border-b border-[rgba(244,239,232,0.08)] pb-8">
            <p className="text-xs tracking-[0.18em] text-[rgba(244,239,232,0.6)]">
              {project.subtitle}
            </p>
            <h2
              id="monograph-modal-title"
              className="text-3xl md:text-5xl font-serif font-normal text-[#F4EFE8] tracking-tight text-balance"
            >
              {project.title}
            </h2>
            <p className="text-xs font-mono text-[#B8925A] pt-1">
              GEODETIC DATUM: {project.coordinates} · GROSS INTERNAL AREA: {project.areaSqm.toLocaleString()} M²
            </p>
          </div>

          {/* Primary Architectural Photograph & Figure Caption */}
          <figure className="space-y-3">
            <div className="relative w-full rounded-2xl overflow-hidden border border-[rgba(244,239,232,0.12)] bg-[#0B0E13] flex items-center justify-center">
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[65vh] object-contain block"
              />
            </div>
            <figcaption className="text-xs font-serif italic text-[rgba(244,239,232,0.55)]">
              {project.figureCaption}
            </figcaption>
          </figure>

          {/* Two-Column Asymmetric Essay & Blueprint Specification Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Drop-Cap Narrative & Pull Quote */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base md:text-lg text-[#F4EFE8] font-light leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:text-[#B8925A] first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:leading-none">
                {project.leadParagraph}
              </p>
              <p className="text-sm md:text-base text-[rgba(244,239,232,0.72)] font-light leading-relaxed">
                {project.curatorialEssay}
              </p>

              {/* Editorial Pull Quote (Top/Bottom Hairline Dividers, Zero Left Bar) */}
              <blockquote className="py-6 my-6 border-y border-[rgba(184,146,90,0.28)] space-y-3">
                <p className="text-xl md:text-2xl font-serif italic text-[#F4EFE8] leading-snug">
                  “{project.pullQuote}”
                </p>
                <footer className="text-xs text-[#D2AE78] tracking-wide">
                  — {project.pullQuoteAttribution}
                </footer>
              </blockquote>
            </div>

            {/* Right 5 Columns: Accession & Blueprint Data Matrix */}
            <div className="lg:col-span-5 bg-[#12151B] border border-[rgba(244,239,232,0.08)] rounded-none p-6">
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-[rgba(244,239,232,0.1)]">
                <span className="text-xs font-mono tracking-[0.16em] text-[#B8925A]">
                  ARCHITECTURAL SCHEDULE
                </span>
                <span className="text-xs font-mono text-[rgba(244,239,232,0.45)]">
                  REV 04.2
                </span>
              </div>
              <dl className="divide-y divide-[rgba(244,239,232,0.06)]">
                {project.parameters.map((param) => (
                  <div
                    key={param.label}
                    className="py-3.5 flex items-center justify-between gap-4 text-xs"
                  >
                    <dt className="font-mono tracking-[0.12em] text-[rgba(244,239,232,0.5)]">
                      {param.label}
                    </dt>
                    <dd
                      className={`font-mono text-right tabular-nums ${
                        param.highlight ? 'text-[#B8925A] font-medium' : 'text-[#F4EFE8]'
                      }`}
                    >
                      {param.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Spatial Volume Breakdown */}
          <div className="space-y-4 pt-4 border-t border-[rgba(244,239,232,0.08)]">
            <h3 className="text-lg font-serif text-[#F4EFE8]">
              Drafted Spatial Volumes & Acoustic Calibration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.zones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-5 bg-[#12151B] border border-[rgba(244,239,232,0.08)] rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#B8925A]">
                    <span>{zone.code}</span>
                    <span>{zone.level}</span>
                  </div>
                  <h4 className="text-base font-serif text-[#F4EFE8]">{zone.name}</h4>
                  <p className="text-xs text-[rgba(244,239,232,0.62)] leading-relaxed">
                    {zone.materialNote}
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[rgba(244,239,232,0.45)] tabular-nums">
                    <span>{zone.areaSqm} m²</span>
                    <span aria-hidden="true">·</span>
                    <span>H {zone.ceilingHeightM}m</span>
                    <span aria-hidden="true">·</span>
                    <span>RT60 {zone.acousticRt60}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[rgba(244,239,232,0.1)]">
            <button
              onClick={() => {
                onInspectInBlueprint(project);
                onClose();
              }}
              className="ghost-bronze-dark px-6 py-3.5 rounded-lg text-xs font-semibold tracking-[0.14em] flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Layers className="w-4 h-4 text-[#B8925A]" />
              <span>Inspect in Blueprint Studio</span>
            </button>

            <button
              onClick={() => {
                onCommissionTypology(project);
                onClose();
              }}
              className="bronze-button px-7 py-3.5 rounded-lg text-xs font-semibold tracking-[0.14em] flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>Initialize Brief With This Typology</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
