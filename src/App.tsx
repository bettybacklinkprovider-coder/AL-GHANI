import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowUpRight,
  Compass,
  Sun,
  Sliders,
  Check,
  Download,
  Search,
  Eye,
  Phone,
  MapPin,
  Clock,
  Share2,
  Bookmark,
  Navigation,
  ThumbsUp,
  MessageSquarePlus,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
} from 'lucide-react';
import {
  ARCHITECTURAL_PROJECTS,
  MATERIAL_SPECIMENS,
  CLIENT_REVIEWS,
  NEARBY_BUSINESSES,
  BUSINESS_PROFILE,
  GALLERY_PHOTOS,
  ArchitecturalProject,
  ProjectCategory,
  SpatialZone,
  MaterialSpecimen,
  ClientReview,
  GalleryPhoto,
} from './data/projects';
import {
  HeroPavilionViewport,
  InteractiveBlueprintCanvas,
} from './components/ArchitecturalPlates';
import { MonographModal } from './components/MonographModal';

export default function App() {
  // Hero Interactive Viewport State
  const [heroTab, setHeroTab] = useState<'photos' | 'perspective' | 'section'>('photos');
  const [heroPhotoIndex, setHeroPhotoIndex] = useState<number>(0);
  const [solarHour, setSolarHour] = useState<number>(16.5);
  const [isSavedBusiness, setIsSavedBusiness] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Portfolio Filtering & Sorting State
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [sortBy, setSortBy] = useState<'chronological' | 'scale'>('chronological');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalProject, setModalProject] = useState<ArchitecturalProject | null>(null);

  // Photos & Videos Gallery State (All 10 uploaded images)
  const [photoCategory, setPhotoCategory] = useState<'All' | 'Inside' | 'Exterior' | 'Official'>('All');
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);

  // Interactive Blueprint Studio State
  const [blueprintProject, setBlueprintProject] = useState<ArchitecturalProject>(ARCHITECTURAL_PROJECTS[0]);
  const [selectedZone, setSelectedZone] = useState<SpatialZone>(ARCHITECTURAL_PROJECTS[0].zones[0]);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showDaylightVectors, setShowDaylightVectors] = useState<boolean>(true);
  const [showAcousticZones, setShowAcousticZones] = useState<boolean>(false);

  // Reviews State
  const [reviews, setReviews] = useState<ClientReview[]>(CLIENT_REVIEWS);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'construction' | 'cooperative'>('all');
  const [reviewSort, setReviewSort] = useState<'relevant' | 'newest'>('relevant');
  const [likedReviewIds, setLikedReviewIds] = useState<string[]>([]);
  const [showWriteReview, setShowWriteReview] = useState<boolean>(false);
  const [newReviewerName, setNewReviewerName] = useState<string>('');
  const [newReviewTitle, setNewReviewTitle] = useState<string>('');
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [newReviewTag, setNewReviewTag] = useState<'construction' | 'cooperative'>('cooperative');

  // Materiality Library State
  const [activeMaterial, setActiveMaterial] = useState<MaterialSpecimen>(MATERIAL_SPECIMENS[0]);

  // Commission Brief & Construction Cost Configurator State
  const [briefTypology, setBriefTypology] = useState<Exclude<ProjectCategory, 'All'>>('Plots');
  const [briefTopography, setBriefTopography] = useState<
    'Al Rehman Garden Phase 7' | 'Main Boulevard Commercial' | 'Park-Facing Corner Plot' | 'Thikriwala Estate Corridor'
  >('Al Rehman Garden Phase 7');
  const [briefAreaSqm, setBriefAreaSqm] = useState<number>(290);
  const [briefMaterialIds, setBriefMaterialIds] = useState<string[]>([
    'grade60-rcc-brick',
    'ash-teak-woodwork',
    'architectural-bronze-glass',
  ]);
  const [briefNetZero, setBriefNetZero] = useState<boolean>(true);
  const [patronName, setPatronName] = useState<string>('');
  const [patronPhone, setPatronPhone] = useState<string>('');
  const [patronLocation, setPatronLocation] = useState<string>('Al Rehman Garden Phase 7, Lahore');
  const [patronNotes, setPatronNotes] = useState<string>('');
  const [submittedDossierCode, setSubmittedDossierCode] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Filtered Gallery Photos
  const filteredGalleryPhotos = useMemo(() => {
    if (photoCategory === 'All') return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === photoCategory);
  }, [photoCategory]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPhotoIndex === null) return;
      if (e.key === 'Escape') setLightboxPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxPhotoIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredGalleryPhotos.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxPhotoIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredGalleryPhotos.length) % filteredGalleryPhotos.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhotoIndex, filteredGalleryPhotos.length]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return ARCHITECTURAL_PROJECTS.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.location.toLowerCase().includes(q) ||
        project.plotSizeLabel.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'scale') {
        return b.areaSqm - a.areaSqm;
      }
      return a.accessionCode.localeCompare(b.accessionCode);
    });
  }, [activeCategory, sortBy, searchQuery]);

  // Filtered Reviews
  const filteredReviews = useMemo(() => {
    const list = reviews.filter((r) => {
      if (reviewFilter === 'all') return true;
      return r.tags.includes(reviewFilter);
    });
    if (reviewSort === 'newest') {
      return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  }, [reviews, reviewFilter, reviewSort]);

  const handleLikeReview = (id: string) => {
    if (likedReviewIds.includes(id)) {
      setLikedReviewIds((prev) => prev.filter((item) => item !== id));
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likesCount: Math.max(0, r.likesCount - 1) } : r))
      );
    } else {
      setLikedReviewIds((prev) => [...prev, id]);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likesCount: r.likesCount + 1 } : r))
      );
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newReviewText.trim()) return;
    const created: ClientReview = {
      id: `rev-${Date.now()}`,
      authorName: newReviewerName.trim(),
      authorMeta: '1 review · Verified Client',
      timeAgo: 'Just now',
      isNew: true,
      rating: 5,
      highlightTitle: newReviewTitle.trim() || '5-Star Experience',
      comment: newReviewText.trim(),
      tags: [newReviewTag, 'consultation'],
      likesCount: 1,
    };
    setReviews((prev) => [created, ...prev]);
    setNewReviewerName('');
    setNewReviewTitle('');
    setNewReviewText('');
    setShowWriteReview(false);
    triggerNotice('Thank you! Your 5.0 ★ review has been added to AL-Ghani Real Estate & Builders.');
  };

  // Switch Project in Blueprint Studio
  const handleSelectBlueprintProject = (project: ArchitecturalProject) => {
    setBlueprintProject(project);
    setSelectedZone(project.zones[0]);
    const el = document.getElementById('blueprint-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize Commission Brief from Project
  const handleInitializeBriefFromProject = (project: ArchitecturalProject) => {
    setBriefTypology(project.category);
    setBriefAreaSqm(project.areaSqm);
    setPatronLocation(`${project.location} (${project.plotSizeLabel})`);
    const el = document.getElementById('commission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle Material in Commission Brief
  const toggleBriefMaterial = (id: string) => {
    setBriefMaterialIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  // Calculated Feasibility & Construction Metrics
  const feasibilityMetrics = useMemo(() => {
    const coveredSqFt = Math.round(briefAreaSqm * 10.764);
    const baseMonths = briefTypology === 'Commercial' ? 10 : briefTypology === 'Plots' ? 1 : 6;
    const scaleMonths = briefTypology === 'Plots' ? 0 : Math.round(briefAreaSqm / 180) * 2;
    const totalMonths = Math.max(1, baseMonths + scaleMonths);

    const schematicMonths = briefTypology === 'Plots' ? 0.2 : Math.max(1, Math.round(totalMonths * 0.2));
    const greyStructureMonths = briefTypology === 'Plots' ? 0.4 : Math.max(2, Math.round(totalMonths * 0.45));
    const finishingMonths = Math.max(0.4, Number((totalMonths - schematicMonths - greyStructureMonths).toFixed(1)));

    const approxMarla =
      briefAreaSqm <= 130
        ? '3 Marla'
        : briefAreaSqm <= 210
        ? '5 Marla'
        : briefAreaSqm <= 350
        ? '10 Marla'
        : '1 Kanal+';

    return {
      coveredSqFt,
      approxMarla,
      totalMonths,
      schematicMonths,
      greyStructureMonths,
      finishingMonths,
      leadAtelier: 'AL REHMAN GARDEN PHASE 7 HEAD OFFICE',
    };
  }, [briefTypology, briefAreaSqm]);

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `ALG-2026-${Math.floor(100 + Math.random() * 899)}`;
    setSubmittedDossierCode(randomCode);
  };

  const handleDownloadBriefSpec = () => {
    const selectedMats = MATERIAL_SPECIMENS.filter((m) => briefMaterialIds.includes(m.id))
      .map((m) => `${m.code} (${m.name})`)
      .join(', ');

    const content = [
      'AL-GHANI REAL ESTATE & BUILDERS — PROJECT & CONSULTATION BRIEF',
      '================================================================',
      `PRINCIPAL / CEO: ${BUSINESS_PROFILE.principalName} (${BUSINESS_PROFILE.partnerStatus})`,
      `OFFICE LOCATION: ${BUSINESS_PROFILE.locatedIn} (${BUSINESS_PROFILE.plusCode})`,
      `DIRECT CONTACT: ${BUSINESS_PROFILE.phoneDisplay} (${BUSINESS_PROFILE.hoursStatus})`,
      `DOSSIER REFERENCE: ${submittedDossierCode || 'ALG-PRELIMINARY-2026'}`,
      `CLIENT NAME: ${patronName || 'Valued Client'}`,
      `CONTACT PHONE: ${patronPhone || 'Not specified'}`,
      `SECTOR / LOCATION: ${patronLocation}`,
      `SERVICE CATEGORY: ${briefTypology.toUpperCase()}`,
      `PLOT / SECTOR PREFERENCE: ${briefTopography.toUpperCase()}`,
      `ESTIMATED COVERED AREA: ${feasibilityMetrics.coveredSqFt.toLocaleString()} SQ.FT (~${feasibilityMetrics.approxMarla} / ${briefAreaSqm} SQM)`,
      `SPECIFIED MATERIALS: ${selectedMats}`,
      `SOLAR & THERMAL INSULATION: ${briefNetZero ? 'INCLUDED (10kW HYBRID SOLAR READY)' : 'STANDARD'}`,
      `ESTIMATED COMPLETION TIMELINE: ${feasibilityMetrics.totalMonths} MONTHS`,
      '',
      'CLIENT REQUIREMENTS & NOTES:',
      patronNotes || 'Requesting on-ground plot / turnkey construction consultation at Al Rehman Garden Phase 7 office.',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AL-Ghani-Brief-${submittedDossierCode || 'Estimate'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeHeroPhoto: GalleryPhoto = GALLERY_PHOTOS[heroPhotoIndex] || GALLERY_PHOTOS[0];

  return (
    <div id="top" className="min-h-screen bg-[#0E1116] text-[#F4EFE8]">
      {/* TOP BAR CONTRACT: Strictly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#0E1116]/90 backdrop-blur-md border-b border-[rgba(244,239,232,0.08)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-xl font-serif tracking-[0.2em] text-[#F4EFE8] whitespace-nowrap shrink-0 focus-visible:outline-1 focus-visible:outline-[#B8925A]"
          >
            AL-GHANI
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.18em] uppercase text-[rgba(244,239,232,0.68)]">
            <a
              href="#photos-gallery"
              className="hover:text-[#F4EFE8] hover:underline underline-offset-8 decoration-[#B8925A] transition-colors whitespace-nowrap shrink-0"
            >
              Photos
            </a>
            <a
              href="#works"
              className="hover:text-[#F4EFE8] hover:underline underline-offset-8 decoration-[#B8925A] transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#reviews"
              className="hover:text-[#F4EFE8] hover:underline underline-offset-8 decoration-[#B8925A] transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
            <a
              href="#location-hub"
              className="hover:text-[#F4EFE8] hover:underline underline-offset-8 decoration-[#B8925A] transition-colors whitespace-nowrap shrink-0"
            >
              Directions
            </a>
            <a
              href="#commission"
              className="hover:text-[#F4EFE8] hover:underline underline-offset-8 decoration-[#B8925A] transition-colors whitespace-nowrap shrink-0"
            >
              Estimator
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href={`tel:${BUSINESS_PROFILE.phoneTel}`}
              className="bronze-button px-5 py-2.5 rounded-lg text-[11px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap shrink-0"
            >
              Call {BUSINESS_PROFILE.phoneLocal}
            </a>
          </div>
        </div>
      </header>

      {/* Subtle Action Notification Toast */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md px-5 py-3.5 bg-[#171B23] border border-[#B8925A] text-[#F4EFE8] text-xs font-mono rounded-xl shadow-2xl">
          {actionNotice}
        </div>
      )}

      <main>
        {/* =====================================================================
            SECTION 1: DARK BASALT VOID (#0E1116) — HERO SPLIT & REAL OFFICE PHOTOS
           ===================================================================== */}
        <section className="relative bg-[#0E1116] border-b border-[rgba(244,239,232,0.08)]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-12 pb-16 lg:pt-20 lg:pb-24">
            {/* 12-Column Split Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left 6 Columns: AL-Ghani Real Estate & Builders Identity & Quick Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8 py-2">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B8925A]">
                    <span>AUTHORISED SALES PARTNER · AL-REHMAN DEVELOPERS</span>
                    <span aria-hidden="true">·</span>
                    <span>5.0 ★ (12)</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-serif font-normal text-[#F4EFE8] leading-[1.12] tracking-[-0.02em] text-balance">
                    AL-Ghani Real Estate &amp; Builders.
                  </h1>

                  <p className="text-base lg:text-lg font-light text-[rgba(244,239,232,0.72)] leading-[1.7] max-w-xl">
                    Official Authorised Sales Partner in{' '}
                    <span className="text-[#F4EFE8] font-normal">
                      Al Rehman Garden Phase 7, Lahore
                    </span>
                    . Offering possession-ready on-ground plots, transparent file consultations, and A+ turnkey residential &amp; commercial construction under the leadership of{' '}
                    <span className="text-[#D2AE78] font-normal">
                      {BUSINESS_PROFILE.principalName}
                    </span>
                    .
                  </p>

                  {/* Business Location & Operational Details List */}
                  <div className="pt-2 space-y-2.5 text-xs font-mono text-[rgba(244,239,232,0.78)]">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#B8925A] shrink-0" />
                      <span>
                        Located in: <strong className="text-[#F4EFE8]">{BUSINESS_PROFILE.locatedIn}</strong> ·{' '}
                        {BUSINESS_PROFILE.plusCode}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#B8925A] shrink-0" />
                      <span>
                        Hours: <strong className="text-[#D2AE78]">{BUSINESS_PROFILE.hoursStatus}</strong> · Principal:{' '}
                        <strong className="text-[#F4EFE8]">{BUSINESS_PROFILE.principalName}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#B8925A] shrink-0" />
                      <span>
                        Direct Line &amp; WhatsApp:{' '}
                        <a
                          href={`tel:${BUSINESS_PROFILE.phoneTel}`}
                          className="text-[#F4EFE8] underline underline-offset-4 decoration-[#B8925A] hover:text-[#D2AE78]"
                        >
                          {BUSINESS_PROFILE.phoneDisplay} ({BUSINESS_PROFILE.phoneLocal})
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary CTAs & Maps Quick Action Bar */}
                <div className="space-y-6 pt-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="#photos-gallery"
                      className="bronze-button px-7 py-3.5 rounded-lg text-[11px] font-semibold tracking-[0.18em] uppercase flex items-center gap-2.5 whitespace-nowrap shrink-0"
                    >
                      <Camera className="w-4 h-4" />
                      <span>View All 10 Office &amp; Site Photos</span>
                    </a>
                    <a
                      href="#commission"
                      className="ghost-bronze-dark px-6 py-3.5 rounded-lg text-[11px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap shrink-0"
                    >
                      Plot &amp; Construction Inquiry
                    </a>
                  </div>

                  {/* Interactive Maps Utility Bar */}
                  <div className="pt-5 border-t border-[rgba(244,239,232,0.08)] flex flex-wrap items-center gap-2.5">
                    <a
                      href="#location-hub"
                      onClick={() =>
                        triggerNotice('Viewing Directions to Al Rehman Garden Phase 7 Lahore (H58P+G6, Thikriwala).')
                      }
                      className="px-3.5 py-2 bg-[#12151B] border border-[rgba(244,239,232,0.12)] hover:border-[#B8925A] rounded-lg text-xs font-mono text-[#F4EFE8] flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#B8925A]" />
                      <span>Directions</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSavedBusiness((v) => !v);
                        triggerNotice(
                          !isSavedBusiness
                            ? 'Saved AL-Ghani Real Estate & Builders to your bookmarked offices.'
                            : 'Removed from saved offices.'
                        );
                      }}
                      className={`px-3.5 py-2 border rounded-lg text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isSavedBusiness
                          ? 'bg-[rgba(184,146,90,0.18)] border-[#B8925A] text-[#D2AE78]'
                          : 'bg-[#12151B] border-[rgba(244,239,232,0.12)] hover:border-[#B8925A] text-[#F4EFE8]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 text-[#B8925A]" />
                      <span>{isSavedBusiness ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(
                          `${BUSINESS_PROFILE.name} (${BUSINESS_PROFILE.principalName}) - ${BUSINESS_PROFILE.locatedIn} (${BUSINESS_PROFILE.plusCode}) | Tel: ${BUSINESS_PROFILE.phoneDisplay}`
                        );
                        triggerNotice('Copied Plus Code H58P+G6 & Phone (+92 303 0823898) to clipboard.');
                      }}
                      className="px-3.5 py-2 bg-[#12151B] border border-[rgba(244,239,232,0.12)] hover:border-[#B8925A] rounded-lg text-xs font-mono text-[#F4EFE8] flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#B8925A]" />
                      <span>Share Info</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 6 Columns: Real Office & Phase 7 Photos + Interactive Elevation Switcher */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-[#12151B] border border-[rgba(244,239,232,0.1)] rounded-2xl p-4 sm:p-6 shadow-[0_30px_60px_-20px_rgba(7,9,12,0.7)]">
                {/* Top Viewport Mode Selector */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[rgba(244,239,232,0.08)]">
                  <div className="text-xs font-mono tracking-[0.12em] text-[#D2AE78] truncate">
                    {heroTab === 'photos'
                      ? activeHeroPhoto.tagLabel
                      : 'ARCHITECTURAL ELEVATION & SECTION STUDY'}
                  </div>
                  <div className="flex items-center gap-1 p-1 bg-[#0B0E13] border border-[rgba(244,239,232,0.08)] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setHeroTab('photos')}
                      className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        heroTab === 'photos'
                          ? 'bg-[#B8925A] text-[#0E1116] font-semibold'
                          : 'text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8]'
                      }`}
                    >
                      Office Photos (10)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroTab('perspective')}
                      className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        heroTab === 'perspective'
                          ? 'bg-[#B8925A] text-[#0E1116] font-semibold'
                          : 'text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8]'
                      }`}
                    >
                      3D Villa
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroTab('section')}
                      className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        heroTab === 'section'
                          ? 'bg-[#B8925A] text-[#0E1116] font-semibold'
                          : 'text-[rgba(244,239,232,0.6)] hover:text-[#F4EFE8]'
                      }`}
                    >
                      Section Cut
                    </button>
                  </div>
                </div>

                {/* Main Viewport Container */}
                {heroTab === 'photos' ? (
                  <div className="space-y-4">
                    <div
                      onClick={() => setLightboxPhotoIndex(heroPhotoIndex)}
                      className="group relative w-full rounded-xl overflow-hidden border border-[rgba(244,239,232,0.14)] bg-[#0B0E13] cursor-pointer"
                    >
                      <div className="w-full bg-[#0B0E13] flex items-center justify-center overflow-hidden">
                        <img
                          src={activeHeroPhoto.src}
                          alt={activeHeroPhoto.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-contain block monograph-zoom"
                        />
                      </div>

                      <div className="p-4 bg-[#0E1116] border-t border-[rgba(244,239,232,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-[#EAC083]">
                            {activeHeroPhoto.tagLabel} · PHOTO {heroPhotoIndex + 1} OF {GALLERY_PHOTOS.length}
                          </p>
                          <h2 className="text-sm sm:text-base font-serif text-[#F4EFE8] mt-0.5">
                            {activeHeroPhoto.title}
                          </h2>
                        </div>
                        <span className="px-3 py-1.5 bg-[#12151B] border border-[rgba(244,239,232,0.2)] rounded-lg text-[11px] font-mono text-[#D2AE78] whitespace-nowrap shrink-0 self-start sm:self-auto">
                          Expand Fullscreen ↗
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail Strip for Quick Switching Across All 10 Uploaded Photos (Uncropped Panoramic Ratio) */}
                    <div className="grid grid-cols-5 gap-2 pt-1">
                      {GALLERY_PHOTOS.map((photo, idx) => (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => setHeroPhotoIndex(idx)}
                          aria-label={`Preview ${photo.title}`}
                          className={`relative rounded-lg overflow-hidden border bg-[#0B0E13] transition-all cursor-pointer p-0.5 ${
                            idx === heroPhotoIndex
                              ? 'border-2 border-[#B8925A] ring-1 ring-[#B8925A]'
                              : 'border-[rgba(244,239,232,0.14)] opacity-65 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={photo.src}
                            alt={photo.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-auto object-contain block rounded"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(244,239,232,0.08)]">
                      <HeroPavilionViewport solarHour={solarHour} viewMode={heroTab} />
                    </div>
                    <div className="pt-4 mt-4 border-t border-[rgba(244,239,232,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-xs font-mono text-[#D2AE78]">
                        <Sun className="w-4 h-4 shrink-0" />
                        <span>LAHORE SUNLIGHT STUDY:</span>
                        <span className="text-[#F4EFE8] tabular-nums">
                          {String(Math.floor(solarHour)).padStart(2, '0')}:
                          {solarHour % 1 === 0.5 ? '30' : '00'} PKT
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-1 max-w-xs">
                        <span className="text-[11px] font-mono text-[rgba(244,239,232,0.45)]">
                          06:00
                        </span>
                        <input
                          type="range"
                          min="6"
                          max="21"
                          step="0.5"
                          value={solarHour}
                          onChange={(e) => setSolarHour(parseFloat(e.target.value))}
                          aria-label="Adjust solar hour between 06:00 and 21:00"
                          className="w-full accent-[#B8925A] cursor-pointer h-1.5 bg-[#0B0E13] rounded-lg"
                        />
                        <span className="text-[11px] font-mono text-[rgba(244,239,232,0.45)]">
                          21:00
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Full-Width 4-Column Business Highlights Row Below Hero Split */}
            <div className="mt-14 pt-10 border-t border-[rgba(244,239,232,0.08)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-1.5">
                <p className="text-3xl lg:text-4xl font-serif text-[#B8925A] tabular-nums">
                  5.0 ★ (12)
                </p>
                <p className="text-xs font-mono tracking-[0.14em] uppercase text-[#F4EFE8]">
                  VERIFIED GOOGLE RATING
                </p>
                <p className="text-xs text-[rgba(244,239,232,0.5)]">
                  Praised for cooperative guidance &amp; A+ construction quality.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-3xl lg:text-4xl font-serif text-[#F4EFE8]">
                  Ch. Arshad Arif
                </p>
                <p className="text-xs font-mono tracking-[0.14em] uppercase text-[#D2AE78]">
                  AUTHORISED SALES PARTNER
                </p>
                <p className="text-xs text-[rgba(244,239,232,0.5)]">
                  Official Partner of Al-Rehman Developers &amp; Town Planners.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-3xl lg:text-4xl font-serif text-[#F4EFE8] tabular-nums">
                  Closes 10 PM
                </p>
                <p className="text-xs font-mono tracking-[0.14em] uppercase text-[#D2AE78]">
                  AL REHMAN GARDEN PHASE 7
                </p>
                <p className="text-xs text-[rgba(244,239,232,0.5)]">
                  Plus Code H58P+G6, Thikriwala · Direct Line 0303-0823898.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-3xl lg:text-4xl font-serif text-[#B8925A] tabular-nums">
                  On-Ground
                </p>
                <p className="text-xs font-mono tracking-[0.14em] uppercase text-[#F4EFE8]">
                  POSSESSION READY PLOTS
                </p>
                <p className="text-xs text-[rgba(244,239,232,0.5)]">
                  Residential &amp; commercial plots plus turnkey house construction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: GALLERY CREAM / LIMESTONE ALABASTER (#F4EFE8)
            PHOTOS & VIDEOS GALLERY (ALL 10 UPLOADED REAL IMAGES - 100% UNCROPPED)
           ===================================================================== */}
        <section
          id="photos-gallery"
          className="bg-[#F4EFE8] text-[#0E1116] border-b border-[rgba(14,17,22,0.12)]"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28 space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[rgba(14,17,22,0.1)]">
              <div className="space-y-3 max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#785926]">
                  01. PHOTOS &amp; VIDEOS · AL-GHANI OFFICE &amp; PHASE 7 LAHORE
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#0E1116] tracking-[-0.015em] text-balance">
                  Office Interior, Maps &amp; Phase 7 Landmarks.
                </h2>
                <p className="text-base text-[rgba(14,17,22,0.7)] font-light leading-relaxed">
                  Full, uncropped photographs of our executive consultation office, on-table Al Rehman Garden Phase 7 master maps, Authorised Sales Partner signboard, and Phase 7 boulevard monuments.
                </p>
              </div>

              {/* Filter Tabs: All, Inside, Exterior, Official */}
              <div
                className="flex flex-wrap items-center gap-1 p-1 bg-[#E6DFD5] border border-[rgba(14,17,22,0.08)] rounded-lg self-start lg:self-auto"
                role="group"
                aria-label="Filter photos by category"
              >
                {(['All', 'Inside', 'Exterior', 'Official'] as const).map((tab) => {
                  const count =
                    tab === 'All'
                      ? GALLERY_PHOTOS.length
                      : GALLERY_PHOTOS.filter((p) => p.category === tab).length;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPhotoCategory(tab)}
                      className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        photoCategory === tab
                          ? 'bg-[#0E1116] text-[#F4EFE8]'
                          : 'text-[rgba(14,17,22,0.68)] hover:text-[#0E1116]'
                      }`}
                    >
                      {tab} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Uncropped Complete Photo Grid (2 Columns on Desktop so Wide Panoramic Photos Display Edge-to-Edge) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredGalleryPhotos.map((photo, idx) => (
                <figure
                  key={photo.id}
                  onClick={() => setLightboxPhotoIndex(idx)}
                  className="group bg-white border border-[rgba(14,17,22,0.12)] hover:border-[#B8925A] rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-colors shadow-[0_12px_32px_-16px_rgba(14,17,22,0.08)]"
                >
                  <div>
                    {/* Top Metadata Strip (No Overlay Covering the Photo) */}
                    <div className="px-5 py-3 bg-[#0E1116] text-[#F4EFE8] flex items-center justify-between text-[10px] font-mono tracking-[0.15em] uppercase">
                      <span className="text-[#D2AE78]">{photo.tagLabel}</span>
                      <span className="text-[rgba(244,239,232,0.7)] group-hover:text-[#F4EFE8] transition-colors">
                        View Fullscreen ↗
                      </span>
                    </div>

                    {/* Complete Uncropped Photo Frame */}
                    <div className="w-full bg-[#0B0E13] overflow-hidden flex items-center justify-center">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain block monograph-zoom"
                      />
                    </div>
                  </div>

                  <figcaption className="p-5 sm:p-6 space-y-1.5 bg-white border-t border-[rgba(14,17,22,0.08)]">
                    <h3 className="text-xl font-serif text-[#0E1116] group-hover:text-[#785926] transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[rgba(14,17,22,0.68)] font-light leading-relaxed">
                      {photo.subtitle}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: DARK BASALT VOID (#0E1116)
            FEATURED REAL ESTATE & CONSTRUCTION MONOGRAPHS
           ===================================================================== */}
        <section
          id="works"
          className="bg-[#0E1116] text-[#F4EFE8] border-b border-[rgba(244,239,232,0.08)]"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28 space-y-14">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[rgba(244,239,232,0.08)]">
              <div className="space-y-3 max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#B8925A]">
                  02. AL-GHANI PORTFOLIO · AL REHMAN GARDEN PHASE 7 LAHORE
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#F4EFE8] tracking-[-0.015em] text-balance">
                  Possession Plots &amp; Turnkey Projects.
                </h2>
                <p className="text-base text-[rgba(244,239,232,0.68)] font-light leading-relaxed">
                  Select any offering below to read full specifications, inspect room/sector dimensions, or start a direct inquiry with Ch. Arshad Arif.
                </p>
              </div>

              {/* Interactive Controls: Category Filter + Sort + Search */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                <div
                  className="flex flex-wrap items-center gap-1 p-1 bg-[#12151B] border border-[rgba(244,239,232,0.08)] rounded-lg"
                  role="group"
                  aria-label="Filter projects by typology"
                >
                  {(
                    ['All', 'Plots', 'Turnkey Construction', 'Commercial', 'Residential'] as const
                  ).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeCategory === cat
                          ? 'bg-[#B8925A] text-[#0E1116]'
                          : 'text-[rgba(244,239,232,0.68)] hover:text-[#F4EFE8]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setSortBy((prev) => (prev === 'chronological' ? 'scale' : 'chronological'))
                  }
                  className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.12em] bg-[#12151B] border border-[rgba(244,239,232,0.12)] rounded-lg text-[#F4EFE8] hover:border-[#B8925A] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#B8925A]" />
                  <span>Sort: {sortBy === 'chronological' ? 'Featured' : 'Scale'}</span>
                </button>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[rgba(244,239,232,0.45)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 5 Marla, 10 Marla..."
                    aria-label="Filter projects by plot size or title"
                    className="pl-9 pr-4 py-2 text-xs bg-[#12151B] border border-[rgba(244,239,232,0.14)] rounded-lg text-[#F4EFE8] placeholder:text-[rgba(244,239,232,0.4)] focus:outline-none focus:border-[#B8925A] w-full sm:w-48"
                  />
                </div>
              </div>
            </div>

            {/* Project Cards with Complete Uncropped Photography */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {filteredProjects.map((project, index) => {
                const isWide = index % 2 === 0;
                const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

                return (
                  <article
                    key={project.id}
                    onClick={() => setModalProject(project)}
                    className={`group ${colSpanClass} bg-[#12151B] border border-[rgba(244,239,232,0.08)] hover:border-[#B8925A] rounded-2xl overflow-hidden transition-colors flex flex-col justify-between cursor-pointer shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]`}
                  >
                    <div>
                      <div className="w-full overflow-hidden bg-[#0B0E13] border-b border-[rgba(244,239,232,0.08)]">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-contain block monograph-zoom"
                        />
                      </div>

                      <div className="p-6 sm:p-8 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-[0.15em] uppercase text-[#D2AE78]">
                          <span>{project.accessionCode}</span>
                          <span aria-hidden="true">/</span>
                          <span>{project.category}</span>
                          <span aria-hidden="true">/</span>
                          <span>{project.plotSizeLabel}</span>
                        </div>

                        <h3 className="text-2xl sm:text-[28px] font-serif font-normal text-[#F4EFE8] group-hover:text-[#D2AE78] transition-colors leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-sm text-[rgba(244,239,232,0.68)] font-light leading-relaxed line-clamp-2">
                          {project.leadParagraph}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 sm:px-8 py-4 bg-[#0E1116] border-t border-[rgba(244,239,232,0.08)] flex items-center justify-between gap-4">
                      <div className="text-xs font-mono text-[rgba(244,239,232,0.6)] tabular-nums">
                        <span>{project.location}</span>
                        <span className="mx-2" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-[#B8925A]">{project.priceEstimate}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectBlueprintProject(project);
                          }}
                          className="text-xs font-mono uppercase tracking-[0.12em] text-[rgba(244,239,232,0.65)] hover:text-[#F4EFE8] underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          Blueprint
                        </button>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-[0.14em] uppercase text-[#D2AE78] group-hover:translate-x-0.5 transition-transform whitespace-nowrap shrink-0">
                          <span>Open Dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: LIMESTONE ALABASTER (#F4EFE8)
            VERIFIED 5.0 GOOGLE REVIEWS & CLIENT ENDORSEMENTS
           ===================================================================== */}
        <section
          id="reviews"
          className="bg-[#F4EFE8] text-[#0E1116] border-b border-[rgba(14,17,22,0.12)]"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28 space-y-12">
            {/* Top Header & Review Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-10 border-b border-[rgba(14,17,22,0.1)]">
              <div className="lg:col-span-6 space-y-3">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#785926]">
                  03. VERIFIED GOOGLE MAPS REVIEW SUMMARY
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#0E1116] tracking-[-0.015em] text-balance">
                  5.0 ★ Client Reputation across 12 Reviews.
                </h2>
                <p className="text-base text-[rgba(14,17,22,0.7)] font-light leading-relaxed">
                  Homeowners and property investors in Al Rehman Garden Phase 7 consistently highlight our cooperative guidance, transparent documentation, and dependable construction quality.
                </p>
              </div>

              {/* 5-Star Rating Breakdown Panel */}
              <div className="lg:col-span-6 bg-white border border-[rgba(14,17,22,0.1)] rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center shadow-sm">
                <div className="sm:col-span-4 text-center sm:text-left sm:border-r border-[rgba(14,17,22,0.08)] sm:pr-6 space-y-1">
                  <p className="text-5xl font-serif text-[#0E1116] tabular-nums">5.0</p>
                  <p className="text-sm tracking-widest text-[#B8925A]" aria-label="5 out of 5 stars">
                    ★★★★★
                  </p>
                  <p className="text-xs font-mono text-[rgba(14,17,22,0.6)] tabular-nums">
                    {reviews.length + 6} verified reviews
                  </p>
                </div>

                <div className="sm:col-span-8 space-y-2 text-xs font-mono">
                  {[
                    { star: '5', pct: '100%' },
                    { star: '4', pct: '0%' },
                    { star: '3', pct: '0%' },
                    { star: '2', pct: '0%' },
                    { star: '1', pct: '0%' },
                  ].map((row) => (
                    <div key={row.star} className="flex items-center gap-3">
                      <span className="w-3 text-[rgba(14,17,22,0.65)] tabular-nums">
                        {row.star}
                      </span>
                      <div className="flex-1 h-2 bg-[#E6DFD5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#B8925A]" style={{ width: row.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Review Filter Topics (All, construction 5, cooperative 4) + Write a Review Button */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-[0.14em] border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    reviewFilter === 'all'
                      ? 'bg-[#0E1116] text-[#F4EFE8] border-[#0E1116] font-semibold'
                      : 'bg-white text-[rgba(14,17,22,0.75)] border-[rgba(14,17,22,0.12)] hover:border-[#B8925A]'
                  }`}
                >
                  All Reviews ({reviews.length + 6})
                </button>
                <button
                  onClick={() => setReviewFilter('construction')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-[0.14em] border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    reviewFilter === 'construction'
                      ? 'bg-[#0E1116] text-[#F4EFE8] border-[#0E1116] font-semibold'
                      : 'bg-white text-[rgba(14,17,22,0.75)] border-[rgba(14,17,22,0.12)] hover:border-[#B8925A]'
                  }`}
                >
                  construction · 5
                </button>
                <button
                  onClick={() => setReviewFilter('cooperative')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-[0.14em] border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    reviewFilter === 'cooperative'
                      ? 'bg-[#0E1116] text-[#F4EFE8] border-[#0E1116] font-semibold'
                      : 'bg-white text-[rgba(14,17,22,0.75)] border-[rgba(14,17,22,0.12)] hover:border-[#B8925A]'
                  }`}
                >
                  cooperative · 4
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setReviewSort((s) => (s === 'relevant' ? 'newest' : 'relevant'))
                  }
                  className="px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-[0.12em] bg-white border border-[rgba(14,17,22,0.14)] hover:border-[#B8925A] text-[#0E1116] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Sort: {reviewSort === 'relevant' ? 'Most Relevant' : 'Newest First'}
                </button>

                <button
                  onClick={() => setShowWriteReview((v) => !v)}
                  className="bronze-button px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-[0.14em] flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Write a Review</span>
                </button>
              </div>
            </div>

            {/* Expandable Write a Review Drawer */}
            {showWriteReview && (
              <form
                onSubmit={handleAddReview}
                className="p-6 sm:p-8 bg-white border border-[#B8925A] rounded-2xl space-y-5 shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-[rgba(14,17,22,0.1)] pb-3">
                  <h3 className="text-lg font-serif text-[#0E1116]">
                    Share Your Experience with AL-Ghani Real Estate &amp; Builders
                  </h3>
                  <span className="text-xs font-mono text-[#785926]">RATING: ★★★★★ (5.0)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="rev-name" className="block text-xs text-[rgba(14,17,22,0.7)] mb-1">
                      Your Name *
                    </label>
                    <input
                      id="rev-name"
                      type="text"
                      required
                      value={newReviewerName}
                      onChange={(e) => setNewReviewerName(e.target.value)}
                      placeholder="e.g., Muhammad Salman"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[rgba(14,17,22,0.16)] rounded-lg text-[#0E1116] focus:outline-none focus:border-[#B8925A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="rev-title" className="block text-xs text-[rgba(14,17,22,0.7)] mb-1">
                      Service Highlight
                    </label>
                    <input
                      id="rev-title"
                      type="text"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="e.g., Cooperative & Professional Service"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[rgba(14,17,22,0.16)] rounded-lg text-[#0E1116] focus:outline-none focus:border-[#B8925A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="rev-tag" className="block text-xs text-[rgba(14,17,22,0.7)] mb-1">
                      Primary Category
                    </label>
                    <select
                      id="rev-tag"
                      value={newReviewTag}
                      onChange={(e) =>
                        setNewReviewTag(e.target.value as 'construction' | 'cooperative')
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[rgba(14,17,22,0.16)] rounded-lg text-[#0E1116] focus:outline-none focus:border-[#B8925A]"
                    >
                      <option value="cooperative">Cooperative Real Estate Guidance</option>
                      <option value="construction">Turnkey &amp; Grey Construction</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="rev-body" className="block text-xs text-[rgba(14,17,22,0.7)] mb-1">
                    Your Review *
                  </label>
                  <textarea
                    id="rev-body"
                    rows={3}
                    required
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Describe your experience buying plots or constructing your house in Al Rehman Garden Phase 7..."
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[rgba(14,17,22,0.16)] rounded-lg text-[#0E1116] focus:outline-none focus:border-[#B8925A]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowWriteReview(false)}
                    className="ghost-bronze-light px-4 py-2 rounded-lg text-xs font-mono uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bronze-button px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((rev) => {
                const isLiked = likedReviewIds.includes(rev.id);
                return (
                  <article
                    key={rev.id}
                    className="p-7 bg-white border border-[rgba(14,17,22,0.1)] hover:border-[#B8925A] rounded-2xl flex flex-col justify-between space-y-6 transition-colors shadow-sm"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold text-[#0E1116]">
                            {rev.authorName}
                          </h3>
                          <p className="text-xs font-mono text-[rgba(14,17,22,0.55)]">
                            {rev.authorMeta}
                          </p>
                        </div>
                        <div className="text-right font-mono text-xs text-[#785926]">
                          <span>{rev.timeAgo}</span>
                          {rev.isNew && (
                            <span className="ml-1.5 font-semibold uppercase tracking-widest">
                              · NEW
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs tracking-widest text-[#B8925A]">
                          ★★★★★
                        </div>
                        {rev.highlightTitle && (
                          <p className="text-sm font-serif font-medium text-[#0E1116]">
                            {rev.highlightTitle}
                          </p>
                        )}
                      </div>

                      <p className="text-sm text-[rgba(14,17,22,0.78)] font-light leading-relaxed">
                        “{rev.comment}”
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[rgba(14,17,22,0.08)] flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-[rgba(14,17,22,0.5)] uppercase tracking-wider">
                        {rev.tags.join(' · ')}
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleLikeReview(rev.id)}
                          className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                            isLiked
                              ? 'text-[#785926] font-semibold'
                              : 'text-[rgba(14,17,22,0.6)] hover:text-[#0E1116]'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="tabular-nums">Like ({rev.likesCount})</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            triggerNotice(`Shared review by ${rev.authorName}.`)
                          }
                          className="text-[rgba(14,17,22,0.6)] hover:text-[#0E1116] cursor-pointer"
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: DARK BASALT VOID (#12151B)
            INTERACTIVE BLUEPRINT & FLOORPLAN STUDIO
           ===================================================================== */}
        <section
          id="blueprint-studio"
          className="bg-[#12151B] text-[#F4EFE8] border-b border-[rgba(244,239,232,0.08)]"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28 space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[rgba(244,239,232,0.08)]">
              <div className="space-y-3 max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#B8925A]">
                  04. ARCHITECTURAL MAPS &amp; FLOORPLAN STUDIO
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#F4EFE8] tracking-[-0.015em] text-balance">
                  Interactive Sector &amp; Villa Blueprints.
                </h2>
                <p className="text-base text-[rgba(244,239,232,0.65)] font-light leading-relaxed">
                  Inspect room dimensions, plot coordinates, and structural specifications for our Al Rehman Garden Phase 7 plots, villas, and commercial buildings.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowGrid((v) => !v)}
                  className={`px-3.5 py-2 text-[11px] font-mono uppercase tracking-[0.14em] rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    showGrid
                      ? 'bg-[rgba(184,146,90,0.14)] border-[#B8925A] text-[#D2AE78]'
                      : 'bg-[#0E1116] border-[rgba(244,239,232,0.12)] text-[rgba(244,239,232,0.55)]'
                  }`}
                >
                  {showGrid ? '✓ ' : ''}Structural Grid
                </button>
                <button
                  onClick={() => setShowDaylightVectors((v) => !v)}
                  className={`px-3.5 py-2 text-[11px] font-mono uppercase tracking-[0.14em] rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    showDaylightVectors
                      ? 'bg-[rgba(184,146,90,0.14)] border-[#B8925A] text-[#D2AE78]'
                      : 'bg-[#0E1116] border-[rgba(244,239,232,0.12)] text-[rgba(244,239,232,0.55)]'
                  }`}
                >
                  {showDaylightVectors ? '✓ ' : ''}Solar Orientation
                </button>
                <button
                  onClick={() => setShowAcousticZones((v) => !v)}
                  className={`px-3.5 py-2 text-[11px] font-mono uppercase tracking-[0.14em] rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    showAcousticZones
                      ? 'bg-[rgba(184,146,90,0.14)] border-[#B8925A] text-[#D2AE78]'
                      : 'bg-[#0E1116] border-[rgba(244,239,232,0.12)] text-[rgba(244,239,232,0.55)]'
                  }`}
                >
                  {showAcousticZones ? '✓ ' : ''}Zone Hatch
                </button>
              </div>
            </div>

            <div
              className="flex items-center gap-2 overflow-x-auto pb-2"
              role="tablist"
              aria-label="Select project blueprint"
            >
              {ARCHITECTURAL_PROJECTS.map((proj) => {
                const active = proj.id === blueprintProject.id;
                return (
                  <button
                    key={proj.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setBlueprintProject(proj);
                      setSelectedZone(proj.zones[0]);
                    }}
                    className={`px-4 py-3 rounded-lg text-xs font-mono tracking-[0.12em] uppercase border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#B8925A] text-[#0E1116] border-[#B8925A] font-semibold'
                        : 'bg-[#0E1116] text-[rgba(244,239,232,0.68)] border-[rgba(244,239,232,0.08)] hover:border-[rgba(184,146,90,0.4)]'
                    }`}
                  >
                    {proj.accessionCode} · {proj.plotSizeLabel}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                <InteractiveBlueprintCanvas
                  project={blueprintProject}
                  selectedZoneId={selectedZone.id}
                  onSelectZone={(z) => setSelectedZone(z)}
                  showGrid={showGrid}
                  showDaylightVectors={showDaylightVectors}
                  showAcousticZones={showAcousticZones}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {blueprintProject.zones.map((zone) => {
                    const isSelected = zone.id === selectedZone.id;
                    return (
                      <button
                        key={zone.id}
                        onClick={() => setSelectedZone(zone)}
                        className={`p-4 text-left rounded-none border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#171B23] border-[#B8925A]'
                            : 'bg-[#0E1116] border-[rgba(244,239,232,0.08)] hover:border-[rgba(184,146,90,0.35)]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#B8925A]">
                          <span>{zone.code}</span>
                          <span>{zone.level}</span>
                        </div>
                        <p className="text-sm font-serif text-[#F4EFE8] mt-1 truncate">
                          {zone.name}
                        </p>
                        <p className="text-xs font-mono text-[rgba(244,239,232,0.5)] mt-1 tabular-nums">
                          {zone.areaSqm} m² · H {zone.ceilingHeightM}m
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 bg-[#0E1116] border border-[rgba(244,239,232,0.1)] rounded-none space-y-4">
                  <div className="flex items-center justify-between border-b border-[rgba(244,239,232,0.08)] pb-3">
                    <span className="text-[11px] font-mono tracking-[0.16em] text-[#D2AE78]">
                      SELECTED ZONE: {selectedZone.code}
                    </span>
                    <span className="text-[11px] font-mono text-[rgba(244,239,232,0.45)]">
                      {selectedZone.level}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif text-[#F4EFE8]">{selectedZone.name}</h3>
                  <p className="text-xs text-[rgba(244,239,232,0.68)] leading-relaxed">
                    {selectedZone.materialNote}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#12151B] border border-[rgba(244,239,232,0.06)]">
                      <span className="block text-[10px] font-mono text-[rgba(244,239,232,0.45)]">
                        ZONE FLOOR AREA
                      </span>
                      <span className="text-base font-mono text-[#F4EFE8] tabular-nums">
                        {selectedZone.areaSqm} m²
                      </span>
                    </div>
                    <div className="p-3 bg-[#12151B] border border-[rgba(244,239,232,0.06)]">
                      <span className="block text-[10px] font-mono text-[rgba(244,239,232,0.45)]">
                        CLEARANCE
                      </span>
                      <span className="text-base font-mono text-[#F4EFE8] tabular-nums">
                        {selectedZone.ceilingHeightM.toFixed(1)} m
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#0E1116] border border-[rgba(244,239,232,0.1)] rounded-none">
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-[rgba(244,239,232,0.1)]">
                    <span className="text-[11px] font-mono tracking-[0.16em] text-[#B8925A]">
                      PROJECT SPECIFICATIONS
                    </span>
                    <button
                      onClick={() => setModalProject(blueprintProject)}
                      className="text-[11px] font-mono text-[#D2AE78] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Dossier</span>
                    </button>
                  </div>

                  <dl className="divide-y divide-[rgba(244,239,232,0.06)]">
                    {blueprintProject.parameters.map((param) => (
                      <div
                        key={param.label}
                        className="py-3 flex items-center justify-between gap-4 text-xs"
                      >
                        <dt className="font-mono tracking-[0.1em] text-[rgba(244,239,232,0.5)]">
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
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 6: LIMESTONE ALABASTER (#F4EFE8)
            LOCATION, DIRECTIONS, SIGNBOARD & REGIONAL DIRECTORY
           ===================================================================== */}
        <section
          id="location-hub"
          className="bg-[#F4EFE8] text-[#0E1116] border-b border-[rgba(14,17,22,0.12)]"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-white border border-[rgba(14,17,22,0.1)] rounded-2xl p-8">
                <div className="space-y-4">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#785926]">
                    05. HEAD OFFICE LOCATION &amp; AUTHORISED PARTNER CREDENTIALS
                  </p>
                  <h2 className="text-3xl font-serif text-[#0E1116]">
                    Visit Ch. Arshad Arif at Phase 7.
                  </h2>
                  <p className="text-sm text-[rgba(14,17,22,0.7)] leading-relaxed">
                    Located directly in Al Rehman Garden Phase 7, Lahore, our office is open daily until 10:00 PM for on-ground plot inspections, file verifications, and construction consultations.
                  </p>

                  {/* Illuminated Signboard Photo Preview inside Location Card (Uncropped) */}
                  <div
                    onClick={() => setLightboxPhotoIndex(1)}
                    className="relative rounded-xl overflow-hidden border border-[rgba(14,17,22,0.12)] bg-[#0B0E13] cursor-pointer group"
                  >
                    <img
                      src="assets/aistudio/unnamed__2__ebd38d79.jpg"
                      alt="AL-Ghani Real Estate & Builders Authorised Sales Partner Signboard - Ch. Arshad Arif 0303-0823898"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain block monograph-zoom"
                    />
                  </div>

                  <dl className="divide-y divide-[rgba(14,17,22,0.08)] pt-1 text-xs font-mono">
                    <div className="py-2.5 flex justify-between gap-4">
                      <dt className="text-[rgba(14,17,22,0.55)]">PRINCIPAL CEO</dt>
                      <dd className="text-[#0E1116] font-semibold">{BUSINESS_PROFILE.principalName}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <dt className="text-[rgba(14,17,22,0.55)]">PLUS CODE</dt>
                      <dd className="text-[#0E1116] font-semibold">{BUSINESS_PROFILE.plusCode}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <dt className="text-[rgba(14,17,22,0.55)]">LOCATED IN</dt>
                      <dd className="text-[#785926] font-semibold">{BUSINESS_PROFILE.locatedIn}</dd>
                    </div>
                    <div className="py-2.5 flex justify-between gap-4">
                      <dt className="text-[rgba(14,17,22,0.55)]">DIRECT PHONE</dt>
                      <dd className="text-[#0E1116] font-semibold">{BUSINESS_PROFILE.phoneDisplay}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`tel:${BUSINESS_PROFILE.phoneTel}`}
                    className="bronze-button px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-[0.14em] flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 0303-0823898</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        `${BUSINESS_PROFILE.plusCode} - ${BUSINESS_PROFILE.locatedIn}`
                      );
                      triggerNotice('Copied address: H58P+G6, Thikriwala · Al Rehman Garden Phase 7 Lahore.');
                    }}
                    className="ghost-bronze-light px-5 py-3 rounded-lg text-xs font-mono uppercase tracking-[0.12em] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Copy Address
                  </button>
                </div>
              </div>

              {/* Architectural Sector Map of Al Rehman Garden Phase 7 (H58P+G6) */}
              <div className="lg:col-span-7 bg-[#0E1116] border border-[rgba(14,17,22,0.12)] rounded-2xl overflow-hidden flex flex-col justify-between p-6 text-[#F4EFE8]">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[rgba(244,239,232,0.08)]">
                  <div className="text-xs font-mono text-[#D2AE78]">
                    SECTOR LOCATION MAP · H58P+G6, THIKRIWALA · PHASE 7 LAHORE
                  </div>
                  <span className="text-xs font-mono text-[rgba(244,239,232,0.5)]">
                    OPEN · CLOSES 10 PM
                  </span>
                </div>

                <div className="relative w-full aspect-[16/9] my-4 bg-[#0B0E13] border border-[rgba(244,239,232,0.1)] overflow-hidden">
                  <svg
                    viewBox="0 0 700 380"
                    className="w-full h-full"
                    role="img"
                    aria-label="Sector map of Al Rehman Garden Phase 7 Lahore showing AL-Ghani Real Estate & Builders office at H58P+G6"
                  >
                    <defs>
                      <pattern id="mapGrid" width="35" height="35" patternUnits="userSpaceOnUse">
                        <path
                          d="M 35 0 L 0 0 0 35"
                          fill="none"
                          stroke="rgba(244,239,232,0.05)"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="700" height="380" fill="url(#mapGrid)" />

                    {/* Main Highway / Sharaqpur Road Corridor */}
                    <path
                      d="M 0 310 Q 320 260 700 190"
                      fill="none"
                      stroke="#272A30"
                      strokeWidth="26"
                    />
                    <path
                      d="M 0 310 Q 320 260 700 190"
                      fill="none"
                      stroke="#B8925A"
                      strokeWidth="1.5"
                      strokeDasharray="8 6"
                    />
                    <text
                      x="460"
                      y="255"
                      fill="rgba(244,239,232,0.55)"
                      fontSize="10"
                      fontFamily="JetBrains Mono"
                    >
                      MAIN LAHORE – SHARAQPUR CORRIDOR
                    </text>

                    {/* Al Rehman Garden Phase 7 Master Boulevard Grid */}
                    <rect
                      x="110"
                      y="45"
                      width="420"
                      height="210"
                      fill="rgba(184,146,90,0.05)"
                      stroke="rgba(184,146,90,0.35)"
                      strokeWidth="1.5"
                    />
                    <line x1="320" y1="45" x2="320" y2="280" stroke="#D2AE78" strokeWidth="4" />
                    <line x1="110" y1="145" x2="530" y2="145" stroke="rgba(244,239,232,0.22)" strokeWidth="2" />

                    <rect x="135" y="65" width="160" height="65" fill="#141820" stroke="rgba(244,239,232,0.15)" />
                    <text x="150" y="102" fill="rgba(244,239,232,0.6)" fontSize="10" fontFamily="JetBrains Mono">
                      POSSESSION BLOCK A
                    </text>

                    <rect x="345" y="65" width="160" height="65" fill="#141820" stroke="rgba(244,239,232,0.15)" />
                    <text x="360" y="102" fill="rgba(244,239,232,0.6)" fontSize="10" fontFamily="JetBrains Mono">
                      POSSESSION BLOCK B
                    </text>

                    <rect x="135" y="162" width="160" height="72" fill="#141820" stroke="rgba(244,239,232,0.15)" />
                    <text x="150" y="202" fill="rgba(244,239,232,0.6)" fontSize="10" fontFamily="JetBrains Mono">
                      GRAND MONUMENT PARK
                    </text>

                    {/* AL-Ghani Office Pin on Main Commercial Boulevard */}
                    <g transform="translate(320, 145)">
                      <circle cx="0" cy="0" r="26" fill="rgba(184,146,90,0.2)" />
                      <circle cx="0" cy="0" r="10" fill="#B8925A" stroke="#0E1116" strokeWidth="2" />
                      <rect
                        x="16"
                        y="-28"
                        width="250"
                        height="50"
                        fill="#0E1116"
                        stroke="#B8925A"
                        strokeWidth="1.5"
                      />
                      <text x="28" y="-9" fill="#F4EFE8" fontSize="11" fontFamily="Playfair Display">
                        AL-Ghani Real Estate &amp; Builders
                      </text>
                      <text x="28" y="9" fill="#D2AE78" fontSize="9" fontFamily="JetBrains Mono">
                        CH. ARSHAD ARIF · 0303-0823898
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[rgba(244,239,232,0.6)]">
                  <span>AL REHMAN GARDEN PHASE 7 MAIN BOULEVARD</span>
                  <span className="text-[#D2AE78]">PLUS CODE: H58P+G6, THIKRIWALA</span>
                </div>
              </div>
            </div>

            {/* Construction Material Standards & People Also Search For Directory */}
            <div className="pt-12 border-t border-[rgba(14,17,22,0.1)] grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#785926]">
                    TURNKEY CONSTRUCTION SPECIFICATIONS
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#0E1116] mt-1">
                    Verified A+ Material Standards.
                  </h3>
                </div>

                <div className="space-y-3">
                  {MATERIAL_SPECIMENS.map((mat) => {
                    const isSelected = mat.id === activeMaterial.id;
                    return (
                      <button
                        key={mat.id}
                        onClick={() => setActiveMaterial(mat)}
                        className={`w-full p-4 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#0E1116] text-[#F4EFE8] border-[#0E1116]'
                            : 'bg-white text-[#0E1116] border-[rgba(14,17,22,0.1)] hover:border-[#B8925A]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-[11px] font-mono tracking-[0.12em] uppercase text-[#B8925A]">
                            {mat.code} · {mat.origin}
                          </div>
                          <p className="text-base font-serif">{mat.name}</p>
                          {isSelected && (
                            <p className="text-xs text-[rgba(244,239,232,0.7)] pt-1 font-sans">
                              {mat.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {mat.swatchColors.map((hex, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-7 border border-[rgba(244,239,232,0.2)]"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* People Also Search For Directory */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#785926]">
                    REGIONAL REAL ESTATE DIRECTORY
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#0E1116] mt-1">
                    People Also Search For in Phase 7.
                  </h3>
                </div>

                <div className="bg-white border border-[rgba(14,17,22,0.1)] rounded-2xl divide-y divide-[rgba(14,17,22,0.08)]">
                  <div className="p-5 bg-[#FAF7F2] flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#0E1116]">
                        {BUSINESS_PROFILE.name}
                      </p>
                      <p className="text-xs text-[rgba(14,17,22,0.6)]">
                        {BUSINESS_PROFILE.category} · {BUSINESS_PROFILE.locatedIn}
                      </p>
                    </div>
                    <div className="text-right font-mono text-xs text-[#785926] font-semibold shrink-0">
                      5.0 ★ (12)
                    </div>
                  </div>

                  {NEARBY_BUSINESSES.map((biz) => (
                    <div
                      key={biz.name}
                      className="p-4 px-5 flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <p className="font-medium text-[#0E1116]">{biz.name}</p>
                        <p className="text-[rgba(14,17,22,0.55)]">{biz.category}</p>
                      </div>
                      <div className="font-mono text-[rgba(14,17,22,0.65)] shrink-0">
                        {biz.rating === 'No reviews'
                          ? 'No reviews'
                          : `${biz.rating} ★ ${biz.reviewCount}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 7: DARK BASALT VOID (#0E1116)
            PLOT & CONSTRUCTION COST ESTIMATOR + INQUIRY DESK
           ===================================================================== */}
        <section
          id="commission"
          className="bg-[#0E1116] text-[#F4EFE8] border-b border-[rgba(244,239,232,0.08)]"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#B8925A]">
                06. TURNKEY CONSTRUCTION &amp; PLOT ESTIMATOR
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#F4EFE8] tracking-[-0.015em] text-balance">
                Plan Your Plot or House Construction.
              </h2>
              <p className="text-base text-[rgba(244,239,232,0.65)] font-light leading-relaxed">
                Select your required service, plot size in Al Rehman Garden Phase 7, and material specification to generate a construction timeline or book a direct meeting with Ch. Arshad Arif before 10:00 PM.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <form
                onSubmit={handleCommissionSubmit}
                className="lg:col-span-7 bg-[#12151B] border border-[rgba(244,239,232,0.08)] rounded-2xl p-6 sm:p-10 space-y-8"
              >
                <div className="space-y-3">
                  <label className="block text-xs font-mono tracking-[0.16em] uppercase text-[#D2AE78]">
                    01. SELECT SERVICE TYPE
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(
                      ['Plots', 'Turnkey Construction', 'Residential', 'Commercial'] as const
                    ).map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setBriefTypology(type)}
                        className={`py-3 px-3 rounded-lg text-xs font-mono uppercase tracking-[0.1em] border transition-colors cursor-pointer ${
                          briefTypology === type
                            ? 'bg-[#B8925A] text-[#0E1116] border-[#B8925A] font-semibold'
                            : 'bg-[#0E1116] text-[#F4EFE8] border-[rgba(244,239,232,0.12)] hover:border-[#B8925A]'
                        }`}
                      >
                        {type === 'Turnkey Construction' ? 'Turnkey Build' : type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label
                      htmlFor="site-topography"
                      className="block text-xs font-mono tracking-[0.16em] uppercase text-[#D2AE78]"
                    >
                      02. PREFERRED SECTOR / BLOCK
                    </label>
                    <select
                      id="site-topography"
                      value={briefTopography}
                      onChange={(e) =>
                        setBriefTopography(e.target.value as typeof briefTopography)
                      }
                      className="w-full px-4 py-3 text-sm bg-[#0E1116] border border-[rgba(244,239,232,0.12)] rounded-lg text-[#F4EFE8] focus:outline-none focus:border-[#B8925A]"
                    >
                      <option value="Al Rehman Garden Phase 7">Al Rehman Garden Phase 7 (Possession)</option>
                      <option value="Main Boulevard Commercial">Phase 7 Main Boulevard Commercial</option>
                      <option value="Park-Facing Corner Plot">Phase 7 Park-Facing / Corner</option>
                      <option value="Thikriwala Estate Corridor">Thikriwala / Sharaqpur Road Estate</option>
                    </select>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <label htmlFor="area-slider" className="tracking-[0.16em] uppercase text-[#D2AE78]">
                        03. PLOT / COVERED SCALE
                      </label>
                      <span className="text-[#F4EFE8] font-semibold tabular-nums">
                        {feasibilityMetrics.approxMarla} ({feasibilityMetrics.coveredSqFt.toLocaleString()} sq.ft)
                      </span>
                    </div>
                    <input
                      id="area-slider"
                      type="range"
                      min="110"
                      max="650"
                      step="15"
                      value={briefAreaSqm}
                      onChange={(e) => setBriefAreaSqm(parseInt(e.target.value, 10))}
                      className="w-full accent-[#B8925A] cursor-pointer h-2 bg-[#0E1116] rounded-lg mt-2"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[rgba(244,239,232,0.4)] tabular-nums">
                      <span>3–5 MARLA</span>
                      <span>10 MARLA</span>
                      <span>1–2 KANAL</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-mono tracking-[0.16em] uppercase text-[#D2AE78]">
                    04. CONSTRUCTION &amp; FINISHING SPECIFICATION
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MATERIAL_SPECIMENS.map((mat) => {
                      const checked = briefMaterialIds.includes(mat.id);
                      return (
                        <button
                          type="button"
                          key={mat.id}
                          onClick={() => toggleBriefMaterial(mat.id)}
                          className={`p-3.5 rounded-lg border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            checked
                              ? 'bg-[#171B23] border-[#B8925A]'
                              : 'bg-[#0E1116] border-[rgba(244,239,232,0.12)] hover:border-[rgba(184,146,90,0.4)]'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 flex items-center justify-center border shrink-0 ${
                              checked
                                ? 'bg-[#B8925A] border-[#B8925A] text-[#0E1116]'
                                : 'border-[#B8925A] bg-transparent'
                            }`}
                          >
                            {checked && <Check className="w-3 h-3 stroke-[2.5]" />}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[#F4EFE8] truncate">
                              {mat.name}
                            </p>
                            <p className="text-[10px] font-mono text-[rgba(244,239,232,0.45)] truncate">
                              {mat.origin}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-[rgba(244,239,232,0.08)] space-y-4">
                  <span className="block text-xs font-mono tracking-[0.16em] uppercase text-[#D2AE78]">
                    05. CLIENT CONTACT DETAILS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="patron-name" className="block text-xs text-[rgba(244,239,232,0.65)] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="patron-name"
                        type="text"
                        required
                        value={patronName}
                        onChange={(e) => setPatronName(e.target.value)}
                        placeholder="e.g., Hasnain Ahmad / Irfan Rauf"
                        className="w-full px-4 py-3 text-sm bg-[#0E1116] border border-[rgba(244,239,232,0.12)] rounded-lg text-[#F4EFE8] placeholder:text-[rgba(244,239,232,0.3)] focus:outline-none focus:border-[#B8925A]"
                      />
                    </div>
                    <div>
                      <label htmlFor="patron-phone" className="block text-xs text-[rgba(244,239,232,0.65)] mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="patron-phone"
                        type="tel"
                        required
                        value={patronPhone}
                        onChange={(e) => setPatronPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full px-4 py-3 text-sm bg-[#0E1116] border border-[rgba(244,239,232,0.12)] rounded-lg text-[#F4EFE8] placeholder:text-[rgba(244,239,232,0.3)] focus:outline-none focus:border-[#B8925A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="patron-notes" className="block text-xs text-[rgba(244,239,232,0.65)] mb-1.5">
                      Plot Number, Construction Requirements, or Visit Time
                    </label>
                    <textarea
                      id="patron-notes"
                      rows={3}
                      value={patronNotes}
                      onChange={(e) => setPatronNotes(e.target.value)}
                      placeholder="Let us know if you want to buy/sell an on-ground plot in Al Rehman Garden Phase 7 or need a grey/turnkey construction quote..."
                      className="w-full px-4 py-3 text-sm bg-[#0E1116] border border-[rgba(244,239,232,0.12)] rounded-lg text-[#F4EFE8] placeholder:text-[rgba(244,239,232,0.3)] focus:outline-none focus:border-[#B8925A]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="bronze-button px-8 py-4 rounded-lg text-xs font-semibold tracking-[0.16em] uppercase flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Submit Inquiry to Ch. Arshad Arif</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBriefSpec}
                    className="ghost-bronze-dark px-5 py-3.5 rounded-lg text-xs font-mono tracking-[0.14em] uppercase flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Download className="w-4 h-4 text-[#B8925A]" />
                    <span>Download Estimate (.TXT)</span>
                  </button>
                </div>

                {submittedDossierCode && (
                  <div
                    role="status"
                    className="p-5 bg-[#171B23] border border-[#B8925A] rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#D2AE78]">
                      <span>CONSULTATION REQUEST REGISTERED</span>
                      <span>REF: {submittedDossierCode}</span>
                    </div>
                    <p className="text-sm text-[#F4EFE8]">
                      Thank you, {patronName}. Your inquiry has been routed to{' '}
                      <strong className="text-[#D2AE78]">
                        {BUSINESS_PROFILE.principalName} — {BUSINESS_PROFILE.name}
                      </strong>
                      . We will contact you shortly on {patronPhone}, or you can call us directly at{' '}
                      <a href={`tel:${BUSINESS_PROFILE.phoneTel}`} className="underline text-[#B8925A]">
                        {BUSINESS_PROFILE.phoneDisplay}
                      </a>{' '}
                      (Open until 10:00 PM).
                    </p>
                  </div>
                )}
              </form>

              {/* Right 5 Columns: Live Drafted Schedule & Direct Contact Card */}
              <div className="lg:col-span-5 bg-[#12151B] border border-[rgba(244,239,232,0.1)] rounded-none p-6 sm:p-8 space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(244,239,232,0.1)]">
                  <span className="text-xs font-mono tracking-[0.16em] text-[#B8925A]">
                    PROJECT TIMELINE ESTIMATE
                  </span>
                  <span className="text-xs font-mono text-[rgba(244,239,232,0.45)]">
                    PHASE 7 LAHORE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0B0E13] border border-[rgba(244,239,232,0.08)]">
                    <span className="block text-[10px] font-mono tracking-[0.14em] text-[rgba(244,239,232,0.45)]">
                      ESTIMATED DURATION
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif text-[#B8925A] tabular-nums">
                      {feasibilityMetrics.totalMonths} {feasibilityMetrics.totalMonths === 1 ? 'Month' : 'Months'}
                    </span>
                  </div>
                  <div className="p-4 bg-[#0B0E13] border border-[rgba(244,239,232,0.08)]">
                    <span className="block text-[10px] font-mono tracking-[0.14em] text-[rgba(244,239,232,0.45)]">
                      PLOT / SCALE
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif text-[#F4EFE8] tabular-nums">
                      {feasibilityMetrics.approxMarla}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="block text-xs font-mono tracking-[0.14em] text-[rgba(244,239,232,0.6)]">
                    EXECUTION MILESTONES
                  </span>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[rgba(244,239,232,0.7)]">
                          I. Map Verification, NDC &amp; Demarcation
                        </span>
                        <span className="text-[#D2AE78] tabular-nums">
                          {feasibilityMetrics.schematicMonths} Mo
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0B0E13]">
                        <div
                          className="h-full bg-[#B8925A]"
                          style={{
                            width: `${(feasibilityMetrics.schematicMonths / feasibilityMetrics.totalMonths) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[rgba(244,239,232,0.7)]">
                          II. A+ Grey Structure &amp; RCC Slab Pouring
                        </span>
                        <span className="text-[#D2AE78] tabular-nums">
                          {feasibilityMetrics.greyStructureMonths} Mo
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0B0E13]">
                        <div
                          className="h-full bg-[#D2AE78]"
                          style={{
                            width: `${(feasibilityMetrics.greyStructureMonths / feasibilityMetrics.totalMonths) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[rgba(244,239,232,0.7)]">
                          III. Woodwork, Porcelain Tiling &amp; Handover
                        </span>
                        <span className="text-[#F4EFE8] tabular-nums">
                          {feasibilityMetrics.finishingMonths} Mo
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0B0E13]">
                        <div
                          className="h-full bg-[#F4EFE8]"
                          style={{
                            width: `${(feasibilityMetrics.finishingMonths / feasibilityMetrics.totalMonths) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <dl className="divide-y divide-[rgba(244,239,232,0.06)] pt-2 border-t border-[rgba(244,239,232,0.1)] text-xs font-mono">
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[rgba(244,239,232,0.5)]">PRINCIPAL CEO</dt>
                    <dd className="text-[#B8925A] text-right">{BUSINESS_PROFILE.principalName}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[rgba(244,239,232,0.5)]">STATUS</dt>
                    <dd className="text-[#F4EFE8] text-right">AUTHORISED SALES PARTNER</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[rgba(244,239,232,0.5)]">OFFICE ADDRESS</dt>
                    <dd className="text-[#F4EFE8] text-right">{BUSINESS_PROFILE.locatedIn}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[rgba(244,239,232,0.5)]">DIRECT PHONE</dt>
                    <dd className="text-[#D2AE78] text-right">{BUSINESS_PROFILE.phoneDisplay}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET ARCHITECTURAL FOOTER */}
      <footer className="bg-[#0B0E13] text-[rgba(244,239,232,0.5)] border-t border-[rgba(244,239,232,0.08)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <p className="text-lg font-serif tracking-[0.18em] text-[#F4EFE8]">
              AL-GHANI REAL ESTATE &amp; BUILDERS
            </p>
            <p className="text-xs font-mono">
              {BUSINESS_PROFILE.principalName.toUpperCase()} · {BUSINESS_PROFILE.locatedIn.toUpperCase()} · {BUSINESS_PROFILE.plusCode.toUpperCase()} · TEL: {BUSINESS_PROFILE.phoneDisplay}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono tracking-[0.14em] uppercase">
            <a href="#photos-gallery" className="hover:text-[#F4EFE8] transition-colors">
              Photos (10)
            </a>
            <a href="#works" className="hover:text-[#F4EFE8] transition-colors">
              Projects
            </a>
            <a href="#reviews" className="hover:text-[#F4EFE8] transition-colors">
              Reviews (5.0 ★)
            </a>
            <a href="#location-hub" className="hover:text-[#F4EFE8] transition-colors">
              Directions
            </a>
            <span>OPEN DAILY · CLOSES 10 PM</span>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {lightboxPhotoIndex !== null && filteredGalleryPhotos[lightboxPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Photo Lightbox"
          onClick={() => setLightboxPhotoIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#12151B] border border-[rgba(244,239,232,0.16)] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0E1116] border-b border-[rgba(244,239,232,0.08)]">
              <div className="text-xs font-mono tracking-[0.14em] text-[#D2AE78]">
                {filteredGalleryPhotos[lightboxPhotoIndex].tagLabel} · PHOTO {lightboxPhotoIndex + 1} OF{' '}
                {filteredGalleryPhotos.length}
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhotoIndex(null)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-[#F4EFE8] border border-[rgba(244,239,232,0.16)] rounded-lg hover:border-[#B8925A] cursor-pointer"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative w-full aspect-[16/10] bg-[#0B0E13] flex items-center justify-center">
              <img
                src={filteredGalleryPhotos[lightboxPhotoIndex].src}
                alt={filteredGalleryPhotos[lightboxPhotoIndex].title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain"
              />

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={() =>
                  setLightboxPhotoIndex(
                    (lightboxPhotoIndex - 1 + filteredGalleryPhotos.length) %
                      filteredGalleryPhotos.length
                  )
                }
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[#0E1116]/85 border border-[rgba(244,239,232,0.2)] rounded-full text-[#F4EFE8] hover:border-[#B8925A] cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxPhotoIndex((lightboxPhotoIndex + 1) % filteredGalleryPhotos.length)
                }
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#0E1116]/85 border border-[rgba(244,239,232,0.2)] rounded-full text-[#F4EFE8] hover:border-[#B8925A] cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="px-6 py-4 bg-[#0E1116] border-t border-[rgba(244,239,232,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-serif text-[#F4EFE8]">
                  {filteredGalleryPhotos[lightboxPhotoIndex].title}
                </h3>
                <p className="text-xs text-[rgba(244,239,232,0.65)]">
                  {filteredGalleryPhotos[lightboxPhotoIndex].subtitle}
                </p>
              </div>
              <a
                href={`tel:${BUSINESS_PROFILE.phoneTel}`}
                className="bronze-button px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap shrink-0"
              >
                Call {BUSINESS_PROFILE.phoneLocal}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FULL MONOGRAPH FOLIO MODAL */}
      <MonographModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onInspectInBlueprint={handleSelectBlueprintProject}
        onCommissionTypology={handleInitializeBriefFromProject}
      />
    </div>
  );
}
