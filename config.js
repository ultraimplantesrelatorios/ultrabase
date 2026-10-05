window.ULTRA_CONFIG = {
  app: {
    version: '2.0.0',
    baseLabel: 'Base Mestre V6',
    storageName: 'ultra-central-v2',
    privacyMode: 'local',
    enablePWA: true
  },
  brand: {
    name: 'Ultra Implantes',
    productName: 'Central de Inteligência',
    location: 'Osasco/SP',
    pageTitle: 'Ultra Implantes — Central de Inteligência',
    logos: {
      main: 'assets/ultra-logo.png',
      icon: 'assets/ultra-icon.png',
      rdConversas: 'assets/rd-conversas.png',
      rdIcon: 'assets/rd-icon.png'
    }
  },
  theme: {
    orange: '#ff6a00',
    orangeStrong: '#e95f00',
    orangeSoft: '#fff2e8',
    graphite: '#24262b',
    graphite2: '#15171b',
    muted: '#6f737b',
    background: '#f6f7f9',
    surface: '#ffffff',
    line: '#e7e9ed',
    success: '#18794e',
    warning: '#a15c00',
    danger: '#b42318',
    info: '#175cd3',
    contentMax: '1440px',
    radius: '18px'
  },
  texts: {
    humanRule: 'A IA da Ultra precisa saber odontologia em nível sênior, mas falar como uma ótima pessoa de atendimento. Ela pensa tecnicamente por dentro e conversa de forma simples, humana e cuidadosa por fora.',
    privacy: 'Modo local: os arquivos importados ficam neste navegador. Para produção com dados reais de pacientes, use backend autenticado e controles compatíveis com LGPD.'
  }
};

(function applyUltraConfig(){
  const cfg = window.ULTRA_CONFIG;
  const root = document.documentElement;
  const vars = {
    '--orange': cfg.theme.orange,
    '--orange-strong': cfg.theme.orangeStrong,
    '--orange-soft': cfg.theme.orangeSoft,
    '--ink': cfg.theme.graphite,
    '--ink-2': cfg.theme.graphite2,
    '--muted': cfg.theme.muted,
    '--bg': cfg.theme.background,
    '--surface': cfg.theme.surface,
    '--line': cfg.theme.line,
    '--success': cfg.theme.success,
    '--warning': cfg.theme.warning,
    '--danger': cfg.theme.danger,
    '--info': cfg.theme.info,
    '--content': cfg.theme.contentMax,
    '--radius': cfg.theme.radius
  };
  Object.entries(vars).forEach(([k,v])=>root.style.setProperty(k,v));
  document.title = cfg.brand.pageTitle;
})();
