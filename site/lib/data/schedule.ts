export type ScheduleItem = {
  time: string;
  title: string;
  kind:
    | "lecture"
    | "practice"
    | "contest"
    | "defense"
    | "break"
    | "ceremony"
    | "other";
  speaker?: string;
  note?: string;
};

export type ScheduleDay = {
  date: string;
  label: string;
  items: ScheduleItem[];
};

export const schedule: ScheduleDay[] = [
  {
    date: "2026-04-24",
    label: "День 1 — Погружение",
    items: [
      {
        time: "09:00–09:45",
        title: "Торжественное открытие саммита",
        kind: "ceremony",
      },
      {
        time: "10:15–11:15",
        title: "Лекция 1. ИИ сегодня: обзор основных трендов",
        speaker: "Алексей Власов",
        kind: "lecture",
      },
      {
        time: "11:30–12:45",
        title:
          "Лекция 2. ИИ сегодня: обзор возможностей применения (перенесена на день 2)",
        speaker: "Алексей Власов",
        kind: "lecture",
        note: "Объединена с рассказом Артура Игнатьева",
      },
      { time: "12:45–14:00", title: "Обед", kind: "break" },
      {
        time: "14:00–15:45",
        title: "Экскурсия по Nazarbayev University",
        kind: "other",
      },
      {
        time: "15:45–17:30",
        title: "Практическое занятие: контест «Математика + физика + ИИ»",
        kind: "contest",
        note: "12 задач, задачи с ловушками для LLM",
      },
      {
        time: "17:30–18:00",
        title: "Подготовка к вечерней программе",
        kind: "break",
      },
    ],
  },
  {
    date: "2026-04-25",
    label: "День 2 — Инструменты и методика",
    items: [
      {
        time: "10:15–11:30",
        title: "Лекция 3. ИИ сегодня: обзор возможностей применения",
        speaker: "Алексей Власов + Артур Игнатьев",
        kind: "lecture",
      },
      {
        time: "11:30–13:00",
        title: "Лекция 4. Олимпиады по ИИ: что такое ВсОШ по ИИ",
        speaker: "Артур Игнатьев / Максим Бидва",
        kind: "lecture",
      },
      { time: "13:00–14:00", title: "Обед", kind: "break" },
      {
        time: "14:00–15:45",
        title: "Практика: разбор задач ВсОШ + старт командного проекта",
        kind: "practice",
        note: "Формирование команд, выбор модуля и кейса",
      },
      {
        time: "15:45–16:15",
        title: "Семинар: prompt injection и гигиена промтов",
        kind: "lecture",
      },
      {
        time: "17:00–18:00",
        title: "Работа над проектом в командах",
        kind: "practice",
      },
    ],
  },
  {
    date: "2026-04-26",
    label: "День 3 — Проект и защита",
    items: [
      {
        time: "09:30–11:00",
        title: "Практика: финализация проекта, подготовка презентации",
        kind: "practice",
        note: "Консультации с кураторами трека",
      },
      {
        time: "11:00–12:30",
        title: "Защита проектов перед жюри (часть 1)",
        kind: "defense",
      },
      { time: "12:30–13:30", title: "Обед", kind: "break" },
      {
        time: "13:30–14:30",
        title: "Защита проектов перед жюри (часть 2)",
        kind: "defense",
      },
      {
        time: "14:30–15:30",
        title: "Разбор лучших работ + объявление результатов",
        kind: "ceremony",
      },
      {
        time: "15:30–16:00",
        title: "Торжественное закрытие саммита",
        kind: "ceremony",
      },
    ],
  },
];
