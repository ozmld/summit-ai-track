export type VoshTask = {
  slug: string;
  title: string;
  topic: string;
  stage: string;
  featured?: boolean;
  link?: string;
  note?: string;
};

export const voshOfficial = {
  label: "Официальный архив ВсОШ по ИИ",
  href: "#",
};

export const voshTasks: VoshTask[] = [
  {
    slug: "featured-1",
    title: "Задача 1 · теорвер / Байес",
    topic: "Теорвер",
    stage: "Разбор Д2П3",
    featured: true,
    note: "Залить ссылкой после формирования архива.",
  },
  {
    slug: "featured-2",
    title: "Задача 2 · классификация / метрики",
    topic: "ML",
    stage: "Разбор Д2П3",
    featured: true,
    note: "Залить ссылкой после формирования архива.",
  },
  {
    slug: "featured-3",
    title: "Задача 3 · концептуальная / алгоритмическая",
    topic: "Логика",
    stage: "Разбор Д2П3",
    featured: true,
    note: "Залить ссылкой после формирования архива.",
  },
];
