export type Lecture = {
  slug: string;
  code?: string;
  title: string;
  speaker: string;
  day: number;
  minutes?: number;
  summary: string;
  pdf?: string;
  notebooks?: { label: string; href: string }[];
  status: "ready" | "soon";
};

export const lectures: Lecture[] = [
  {
    slug: "lec1-trends",
    code: "Д1 · П1",
    title: "ИИ сегодня. Обзор основных трендов",
    speaker: "Алексей Власов",
    day: 1,
    minutes: 75,
    summary:
      "Обзор текущей картины ИИ: LLM, мультимодальность, агенты, экономика AI, границы применимости.",
    pdf: "/lectures/lec1-trends.pdf",
    status: "ready",
  },
  {
    slug: "d2p1-applications",
    code: "Д2 · П1",
    title: "Применение ИИ + ВсОШ по ИИ",
    speaker: "Матвей Исупов · Артур Игнатьев",
    day: 2,
    minutes: 60,
    summary:
      "Две половины: применение ИИ в работе учителя и инструменты (25 мин, Исупов) + что такое ВсОШ по ИИ, структура и 3 примера задач (30 мин, Игнатьев). В конце — объявление проекта.",
    pdf: "/lectures/lec2-applications.pdf",
    status: "ready",
  },
  {
    slug: "d2p2-ml-metrics",
    code: "Д2 · П2",
    title: "ML: fit / predict, метрики, визуализация",
    speaker: "Иван Эйдлин",
    day: 2,
    minutes: 60,
    summary:
      "Как выглядит обучение модели на практике. Единый sklearn-API, три модели одним кодом, метрики классификации и регрессии, визуализация confusion matrix и переобучения.",
    notebooks: [
      { label: "Конспект лекции", href: "/lectures/d2p2-ml-metrics.md" },
      { label: "fit_predict_tour.ipynb", href: "/notebooks/fit_predict_tour.ipynb" },
      { label: "metrics_visual.ipynb", href: "/notebooks/metrics_visual.ipynb" },
    ],
    status: "ready",
  },
  {
    slug: "d2p3-math-vosh",
    code: "Д2 · П3",
    title: "Математика в ИИ + разбор задач ВсОШ",
    speaker: "Максим Бидва · Матвей Исупов",
    day: 2,
    minutes: 90,
    summary:
      "Чистая математика (теорвер + Байес, векторы и матрицы, градиент) с numpy-иллюстрациями, затем живой разбор 3 эталонных задач ВсОШ.",
    status: "soon",
  },
  {
    slug: "d2p4-team-work",
    code: "Д2 · П4",
    title: "Командная работа над модулем",
    speaker: "Все менторы",
    day: 2,
    minutes: 60,
    summary:
      "Команды пишут Разделы 0–2 своего модуля в Google Doc. Менторы закреплены за столами и отвечают на вопросы.",
    status: "ready",
  },
];
