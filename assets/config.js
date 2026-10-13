/* Dados do site — edite apenas este arquivo para atualizar informações */
/* =========================================================
   CONFIG — fonte única dos dados comerciais
   ---------------------------------------------------------
   IMPORTANTE (Perfil da Empresa no Google): nome, endereço e
   telefone abaixo devem ser IDÊNTICOS aos cadastrados no Perfil.
   Divergências prejudicam o SEO local.
   • null = ainda não confirmado.
   • demoMode: true mostra [PLACEHOLDERS]; false oculta o que falta.
   ========================================================= */
const CONFIG = {
  demoMode: true,

  business: {
    name: 'Gleicianne Sousa',      // nome exatamente como no Perfil da Empresa
    fullName: null                 // [NOME COMPLETO DA PROFISSIONAL]
  },

  social: {
    instagram: 'https://instagram.com/gleiciannesoussa',
    instagramHandle: '@gleiciannesoussa',
    linktree: 'https://linktr.ee/gleiciannesoussa'
  },

  contact: {
    whatsapp: null,        // Ex.: '5585912345678' (DDI + DDD + número, só dígitos)
    phone: null,           // telefone para ligação, se houver. Ex.: '5585912345678'
    phoneDisplay: null,    // Ex.: '(85) 91234-5678'
    greeting: 'Olá, Gleicianne!'
  },

  location: {
    street: null,          // [ENDEREÇO DO ESTÚDIO] Ex.: 'Rua Exemplo, 123, sala 4'
    neighborhood: null,    // Ex.: 'Aldeota'
    city: 'Fortaleza',
    state: 'CE',
    postalCode: null,
    lat: null, lng: null   // coordenadas do Perfil (opcional, melhora o mapa e o schema)
  },

  google: {
    profileUrl: null,      // link do Perfil da Empresa (Maps). Usado em "Como chegar" e no schema.
    reviewUrl: null        // link "Pedir avaliações" do Perfil. Exibe o botão "Avaliar no Google".
  },

  /* [HORÁRIOS DE ATENDIMENTO] — dias: Mo Tu We Th Fr Sa Su
     Ex.: [{ days: ['Mo','Tu','We','Th','Fr'], opens: '09:00', closes: '18:00' },
           { days: ['Sa'], opens: '08:00', closes: '12:00' }] */
  hours: null,

  policies: {
    maintenance: null,     // [POLÍTICA DE MANUTENÇÃO]
    cancellation: null     // [POLÍTICA DE CANCELAMENTO]
  },

  /* Informações do perfil do Instagram — confirmar antes de publicar */
  credentials: {
    show: true,
    note: 'Informações divulgadas pela própria profissional.',
    items: [
      { value: '+100', label: 'alunas formadas' },
      { value: '1º lugar', label: 'em campeonato de cílios' },
      { value: 'Mentora', label: 'e palestrante' }
    ]
  },

  /* Dados comerciais de cada serviço (os textos de apresentação ficam no HTML) */
  services: {
    extensao: {
      image: { src: null, alt: 'Extensão de cílios', tone: 'nude' },
      details: [
        { label: 'Técnicas', value: null, ph: 'TÉCNICAS DISPONÍVEIS' },
        { label: 'Efeitos', value: null, ph: 'DESCRIÇÃO DOS EFEITOS' }
      ],
      duration: null, price: null, prep: null
    },
    manutencao: {
      image: { src: null, alt: 'Manutenção de cílios', tone: 'blush' },
      details: [{ label: 'Intervalos e condições', value: null, ph: 'INTERVALOS E CONDIÇÕES DE MANUTENÇÃO' }],
      duration: null, price: null, prep: null
    },
    sobrancelhas: {
      image: { src: null, alt: 'Design de sobrancelhas', tone: 'champ' },
      details: [{ label: 'Procedimentos', value: null, ph: 'PROCEDIMENTOS CONFIRMADOS' }],
      duration: null, price: null, prep: null
    },
    outros: {          // card oculto fora do modo demo enquanto não houver serviços confirmados
      image: { src: null, alt: 'Outros cuidados com o olhar', tone: 'ink' },
      details: [{ label: 'Serviços', value: null, ph: 'SERVIÇOS ADICIONAIS CONFIRMADOS' }],
      duration: null, price: null, prep: null
    }
  },

  /* Estilos — fora do modo demo só aparecem com confirmed: true */
  styles: [
    { confirmed: false, image: { src: null, alt: 'Extensão de cílios estilo clássico', tone: 'champ' } },
    { confirmed: false, image: { src: null, alt: 'Extensão de cílios estilo volume', tone: 'nude' } }
  ],

  courses: [
    { name: null, ph: 'NOME DO CURSO 1', format: null, nextClass: null },
    { name: null, ph: 'NOME DO CURSO 2', format: null, nextClass: null }
  ],

  mentoring: { audience: null, format: null, howTo: null },

  images: {
    heroMain:   { src: null, alt: 'Close-up de olhar com extensão de cílios', tone: 'blush' },
    heroDetail: { src: null, alt: 'Detalhe ampliado de fios de cílios', tone: 'ink' },
    portrait:   { src: null, alt: 'Retrato profissional de Gleicianne Sousa', tone: 'champ' }
  },
  process: [
    { src: null, alt: 'Conversa inicial no estúdio', tone: 'nude' },
    { src: null, alt: 'Aplicação de extensão de cílios', tone: 'champ' },
    { src: null, alt: 'Resultado de extensão de cílios', tone: 'blush' }
  ],

  /* Resultados — cat: cilios | sobrancelhas | bastidores. Use apenas fotos autorizadas. */
  gallery: [
    { cat: 'cilios',       ratio: '4/5', tone: 'blush', src: null, alt: 'Resultado de extensão de cílios', caption: null },
    { cat: 'cilios',       ratio: '1/1', tone: 'ink',   src: null, alt: 'Close-up de fios de extensão de cílios', caption: null },
    { cat: 'sobrancelhas', ratio: '3/4', tone: 'champ', src: null, alt: 'Resultado de design de sobrancelhas', caption: null },
    { cat: 'cilios',       ratio: '4/3', tone: 'nude',  src: null, alt: 'Olhar com extensão de cílios', caption: null },
    { cat: 'bastidores',   ratio: '4/5', tone: 'champ', src: null, alt: 'Bastidores do atendimento no estúdio', caption: null },
    { cat: 'cilios',       ratio: '2/3', tone: 'blush', src: null, alt: 'Detalhe de extensão de cílios', caption: null },
    { cat: 'sobrancelhas', ratio: '1/1', tone: 'nude',  src: null, alt: 'Detalhe de sobrancelha após design', caption: null },
    { cat: 'cilios',       ratio: '3/4', tone: 'champ', src: null, alt: 'Resultado de extensão de cílios', caption: null },
    { cat: 'bastidores',   ratio: '1/1', tone: 'blush', src: null, alt: 'Preparação do atendimento', caption: null },
    { cat: 'cilios',       ratio: '4/3', tone: 'ink',   src: null, alt: 'Close-up de olhar com extensão', caption: null },
    { cat: 'sobrancelhas', ratio: '4/5', tone: 'blush', src: null, alt: 'Resultado de design de sobrancelhas', caption: null }
  ],

  /* Google Ads / Analytics — deixe null até criar as contas.
     Os cliques em WhatsApp, Ligar e Como chegar viram conversões. */
  tracking: {
    ga4: null,             // Ex.: 'G-XXXXXXXXXX'
    googleAds: null,       // Ex.: 'AW-123456789'
    conversions: {
      whatsapp: null,      // Ex.: 'AW-123456789/AbCdEfGh'
      call: null,
      directions: null,
      form: null
    }
  },

  /* Capas dos artigos do blog (chave = nome do arquivo do artigo, sem .html) */
  blog: {
    'cuidados-extensao-de-cilios': { src: null, alt: 'Cuidados com a extensão de cílios: o que fazer e o que evitar', tone: 'blush' },
    'estilos-extensao-de-cilios-classico-volume-hibrido': { src: null, alt: 'Clássico, volume ou híbrido: entenda os estilos de extensão de cílios', tone: 'nude' },
    'manutencao-extensao-de-cilios': { src: null, alt: 'Manutenção da extensão de cílios: por que e quando fazer', tone: 'champ' },
  },

  seo: {
    siteUrl: null,         // URL final do site, sem barra no fim. Ex.: 'https://gleiciannesousa.com.br'
    ogImage: null,         // imagem de compartilhamento 1200×630
    favicon: null
  }
};
