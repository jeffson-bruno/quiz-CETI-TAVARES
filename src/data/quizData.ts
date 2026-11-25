export interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
  expandedExplanation?: string;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  hint?: string;
  multiSelect?: boolean;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'O que significa lógica de programação?',
    options: [
      {
        id: 'q1-a',
        label: 'Aprender a utilizar redes sociais',
        isCorrect: false,
      },
      {
        id: 'q1-b',
        label: 'Organizar passos para resolver problemas',
        isCorrect: true,
      },
      {
        id: 'q1-c',
        label: 'Consertar computadores',
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    prompt:
      'A tecnologia está presente somente no comércio, sem participação na educação, na saúde ou na comunicação',
    options: [
      {
        id: 'q2-a',
        label: 'Verdadeiro',
        isCorrect: false,
      },
      {
        id: 'q2-b',
        label: 'Falso',
        isCorrect: true,
        expandedExplanation:
          'A tecnologia é utilizada em diferentes setores da sociedade, incluindo educação, saúde, comércio e comunicação.',
      },
    ],
  },
  {
    id: 3,
    prompt: 'Qual atividade está relacionada ao Desenvolvimento Web?',
    options: [
      {
        id: 'q3-a',
        label: 'Organizar arquivos',
        isCorrect: false,
      },
      {
        id: 'q3-b',
        label: 'Consertar peças de computadores',
        isCorrect: false,
      },
      {
        id: 'q3-c',
        label: 'Criar sites e páginas para a internet',
        isCorrect: true,
      },
    ],
  },
  {
    id: 4,
    prompt: 'Qual alternativa apresenta três linguagens de programação citadas na apresentação?',
    options: [
      {
        id: 'q4-a',
        label: 'Python, JavaScript e Java',
        isCorrect: true,
      },
      {
        id: 'q4-b',
        label: 'Android, Windows e Linux',
        isCorrect: false,
      },
      {
        id: 'q4-c',
        label: 'Word, Excel e PowerPoint',
        isCorrect: false,
      },
    ],
  },
  {
    id: 5,
    prompt:
      'Uma escola precisa guardar nomes, notas e informações dos alunos. Qual recurso pode utilizar para organizar esses dados?',
    options: [
      {
        id: 'q5-a',
        label: 'Navegador de internet',
        isCorrect: false,
      },
      {
        id: 'q5-b',
        label: 'Banco de dados',
        isCorrect: true,
      },
      {
        id: 'q5-c',
        label: 'Editor de imagens',
        isCorrect: false,
      },
    ],
  },
  {
    id: 6,
    prompt: 'Quais habilidades podem ser desenvolvidas durante o curso?',
    hint: '(Mais de uma alternativa)',
    multiSelect: true,
    options: [
      {
        id: 'q6-a',
        label: 'Manutenção de computadores',
        isCorrect: false,
      },
      {
        id: 'q6-b',
        label: 'Raciocínio lógico',
        isCorrect: true,
      },
      {
        id: 'q6-c',
        label: 'Criatividade',
        isCorrect: true,
      },
    ],
  },
  {
    id: 7,
    prompt:
      'O que podemos desenvolver utilizando os conhecimentos de Desenvolvimento de Sistemas?',
    options: [
      {
        id: 'q7-a',
        label: 'Sites, aplicativos, jogos e programas',
        isCorrect: true,
      },
      {
        id: 'q7-b',
        label: 'Somente matérias escolares',
        isCorrect: false,
      },
      {
        id: 'q7-c',
        label: 'Equipamentos eletrônicos',
        isCorrect: false,
      },
    ],
  },
  {
    id: 8,
    prompt: 'Como a tecnologia contribui para a sociedade?',
    options: [
      {
        id: 'q8-a',
        label: 'Facilitando a comunicação e limitando o acesso a novos conhecimentos',
        isCorrect: false,
      },
      {
        id: 'q8-b',
        label: 'Impedindo melhorias nos serviços',
        isCorrect: false,
      },
      {
        id: 'q8-c',
        label: 'Facilitando tarefas, melhorando serviços e criando oportunidades',
        isCorrect: true,
      },
    ],
  },
];

export interface QuizRatingOption {
  id: string;
  label: string;
  color: string;
  hoverRing: string;
}

export const QUIZ_RATINGS: QuizRatingOption[] = [
  { id: 'ruim', label: 'Precisa melhorar', color: '#F50A0A', hoverRing: 'ring-[#F50A0A]/40' },
  { id: 'regular', label: 'Regular', color: '#FF6B1A', hoverRing: 'ring-[#FF6B1A]/40' },
  { id: 'bom', label: 'Bom', color: '#FFE042', hoverRing: 'ring-[#FFE042]/40' },
  { id: 'excelente', label: 'Excelente', color: '#05E055', hoverRing: 'ring-[#05E055]/40' },
];
