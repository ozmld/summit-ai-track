import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";
import { juries } from "@/lib/data/juries";
import { site } from "@/lib/site";

const sections = [
  {
    n: "0",
    title: "Шапка модуля",
    body: "Название модуля, состав команды, тема одной строкой, тип задачи (математическая / алгоритмическая / концептуальная / с кодом).",
    when: "Д2П1 — последние 5 минут + межпарное время",
  },
  {
    n: "1",
    title: "Условие задачи",
    body: "Авторская задача уровня ВсОШ по ИИ (школьный / муниципальный этап). Данные → что дано → что найти → формат ввода-вывода. Без решения.",
    when: "Д2П4 — первые 25 минут работы",
  },
  {
    n: "2",
    title: "Решение и ответ",
    body: "Полное решение с ходом рассуждения + чистый ответ в оговоренном формате. Численные задачи рекомендуем проверить в Colab.",
    when: "Д2П4 — вторая половина пары",
  },
  {
    n: "3",
    title: "Методичка для ученика",
    body: "Пошаговый разбор: как подступиться к задаче, какие идеи пробовать, какие ошибки типичны, какие подсказки давать, если застрял.",
    when: "Д3 — первая пара проекта",
  },
  {
    n: "4",
    title: "Гайд для учителя",
    body: "Как провести занятие: тайминг, вопросы для класса, критерии оценивания, как расширять задачу до проекта или урока.",
    when: "Д3 — вторая пара проекта",
  },
];

const boosts = [
  {
    code: "Л",
    title: "Устойчивость к LLM",
    body: "Команда показывает, как именно ChatGPT / DeepSeek ломается на этой задаче: версия условия с подвохом, пример сбитого ответа, объяснение механики.",
  },
  {
    code: "К",
    title: "Реальный кейс",
    body: "Задача привязана к реальной истории, новости или данным — с источником. Учитель легко рассказывает «зачем».",
  },
  {
    code: "С",
    title: "Серия",
    body: "К задаче прилагается продолжение: 2–3 связанные задачи возрастающей сложности.",
  },
  {
    code: "В",
    title: "Визуал",
    body: "В условии и/или разборе есть картинка / схема / график, сделанные командой.",
  },
  {
    code: "И",
    title: "Интерактив",
    body: "Есть ноутбук Colab / Jupyter / веб-демо, с которым ученик может поиграться руками.",
  },
];

const rubric = [
  { item: "Оригинальность задачи", points: 25 },
  { item: "Корректность и полнота решения", points: 25 },
  { item: "Качество методички для ученика", points: 25 },
  { item: "Гайд для учителя", points: 25 },
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

      <Container className="py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-b border-[var(--rule)] pb-10">
          <div>
            <div className="num text-5xl">5</div>
            <div className="eyebrow mt-2">Разделов модуля (0–4)</div>
          </div>
          <div>
            <div className="num text-5xl">5</div>
            <div className="eyebrow mt-2">Бустов на выбор</div>
          </div>
          <div>
            <div className="num text-5xl">+5</div>
            <div className="eyebrow mt-2">Баллов за каждый буст</div>
          </div>
          <div>
            <div className="num text-5xl">100</div>
            <div className="eyebrow mt-2">Итоговый максимум</div>
          </div>
        </div>
      </Container>

      <Container className="py-6">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <section>
            <div className="eyebrow mb-3">§ 1 · Разделы модуля</div>
            <ol className="space-y-6">
              {sections.map((s) => (
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
                    <div className="mt-2 mono text-[11px] uppercase tracking-widest text-[var(--accent)]">
                      когда: {s.when}
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-16">
              <div className="eyebrow mb-3">§ 2 · Меню бустов (опционально)</div>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-5">
                Команда может взять любое количество бустов из пяти. Каждый
                добавляет <span className="text-[var(--accent)]">+5 баллов</span>{" "}
                к итогу при условии, что буст действительно реализован.
                Не обязательны, но увеличивают шанс «приза учителей».
              </p>
              <div className="grid gap-0 sm:grid-cols-2">
                {boosts.map((b) => (
                  <div
                    key={b.code}
                    className="border border-[var(--rule)] -ml-px -mt-px p-5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="num text-3xl text-[var(--accent)]">
                        {b.code}
                      </span>
                      <span className="serif text-xl">{b.title}</span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--ink-muted)]">
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="eyebrow mb-3">§ 3 · Форматы задач на выбор</div>
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

            <div className="mt-16">
              <div className="eyebrow mb-3">§ 4 · Защита</div>
              <p className="serif text-lg leading-snug">
                Жюри отбирает три самых сильных модуля. Эти три команды
                выступают на Д3П2 — короткая презентация (≈ 10 минут) и
                ответы на вопросы. Остальные модули остаются в архиве
                саммита и доступны всем участникам через папки Drive.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="border-b border-[var(--rule-soft)] pb-2">
                  <span className="mono text-[11px] uppercase tracking-widest text-[var(--accent)]">
                    1.
                  </span>{" "}
                  Что за задача и почему её стоит взять в класс.
                </li>
                <li className="border-b border-[var(--rule-soft)] pb-2">
                  <span className="mono text-[11px] uppercase tracking-widest text-[var(--accent)]">
                    2.
                  </span>{" "}
                  Идея решения — без технических подробностей, по сути.
                </li>
                <li className="border-b border-[var(--rule-soft)] pb-2">
                  <span className="mono text-[11px] uppercase tracking-widest text-[var(--accent)]">
                    3.
                  </span>{" "}
                  Как команда планирует проводить занятие с учениками.
                </li>
                <li className="border-b border-[var(--rule-soft)] pb-2">
                  <span className="mono text-[11px] uppercase tracking-widest text-[var(--accent)]">
                    4.
                  </span>{" "}
                  Вопросы от жюри и коллег.
                </li>
              </ul>
            </div>
          </section>

          <aside className="space-y-8">
            <Panel>
              <div className="eyebrow mb-4">§ 5 · Рубрикатор</div>
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
                      Бусты (до 5 штук)
                    </td>
                    <td className="text-right num text-[var(--ink-muted)]">
                      +5 каждый
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="serif text-lg pt-4">Итого</td>
                    <td className="text-right num text-lg pt-4 text-[var(--accent)]">
                      100 (+25)
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Panel>

            <Panel>
              <div className="eyebrow mb-4">§ 6 · Материалы команды</div>
              <p className="text-sm text-[var(--ink-muted)] mb-4 leading-relaxed">
                Гайд для учителей — куда заливать, как работать с папкой,
                как сдавать модуль. Шаблон — заготовка всех пяти разделов.
              </p>
              <div className="flex flex-col gap-2">
                <Link href="/guide" className="btn btn-accent">
                  Гайд для учителей →
                </Link>
                <Link href="/module-template" className="btn">
                  Шаблон модуля →
                </Link>
              </div>
            </Panel>

            <Panel>
              <div className="eyebrow mb-4">§ 7 · Тайминг по дням</div>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/days/2" className="link-underline">
                    День 2 — Разделы 0, 1, 2 →
                  </Link>
                </li>
                <li className="text-[var(--ink-muted)]">
                  День 3 — Разделы 3, 4 + защита трёх отобранных команд
                </li>
              </ul>
            </Panel>

            <Panel>
              <div className="eyebrow mb-4">§ 8 · Жюри</div>
              <ul className="space-y-3">
                {juries.map((j) => (
                  <li key={j.fio} className="serif text-base leading-tight">
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
