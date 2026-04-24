import { Container, Card, PageTitle } from "@/components/section";
import { site } from "@/lib/site";

export default function MaterialsPage() {
  return (
    <Container>
      <PageTitle
        eyebrow="Ресурсы"
        title="Материалы трека"
        description="Всё, что нужно для работы команд: шаблоны, задачи, ссылки на Drive."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Шаблон проекта</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            В Drive саммита для каждой команды есть своя папка с шаблонами:
            Google Doc для задачи, методичка для ученика и гайд для учителя.
          </p>
          <a
            href={site.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-4 text-sm"
          >
            Открыть Drive саммита
          </a>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Задачи контеста</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Полный разбор, включая ловушки для LLM и корректные решения.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="/contest/tasks_with_traps.md"
              target="_blank"
              className="btn btn-ghost text-sm"
            >
              Разбор с trap-задачами
            </a>
            <a
              href="/contest/easy_tasks.md"
              target="_blank"
              className="btn btn-ghost text-sm"
            >
              Разминочные задачи
            </a>
            <a
              href="/contest/results.csv"
              target="_blank"
              className="btn btn-ghost text-sm"
            >
              Сырой CSV результатов
            </a>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Лекционные PDF</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Слайды первых двух лекций. Раздел лекций — с аннотациями.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="/lectures/lec1-trends.pdf"
              target="_blank"
              className="btn btn-ghost text-sm"
            >
              Лекция 1. Тренды
            </a>
            <a
              href="/lectures/lec2-applications.pdf"
              target="_blank"
              className="btn btn-ghost text-sm"
            >
              Лекция 2. Применение
            </a>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Для учителя</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Короткий чек-лист того, что взять домой с саммита:
          </p>
          <ul className="mt-3 space-y-2 text-sm list-disc pl-5 text-[var(--muted)]">
            <li>готовый модуль своей команды (задача + два гайда);</li>
            <li>модули других команд — 8 в сумме;</li>
            <li>список trap-задач и памятка по prompt injection;</li>
            <li>подборка материалов по ВсОШ по ИИ.</li>
          </ul>
        </Card>
      </div>
    </Container>
  );
}
