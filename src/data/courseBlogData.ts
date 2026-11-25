export interface CoursePillar {
  index: string;
  title: string;
  summary: string;
}

export type OpportunityCategory = 'all' | 'mercado' | 'autonomo' | 'academico';

export interface OpportunityItem {
  id: string;
  category: Exclude<OpportunityCategory, 'all'>;
  categoryLabel: string;
  title: string;
  timeframe: string;
  description: string;
  roles: string[];
}

export interface WorkplaceItem {
  id: string;
  name: string;
  context: string;
  examples: string;
}

export interface CareerArea {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  levelLabel: string;
  demandLabel: string;
  dailyWork: string;
  mustKnow: {
    topic: string;
    detail: string;
  }[];
  projectExamples: string[];
}

export interface BlogArticle {
  id: string;
  category: string;
  readTime: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  takeaway: string;
}

export const COURSE_PILLARS: CoursePillar[] = [
  {
    index: '01',
    title: 'Lógica e Algoritmos',
    summary:
      'Estruturação do pensamento computacional para transformar problemas reais em passos claros e código funcional.',
  },
  {
    index: '02',
    title: 'Web e Interfaces',
    summary:
      'Construção de páginas, sistemas e aplicações responsivas com HTML, CSS, JavaScript e frameworks modernos.',
  },
  {
    index: '03',
    title: 'Banco de Dados e APIs',
    summary:
      'Modelagem de dados, consultas SQL e integração entre servidores e interfaces com segurança e organização.',
  },
  {
    index: '04',
    title: 'Projetos Práticos e Git',
    summary:
      'Trabalho colaborativo com versionamento de código, testes e entrega de soluções completas do início ao fim.',
  },
];

export const OPPORTUNITY_FILTERS: { id: OpportunityCategory; label: string }[] = [
  { id: 'all', label: 'Todas as trilhas' },
  { id: 'mercado', label: 'Mercado de trabalho' },
  { id: 'autonomo', label: 'Autônomo e startups' },
  { id: 'academico', label: 'Continuidade acadêmica' },
];

export const OPPORTUNITY_ITEMS: OpportunityItem[] = [
  {
    id: 'opp-junior',
    category: 'mercado',
    categoryLabel: 'Mercado de trabalho',
    title: 'Desenvolvedor Júnior ou Trainee',
    timeframe: 'Ingresso imediato após formação',
    description:
      'Atuação em equipes de produto e tecnologia desenvolvendo telas, rotinas de servidor, integrações e correções sob mentoria de profissionais experientes.',
    roles: ['Front-end Júnior', 'Back-end Júnior', 'Desenvolvedor Full Stack', 'Estágio em TI'],
  },
  {
    id: 'opp-qa-support',
    category: 'mercado',
    categoryLabel: 'Mercado de trabalho',
    title: 'Qualidade de Software, Dados e Suporte N2',
    timeframe: 'Alta procura em empresas de médio e grande porte',
    description:
      'Garantia de funcionamento de sistemas por meio de testes, análise de logs, consultas em banco de dados e atendimento técnico especializado.',
    roles: ['Analista de QA', 'Suporte Técnico em Sistemas', 'Assistente de Banco de Dados'],
  },
  {
    id: 'opp-freelance',
    category: 'autonomo',
    categoryLabel: 'Autônomo e startups',
    title: 'Projetos Freelance e Soluções Locais',
    timeframe: 'Flexibilidade de agenda e renda',
    description:
      'Criação de sites institucionais, catálogos digitais, sistemas de agendamento e automações sob medida para comércios, escolas e profissionais da região.',
    roles: ['Desenvolvedor Web Freelancer', 'Consultor de Automação', 'Criador de Landing Pages'],
  },
  {
    id: 'opp-startup',
    category: 'autonomo',
    categoryLabel: 'Autônomo e startups',
    title: 'Empreendedorismo Digital e Produtos Próprios',
    timeframe: 'Construção de portfólio e negócio',
    description:
      'Desenvolvimento de aplicativos, micro-SaaS, ferramentas educativas ou jogos digitais a partir de problemas reais identificados pelos próprios alunos.',
    roles: ['Criador de SaaS', 'Desenvolvedor Indie', 'Sócio Técnico em Startups'],
  },
  {
    id: 'opp-graduacao',
    category: 'academico',
    categoryLabel: 'Continuidade acadêmica',
    title: 'Avanço Acelerado no Ensino Superior',
    timeframe: 'Base sólida antes da faculdade',
    description:
      'Quem conclui o técnico chega a cursos como Engenharia de Software, Ciência da Computação ou ADS já dominando lógica, Git, bancos e projetos reais.',
    roles: ['Análise e Desenv. de Sistemas', 'Ciência da Computação', 'Engenharia de Software'],
  },
  {
    id: 'opp-certificacoes',
    category: 'academico',
    categoryLabel: 'Continuidade acadêmica',
    title: 'Especializações, Nuvem e Competições',
    timeframe: 'Formação contínua',
    description:
      'Participação em maratonas de programação, hackathons, bolsas de estudo e certificações técnicas em nuvem, dados ou cibersegurança.',
    roles: ['Hackathons e Olimpíadas', 'Certificações Cloud', 'Programas de Residência Tech'],
  },
];

