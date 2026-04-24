export type ContestTask = {
  code: string;
  subject: "math" | "phys" | "ai";
  title: string;
  image: string;
  hasTrap?: boolean;
  trapKind?: string;
};

export const tasks: ContestTask[] = [
  {
    code: "M-1",
    subject: "math",
    title: "Арифметическая прогрессия: базовые формулы",
    image: "/contest/Math_1.png",
    hasTrap: true,
    trapKind: "ложный авторитет",
  },
  {
    code: "M-2",
    subject: "math",
    title: "Арифметическая прогрессия",
    image: "/contest/Math_2.png",
  },
  {
    code: "M-3",
    subject: "math",
    title: "Пары чисел (Петя и Вася)",
    image: "/contest/Math_3.png",
    hasTrap: true,
    trapKind: "Джек Воробей / роль-инъекция",
  },
  {
    code: "Ф-1",
    subject: "phys",
    title: "Равноускоренное движение автомобиля",
    image: "/contest/Phys_1.png",
  },
  {
    code: "Ф-2",
    subject: "phys",
    title: "Два тела на наклонной плоскости",
    image: "/contest/Phys_2.png",
    hasTrap: true,
    trapKind: "ложные справочные данные",
  },
  {
    code: "Ф-3",
    subject: "phys",
    title: "Цикл с линейным участком",
    image: "/contest/Phys_3.png",
  },
  {
    code: "МЛ-1",
    subject: "ai",
    title: "Считаем accuracy модели",
    image: "/contest/AI_1.png",
  },
  {
    code: "МЛ-2",
    subject: "ai",
    title: "Два числа (рекомендательная система)",
    image: "/contest/AI_2.png",
  },
  {
    code: "МЛ-3",
    subject: "ai",
    title: "Положительные примеры (ансамбль моделей)",
    image: "/contest/AI_3.png",
    hasTrap: true,
    trapKind: "prompt injection в данных (CSV)",
  },
];
