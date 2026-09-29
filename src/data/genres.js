export const featuredMoviePoster = {
  id: 'the-last-signal',
  title: 'The Last Signal',
  eyebrow: 'Seleção ScreenRate',
  palette: ['#080609', '#5d101d', '#e7a36c'],
  motif: 'signal',
  featured: true,
};

export const genres = [
  {
    id: 'acao',
    number: '01',
    name: 'Ação',
    caption: 'Pulso, velocidade e escolhas no limite.',
    color: '#a81d28',
    posters: [
      { id: 'impacto-zero', title: 'Impacto Zero', eyebrow: 'Ação · 2026', palette: ['#100405', '#8f1720', '#f49a5a'], motif: 'signal' },
      { id: 'linha-de-fogo', title: 'Linha de Fogo', eyebrow: 'Ação · 2025', palette: ['#080808', '#5f170d', '#d97132'], motif: 'room' },
      { id: 'velocidade-terminal', title: 'Velocidade Terminal', eyebrow: 'Ação · 2026', palette: ['#0a0c0d', '#343d42', '#dd423c'], motif: 'lines' },
    ],
  },
  {
    id: 'terror',
    number: '02',
    name: 'Terror',
    caption: 'O que não vemos também conta a história.',
    color: '#69121b',
    posters: [
      { id: 'quarto-17', title: 'Quarto 17', eyebrow: 'Terror · 2025', palette: ['#050506', '#24141b', '#ae2734'], motif: 'room' },
      { id: 'vigilia', title: 'Vigília', eyebrow: 'Terror · 2026', palette: ['#080909', '#1e352f', '#a3c7a7'], motif: 'moon' },
      { id: 'a-casa-escuta', title: 'A Casa Escuta', eyebrow: 'Terror · 2024', palette: ['#0b0909', '#4c3030', '#c2ad95'], motif: 'portal' },
    ],
  },
  {
    id: 'ficcao',
    number: '03',
    name: 'Ficção',
    caption: 'Novos mundos para perguntas antigas.',
    color: '#263b4d',
    posters: [
      { id: 'orbita', title: 'Órbita', eyebrow: 'Ficção · 2026', palette: ['#05070b', '#163b59', '#8fd2ef'], motif: 'moon' },
      { id: 'paralaxe', title: 'Paralaxe', eyebrow: 'Ficção · 2025', palette: ['#08070c', '#3d2358', '#d589da'], motif: 'portal' },
      { id: 'sinal-de-origem', title: 'Sinal de Origem', eyebrow: 'Ficção · 2026', palette: ['#07100e', '#205347', '#99e4c1'], motif: 'signal' },
    ],
  },
  {
    id: 'drama',
    number: '04',
    name: 'Drama',
    caption: 'Histórias que continuam depois dos créditos.',
    color: '#69412f',
    posters: [
      { id: 'entre-estacoes', title: 'Entre Estações', eyebrow: 'Drama · 2025', palette: ['#0d0a08', '#67402b', '#e3bd89'], motif: 'horizon' },
      { id: 'dias-de-cinza', title: 'Dias de Cinza', eyebrow: 'Drama · 2026', palette: ['#0a0b0d', '#444952', '#cbd0d6'], motif: 'lines' },
      { id: 'o-ultimo-verao', title: 'O Último Verão', eyebrow: 'Drama · 2024', palette: ['#140907', '#8a4229', '#ffc173'], motif: 'sun' },
    ],
  },
  {
    id: 'comedia',
    number: '05',
    name: 'Comédia',
    caption: 'O inesperado muda tudo — inclusive você.',
    color: '#814522',
    posters: [
      { id: 'plano-b', title: 'Plano B', eyebrow: 'Comédia · 2026', palette: ['#0f0c07', '#a95c25', '#ffd373'], motif: 'signal' },
      { id: 'segunda-chance', title: 'Segunda Chance', eyebrow: 'Comédia · 2025', palette: ['#08100e', '#2f6e5e', '#f1d47b'], motif: 'sun' },
      featuredMoviePoster,
    ],
  },
];

export const transitionPosters = [
  genres[0].posters[0],
  genres[1].posters[1],
  genres[2].posters[0],
  genres[3].posters[2],
  genres[4].posters[2],
];
