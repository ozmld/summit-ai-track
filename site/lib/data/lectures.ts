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
    title: "Применение ИИ в жизни и в классе",
    speaker: "Матвей Исупов",
    day: 2,
    minutes: 60,
    summary:
      "Где ИИ используется уже сегодня, какими инструментами пользоваться учителю (ChatGPT, DeepSeek, Colab, Gemini), ограничения моделей и типичные ошибки промптинга.",
    pdf: "/lectures/lec2-applications.pdf",
    status: "ready",
  },
  {
    slug: "d2p2-ml-metrics",
    code: "Д2 · П2",
    title: "ML-практикум: fit, predict, метрики",
    speaker: "Иван Эйдлин",
    day: 2,
    minutes: 60,
    summary:
      "Учителя с ноутбуками в Colab обучают модель, предсказывающую, сдаст ли школьник ОГЭ. Три модели (LogReg, KNN, RandomForest) одним sklearn-API, train/test split, classification_report, confusion matrix, переобучение глазами, челлендж побить baseline.",
    notebooks: [
      {
        label: "Открыть d2p2_student.ipynb в Colab",
        href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/d2p2_student.ipynb",
      },
      { label: "Скачать d2p2_student.ipynb", href: "/notebooks/d2p2_student.ipynb" },
      { label: "Датасет students_pass.csv", href: "/datasets/students_pass.csv" },
      {
        label: "Заполненный d2p2_filled.ipynb (разбор)",
        href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/d2p2_filled.ipynb",
      },
    ],
    status: "ready",
  },
  {
    slug: "d2p3-vosh-gandalf",
    code: "Д2 · П3",
    title: "ВсОШ по ИИ + Gandalf",
    speaker: "Артур Игнатьев",
    day: 2,
    minutes: 90,
    summary:
      "Как устроена Всероссийская олимпиада по ИИ, структура этапов, что ценит жюри, разбор эталонных задач. Во второй половине — интерактивная игра Gandalf от Lakera: учителя пытаются уговорить ИИ-агента выдать секретный пароль, проходя уровни один за другим.",
    notebooks: [
      { label: "Gandalf · Lakera", href: "https://gandalf.lakera.ai" },
    ],
    status: "soon",
  },
  {
    slug: "d3p1-generative",
    code: "Д3 · П1",
    title: "Генеративные и нейросетевые модели: живой интерактив",
    speaker: "Алексей Власов",
    day: 3,
    minutes: 90,
    summary:
      "Один ноутбук, четыре демо: ResNet18 и карты признаков, sentence embeddings + t-SNE, distilgpt2/Qwen с параметрами температуры и top-k, диффузия DDPM на CIFAR10. Учителя запускают всё у себя в Colab на ходу.",
    notebooks: [
      {
        label: "Открыть talants_summit_ai.ipynb в Colab",
        href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/talants_summit_ai.ipynb",
      },
      {
        label: "Скачать talants_summit_ai.ipynb",
        href: "/notebooks/talants_summit_ai.ipynb",
      },
    ],
    status: "ready",
  },
];
