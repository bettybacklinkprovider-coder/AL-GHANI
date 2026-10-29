export type ProjectCategory = 'All' | 'Residential' | 'Commercial' | 'Plots' | 'Turnkey Construction';

export interface SpatialZone {
  id: string;
  code: string;
  name: string;
  level: string;
  areaSqm: number;
  ceilingHeightM: number;
  acousticRt60: string;
  daylightLux: string;
  materialNote: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BlueprintParameter {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ArchitecturalProject {
  id: string;
  accessionCode: string;
  title: string;
  subtitle: string;
  year: string;
  category: Exclude<ProjectCategory, 'All'>;
  location: string;
  coordinates: string;
  areaSqm: number;
  plotSizeLabel: string;
  priceEstimate: string;
  imageUrl: string;
  featuredSpan?: boolean;
  plateVariant: 'kyoto' | 'valais' | 'obsidian' | 'svalbard' | 'kronos' | 'atacama';
  leadParagraph: string;
  curatorialEssay: string;
  pullQuote: string;
  pullQuoteAttribution: string;
  figureCaption: string;
  parameters: BlueprintParameter[];
  zones: SpatialZone[];
}

export interface MaterialSpecimen {
  id: string;
  code: string;
  name: string;
  origin: string;
  category: string;
  densityKgM3: number;
  thermalConductivity: string;
  acousticAbsorption: string;
  embodiedCarbonFactor: number;
  patinaEvolution: string;
  description: string;
  swatchColors: [string, string, string];
  grainType: 'concrete' | 'timber' | 'bronze' | 'quartzite' | 'travertine';
}

export interface ClientReview {
  id: string;
  authorName: string;
  authorMeta: string;
  timeAgo: string;
  isNew?: boolean;
  rating: number;
  highlightTitle?: string;
  comment: string;
  tags: ('cooperative' | 'construction' | 'consultation')[];
  likesCount: number;
}

export interface NearbyBusiness {
  name: string;
  rating: string;
  reviewCount: string;
  category: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: 'Inside' | 'Exterior' | 'Official';
  tagLabel: string;
}

export const BUSINESS_PROFILE = {
  name: 'AL-Ghani Real Estate & Builders',
  shortName: 'AL-GHANI',
  principalName: 'Ch. Arshad Arif',
  partnerStatus: 'Authorised Sales Partner · Al-Rehman Developers & Town Planners',
  tagline: 'AUTHORISED SALES PARTNER · REAL ESTATE CONSULTANT & TURNKEY BUILDERS',
  rating: 5.0,
  reviewCount: 12,
  category: 'Real estate consultant',
  plusCode: 'H58P+G6, Thikriwala, Pakistan',
  locatedIn: 'Al Rehman Garden Phase 7 Lahore',
  hoursStatus: 'Open · Closes 10 PM',
  phoneDisplay: '+92 303 0823898',
  phoneLocal: '0303-0823898',
  phoneTel: '+923030823898',
  whatsappUrl: 'https://wa.me/923030823898',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=AL-Ghani+Real+Estate+%26+Builders+Al+Rehman+Garden+Phase+7+Lahore+H58P%2BG6+Thikriwala',
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-banner-possession',
    src: '/assets/aistudio/unnamed__3__ef454fe6.jpg',
    title: 'Possession Ready On Ground — Al Rehman Garden Phase 7',
    subtitle: 'Official Authorised Sales Partner of Al-Rehman Developers & Town Planners',
    category: 'Official',
    tagLabel: 'OFFICIAL PARTNER BANNER',
  },
  {
    id: 'photo-signboard-night',
    src: '/assets/aistudio/unnamed__2__ebd38d79.jpg',
    title: 'AL-Ghani Real Estate & Builders — Ch. Arshad Arif (0303-0823898)',
    subtitle: 'Authorised Sales Partner illuminated office fascia in Al Rehman Garden Phase 7',
    category: 'Exterior',
    tagLabel: 'EXTERIOR SIGNBOARD',
  },
  {
    id: 'photo-office-consultation-1',
    src: '/assets/aistudio/unnamed__10__a2636dff.jpg',
    title: 'Executive Consultation Desk & Society Master Maps',
    subtitle: 'One-on-one plot verification and master plan briefing desk at AL-Ghani office',
    category: 'Inside',
    tagLabel: 'INSIDE · EXECUTIVE DESK',
  },
  {
    id: 'photo-office-wide-2',
    src: '/assets/aistudio/unnamed__9__2c1b6c16.jpg',
    title: 'AL-Ghani Corporate Office & Client Lounge',
    subtitle: 'Spacious air-conditioned consultation hall with society maps and media display',
    category: 'Inside',
    tagLabel: 'INSIDE · CORPORATE HALL',
  },
  {
    id: 'photo-entrance-glass',
    src: '/assets/aistudio/unnamed__4__5d7d98bc.jpg',
    title: 'Main Glass Entrance Portal — AL-Ghani Office',
    subtitle: 'Welcoming full-height tempered glass entrance in Al Rehman Garden Phase 7',
    category: 'Inside',
    tagLabel: 'INSIDE · ENTRANCE PORTAL',
  },
  {
    id: 'photo-phase7-landmark-night',
    src: '/assets/aistudio/unnamed__1__be030782.jpg',
    title: 'Al Rehman Garden Phase 7 — Main Boulevard Landmark',
    subtitle: 'Illuminated monumental architecture and palm-lined avenues at night',
    category: 'Exterior',
    tagLabel: 'EXTERIOR · PHASE 7 BOULEVARD',
  },
  {
    id: 'photo-phase7-portico',
    src: '/assets/aistudio/unnamed_c8dcea04.jpg',
    title: 'Grand Classical Portico — Al Rehman Garden Phase 7',
    subtitle: 'Signature classical columns and evening illumination inside Phase 7 Lahore',
    category: 'Exterior',
    tagLabel: 'EXTERIOR · GRAND PORTICO',
  },
  {
    id: 'photo-office-desks-maps',
    src: '/assets/aistudio/unnamed__6__df3ec98d.jpg',
    title: 'Advisory Workstations & On-Ground Plot Maps',
    subtitle: 'Dedicated advisory desks displaying updated Phase 7 block and plot charts',
    category: 'Inside',
    tagLabel: 'INSIDE · MAP WORKSTATIONS',
  },
  {
    id: 'photo-office-evening-glass',
    src: '/assets/aistudio/unnamed__5__8fe3eada.jpg',
    title: 'Evening Consultation Suite (Open Until 10:00 PM)',
    subtitle: 'Evening client sessions with direct boulevard frontage in Phase 7',
    category: 'Inside',
    tagLabel: 'INSIDE · EVENING SUITE',
  },
  {
    id: 'photo-office-seating-lounge',
    src: '/assets/aistudio/unnamed__8__278aeaec.jpg',
    title: 'Client Hospitality & Waiting Lounge',
    subtitle: 'Comfortable leather seating and advisory stations for families and investors',
    category: 'Inside',
    tagLabel: 'INSIDE · CLIENT LOUNGE',
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-irfan',
    authorName: 'Irfan Rauf',
    authorMeta: '1 review',
    timeAgo: '3 weeks ago',
    isNew: true,
    rating: 5,
    highlightTitle: 'Professional Service',
    comment:
      'Had a very good experience with Al Ghani Real Estate & Builders. The team was professional, cooperative, and guided me properly throughout the process. Highly recommended.',
    tags: ['cooperative', 'consultation'],
    likesCount: 6,
  },
  {
    id: 'rev-hasnain',
    authorName: 'Hasnain Ahmad',
    authorMeta: '2 reviews · 5 photos',
    timeAgo: 'a month ago',
    rating: 5,
    highlightTitle: 'Real Estate & Construction Excellence',
    comment:
      'Excellent real estate and construction services. The team is professional, cooperative, and delivers top-tier grey structure and turnkey finishing work right on schedule in Al Rehman Garden Phase 7.',
    tags: ['construction', 'cooperative'],
    likesCount: 9,
  },
  {
    id: 'rev-arslan',
    authorName: 'Arslan Jatt',
    authorMeta: '1 review',
    timeAgo: 'a month ago',
    rating: 5,
    highlightTitle: 'Transparent Dealing & Guidance',
    comment:
      'Great experience with this real estate and construction office. Very cooperative staff, transparent documentation, and reliable construction supervision from foundation to handover.',
    tags: ['construction', 'cooperative'],
    likesCount: 7,
  },
  {
    id: 'rev-usman',
    authorName: 'Usman Tariq',
    authorMeta: '4 reviews · 2 photos',
    timeAgo: '2 months ago',
    rating: 5,
    highlightTitle: 'A+ Turnkey Construction Quality',
    comment:
      'Entrusted AL-Ghani Real Estate & Builders with our 10 Marla house construction in Al Rehman Garden Phase 7. Their structural steel, brick masonry, and woodwork quality exceeded every expectation.',
    tags: ['construction'],
    likesCount: 5,
  },
  {
    id: 'rev-bilal',
    authorName: 'Chaudhry Bilal Virk',
    authorMeta: '3 reviews',
    timeAgo: '2 months ago',
    rating: 5,
    highlightTitle: 'Best Authorised Partner in Phase 7',
    comment:
      'Very cooperative team led by Ch. Arshad Arif for buying and selling residential and commercial plots in Al Rehman Garden Phase 7. Direct and honest market assessment with clear transfer procedures.',
    tags: ['cooperative', 'consultation'],
    likesCount: 4,
  },
  {
    id: 'rev-zain',
    authorName: 'Zain Ul Abideen',
    authorMeta: '2 reviews · 1 photo',
    timeAgo: '3 months ago',
    rating: 5,
    highlightTitle: 'Reliable Grey Structure & Finishing',
    comment:
      'Their construction supervision and architectural planning saved us both time and budget. Every stage of construction was shared with clear material bills and site updates.',
    tags: ['construction'],
    likesCount: 6,
  },
];

export const NEARBY_BUSINESSES: NearbyBusiness[] = [
  {
    name: 'Al RAHEEM REAL ESTATE',
    rating: '5.0',
    reviewCount: '(1)',
    category: 'Property administration service',
  },
  {
    name: 'Al Hajvery Real Estate',
    rating: '5.0',
    reviewCount: '(1)',
    category: 'Corporate office',
  },
  {
    name: 'Chauhan Real Estate',
    rating: 'No reviews',
    reviewCount: '',
    category: 'Real estate agency',
  },
  {
    name: 'Al Madina Real Estate',
    rating: '4.0',
    reviewCount: '(1)',
    category: 'Real estate developer',
  },
  {
    name: 'Al-ghani Estate',
    rating: '5.0',
    reviewCount: '(1)',
    category: 'Real estate consultant',
  },
];

export const ARCHITECTURAL_PROJECTS: ArchitecturalProject[] = [
  {
    id: 'phase7-possession-plots',
    accessionCode: 'ALG.2026.01',
    title: 'Al Rehman Garden Phase 7 — Possession Ready On-Ground Plots',
    subtitle: 'AUTHORISED SALES PARTNER · AL-REHMAN DEVELOPERS & TOWN PLANNERS',
    year: 'ON GROUND',
    category: 'Plots',
    location: 'PHASE 7 LAHORE',
    coordinates: 'H58P+G6, THIKRIWALA / PHASE 7 LAHORE',
    areaSqm: 450,
    plotSizeLabel: '3, 5, 10 Marla & 1 Kanal',
    priceEstimate: 'Possession Ready On Ground',
    imageUrl: '/assets/aistudio/unnamed__3__ef454fe6.jpg',
    featuredSpan: true,
    plateVariant: 'atacama',
    leadParagraph:
      'As an Authorised Sales Partner of Al-Rehman Developers & Town Planners, AL-Ghani Real Estate & Builders offers direct, verified on-ground possession plots in Al Rehman Garden Phase 7 Lahore.',
    curatorialEssay:
      'Led by Ch. Arshad Arif (0303-0823898), our office provides live on-table block map consultations, clear society ledger verification, and immediate site inspection for park-facing, corner, and main boulevard residential and commercial plots.',
    pullQuote:
      'Possession ready on-ground plots backed by official Authorised Sales Partner verification and transparent transfer.',
    pullQuoteAttribution: 'Ch. Arshad Arif — Principal, AL-Ghani Real Estate & Builders (0303-0823898)',
    figureCaption: 'Fig. 01 — Official Al Rehman Garden Phase 7 Authorised Sales Partner possession-ready inventory.',
    parameters: [
      { label: 'PLOT SIZES AVAILABLE', value: '3, 5, 10 MARLA & 1 KANAL', highlight: true },
      { label: 'PARTNER STATUS', value: 'AUTHORISED SALES PARTNER (AL-REHMAN)' },
      { label: 'POSSESSION STATUS', value: 'ON-GROUND POSSESSION READY', highlight: true },
      { label: 'PRINCIPAL CONSULTANT', value: 'CH. ARSHAD ARIF (0303-0823898)' },
      { label: 'OFFICE LOCATION', value: 'AL REHMAN GARDEN PHASE 7 (H58P+G6)' },
      { label: 'OPERATING HOURS', value: 'OPEN DAILY · CLOSES 10:00 PM' },
    ],
    zones: [
      {
        id: 'p1',
        code: 'PL-01',
        name: 'Main Boulevard Commercial & 1 Kanal Belt',
        level: '80-FT WIDE BOULEVARD',
        areaSqm: 200,
        ceilingHeightM: 12.0,
        acousticRt60: 'Boulevard Zone',
        daylightLux: 'Full Solar Exposure',
        materialNote: 'Direct main gate approach with underground utilities, palm-lined median, and street lighting.',
        x: 12,
        y: 20,
        w: 36,
        h: 60,
      },
      {
        id: 'p2',
        code: 'PL-02',
        name: 'Park-Facing 10 Marla Possession Precinct',
        level: '40-FT CARPETED ROAD',
        areaSqm: 150,
        ceilingHeightM: 10.5,
        acousticRt60: 'Park Precinct',
        daylightLux: 'North-Facing Park View',
        materialNote: 'Immediate on-ground possession ready for turnkey house construction.',
        x: 50,
        y: 20,
        w: 22,
        h: 60,
      },
      {
        id: 'p3',
        code: 'PL-03',
        name: 'Executive 5 Marla Residential Blocks',
        level: '35-FT STREET',
        areaSqm: 100,
        ceilingHeightM: 10.5,
        acousticRt60: 'Family Sector',
        daylightLux: 'East/West Orientation',
        materialNote: 'Fully developed blocks adjacent to grand mosque, parks, and commercial hub.',
        x: 74,
        y: 20,
        w: 16,
        h: 60,
      },
    ],
  },
  {
    id: 'phase7-signature-villa',
    accessionCode: 'ALG.2026.02',
    title: 'Phase 7 Landmark & Classical Estates',
    subtitle: '1 KANAL & 10 MARLA TURNKEY ARCHITECTURAL CONSTRUCTION',
    year: '2026 EDITION',
    category: 'Turnkey Construction',
    location: 'PHASE 7 LAHORE',
    coordinates: 'H58P+G6 · AL REHMAN GARDEN PHASE 7',
    areaSqm: 495,
    plotSizeLabel: '1 Kanal (4,500 sq.ft Covered)',
    priceEstimate: 'Turnkey A+ Grade',
    imageUrl: '/assets/aistudio/unnamed_c8dcea04.jpg',
    featuredSpan: false,
    plateVariant: 'kyoto',
    leadParagraph:
      'Inspired by the grand classical and modern architectural landmarks of Al Rehman Garden Phase 7, our builders execute bespoke 10 Marla and 1 Kanal residences from foundation to luxury interior finishing.',
    curatorialEssay:
      'Engineered with Grade-60 deformed structural steel, Awwal kiln-baked brick masonry, and double-height columned porticos or contemporary travertine facades, every home is built under daily engineer supervision.',
    pullQuote:
      'Every slab, foundation beam, and woodwork joint is executed under direct supervision with zero compromise on material specification.',
    pullQuoteAttribution: 'AL-Ghani Real Estate & Builders — Construction Division, Phase 7 Lahore',
    figureCaption: 'Fig. 02 — Grand illuminated classical portico and architectural detailing in Al Rehman Garden Phase 7.',
    parameters: [
      { label: 'PLOT & COVERED AREA', value: '1 KANAL · 4,500 SQ.FT', highlight: true },
      { label: 'LOCATION', value: 'AL REHMAN GARDEN PHASE 7 LAHORE' },
      { label: 'STRUCTURAL SPECIFICATION', value: 'GRADE-60 STEEL & A+ GREY STRUCTURE' },
      { label: 'ACCOMMODATION', value: '5 EN-SUITE BEDROOMS + DOUBLE LOUNGE', highlight: true },
      { label: 'FINISHING GRADE', value: 'IMPORTED PORCELAIN, ASH WOOD & BRONZE' },
      { label: 'CONSULTATION & SITE VISIT', value: 'OPEN DAILY UNTIL 10:00 PM' },
    ],
    zones: [
      {
        id: 'z1',
        code: 'GF-01',
        name: 'Double-Height Grand Portico & Drawing Room',
        level: 'GROUND FLOOR ±0.00m',
        areaSqm: 145,
        ceilingHeightM: 4.2,
        acousticRt60: '0.45s',
        daylightLux: '950 lx (Courtyard Glazing)',
        materialNote: 'Spanish book-matched porcelain tile flooring with solid seasoned Ash wood doors.',
        x: 10,
        y: 22,
        w: 28,
        h: 56,
      },
      {
        id: 'z2',
        code: 'GF-02',
        name: 'Central Courtyard & Family TV Lounge',
        level: 'GROUND FLOOR +0.15m',
        areaSqm: 180,
        ceilingHeightM: 3.8,
        acousticRt60: '0.52s',
        daylightLux: '1,100 lx (North-East Facing)',
        materialNote: 'Travertine feature wall, concealed warm LED coves, and chef kitchen adjacency.',
        x: 40,
        y: 26,
        w: 30,
        h: 48,
      },
      {
        id: 'z3',
        code: 'FF-03',
        name: 'Master Suites & Upper Terrace',
        level: 'FIRST FLOOR +3.95m',
        areaSqm: 170,
        ceilingHeightM: 3.6,
        acousticRt60: '0.38s',
        daylightLux: '680 lx (Louvered Pergola)',
        materialNote: 'Weather-shield exterior elastomer, tempered double glazing, and Grohe sanitary fittings.',
        x: 72,
        y: 22,
        w: 20,
        h: 56,
      },
    ],
  },
  {
    id: 'al-ghani-commercial-plaza',
    accessionCode: 'ALG.2026.03',
    title: 'Phase 7 Main Boulevard Monument & Commercial Hub',
    subtitle: 'HIGH-YIELD COMMERCIAL PLAZAS & BOULEVARD SHOWROOMS',
    year: '2026 INVENTORY',
    category: 'Commercial',
    location: 'PHASE 7 LAHORE',
    coordinates: 'MAIN BOULEVARD · AL REHMAN GARDEN PHASE 7',
    areaSqm: 1120,
    plotSizeLabel: '4 & 8 Marla Commercial',
    priceEstimate: 'Prime Boulevard Frontage',
    imageUrl: '/assets/aistudio/unnamed__1__be030782.jpg',
    featuredSpan: false,
    plateVariant: 'kronos',
    leadParagraph:
      'Situated along the palm-lined illuminated main boulevard of Al Rehman Garden Phase 7, our commercial plots and turnkey plazas offer unmatched visibility for banks, brands, and corporate offices.',
    curatorialEssay:
      'Featuring wide parking bays, underground electrical infrastructure, and high-footfall boulevard connectivity, Phase 7 commercial assets deliver strong rental yield and capital growth.',
    pullQuote:
      'Excellent real estate and construction services. The team is professional, cooperative, and delivers on every commitment.',
    pullQuoteAttribution: 'Hasnain Ahmad, Verified Client Review (5.0 ★)',
    figureCaption: 'Fig. 03 — Nighttime illumination of the Al Rehman Garden Phase 7 main boulevard landmark.',
    parameters: [
      { label: 'COMMERCIAL FOOTPRINT', value: '4 MARLA & 8 MARLA OPTIONS', highlight: true },
      { label: 'ELEVATION', value: 'LOWER GROUND + GROUND + 3 FLOORS' },
      { label: 'FRONTAGE', value: 'TEMPERED CURTAIN WALL & ALCOBOND' },
      { label: 'INVESTMENT RETURN', value: 'HIGH RENTAL & CAPITAL APPRECIATION', highlight: true },
      { label: 'PARKING', value: 'DEDICATED BOULEVARD & BASEMENT BAYS' },
      { label: 'APPROVAL STATUS', value: 'SOCIETY & TMA APPROVED PLANS' },
    ],
    zones: [
      {
        id: 'c1',
        code: 'CM-01',
        name: 'Double-Height Flagship Retail Hall',
        level: 'GROUND FLOOR ±0.00m',
        areaSqm: 420,
        ceilingHeightM: 5.2,
        acousticRt60: '0.50s',
        daylightLux: '1,400 lx (Full Glazed Front)',
        materialNote: '12mm tempered structural glass storefront with heavy-traffic granite flooring.',
        x: 12,
        y: 18,
        w: 48,
        h: 64,
      },
      {
        id: 'c2',
        code: 'CM-02',
        name: 'Executive Corporate Suites (Floors 1–3)',
        level: 'UPPER LEVELS +5.20m',
        areaSqm: 490,
        ceilingHeightM: 3.6,
        acousticRt60: '0.40s',
        daylightLux: '750 lx (Perimeter Glazing)',
        materialNote: 'Modular office floorplate with high-speed passenger lift and backup generator bay.',
        x: 62,
        y: 18,
        w: 26,
        h: 64,
      },
      {
        id: 'c3',
        code: 'CM-03',
        name: 'Lower Ground Vault & Storage',
        level: 'BASEMENT -3.40m',
        areaSqm: 210,
        ceilingHeightM: 3.2,
        acousticRt60: '0.42s',
        daylightLux: '450 lx (LED Grid)',
        materialNote: 'Waterproofed RCC retaining walls with wide loading ramp access.',
        x: 34,
        y: 34,
        w: 22,
        h: 32,
      },
    ],
  },
  {
    id: 'al-ghani-advisory-headquarters',
    accessionCode: 'ALG.2026.04',
    title: 'AL-Ghani Corporate Consultation & Map Center',
    subtitle: 'ON-SITE MASTER PLAN BRIEFING & FILE VERIFICATION SUITE',
    year: 'OPEN UNTIL 10 PM',
    category: 'Residential',
    location: 'PHASE 7 LAHORE',
    coordinates: 'H58P+G6 · AL REHMAN GARDEN PHASE 7',
    areaSqm: 290,
    plotSizeLabel: '5, 10 Marla & 1 Kanal Maps',
    priceEstimate: 'Free Map & Cost Briefing',
    imageUrl: '/assets/aistudio/unnamed__10__a2636dff.jpg',
    featuredSpan: true,
    plateVariant: 'obsidian',
    leadParagraph:
      'Step inside our air-conditioned executive consultation center in Al Rehman Garden Phase 7 to inspect full-scale block maps, compare plot locations, and review turnkey house construction blueprints.',
    curatorialEssay:
      'Every desk at AL-Ghani Real Estate & Builders is equipped with updated master layout plans of Al Rehman Garden Phase 7. Clients meet directly with Ch. Arshad Arif and our senior property consultants to verify plot coordinates and finalize construction agreements with complete peace of mind.',
    pullQuote:
      'Had a very good experience with Al Ghani Real Estate & Builders. The team was professional, cooperative, and guided me properly throughout the process.',
    pullQuoteAttribution: 'Irfan Rauf, Verified Client Review (5.0 ★)',
    figureCaption: 'Fig. 04 — Inside the AL-Ghani Real Estate & Builders executive consultation hall in Phase 7.',
    parameters: [
      { label: 'PRINCIPAL CEO', value: 'CH. ARSHAD ARIF', highlight: true },
      { label: 'DIRECT CONTACT', value: '+92 303 0823898 (0303-0823898)' },
      { label: 'AUTHORISED PARTNER', value: 'AL-REHMAN DEVELOPERS & TOWN PLANNERS' },
      { label: 'MAP CONSULTATION', value: 'FULL BLOCK & SECTOR MASTER PLANS', highlight: true },
      { label: 'OFFICE HOURS', value: 'OPEN 7 DAYS · CLOSES 10:00 PM' },
      { label: 'GOOGLE RATING', value: '5.0 ★ (12 VERIFIED REVIEWS)' },
    ],
    zones: [
      {
        id: 'm1',
        code: 'OF-01',
        name: 'Principal Executive Desk (Ch. Arshad Arif)',
        level: 'GROUND LEVEL ±0.00m',
        areaSqm: 95,
        ceilingHeightM: 3.6,
        acousticRt60: '0.42s',
        daylightLux: '650 lx (Warm Track LED)',
        materialNote: 'Executive consultation table with master society maps and digital ledger display.',
        x: 12,
        y: 24,
        w: 26,
        h: 52,
      },
      {
        id: 'm2',
        code: 'OF-02',
        name: 'Advisory Workstations & Map Tables',
        level: 'GROUND LEVEL ±0.00m',
        areaSqm: 115,
        ceilingHeightM: 3.6,
        acousticRt60: '0.44s',
        daylightLux: '620 lx',
        materialNote: 'Three dedicated plot and construction advisory desks with full Phase 7 charts.',
        x: 40,
        y: 20,
        w: 30,
        h: 60,
      },
      {
        id: 'm3',
        code: 'OF-03',
        name: 'Client Hospitality & Family Waiting Lounge',
        level: 'GROUND LEVEL ±0.00m',
        areaSqm: 80,
        ceilingHeightM: 3.6,
        acousticRt60: '0.38s',
        daylightLux: '540 lx (Boulevard View)',
        materialNote: 'Full-length leather sofa seating and tempered glass storefront entrance.',
        x: 72,
        y: 24,
        w: 18,
        h: 52,
      },
    ],
  },
];

export const MATERIAL_SPECIMENS: MaterialSpecimen[] = [
  {
    id: 'grade60-rcc-brick',
    code: 'MAT-01',
    name: 'Awwal Brick Masonry & Grade-60 RCC Structure',
    origin: 'Mughal / Amreli Grade-60 Steel & DG/Maple Leaf Cement',
    category: 'Grey Structure Foundation',
    densityKgM3: 2450,
    thermalConductivity: '1.45 W/m·K',
    acousticAbsorption: '52 dB Wall Sound Isolation',
    embodiedCarbonFactor: 0.72,
    patinaEvolution: 'Zero-settlement foundation with bitumen damp-proof course (DPC) and anti-termite treatment.',
    description:
      'Every AL-Ghani grey structure uses 100% first-class (Awwal) kiln bricks, Lawrencepur river sand, Margalla crush, and tested Grade-60 deformed steel bars.',
    swatchColors: ['#14171F', '#232834', '#383E4C'],
    grainType: 'concrete',
  },
  {
    id: 'ash-teak-woodwork',
    code: 'MAT-02',
    name: 'Seasoned Solid Ash & Burma Teak Joinery',
    origin: 'Kiln-Seasoned Architectural Timber',
    category: 'Doors, Wardrobes & Acoustic Paneling',
    densityKgM3: 680,
    thermalConductivity: '0.14 W/m·K',
    acousticAbsorption: 'Solid Core 42mm Doors',
    embodiedCarbonFactor: 0.32,
    patinaEvolution: 'Finished in Italian polyurethane matte lacquer; resists humidity and warping across monsoon cycles.',
    description:
      '8-foot-tall solid wood main entrance portals, CNC-routed drawing room dividers, and moisture-resistant UV kitchen cabinetry.',
    swatchColors: ['#1C1917', '#3B2E25', '#5C4636'],
    grainType: 'timber',
  },
  {
    id: 'architectural-bronze-glass',
    code: 'MAT-03',
    name: 'Anodized Architectural Bronze & Tempered Glazing',
    origin: '1.6mm Gauge Aluminum & 8mm/12mm Tempered Glass',
    category: 'Windows, Louvers & Storefronts',
    densityKgM3: 2710,
    thermalConductivity: 'Double-Glazed Thermal Break',
    acousticAbsorption: '36 dB Exterior Traffic Attenuation',
    embodiedCarbonFactor: 0.65,
    patinaEvolution: 'Weather-sealed EPDM gaskets and champagne-bronze powder coating impervious to UV fade.',
    description:
      'Floor-to-ceiling sliding patio windows, office glass storefronts, front elevation sun-control louvers, and frameless tempered staircase balustrades.',
    swatchColors: ['#6E5229', '#B8925A', '#D2AE78'],
    grainType: 'bronze',
  },
  {
    id: 'spanish-porcelain-granite',
    code: 'MAT-04',
    name: 'Book-Matched Porcelain & Black Galaxy Granite',
    origin: 'Imported AAA-Grade Large Format Slabs',
    category: 'Flooring, Stair Treads & Vanities',
    densityKgM3: 2640,
    thermalConductivity: '2.40 W/m·K (Cool Footfall)',
    acousticAbsorption: 'Epoxy Grouted Zero-Joint',
    embodiedCarbonFactor: 0.45,
    patinaEvolution: 'Stain-proof, scratch-resistant vitrified surface maintaining mirror or honed satin sheen.',
    description:
      '24x48 and 32x64 inch rectified porcelain tiles laid with laser-level precision and solid granite staircase steps with concealed LED nosing.',
    swatchColors: ['#292E33', '#444C54', '#6A737B'],
    grainType: 'quartzite',
  },
  {
    id: 'travertine-rockwall',
    code: 'MAT-05',
    name: 'Natural Travertine Stone & Weather-Shield Rockwall',
    origin: 'Quarry-Cut Exterior Cladding & ICI Weather-Shield',
    category: 'Exterior Elevation & Thermal Envelope',
    densityKgM3: 2390,
    thermalConductivity: '1.38 W/m·K',
    acousticAbsorption: 'Natural Porous Stone Cavity',
    embodiedCarbonFactor: 0.38,
    patinaEvolution: 'Repels dust and monsoon rain while giving the house a timeless limestone monograph presence.',
    description:
      'Hand-selected natural travertine slabs mechanically anchored to the front facade alongside multi-coat elastomeric rockwall textures.',
    swatchColors: ['#D5CBBF', '#E6DFD5', '#F4EFE8'],
    grainType: 'travertine',
  },
];
