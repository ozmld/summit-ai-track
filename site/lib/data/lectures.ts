export type Lecture = {
  slug: string;
  title: string;
  speaker: string;
  day: number;
  summary: string;
  pdf?: string;
  status: "ready" | "soon";
};

export const lectures: Lecture[] = [
  {
    slug: "lec1-trends",
    title: "ИИ сегодня. Обзор основных трендов",
    speaker: "Алексей Власов",
    day: 1,
    summary:
      "Обзор текущей картины ИИ: LLM, мультимодальность, агенты, экономика AI, границы применимости.",
    pdf: "/lectures/lec1-trends.pdf",
    status: "ready",
  },
  {
    slug: "lec2-applications",
    title: "ИИ сегодня. Обзор возможностей применения",
    speaker: "Алексей Власов + Артур Игнатьев",
    day: 2,
    summary:
      "Как применять ИИ в школьной методике: примеры, инструменты, риски prompt injection и галлюцинаций.",
    pdf: "/lectures/lec2-applications.pdf",
    status: "ready",
  },
  {
    slug: "lec3-vosh",
    title: "Олимпиады по ИИ: что такое ВсОШ по ИИ",
    speaker: "Артур Игнатьев / Максим Бидва",
    day: 2,
    summary:
      "Структура и задачи ВсОШ по ИИ, треки, примеры задач, как готовить школьников.",
    status: "soon",
  },
  {
    slug: "lec4-prompt-hygiene",
    title: "Prompt injection и гигиена промтов",
    speaker: "Трек ИИ",
    day: 2,
    summary:
      "Разбор контеста: какие ловушки встретили участники, как отличать бред LLM от корректного решения.",
    status: "soon",
  },
];
