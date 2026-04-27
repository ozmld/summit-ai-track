export type PairMaterial = {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
};

export type Pair = {
  slug: string;
  code: string;
  minutes: number;
  title: string;
  speakers: string;
  summary: string;
  materials?: PairMaterial[];
};

export type Day = {
  number: 1 | 2 | 3;
  date: string;
  title: string;
  lead: string;
  pairs: Pair[];
};

export const days: Day[] = [
  {
    number: 1,
    date: "24 апреля 2026 · Астана",
    title: "День 1. Тренды ИИ и контест",
    lead: "Стартовый день: большая обзорная лекция Алексея Власова о том, где сейчас находится ИИ, и разминочный контест — 12 задач (физика, математика, логика), часть из которых содержит «ловушки» для LLM.",
    pairs: [
      {
        slug: "d1p1",
        code: "Д1 · П1",
        minutes: 75,
        title: "ИИ сегодня. Обзор основных трендов",
        speakers: "Алексей Власов",
        summary:
          "Карта текущего ИИ: большие языковые модели, мультимодальность, агенты, экономика, ограничения. Откуда берётся ChatGPT, что такое контекст, куда движется поколение GPT-5/Gemini-3, почему это важно для школьной методики.",
        materials: [
          {
            label: "Слайды лекции (PDF)",
            href: "/lectures/lec1-trends.pdf",
            primary: true,
          },
        ],
      },
      {
        slug: "d1p2",
        code: "Д1 · П2",
        minutes: 90,
        title: "Контест: 12 задач + ловушки для LLM",
        speakers: "Матвей Исупов · Иван Эйдлин",
        summary:
          "Учителя делятся на команды и решают 12 олимпиадных задач разных типов (физика, математика, логика, алгоритмы). В часть задач специально зашиты «ловушки» для LLM — типовые промпты, на которых модель уходит в галлюцинации. Цель — прочувствовать, где ИИ помогает, а где нет.",
        materials: [
          {
            label: "Яндекс.Контест",
            href: "https://contest.yandex.ru/contest/93693/enter",
            primary: true,
            external: true,
          },
        ],
      },
    ],
  },
  {
    number: 2,
    date: "25 апреля 2026 · Астана",
    title: "День 2. Инструменты, ML и запуск проектов",
    lead: "Четыре пары подряд: применение ИИ в работе учителя, ML-практикум на ноутбуках, лекция Игнатьева про ВсОШ по ИИ + игра Gandalf, командная работа над модулем. К вечеру у всех 8 команд готовы Разделы 0–2.",
    pairs: [
      {
        slug: "d2p1",
        code: "Д2 · П1",
        minutes: 60,
        title: "Применение ИИ в жизни и в классе",
        speakers: "Матвей Исупов",
        summary:
          "Вводная: где ИИ используется уже сегодня, какими инструментами пользоваться учителю (ChatGPT, DeepSeek, Colab, Gemini), ограничения моделей, типичные ошибки промптинга.",
        materials: [
          {
            label: "Слайды «Применение ИИ» (PDF)",
            href: "/lectures/lec2-applications.pdf",
            primary: true,
          },
        ],
      },
      {
        slug: "d2p2",
        code: "Д2 · П2",
        minutes: 60,
        title: "ML-практикум: fit, predict, метрики",
        speakers: "Иван Эйдлин",
        summary:
          "Учителя с ноутбуками: у каждого открыт d2p2_student.ipynb в Colab. Работаем с датасетом «сдаст ли школьник ОГЭ» — три модели (LogReg, KNN, RandomForest) одним sklearn-API, train/test split, classification_report и confusion matrix, переобучение глазами, челлендж побить baseline.",
        materials: [
          {
            label: "Открыть d2p2_student.ipynb в Colab",
            href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/d2p2_student.ipynb",
            primary: true,
            external: true,
          },
          {
            label: "Скачать d2p2_student.ipynb",
            href: "/notebooks/d2p2_student.ipynb",
          },
          {
            label: "Заполненный d2p2_filled.ipynb (разбор)",
            href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/d2p2_filled.ipynb",
            external: true,
          },
          {
            label: "Датасет students_pass.csv",
            href: "/datasets/students_pass.csv",
          },
        ],
      },
      {
        slug: "d2p3",
        code: "Д2 · П3",
        minutes: 90,
        title: "ВсОШ по ИИ + Gandalf: ломаем LLM руками",
        speakers: "Артур Игнатьев · Иван Эйдлин",
        summary:
          "Две части. Первая — Артур Игнатьев рассказывает, как устроена Всероссийская олимпиада по ИИ, структура этапов, что ценит жюри, разбор эталонных задач. Вторая — интерактивная игра Gandalf от Lakera: учителя на своих ноутбуках пытаются «уговорить» ИИ-агента выдать секретный пароль, проходя уровни один за другим. Лучший способ почувствовать, как работают prompt injection и защиты от них.",
        materials: [
          {
            label: "Слайды Игнатьева (скоро)",
            href: "#",
          },
          {
            label: "Gandalf · Lakera",
            href: "https://gandalf.lakera.ai",
            primary: true,
            external: true,
          },
        ],
      },
      {
        slug: "d2p4",
        code: "Д2 · П4",
        minutes: 60,
        title: "Командная работа над модулем",
        speakers: "Все менторы в зале",
        summary:
          "Команды пишут в своём Google Doc Разделы 0–2: название и состав, условие задачи в формате ВсОШ, решение и ответ. Менторы закреплены за столами и отвечают на вопросы. Если Раздел 2 не успели — переезжает на утро Д3.",
        materials: [
          { label: "ТЗ командного проекта", href: "/project", primary: true },
          { label: "Гайд для учителей", href: "/guide" },
          { label: "Шаблон модуля", href: "/module-template" },
          { label: "Папки команд на Drive", href: "/teams" },
        ],
      },
    ],
  },
  {
    number: 3,
    date: "26 апреля 2026 · Астана",
    title: "День 3. Генеративные модели и защита проектов",
    lead: "Финальный день: интерактивный ноутбук Алексея Власова с четырьмя демо (CV, NLP, промптинг, диффузия) и последняя пара — доработка модулей и защита трёх отобранных команд перед жюри.",
    pairs: [
      {
        slug: "d3p1",
        code: "Д3 · П1",
        minutes: 90,
        title: "Генеративные и нейросетевые модели: живой интерактив",
        speakers: "Алексей Власов",
        summary:
          "Один ноутбук — четыре демо. ResNet18 и карты признаков (что «видит» свёрточная сеть), sentence embeddings + t-SNE (почему слова имеют смысл), distilgpt2/Qwen с параметрами температуры и top-k (как параметры меняют стиль текста), DDPM на CIFAR10 (как изображение рождается из шума). Учителя запускают всё у себя в Colab на ходу.",
        materials: [
          {
            label: "Открыть talants_summit_ai.ipynb в Colab",
            href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/talants_summit_ai.ipynb",
            primary: true,
            external: true,
          },
          {
            label: "Скачать talants_summit_ai.ipynb",
            href: "/notebooks/talants_summit_ai.ipynb",
          },
        ],
      },
      {
        slug: "d3p2",
        code: "Д3 · П2",
        minutes: 90,
        title: "Доработка модулей и защита проектов",
        speakers: "Все команды · жюри",
        summary:
          "Первая половина — финальная сборка модулей в Drive-папках команд. Вторая половина — защита трёх отобранных жюри команд (SM2, ZeyinX, AI STARS): короткая презентация по 10 минут, ответы на вопросы жюри и коллег. Остальные модули остаются в архиве саммита и доступны всем участникам.",
        materials: [
          { label: "Папки команд на Drive", href: "/teams", primary: true },
          { label: "Шаблон модуля", href: "/module-template" },
          { label: "ТЗ проекта", href: "/project" },
        ],
      },
    ],
  },
];

export function getDay(n: number): Day | undefined {
  return days.find((d) => d.number === n);
}

export const day2Pairs = days.find((d) => d.number === 2)!.pairs;
