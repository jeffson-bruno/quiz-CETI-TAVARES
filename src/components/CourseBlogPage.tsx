import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Menu,
  X,
} from 'lucide-react';
import {
  BLOG_ARTICLES,
  BlogArticle,
  CAREER_AREAS,
  COURSE_PILLARS,
  OPPORTUNITY_FILTERS,
  OPPORTUNITY_ITEMS,
  OpportunityCategory,
  WORKPLACE_ENVIRONMENTS,
} from '../data/courseBlogData';

interface CourseBlogPageProps {
  onOpenQuiz: () => void;
}

interface EditorialPhotoProps {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}

const EditorialPhoto: React.FC<EditorialPhotoProps> = ({
  src,
  alt,
  caption,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div className="relative overflow-hidden rounded-xl border border-[#DCE1F0] bg-[#ECEFF8] flex-1 min-h-[240px]">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover block"
          />
        ) : (
          <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-[#ECEFF8] to-[#E2E6F2] text-[#282156]">
            <Code2 className="w-8 h-8 text-[#0891B2]" aria-hidden="true" />
            <p className="text-sm font-semibold max-w-xs">{alt}</p>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 text-xs text-[#5A5878] leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
};

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre o Curso' },
  { href: '#oportunidades', label: 'Oportunidades' },
  { href: '#onde-trabalhar', label: 'Onde Trabalhar' },
  { href: '#areas', label: 'Áreas de Atuação' },
];

export const CourseBlogPage: React.FC<CourseBlogPageProps> = ({ onOpenQuiz }) => {
  const [opportunityFilter, setOpportunityFilter] = useState<OpportunityCategory>('all');
  const [activeAreaId, setActiveAreaId] = useState<string>(CAREER_AREAS[0].id);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!activeArticle) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle]);

  const filteredOpportunities =
    opportunityFilter === 'all'
      ? OPPORTUNITY_ITEMS
      : OPPORTUNITY_ITEMS.filter((item) => item.category === opportunityFilter);

  const selectedArea =
    CAREER_AREAS.find((area) => area.id === activeAreaId) ?? CAREER_AREAS[0];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F8FC] text-[#191736] font-sans">
      {/* Top Bar Contract: [Brand title] — [4 nav links] — [1 primary action] */}
      <header className="sticky top-0 z-40 w-full bg-[#F7F8FC]/95 backdrop-blur-sm border-b border-[#E2E6F2]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#topo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display font-black text-xl tracking-tight text-[#191736] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] rounded"
          >
            Técnico em DS
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#4B496B]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#0891B2] hover:text-[#191736] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-2 bg-[#282156] hover:bg-[#352D6B] active:scale-[0.99] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0891B2]"
            >
              <span>Acessar Quiz</span>
              <ArrowUpRight className="w-4 h-4 text-[#06C8E8]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#DCE1F0] bg-white text-[#191736] hover:bg-[#ECEFF8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Menu móvel"
            className="md:hidden border-t border-[#E2E6F2] bg-white px-5 py-3 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-2.5 text-sm font-semibold text-[#2E2C4D] hover:text-[#0891B2] border-b border-[#F1F3FA] last:border-b-0 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="topo" className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Hero Editorial Lead Story */}
        <section className="py-12 sm:py-16 lg:py-20 border-b border-[#E2E6F2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#0891B2] mb-3">
                  Guia Editorial · Formação Técnica e Carreira em Tecnologia
                </p>
                <h1 className="font-display font-black text-[#191736] text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.08] tracking-tight text-balance">
                  Curso Técnico em Desenvolvimento de Sistemas
                </h1>
                <p className="mt-5 text-base sm:text-lg text-[#4B496B] leading-relaxed max-w-xl">
                  Da lógica de programação aos sistemas web, bancos de dados e aplicativos: um
                  panorama completo sobre o curso, os caminhos profissionais após a formatura, os
                  ambientes de trabalho e o que estudar em cada especialidade.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onOpenQuiz}
                  className="inline-flex items-center gap-2.5 bg-[#282156] hover:bg-[#352D6B] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0891B2]"
                >
                  <span>Responder ao Quiz</span>
                  <ArrowRight className="w-4 h-4 text-[#06C8E8]" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavClick('#areas')}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#ECEFF8] text-[#191736] font-semibold text-sm sm:text-base px-5 py-3 rounded-lg border border-[#D4DAEC] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2]"
                >
                  <span>Explorar áreas de atuação</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex">
              <EditorialPhoto
                src="/src/assets/images/hero_ds_course_1795598781396.jpg"
                alt="Estudantes do curso técnico colaborando em notebooks com código e protótipos de tela"
                caption="Fig. 1 — Projetos integradores aproximam lógica, design de interface e resolução de problemas reais."
                className="w-full"
              />
            </div>
          </div>

          {/* 4-Column Summary Strip below Hero */}
          <div className="mt-12 pt-8 border-t border-[#E2E6F2] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {COURSE_PILLARS.map((pillar) => (
              <div key={pillar.index} className="space-y-2">
                <p className="text-xs font-mono tabular-nums text-[#0891B2] font-semibold">
                  {pillar.index}
                </p>
                <h2 className="text-base font-bold text-[#191736]">{pillar.title}</h2>
                <p className="text-sm text-[#525070] leading-relaxed">{pillar.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Sobre o Curso (Asymmetric Editorial Essay + Margin Notes) */}
        <section id="sobre" className="py-14 sm:py-20 border-b border-[#E2E6F2] scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <article className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#0891B2] mb-2">
                  Sobre o curso
                </p>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-[#191736] leading-tight text-balance">
                  Como o curso prepara você para criar software de verdade
                </h2>
              </div>

              <div className="space-y-5 text-[15px] sm:text-base text-[#363452] leading-[1.75] max-w-prose">
                <p className="first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-[#282156] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  O Curso Técnico em Desenvolvimento de Sistemas capacita estudantes para analisar
                  necessidades do dia a dia e transformá-las em sites, aplicativos, APIs e bancos de
                  dados confiáveis. Em vez de tratar a tecnologia apenas pelo uso de ferramentas
                  prontas, a formação ensina como os sistemas funcionam por dentro.
                </p>
                <p>
                  A jornada começa na base: lógica de programação, algoritmos e organização de dados.
                  A partir dessa fundação, o aluno evolui para o desenvolvimento web com HTML, CSS e
                  JavaScript, aprende linguagens de programação como Python, JavaScript e Java, e
                  pratica a modelagem de bancos de dados para guardar informações com segurança.
                </p>
                <p>
                  Mais do que escrever código isolado, o curso desenvolve raciocínio lógico,
                  criatividade, leitura técnica e trabalho em equipe — competências que permitem
                  criar soluções para escolas, comércios, serviços de saúde, projetos próprios e
                  empresas de tecnologia.
                </p>
              </div>

              <blockquote className="py-6 my-6 border-y border-[#DCE1F0]">
                <p className="font-display italic text-xl sm:text-2xl text-[#282156] leading-snug text-balance">
                  “Aprender a programar é aprender a estruturar passos claros para resolver problemas
                  reais — uma habilidade útil em qualquer profissão.”
                </p>
              </blockquote>
            </article>

            <aside className="lg:col-span-5 space-y-6">
              <EditorialPhoto
                src="/src/assets/images/student_coding_project_1795598781717.jpg"
                alt="Mesa de estudos com notebook exibindo código e caderno com diagramas de banco de dados"
                caption="Fig. 2 — Modelagem de dados e fluxos lógicos antecedem a implementação das telas."
              />

              <div className="bg-white border border-[#E2E6F2] rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-[#191736]">
                  O que você constrói ao longo da formação
                </h3>
                <ul className="divide-y divide-[#EEF1F8] text-sm text-[#454363]">
                  <li className="py-2.5 first:pt-0">
                    Páginas e portais web responsivos para computador e celular
                  </li>
                  <li className="py-2.5">
                    Sistemas com cadastro, consultas e armazenamento em banco de dados
                  </li>
                  <li className="py-2.5">
                    Aplicativos, jogos educativos e pequenas automações de tarefas
                  </li>
                  <li className="py-2.5 last:pb-0">
                    Repositórios organizados no GitHub prontos para apresentar em entrevistas
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Section 2: Oportunidades após a formatura (Interactive Filter) */}
        <section
          id="oportunidades"
          className="py-14 sm:py-20 border-b border-[#E2E6F2] scroll-mt-20"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#0891B2] mb-2">
                Oportunidades após se formar
              </p>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-[#191736] leading-tight text-balance">
                Caminhos abertos para quem conclui o curso técnico
              </h2>
            </div>

            {/* Interactive Filter Tabs (functional controls) */}
            <div
              role="tablist"
              aria-label="Filtrar oportunidades por trilha"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#EAEDF7] rounded-lg w-fit"
            >
              {OPPORTUNITY_FILTERS.map((filter) => {
                const isActive = opportunityFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setOpportunityFilter(filter.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] ${
                      isActive
                        ? 'bg-white text-[#191736] shadow-xs'
                        : 'text-[#525070] hover:text-[#191736]'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#E2E6F2] rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <p className="text-xs text-[#5A5878] font-medium">
                    <span className="text-[#0891B2] font-semibold">{item.categoryLabel}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{item.timeframe}</span>
                  </p>
                  <h3 className="text-lg font-bold text-[#191736] leading-snug">{item.title}</h3>
                  <p className="text-sm text-[#4B496B] leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-[#EEF1F8]">
                  <p className="text-xs font-semibold text-[#5A5878] mb-1.5">
                    Exemplos de atuação
                  </p>
                  <p className="text-sm font-medium text-[#282156]">
                    {item.roles.join(' · ')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 3: Onde Podem Trabalhar */}
        <section
          id="onde-trabalhar"
          className="py-14 sm:py-20 border-b border-[#E2E6F2] scroll-mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#0891B2] mb-2">
                  Onde trabalhar
                </p>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-[#191736] leading-tight text-balance">
                  Ambientes que contratam técnicos em Desenvolvimento de Sistemas
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#4B496B] leading-relaxed">
                  Como todo setor depende de organização digital, o profissional técnico não fica
                  restrito apenas a empresas de software. O mercado abrange instituições públicas,
                  comércio, indústria e atuação remota.
                </p>
              </div>

              <EditorialPhoto
                src="/src/assets/images/workplace_tech_team_1795598781145.jpg"
                alt="Equipe de desenvolvedores analisando código e arquitetura em um estúdio de tecnologia"
                caption="Fig. 3 — Equipes multidisciplinares conectam código, regras de negócio e experiência de uso."
              />
            </div>

            <div className="lg:col-span-7 bg-white border border-[#E2E6F2] rounded-xl p-6 sm:p-8 flex flex-col justify-center">
              <div className="divide-y divide-[#EEF1F8]">
                {WORKPLACE_ENVIRONMENTS.map((place, index) => (
                  <div
                    key={place.id}
                    className="py-5 first:pt-1 last:pb-1 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                  >
                    <span className="sm:col-span-1 text-xs font-mono tabular-nums text-[#0891B2] font-semibold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="sm:col-span-11 space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-[#191736]">
                          {place.name}
                        </h3>
                        <span className="text-xs font-medium text-[#5A5878]">{place.context}</span>
                      </div>
                      <p className="text-sm text-[#4B496B] leading-relaxed">{place.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: O que precisam saber nas diferentes áreas de atuação */}
        <section id="areas" className="py-14 sm:py-20 border-b border-[#E2E6F2] scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold tracking-wide text-[#0891B2] mb-2">
              Guia de conhecimentos por área
            </p>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#191736] leading-tight text-balance">
              O que você precisa saber em cada área de atuação
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4B496B] leading-relaxed">
              Selecione uma especialidade abaixo para ver o que o profissional faz no dia a dia e
              quais fundamentos técnicos formam a base dessa trilha.
            </p>
          </div>

          {/* Segmented Specialty Selector */}
          <div
            role="tablist"
            aria-label="Áreas de atuação em Desenvolvimento de Sistemas"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EAEDF7] rounded-xl mb-8 w-fit max-w-full"
          >
            {CAREER_AREAS.map((area) => {
              const isSelected = area.id === selectedArea.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveAreaId(area.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] ${
                    isSelected
                      ? 'bg-[#282156] text-white shadow-xs'
                      : 'text-[#4B496B] hover:text-[#191736]'
                  }`}
                >
                  {area.tabLabel}
                </button>
              );
            })}
          </div>

          {/* Active Area Knowledge Panel */}
          <div
            role="tabpanel"
            aria-label={selectedArea.title}
            className="bg-white border border-[#E2E6F2] rounded-xl p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 space-y-5">
                <p className="text-xs font-medium text-[#5A5878]">
                  <span className="text-[#0891B2] font-semibold">{selectedArea.levelLabel}</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{selectedArea.demandLabel}</span>
                </p>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#191736] leading-tight text-balance">
                  {selectedArea.title}
                </h3>

                <p className="text-sm sm:text-base text-[#4B496B] leading-relaxed">
                  {selectedArea.subtitle}
                </p>

                <div className="pt-4 border-t border-[#EEF1F8] space-y-2">
                  <h4 className="text-xs font-semibold tracking-wide text-[#5A5878]">
                    Rotina na prática
                  </h4>
                  <p className="text-sm text-[#363452] leading-relaxed">{selectedArea.dailyWork}</p>
                </div>

                <div className="pt-4 border-t border-[#EEF1F8] space-y-2">
                  <h4 className="text-xs font-semibold tracking-wide text-[#5A5878]">
                    Projetos típicos dessa área
                  </h4>
                  <p className="text-sm font-medium text-[#282156]">
                    {selectedArea.projectExamples.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 divide-y divide-[#EEF1F8]">
                {selectedArea.mustKnow.map((skill, idx) => (
                  <div
                    key={skill.topic}
                    className="py-4 first:pt-0 last:pb-0 flex items-start gap-4"
                  >
                    <span className="text-xs font-mono tabular-nums text-[#0891B2] font-semibold mt-1">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-[#191736]">{skill.topic}</h4>
                      <p className="text-sm text-[#4B496B] leading-relaxed">{skill.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Artigos do Blog */}
        <section className="py-14 sm:py-20 border-b border-[#E2E6F2]">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold tracking-wide text-[#0891B2] mb-2">
              Blog do curso
            </p>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#191736] leading-tight text-balance">
              Leituras para entender a rotina e planejar seus próximos passos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="bg-white border border-[#E2E6F2] rounded-xl p-6 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <p className="text-xs text-[#5A5878] font-medium">
                    <span className="text-[#0891B2] font-semibold">{article.category}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{article.readTime}</span>
                  </p>
                  <h3 className="text-lg font-bold text-[#191736] leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#4B496B] leading-relaxed">{article.excerpt}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#282156] hover:text-[#0891B2] transition-colors w-fit cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] rounded py-1"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Ler artigo completo</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom Quiz Callout */}
        <section className="py-14 sm:py-18">
          <div className="bg-[#282156] text-white rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-[#06C8E8]">
                Desafio interativo · 8 questões
              </p>
              <h2 className="font-display font-black text-2xl sm:text-4xl leading-tight text-balance">
                Pronto para testar seus conhecimentos em Desenvolvimento de Sistemas?
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Confira o que você já domina sobre lógica de programação, desenvolvimento web,
                linguagens, bancos de dados e tecnologia na sociedade.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenQuiz}
              className="inline-flex items-center justify-center gap-2.5 bg-[#06C8E8] hover:bg-[#19D4F3] active:scale-[0.98] text-[#141036] font-extrabold text-base px-7 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80"
            >
              <span>Acessar Quiz</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E2E6F2] bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#5A5878]">
          <p className="font-medium text-[#2E2C4D]">
            Curso Técnico em Desenvolvimento de Sistemas · Portal Informativo e Quiz
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#191736] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenQuiz}
              className="font-bold text-[#282156] hover:text-[#0891B2] transition-colors whitespace-nowrap cursor-pointer"
            >
              Acessar Quiz
            </button>
          </div>
        </div>
      </footer>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#191736]/60 backdrop-blur-xs"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white border border-[#E2E6F2] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-9 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#EEF1F8] pb-4">
              <div className="space-y-2">
                <p className="text-xs text-[#5A5878] font-medium">
                  <span className="text-[#0891B2] font-semibold">{activeArticle.category}</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{activeArticle.publishedAt}</span>
                  <span className="mx-2" aria-hidden="true">
                    ·
                  </span>
                  <span>{activeArticle.readTime}</span>
                </p>
                <h2
                  id="article-modal-title"
                  className="font-display font-black text-2xl sm:text-3xl text-[#191736] leading-tight text-balance"
                >
                  {activeArticle.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Fechar artigo"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#DCE1F0] text-[#4B496B] hover:text-[#191736] hover:bg-[#F7F8FC] transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4 text-[15px] sm:text-base text-[#363452] leading-[1.75]">
              {activeArticle.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="bg-[#F7F8FC] border border-[#E2E6F2] rounded-xl p-4 sm:p-5">
              <p className="text-xs font-semibold text-[#0891B2] mb-1">Ponto principal</p>
              <p className="text-sm font-medium text-[#191736] leading-relaxed">
                {activeArticle.takeaway}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#EEF1F8]">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="text-sm font-semibold text-[#525070] hover:text-[#191736] cursor-pointer py-2 px-3 rounded-lg"
              >
                Voltar aos artigos
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveArticle(null);
                  onOpenQuiz();
                }}
                className="inline-flex items-center gap-2 bg-[#282156] hover:bg-[#352D6B] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Testar no Quiz</span>
                <ArrowRight className="w-4 h-4 text-[#06C8E8]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