export const WORKPLACE_ENVIRONMENTS: WorkplaceItem[] = [
  {
    id: 'wp-software',
    name: 'Software Houses e Empresas de Tecnologia',
    context: 'Desenvolvimento direto de produtos digitais',
    examples: 'Sistemas de gestão, plataformas educacionais, aplicativos e serviços em nuvem.',
  },
  {
    id: 'wp-startups',
    name: 'Startups e Fintechs',
    context: 'Times ágeis e entrega contínua',
    examples: 'Soluções financeiras, logística, saúde digital e marketplaces em expansão.',
  },
  {
    id: 'wp-empresas',
    name: 'Departamentos de TI em Indústrias e Comércio',
    context: 'Tecnologia aplicada ao negócio',
    examples: 'Controle de estoque, portais internos, automação de planilhas e integração de vendas.',
  },
  {
    id: 'wp-agencias',
    name: 'Agências Digitais e Estúdios Criativos',
    context: 'Experiências interativas para clientes',
    examples: 'Sites institucionais, lojas virtuais, portais de conteúdo e campanhas web.',
  },
  {
    id: 'wp-publico',
    name: 'Escolas, Hospitais e Órgãos Públicos',
    context: 'Serviços essenciais digitalizados',
    examples: 'Sistemas acadêmicos, prontuários, atendimento ao cidadão e portais de transparência.',
  },
  {
    id: 'wp-remoto',
    name: 'Trabalho Remoto e Equipes Distribuídas',
    context: 'Sem barreiras geográficas',
    examples: 'Atuação de qualquer cidade para empresas do Brasil e do exterior.',
  },
];

