import { Container, PageHeader, Panel } from "@/components/section";
import { site } from "@/lib/site";

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        number="VII"
        eyebrow="Ресурсы"
        title="Материалы трека"
        lead="Всё, что нужно для работы команд: шаблоны, задачи, PDF, ссылки на Drive."
      />
      <Container className="py-12">
        <div className="grid gap-0 md:grid-cols-2">
          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 1</div>
            <h2 className="mt-2 display text-3xl">Шаблон проекта</h2>
            <p className="mt-3 text-sm leading-relaxed">
              В Drive саммита для каждой команды есть своя папка с
              шаблонами: Google Doc для задачи, методичка для ученика и
              гайд для учителя.
            </p>
            <a
              href={site.driveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-accent mt-5"
            >
              Открыть Drive саммита ↗
            </a>
          </Panel>
          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 2</div>
            <h2 className="mt-2 display text-3xl">Задачи контеста</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Полный разбор, включая ловушки для LLM и корректные решения.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="/contest/tasks_with_traps.md"
                target="_blank"
                className="btn"
              >
                Разбор задач с ловушками
              </a>
              <a
                href="/contest/easy_tasks.md"
                target="_blank"
                className="btn"
              >
                Разминочные
              </a>
              <a
                href="/contest/results.csv"
                target="_blank"
                className="btn"
              >
                CSV результатов
              </a>
            </div>
          </Panel>
          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 3</div>
            <h2 className="mt-2 display text-3xl">Лекционные PDF</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Слайды первых двух лекций. Раздел лекций — с аннотациями.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="/lectures/lec1-trends.pdf"
                target="_blank"
                className="btn"
              >
                Лекция I. Тренды
              </a>
              <a
                href="/lectures/lec2-applications.pdf"
                target="_blank"
                className="btn"
              >
                Лекция II. Применение
              </a>
            </div>
          </Panel>
          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 4</div>
            <h2 className="mt-2 display text-3xl">Чек-лист учителю</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Что берём с саммита домой:
            </p>
            <ul className="mt-4 space-y-2 text-sm serif">
              <li className="flex gap-3">
                <span className="num text-[var(--accent)]">A</span>
                <span>готовый модуль своей команды (задача + два гайда);</span>
              </li>
              <li className="flex gap-3">
                <span className="num text-[var(--accent)]">B</span>
                <span>модули других команд — 8 штук в сумме;</span>
              </li>
              <li className="flex gap-3">
                <span className="num text-[var(--accent)]">C</span>
                <span>задачи-ловушки и памятка по prompt injection;</span>
              </li>
              <li className="flex gap-3">
                <span className="num text-[var(--accent)]">D</span>
                <span>подборка материалов по ВсОШ по ИИ.</span>
              </li>
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
