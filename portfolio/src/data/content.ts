import type { Stat, TimelineStep, ValueCard } from '@/types'

/** Hero / stats / about / home content — kept out of the templates. */

export const heroContent = {
  label: 'FULL STACK DEVELOPER',
  headingStart: "Salam, men",
  headingAccent: 'Nepes Sopyyev',
  subtitle: 'Full Stack Developer',
  description:
    'Men häzirki zaman web we mobil programmalary arassa kod, döredijilik dizaýn we hakyky dünýä meselelerine üns bermek bilen gurýaryn.',
  primaryCta: { label: 'Proýektlerimi gör', to: '/projects' },
  secondaryCta: { label: 'Habarlaş', to: '/contact' },
  imagePlaceholderLabel: 'Profil suratyňyzy şu ýere goýuň',
  imagePlaceholderHint: 'Maslahat: 1000 × 1250 px portret, JPG ýa-da WebP',
}

export const stats: Stat[] = [
  { id: 'projects', value: '5+', label: 'Tamamlanan Proýektler', icon: 'folder-check' },
  { id: 'years', value: '2+', label: 'Öwreniş Ýyllary', icon: 'graduation-cap' },
  { id: 'technologies', value: '10+', label: 'Tehnologiýalar', icon: 'layers' },
  { id: 'motivation', value: '100%', label: 'Höwes', icon: 'flame' },
]

export const aboutContent = {
  label: 'MEN BARADA',
  heading: 'Men barada biraz',
  intro:
    "Men Nepes Sopyyev, Türkmenistandan höwesli Full Stack Developer. Men web we mobil programmalary gurmakdan, täze tehnologiýalary öwrenmekden we kod bilen hakyky dünýä meselelerini çözmekden lezzet alýaryn.",
  second:
    "Meniň ýolum bilesigelijilik bilen başlady, indi bolsa ösüşe bolan güýçli höwese öwrüldi. Men hemişe täze mümkinçiliklere, hyzmatdaşlyklara we gyzykly proýektlere açyk.",
  imagePlaceholderLabel: 'Profil suratyňyzy şu ýere goýuň',
  imagePlaceholderHint: 'Inedördül surat maslahat berilýär — 1000 × 1000 px',
  facts: [
    { label: 'Ýerleşýän ýeri', value: 'Aşgabat, Türkmenistan' },
    { label: 'Ugur', value: 'Full Stack · Web & Mobil' },
    { label: 'Häzirki wagtda', value: 'AI esasly önümler gurýaryn' },
    { label: 'Açyk', value: 'Hyzmatdaşlyklar & täze mümkinçilikler' },
  ],
}

export const values: ValueCard[] = [
  {
    title: 'Mesele Çözmek',
    description: 'Iň gowy tehniki çözgütleri tapmakdan lezzet alýaryn.',
    icon: 'lightbulb',
  },
  {
    title: 'Topar Oýunçysy',
    description: 'Anyk aragatnaşyga we toparlaýyn işe baha berýärin.',
    icon: 'users',
  },
  {
    title: 'Hemişelik Öwrenmek',
    description: 'Endiklerimi we bilimimi hemişe kämilleşdirýärin.',
    icon: 'trending-up',
  },
  {
    title: 'Maksada Gönükdirilen',
    description: 'Pikirleri hakyky önümlere öwürýärin.',
    icon: 'target',
  },
]

export const journey: TimelineStep[] = [
  {
    phase: 'Ädim 01',
    title: 'Öwrenmek',
    description: 'Esaslardan başladym — webiň nähili işleýändigi, HTML, CSS we programmirleme esaslary.',
    icon: 'book-open',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    phase: 'Ädim 02',
    title: 'Frontend Ösüşi',
    description: 'Vue, React, TypeScript we Tailwind CSS bilen komponent esasly interfeýslere geçdim.',
    icon: 'monitor',
    tags: ['Vue 3', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    phase: 'Ädim 03',
    title: 'Backend Ösüşi',
    description: 'API-lary, maglumat bazalaryny we serwer tarapy logikasyny Node.js we Express bilen öwrendim.',
    icon: 'server',
    tags: ['Node.js', 'Express'],
  },
  {
    phase: 'Ädim 04',
    title: 'AI / RAG Proýektleri',
    description: 'Melhem AI ýaly hakyky önümlere AI we kompýuter görnüşini goşdum.',
    icon: 'sparkles',
    tags: ['AI / RAG', 'OpenCV'],
  },
]

export const homeSections = {
  statsLabel: 'SANLAR BILEN',
  statsHeading: 'Işlerimiň gysga beýany',
  projectsLabel: 'SAÝLANAN IŞLER',
  projectsHeading: 'Saýlanan Proýektler',
  projectsDescription:
    'Men döreden we guran önümlerimiň saýlanyşy — AI saglyk platformalaryndan full stack programmalara çenli.',
  ctaTitle: 'Aýdyňyzda proýekt barmy?',
  ctaDescription:
    "Men hemişe täze mümkinçiliklere, hyzmatdaşlyklara we gyzykly söhbetdeşliklere açyk. Geliň peýdaly bir zat gurarys.",
}