export const CAREER_AREAS: CareerArea[] = [
  {
    id: 'frontend',
    tabLabel: 'Front-end',
    title: 'Desenvolvimento Front-end e Interfaces',
    subtitle: 'Tudo o que a pessoa usuária vê, lê e interage na tela de computadores e celulares.',
    levelLabel: 'Porta de entrada popular',
    demandLabel: 'Alta demanda em produtos web',
    dailyWork:
      'Transformar layouts em páginas rápidas, responsivas e acessíveis, conectando botões, formulários e painéis às informações vindas do servidor.',
    mustKnow: [
      {
        topic: 'HTML5 Semântico e Acessibilidade',
        detail: 'Estruturar títulos, formulários, navegação por teclado e contraste adequado para leitura.',
      },
      {
        topic: 'CSS3, Flexbox, Grid e Responsividade',
        detail: 'Adaptar interfaces com fluidez de telas pequenas de celular até monitores largos.',
      },
      {
        topic: 'JavaScript, TypeScript e React',
        detail: 'Gerenciar estados, eventos, componentes reutilizáveis e consumo de APIs REST.',
      },
      {
        topic: 'Consumo de APIs e Versionamento',
        detail: 'Buscar e enviar dados em JSON com tratamento de erros e controle de código com Git.',
      },
    ],
    projectExamples: ['Portais educativos e blogs', 'Dashboards administrativos', 'Quizzes e jogos web interativos'],
  },
  {
    id: 'backend',
    tabLabel: 'Back-end',
    title: 'Desenvolvimento Back-end e APIs',
    subtitle: 'O motor invisível que processa regras de negócio, autentica usuários e protege dados.',
    levelLabel: 'Forte em lógica e arquitetura',
    demandLabel: 'Essencial em qualquer sistema',
    dailyWork:
      'Construir rotas de API, validar informações recebidas, aplicar regras de permissão, integrar pagamentos ou serviços externos e conversar com o banco de dados.',
    mustKnow: [
      {
        topic: 'Lógica de Programação e Estruturas de Dados',
        detail: 'Arrays, objetos, funções, condicionais, laços e organização limpa de módulos.',
      },
      {
        topic: 'Linguagens de Servidor (Node.js, Python ou Java)',
        detail: 'Criar servidores HTTP, middlewares e serviços organizados em camadas.',
      },
      {
        topic: 'APIs REST, JSON e Autenticação',
        detail: 'Projetar endpoints claros, códigos de status HTTP, sessões, tokens e validação de entradas.',
      },
      {
        topic: 'Segurança Básica e Boas Práticas',
        detail: 'Proteger senhas com hash, usar variáveis de ambiente e evitar exposição de chaves.',
      },
    ],
    projectExamples: ['APIs para aplicativos escolares', 'Sistemas de cadastro e login', 'Automações e integrações'],
  },
  {
    id: 'database',
    tabLabel: 'Banco de Dados',
    title: 'Banco de Dados e Organização da Informação',
    subtitle: 'Onde nomes, notas, pedidos, históricos e relatórios são guardados com segurança e rapidez.',
    levelLabel: 'Base obrigatória para sistemas',
    demandLabel: 'Presente em todas as áreas',
    dailyWork:
      'Modelar tabelas e relacionamentos, escrever consultas SQL precisas, evitar dados duplicados e garantir que informações importantes não se percam.',
    mustKnow: [
      {
        topic: 'Modelagem Conceitual e Relacional',
        detail: 'Definir entidades, atributos, chaves primárias, chaves estrangeiras e relacionamentos 1:N e N:N.',
      },
      {
        topic: 'Linguagem SQL (SELECT, INSERT, UPDATE, JOIN)',
        detail: 'Filtrar, cruzar, agrupar e ordenar registros com eficiência em bancos como PostgreSQL ou MySQL.',
      },
      {
        topic: 'Integridade e Normalização',
        detail: 'Garantir consistência nos cadastros para evitar erros em notas, estoques ou faturas.',
      },
      {
        topic: 'Noções de Bancos Não Relacionais e Backups',
        detail: 'Compreender quando usar documentos JSON e a importância de cópias de segurança.',
      },
    ],
    projectExamples: ['Sistema de notas e frequência escolar', 'Controle de biblioteca', 'Relatórios de vendas'],
  },
  {
    id: 'mobile',
    tabLabel: 'Mobile',
    title: 'Desenvolvimento Mobile e Aplicativos',
    subtitle: 'Aplicações criadas especialmente para smartphones, sensores e uso no dia a dia.',
    levelLabel: 'Foco em experiência prática',
    demandLabel: 'Forte no comércio e serviços',
    dailyWork:
      'Criar telas pensadas para toque, gerenciar navegação entre páginas no celular, salvar dados offline e conectar o app a serviços na nuvem.',
    mustKnow: [
      {
        topic: 'Design para Telas Pequenas e Toque',
        detail: 'Botões confortáveis, leitura rápida e fluxos curtos para uso com uma mão.',
      },
      {
        topic: 'React Native, Flutter ou Android Nativo',
        detail: 'Construção de componentes móveis, listas performáticas e navegação por abas ou pilhas.',
      },
      {
        topic: 'Integração com APIs e Armazenamento Local',
        detail: 'Manter preferências e dados essenciais funcionando mesmo com internet instável.',
      },
      {
        topic: 'Recursos do Aparelho e Publicação',
        detail: 'Noções de câmera, notificações, permissões de usuário e empacotamento para lojas.',
      },
    ],
    projectExamples: ['App de agenda escolar', 'Catálogo para comércio local', 'Lista de tarefas e hábitos'],
  },
  {
    id: 'qa-devops',
    tabLabel: 'QA e Cloud',
    title: 'Qualidade de Software (QA), Git e Implantação',
    subtitle: 'Como garantir que o sistema funcione sem falhas e chegue ao ar com estabilidade.',
    levelLabel: 'Diferencial competitivo',
    demandLabel: 'Crescente em times modernos',
    dailyWork:
      'Testar fluxos em busca de bugs antes dos usuários, revisar código em equipe usando Git/GitHub e publicar aplicações em servidores e plataformas na nuvem.',
    mustKnow: [
      {
        topic: 'Git e GitHub no Trabalho em Equipe',
        detail: 'Branches, commits claros, pull requests e resolução de conflitos entre colegas.',
      },
      {
        topic: 'Testes Manuais e Automatizados',
        detail: 'Validar cenários de erro, bordas de formulário e regras críticas antes do lançamento.',
      },
      {
        topic: 'Linux Básico, Terminal e Redes',
        detail: 'Navegar por diretórios, entender portas HTTP, DNS e ler mensagens de log.',
      },
      {
        topic: 'Deploy e Variáveis de Ambiente',
        detail: 'Publicar aplicações web, configurar build de produção e monitorar funcionamento básico.',
      },
    ],
    projectExamples: ['Checklist de qualidade do projeto final', 'Publicação de site em nuvem', 'Fluxo colaborativo no GitHub'],
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-primeiro-algoritmo',
    category: 'Formação Técnica',
    readTime: '4 min de leitura',
    publishedAt: 'Guia do Curso',
    title: 'Do primeiro algoritmo ao sistema completo: como a jornada acontece na prática',
    excerpt:
      'Entenda por que o curso começa organizando o raciocínio antes de avançar para sites, bancos de dados e aplicativos.',
    paragraphs: [
      'Quem entra no Curso Técnico em Desenvolvimento de Sistemas muitas vezes imagina que vai sair decorando comandos complexos logo na primeira semana. Na prática, a base mais valiosa vem antes de qualquer linguagem: aprender a quebrar um problema grande em passos pequenos e lógicos.',
      'Ao longo dos módulos, esse raciocínio ganha forma concreta. Primeiro em algoritmos simples no terminal; depois em páginas estruturadas com HTML e CSS; em seguida em interações dinâmicas com JavaScript e armazenamento organizado em bancos de dados relacionais.',
      'Essa progressão permite que cada estudante compreenda o porquê de cada linha escrita. Em vez de apenas copiar código pronto, o técnico formado consegue diagnosticar erros, adaptar soluções e aprender novas linguagens com autonomia.',
    ],
    takeaway:
      'Dominar lógica de programação e modelagem de dados torna muito mais rápido aprender qualquer ferramenta nova do mercado.',
  },
  {
    id: 'art-portfolio-escolar',
    category: 'Carreira e Portfólio',
    readTime: '3 min de leitura',
    publishedAt: 'Dicas de Carreira',
    title: 'Como transformar projetos de sala de aula no seu primeiro portfólio profissional',
    excerpt:
      'Mesmo antes do primeiro emprego, projetos bem documentados no GitHub mostram na prática o que você sabe construir.',
    paragraphs: [
      'Na área de tecnologia, mostrar o que você construiu costuma falar tão alto quanto o currículo. Um site responsivo para um evento da escola, um quiz interativo ou um sistema simples de cadastro já demonstram iniciativa e domínio técnico.',
      'O segredo está na apresentação: publicar o código no GitHub com um README claro explicando o problema resolvido, incluir capturas de tela da interface funcionando e testar o projeto em telas de celular e computador.',
      'Quando o estudante documenta cada projeto desenvolvido durante o curso técnico, chega às primeiras entrevistas de estágio ou vaga júnior com provas reais de evolução.',
    ],
    takeaway:
      'Guarde seus melhores exercícios e projetos integradores em repositórios organizados com instruções claras de uso.',
  },
  {
    id: 'art-tecnologia-sociedade',
    category: 'Mercado e Sociedade',
    readTime: '3 min de leitura',
    publishedAt: 'Visão de Futuro',
    title: 'Por que o Técnico em Desenvolvimento de Sistemas encontra espaço em quase todo setor',
    excerpt:
      'Educação, saúde, comércio, agronegócio e serviços públicos dependem cada vez mais de software bem projetado.',
    paragraphs: [
      'Hoje, tecnologia não se limita às grandes empresas de internet. Clínicas precisam agendar consultas, escolas organizam notas e frequência, comércios controlam estoque e prefeituras digitalizam atendimentos à população.',
      'Em todos esses ambientes, há demanda por profissionais capazes de entender a necessidade das pessoas e traduzir essa rotina em telas claras, regras confiáveis e bancos de dados bem cuidados.',
      'Por isso, o curso forma um perfil versátil: preparado tanto para integrar equipes de desenvolvimento quanto para criar soluções próprias ou seguir rumo ao ensino superior com vantagem prática.',
    ],
    takeaway:
      'Desenvolver sistemas é unir conhecimento técnico com empatia para resolver problemas reais de pessoas e instituições.',
  },
];
