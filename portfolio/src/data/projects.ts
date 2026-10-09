import type { Project, ProjectCategory } from '@/types'

/**
 * ---------------------------------------------------------------------------
 * PROJECT DATA
 * ---------------------------------------------------------------------------
 * All project cards are rendered from this array — nothing is hardcoded in a
 * template. To add a project, append an object here and it appears in the
 * grid, in the filters and at /projects/<slug> automatically.
 *
 * `image: ''` renders the polished placeholder. Set `image` to a real URL or
 * an imported asset (e.g. `new URL('../assets/melhem.png', import.meta.url).href`)
 * to swap the placeholder for a real screenshot.
 * `repo` is only the repository NAME — the full URL is built from the single
 * `githubUsername` in src/config/site.ts.
 */

export const PROJECT_CATEGORIES: readonly (ProjectCategory | 'All')[] = [
  'All',
  'Web Apps',
  'Full Stack',
  'Mobile',
  'AI / ML',
  'Other',
] as const

export const projects: Project[] = [
  {
    id: 'p-melhem-ai',
    slug: 'melhem-ai',
    title: 'Melhem AI',
    titleAccent: 'AI',
    tagline: 'Türkmenistan üçin AI esasly sanly saglyk platformasy.',
    description: 'Türkmenistan üçin AI esasly sanly saglyk platformasy.',
    longDescription:
      'Melhem AI — ygtybarly lukmançylyk maglumatlary, ilkinji kömek gollanmasy, dermanlyk ösümlikler maglumat bazasy, donor ulgamy we saglyk merkezleri hem-de lukmanlar barada maglumat berýän häzirki zaman web platformasydyr.',
    category: 'AI / ML',
    technologies: ['Vue 3', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'AI / RAG'],
    image: '/projects/melhem-ai.jpg',
    imageAlt: 'Melhem AI — Dermanlyk Ösümlikler esasy ekran suraty',
    gallery: ['/projects/melhem-ai.jpg'],
    features: [
      {
        title: 'AI lukmançylyk kömekçisi',
        description:
          'Saglyk soraglaryna lukmançylyk bilim bazasyndan jogap berýän AI kömekçisi.',
        icon: 'bot',
      },
      {
        title: 'Ilkinji kömek görkezmeleri',
        description:
          'Ýanyklar, gan akmalar, döwükler, zäherlenme we başgalar üçin ädim-ädimli gyssagly kömek gollanmasy.',
        icon: 'heart-pulse',
      },
      {
        title: 'Dermanlyk ösümlikler',
        description:
          'Ýerli dermanlyk ösümlikleriň gözleg bazasy — düşündirişler, ulanylşy we tanalmasy.',
        icon: 'leaf',
      },
      {
        title: 'Donor / gan tabşyryş ulgamy',
        description:
          'Donor bolup hasaba alynyň, gan topary we şäher boýunça gözläň, kömek gerek adamlar bilen çalt aragatnaşyga geçiň.',
        icon: 'droplet',
      },
      {
        title: 'Saglyk merkezleri we lukmanlar',
        description:
          'Klinikalaryň, hassahanalaryň we lukmanlaryň aragatnaşyk maglumatlary bolan ulgam.',
        icon: 'hospital',
      },
    ],
    architecture: [
      { label: 'Vue Frontend', detail: 'Vue 3 + TypeScript SPA, Tailwind UI, Vue Router', icon: 'monitor' },
      { label: 'Express API', detail: 'REST endpointleri, tassyklama we auth middleware', icon: 'server' },
      { label: 'Prisma', detail: 'Tip-ygtybarly ORM gatlagy we migrasiýalar', icon: 'layers' },
      { label: 'SQLite Database', detail: 'Lukmançylyk mazmuny, donorlar we ulanyjylar üçin saklanylýan maglumatlar', icon: 'database' },
      { label: 'AI / RAG Layer', detail: 'Lukmançylyk bilim bazasyndan gözleg we jogap', icon: 'sparkles' },
    ],
    caseStudy: [
      {
        id: 'problem',
        index: '01',
        title: 'Mesele',
        paragraphs: [
          'Türkmenistanda ygtybarly saglyk maglumatlaryna ýetmek kyn: bilim makalalarda, sosial mediýada we agyzdan-agza ýaýraýar.',
          'Gyssagly ýagdaýda adamlara anyk ilkinji kömek ädimleri gerek. Donor gözlemek we degişli klinikany ýa-da lukmany tapmak hem haýal, el bilen edilýän prosesler.',
        ],
        bullets: [
          'Bölünen, tassyklanmadyk lukmançylyk maglumatlary',
          'Çalt, gurluşly ilkinji kömek salgylanmasy ýok',
          'Gyssagly ýagdaýlarda haýal gan donory gözlegi',
          'Klinika we lukman aragatnaşyk maglumatlaryna kyn ýetmek',
        ],
      },
      {
        id: 'solution',
        index: '02',
        title: 'Çözgüt',
        paragraphs: [
          'Melhem AI bu zerurlyklary bir platformada birleşdirýär: seljerilen lukmançylyk bilim bazasy, AI kömekçisi, ilkinji kömek gollanmalary, dermanlyk ösümlikler bazasy, donor ulgamy we saglyk merkezleri ulgamy.',
          'Kömekçi RAG (Retrieval-Augmented Generation) esaslydyr — jogaplar platformanyň öz seljerilen mazmunyndan alynýar.',
        ],
        bullets: [
          'Saglyk maglumatlary üçin ýeke-täk ygtybarly giriş nokady',
          'Seljerilen bilim bazasyndan esaslanan jogaplar',
          'Gurluşly, aňsat okalýan gyssagly görkezmeler',
          'Donor gözlegi we klinika ulgamy bir appda',
        ],
      },
      {
        id: 'architecture',
        index: '03',
        title: 'Arhitektura',
        paragraphs: [
          'Platforma arassa müşderi → API → maglumat akymyny yzarlaýar. Vue 3 frontend Express REST API bilen aragatnaşyk saklaýar, ol bolsa Prisma arkaly SQLite-de maglumatlary saklaýar.',
        ],
        bullets: [
          'Frontend we backend arasynda tipleşdirilen REST şertnamalary',
          'Prisma sxemasy maglumatlaryň ýeke-täk hakykat çeşmesi',
          'RAG pipeline API çäginiň arkasynda izolýasiýa edilen',
          'Gizlin açarlar we model açarlary serwer tarapynda galýar',
        ],
      },
      {
        id: 'features',
        index: '04',
        title: 'Aýratynlyklar',
        paragraphs: [
          'Bäş aýratynlyk ugry bilelikde iberilýär, her biri ulanyjylar üçin anyk zerurlygy çözýär.',
        ],
        bullets: [
          'AI lukmançylyk kömekçisi (RAG)',
          'Ilkinji kömek görkezmeleri kitaphanasy',
          'Dermanlyk ösümlikleri tanamak',
          'Donor / gan tabşyryş ulgamy',
          'Saglyk merkezleri we lukmanlar ulgamy',
        ],
      },
      {
        id: 'technologies',
        index: '05',
        title: 'Tehnologiýalar',
        paragraphs: [
          'Vue 3 we TypeScript interfeýsi tip-ygtybarly we komponent esasly saklaýar. Express we Prisma API we maglumat gatlagyny dolandyrýar, SQLite ýerli ösüşi we ýerleşdirmegi ýönekeýleşdirýär.',
        ],
      },
      {
        id: 'future',
        index: '06',
        title: 'Geljekki Gowulaşmalar',
        paragraphs: [
          'Platforma üçin meýilleşdirilen indiki ädimler — bular ýol kartasynyň elementleri.',
        ],
        bullets: [
          'Köp dilli mazmun (Türkmen / Iňlis)',
          'Oflaýn-ilkinji mobil programmasy',
          'Tassyklanan lukman hasaplary we duşuşyk bellemek',
          'Her AI jogabynda çeşme salgylanmalary',
          'Surat esasynda ösümlik tanamak',
        ],
      },
    ],
    repo: 'melhem-ai',
    liveUrl: '',
    featured: true,
    year: '2025',
    role: 'Full Stack Developer',
    status: 'In progress',
    accent: 'green',
  },
  {
    id: 'p-oba-hojalyk-ai',
    slug: 'oba-hojalyk-ai',
    title: 'OHU AgroMind',
    titleAccent: 'AgroMind',
    tagline: 'Türkmenistanyň oba hojalygy üçin akylly platforma — AI seljerme, agro risk kartasy we hünärmen maslahatlary.',
    description: 'Türkmenistanyň oba hojalygy üçin akylly platforma — AI seljerme, agro risk kartasy we hünärmen maslahatlary.',
    longDescription:
      'OHU AgroMind — daýhanlar, alymlar we hünärmenler üçin birleşdirilen akylly oba hojalyk platformasy. Ösümlikleriň saglygy, AI seljerme, agro risk kartasy, laboratoriýa barlaglary we howa şertleri bir ýerde jemlenen.',
    category: 'AI / ML',
    technologies: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Docker'],
    image: '/projects/akylly-oba-hojalyk.jpg',
    imageAlt: 'OHU AgroMind — Akylly oba hojalyk platformasy esasy ekran suraty',
    gallery: ['/projects/akylly-oba-hojalyk.jpg'],
    features: [
      {
        title: 'Ösümlikleriň kesellerini tanamak',
        description: 'Ösümligiň suratyny ýükläň ýa-da düşüriň we keseliň diagnozyny alyň.',
        icon: 'scan-line',
      },
      {
        title: 'Surat gaýtadan işlemek',
        description: 'OpenCV öňünden gaýtadan işlemesi analizden öň ýagtylygy we çarçuwany kadalaşdyrýar.',
        icon: 'image',
      },
      {
        title: 'Hünärmen diagnoz',
        description: 'Bejeriş we öňüni alyş gollanmasy bilen gurluşly diagnoz çykyşy.',
        icon: 'stethoscope',
      },
      {
        title: 'Meýdan üçin amatly UI',
        description: 'Açyk howada ulanmak üçin döredilen çalt, mobil-ilkinji interfeýs.',
        icon: 'smartphone',
      },
    ],
    architecture: [
      { label: 'Vue Frontend', detail: 'Surat ýüklemek we netije görmek üçin Vue 3 SPA', icon: 'monitor' },
      { label: 'Flask API', detail: 'Ýüklemek we analiz üçin Python REST endpointleri', icon: 'server' },
      { label: 'OpenCV Pipeline', detail: 'Öňünden gaýtadan işlemek, bölmek we aýratynlyk çykarmak', icon: 'scan-line' },
      { label: 'Model Layer', detail: 'Taýýarlanan surat maglumatlarynda kesel toparlary kesgitlemek', icon: 'sparkles' },
    ],
    caseStudy: [
      {
        id: 'problem',
        index: '01',
        title: 'Mesele',
        paragraphs: [
          'Daýhanlar ösümlikleriň keselini köplenç giç ýüze çykarýarlar, hasyl eýýäm zyýan çekende, we oba hojalyk hünärmenine ýetmek şäherleriň daşynda çäkli.',
        ],
      },
      {
        id: 'solution',
        index: '02',
        title: 'Çözgüt',
        paragraphs: [
          'Daýhanyň ösümligi surata düşürip, diagnoz we maslahat alýan platformasy — hünärmen bilimini meýdanda elýeterli edýär.',
        ],
      },
      {
        id: 'architecture',
        index: '03',
        title: 'Arhitektura',
        paragraphs: [
          'Vue 3 interfeýsi suraty Flask API-a ýükleýär, bu ýerde OpenCV pipeline maglumatlary toparlama gatlagyndan öň taýýarlaýar.',
        ],
      },
      {
        id: 'features',
        index: '04',
        title: 'Aýratynlyklar',
        paragraphs: ['Surat esasynda kesel tanamak, öňünden gaýtadan işlemek pipeline we hünärmen derejeli diagnoz çykyşy.'],
      },
      {
        id: 'technologies',
        index: '05',
        title: 'Tehnologiýalar',
        paragraphs: ['Interfeýs üçin Vue 3, API üçin Python we Flask, surat gaýtadan işlemek üçin OpenCV.'],
      },
      {
        id: 'future',
        index: '06',
        title: 'Geljekki Gowulaşmalar',
        paragraphs: ['Meýilleşdirilen ýol kartasy elementleri.'],
        bullets: [
          'Has uly, ýerli ýygnalan tälim maglumat toplamy',
          'Oflaýn mobil surata düşürmek we soň sinhronlamak',
          'Möwsümleýin maslahat we howa integrasiýasy',
        ],
      },
    ],
    repo: 'oba-hojalyk-ai',
    liveUrl: '',
    featured: true,
    year: '2025',
    role: 'Full Stack Developer',
    status: 'Prototype',
    accent: 'green',
  },
  {
    id: 'p-gbum',
    slug: 'gbum',
    title: 'GBUM — Onlaýn Kurs',
    titleAccent: 'GBUM',
    tagline: 'Goşmaça we üznüksiz bilim üçin onlaýn kurs platformasy.',
    description: 'Goşmaça we üznüksiz bilim üçin onlaýn kurs platformasy.',
    longDescription:
      'GBUM (Goşmaça we Üznüksiz Bilim Merkezi) — talyplar we mugallymlar üçin onlaýn kurs platformasy. Gurluşly kurslar, sapaklar we okuw materiallary arassa, çalt interfeýsde hödürlenýär.',
    category: 'Web Apps',
    technologies: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    image: '/projects/gbum-online.png',
    imageAlt: 'GBUM — ekran suraty',
    gallery: ['/projects/gbum-online.png'],
    features: [
      {
        title: 'Gurluşly kurslar',
        description: 'Materiallar predmet, modul we sapak boýunça tertipleşdirilen.',
        icon: 'book-open',
      },
      {
        title: 'Çalt gözleg',
        description: 'Papkalary dörjemezden temany ýa-da materialy tapyň.',
        icon: 'search',
      },
      {
        title: 'Responsyw okamak',
        description: 'Sapakda noutbukda we leksiýalaryň arasynda telefonda oňaýly.',
        icon: 'smartphone',
      },
    ],
    architecture: [
      { label: 'Vue Frontend', detail: 'Vue 3 + TypeScript bir sahypalyk programma', icon: 'monitor' },
      { label: 'Content Layer', detail: 'Gurluşly mazmun modeli', icon: 'file-json' },
      { label: 'Tailwind UI', detail: 'Yzygiderli, responsyw dizaýn ulgamy', icon: 'palette' },
    ],
    caseStudy: [
      {
        id: 'problem',
        index: '01',
        title: 'Mesele',
        paragraphs: ['Okuw materiallary çatlarda we disklerde dargapdyr, talyplar üçin yzygiderli gurluş ýok.'],
      },
      {
        id: 'solution',
        index: '02',
        title: 'Çözgüt',
        paragraphs: ['Kurslaryň we materiallaryň bir çaklanylýan gurluşda ýerleşýän bir platformasy.'],
      },
      {
        id: 'architecture',
        index: '03',
        title: 'Arhitektura',
        paragraphs: ['Vue 3 frontend gurluşly mazmun modelini okaýar, Tailwind CSS bilen bezelen.'],
      },
      {
        id: 'features',
        index: '04',
        title: 'Aýratynlyklar',
        paragraphs: ['Gurluşly kurslar, çalt gözleg we responsyw okamak.'],
      },
      {
        id: 'technologies',
        index: '05',
        title: 'Tehnologiýalar',
        paragraphs: ['Vue 3, TypeScript, Tailwind CSS we Node.js.'],
      },
      {
        id: 'future',
        index: '06',
        title: 'Geljekki Gowulaşmalar',
        paragraphs: ['Meýilleşdirilen ýol kartasy elementleri.'],
        bullets: ['Mugallym hasaplary we mazmun redaktirlemek', 'Synaglar we öňe gidişlik yzarlamak', 'Maglumat bazasy bilen goldanýan mazmun'],
      },
    ],
    repo: 'gbum',
    liveUrl: '',
    featured: true,
    year: '2025',
    role: 'Frontend Developer',
    status: 'Completed',
    accent: 'purple',
  },
  {
    id: 'p-volleyball-score',
    slug: 'volleyball-score',
    title: 'Volleyball Hasap Tagtasy',
    titleAccent: 'Volleyball',
    tagline: 'Waleybol oýunlary üçin sanly hasap sanaw programasy.',
    description: 'Waleybol oýunlary üçin sanly hasap sanaw programasy.',
    longDescription:
      'Waleybol oýunlary üçin ýönekeý, çalt we ulanmaga aňsat sanly hasap tagtasy. Oýunçylar we tomaşaçylar üçin hakyky wagtda hasap yzarlamak.',
    category: 'Web Apps',
    technologies: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/volleyball-score.jpg',
    imageAlt: 'Volleyball Hasap Tagtasy — ekran suraty',
    gallery: ['/projects/volleyball-score.jpg'],
    features: [
      {
        title: 'Hakyky wagtda hasap',
        description: 'Oýun wagtynda hasaby bir düwmä basmak bilen täzeläň.',
        icon: 'zap',
      },
      {
        title: 'Toparlary dolandyrmak',
        description: 'Topar atlaryny girizmek we hasaby sazlamak.',
        icon: 'users',
      },
      {
        title: 'Mobil amatly',
        description: 'Telefonda we planşetde ulanmaga optimallaşdyrylan.',
        icon: 'smartphone',
      },
    ],
    architecture: [
      { label: 'Vue Frontend', detail: 'Vue 3 + TypeScript SPA', icon: 'monitor' },
      { label: 'Tailwind UI', detail: 'Responsyw dizaýn', icon: 'palette' },
    ],
    caseStudy: [
      {
        id: 'problem',
        index: '01',
        title: 'Mesele',
        paragraphs: ['Waleybol oýunlarynda hasaby yzarlamak üçin amatly sanly gural ýok.'],
      },
      {
        id: 'solution',
        index: '02',
        title: 'Çözgüt',
        paragraphs: ['Ýönekeý, çalt we islendik enjamda işleýän sanly hasap tagtasy.'],
      },
      {
        id: 'architecture',
        index: '03',
        title: 'Arhitektura',
        paragraphs: ['Vue 3 frontend Tailwind CSS bilen bezelen bir sahypalyk programma.'],
      },
      {
        id: 'features',
        index: '04',
        title: 'Aýratynlyklar',
        paragraphs: ['Hakyky wagtda hasap, topar dolandyryşy we mobil goldaw.'],
      },
      {
        id: 'technologies',
        index: '05',
        title: 'Tehnologiýalar',
        paragraphs: ['Vue 3, TypeScript we Tailwind CSS.'],
      },
    ],
    repo: 'volleyball-score',
    liveUrl: '',
    featured: false,
    year: '2025',
    role: 'Frontend Developer',
    status: 'Completed',
    accent: 'blue',
  },
  {
    id: 'p-car-shop',
    slug: 'car-shop',
    title: 'Car Shop',
    titleAccent: 'Car',
    tagline: 'Awtoulag söwda platformasy — satyn almak we satmak.',
    description: 'Awtoulag söwda platformasy — satyn almak we satmak.',
    longDescription:
      'Awtoulaglary gözlemek, süzmek, satyn almak we satmak üçin onlaýn platforma. Ulanyjylar awtoulaglaryny ýerleşdirip, beýleki teklipler bilen deňeşdirip bilýärler.',
    category: 'Full Stack',
    technologies: ['Vue 3', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
    image: '/projects/car-shop.jpg',
    imageAlt: 'Car Shop — ekran suraty',
    gallery: ['/projects/car-shop.jpg'],
    features: [
      {
        title: 'Awtoulag gözlegi',
        description: 'Markasy, ýyly, bahasy we beýleki parametrler boýunça gözleg we süzgüç.',
        icon: 'search',
      },
      {
        title: 'Bildiriş ýerleşdirmek',
        description: 'Ulanyjylar öz awtoulaglaryny suratlar we düşündiriş bilen ýerleşdirip bilýärler.',
        icon: 'file-text',
      },
      {
        title: 'Responsyw dizaýn',
        description: 'Ähli enjamlarda oňaýly ulanylýan interfeýs.',
        icon: 'smartphone',
      },
    ],
    architecture: [
      { label: 'Vue Frontend', detail: 'Vue 3 + TypeScript müşderi programmasy', icon: 'monitor' },
      { label: 'Express API', detail: 'REST API awtoulag maglumatlary üçin', icon: 'server' },
      { label: 'Tailwind UI', detail: 'Responsyw we häzirki zaman dizaýny', icon: 'palette' },
    ],
    caseStudy: [
      {
        id: 'problem',
        index: '01',
        title: 'Mesele',
        paragraphs: ['Awtoulag satyn almak we satmak üçin amatly onlaýn platforma ýok.'],
      },
      {
        id: 'solution',
        index: '02',
        title: 'Çözgüt',
        paragraphs: ['Awtoulag söwdasy üçin ähli zerur aýratynlyklary öz içine alýan bir platforma.'],
      },
      {
        id: 'architecture',
        index: '03',
        title: 'Arhitektura',
        paragraphs: ['Vue 3 frontend Express REST API bilen aragatnaşyk saklaýar.'],
      },
      {
        id: 'features',
        index: '04',
        title: 'Aýratynlyklar',
        paragraphs: ['Awtoulag gözlegi, bildiriş ýerleşdirmek we responsyw dizaýn.'],
      },
      {
        id: 'technologies',
        index: '05',
        title: 'Tehnologiýalar',
        paragraphs: ['Vue 3, TypeScript, Node.js, Express we Tailwind CSS.'],
      },
      {
        id: 'future',
        index: '06',
        title: 'Geljekki Gowulaşmalar',
        paragraphs: ['Meýilleşdirilen ýol kartasy elementleri.'],
        bullets: ['Onlaýn töleg integrasiýasy', 'Aragatnaşyk çat ulgamy', 'Admin paneli'],
      },
    ],
    repo: 'car-shop',
    liveUrl: '',
    featured: false,
    year: '2025',
    role: 'Full Stack Developer',
    status: 'In progress',
    accent: 'blue',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return {}
  return {
    prev: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  }
}
