import { Container, PageHeader, Panel } from "@/components/section";
import { juries } from "@/lib/data/juries";
import { site } from "@/lib/site";

const stages = [
  {
    n: "A",
    title: "Авторская задача",
    body: "Оригинальная задача уровня ВсОШ по ИИ (школьный / муниципальный этап). Обязательно: формулировка, чистый ответ, полное решение, формат ввода/вывода.",
  },
  {
    n: "B",
    title: "Разбор для ученика",
    body: "Пошаговый разбор: как подступиться, какие идеи пробовать, какие ошибки типичны, какие подсказки дать, если застрял.",
  },
  {
    n: "C",
    title: "Гайд для учителя",
    body: "Как провести занятие: тайминг, вопросы для класса, критерии оценивания, как расширять задачу до проекта или урока.",
  },
  {
    n: "D",
    title: "Задача-ловушка (опционально, бонус)",
    body: "Версия задачи с подвохом для ИИ: ложный авторитет, инъекция в данных, роль-бот и т.п. Показывает ученику, что слепо копировать ответ у LLM нельзя.",
  },
  {
    n: "E",
    title: "Защита",
    body: "7 минут презентация + 3 минуты вопросов от жюри в день 3.",
  },
];

const rubric = [
  { item: "Оригинальность задачи", points: 20 },
  { item: "Корректность и полнота решения", points: 20 },
  { item: "Качество методички для ученика", points: 20 },
  { item: "Гайд для учителя", points: 20 },
  { item: "Презентация и защита", points: 10 },
];

const formats = [
  {
    title: "Логика / алгоритмы",
    body: "Устный счёт, инварианты, жадные алгоритмы — без программирования.",
  },
  {
    title: "Классическое ML",
    body: "Метрики (accuracy, recall, F1), confusion matrix, ансамбли, переобучение.",
  },
  {
    title: "LLM и промпты",
    body: "Галлюцинации, prompt injection, сравнение ответов разных моделей.",
  },
  {
    title: "Работа с данными",
    body: "Чтение CSV, агрегации, простая визуализация, элементарная статистика.",
  },
];

export default function ProjectPage() {
  return (
    <>
      <PageHeader
        number="III"
        eyebrow="Командный проект"
        title="Олимпиадный модуль по ИИ"
        lead="За два дня каждая команда собирает законченный учебный модуль, с которым учитель может прийти в класс и провести 1–2 урока подготовки к ВсОШ по ИИ."
      />

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <section>
            <div className="eyebrow mb-3">§ 1 · Этапы работы</div>
            <ol className="space-y-8">
              {stages.map((s) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[60px_1fr] gap-4 border-t border-[var(--rule)] pt-5"
                >
                  <span className="num text-5xl text-[var(--accent)] leading-none">
                    {s.n}
                  </span>
                  <div>
                    <div className="serif text-2xl">{s.title}</div>
                    <p className="mt-2 text-[15px] text-[var(--ink-muted)] leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-16">
              <div className="eyebrow mb-3">§ 2 · Форматы задач на выбор</div>
              <div className="grid gap-0 sm:grid-cols-2">
                {formats.map((f) => (
                  <div
                    key={f.title}
                    className="border border-[var(--rule)] -ml-px -mt-px p-5"
                  >
                    <div className="serif text-xl">{f.title}</div>
                    <p className="mt-2 text-sm text-[var(--ink-muted)]">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            <Panel>
              <div className="eyebrow mb-4">§ 3 · Рубрикатор оценки</div>
              <table className="editorial text-sm">
                <tbody>
                  {rubric.map((r) => (
                    <tr key={r.item}>
                      <td>{r.item}</td>
                      <td className="text-right num">{r.points}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="text-[var(--ink-muted)] italic">
                      Бонус: задача-ловушка
                    </td>
                    <td className="text-right num text-[var(--ink-muted)]">
                      +10
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="serif text-lg pt-4">Итого</td>
                    <td className="text-right num text-lg pt-4 text-[var(--accent)]">
                      100 (+10)
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Panel>

            <Panel>
              <div className="eyebrow mb-4">§ 4 · Жюри</div>
              <ul className="space-y-3">
                {juries.map((j) => (
                  <li
                    key={j.fio}
                    className="serif text-base leading-tight"
                  >
                    {j.fio}
                  </li>
                ))}
              </ul>
              <a
                href={site.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent mt-5"
              >
                Открыть Drive саммита ↗
              </a>
            </Panel>
          </aside>
        </div>
      </Container>
    </>
  );
}
