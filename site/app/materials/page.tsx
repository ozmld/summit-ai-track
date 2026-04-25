import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";
import { site } from "@/lib/site";

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        number="VII"
        eyebrow="Ресурсы"
        title="Материалы трека"
        lead="Всё, что нужно для работы команд: гайд, шаблон модуля, задачи контеста, PDF лекций и ноутбуки."
      />
      <Container className="py-12">
        <div className="grid gap-0 md:grid-cols-2">
          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 1</div>
            <h2 className="mt-2 display text-3xl">Папки команд на Drive</h2>
            <p className="mt-3 text-sm leading-relaxed">
              У каждой из 8 команд — своя папка с правом редактирования.
              Внутри: гайд для учителей, шаблон модуля и папка{" "}
              <code className="mono text-xs">resources/</code> для
              дополнительных файлов.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/teams" className="btn btn-accent">
                Найти свою команду →
              </Link>
              <a
                href={site.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                Общий Drive саммита ↗
              </a>
            </div>
          </Panel>

          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 2</div>
            <h2 className="mt-2 display text-3xl">Гайд и шаблон модуля</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Короткая инструкция: что куда заливать, когда что сдавать,
              как будут оценивать. Шаблон — заготовка всех пяти разделов.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="/project/team-guide.md"
                target="_blank"
                className="btn btn-accent"
              >
                Гайд для учителей
              </a>
              <a
                href="/project/module-template.md"
                target="_blank"
                className="btn"
              >
                Шаблон модуля
              </a>
              <Link href="/project" className="btn">
                ТЗ полностью →
              </Link>
            </div>
          </Panel>

          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 3</div>
            <h2 className="mt-2 display text-3xl">Лекции и ноутбуки</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Слайды по парам и Colab-ноутбуки к ML-блоку Д2П2.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="/lectures/lec1-trends.pdf"
                target="_blank"
                className="btn"
              >
                Д1П1. Тренды (PDF)
              </a>
              <a
                href="/lectures/lec2-applications.pdf"
                target="_blank"
                className="btn"
              >
                Д2П1. Применение (PDF)
              </a>
              <a
                href="/lectures/d2p2-ml-metrics.md"
                target="_blank"
                className="btn"
              >
                Д2П2. Конспект
              </a>
              <a
                href="/notebooks/fit_predict_tour.ipynb"
                target="_blank"
                className="btn"
              >
                fit_predict.ipynb
              </a>
              <a
                href="/notebooks/metrics_visual.ipynb"
                target="_blank"
                className="btn"
              >
                metrics_visual.ipynb
              </a>
              <Link href="/lectures" className="btn">
                Все лекции →
              </Link>
            </div>
          </Panel>

          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 4</div>
            <h2 className="mt-2 display text-3xl">Контест Дня 1</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Условия всех 12 задач, прямые ссылки на разбор ловушек для
              LLM и результаты.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/contest" className="btn btn-accent">
                Все задачи →
              </Link>
              <Link href="/leaderboard" className="btn">
                Лидерборд
              </Link>
              <a
                href="/contest/tasks_with_traps.md"
                target="_blank"
                className="btn"
              >
                Разбор ловушек
              </a>
              <a
                href="/contest/easy_tasks.md"
                target="_blank"
                className="btn"
              >
                Разминочные
              </a>
            </div>
          </Panel>

          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 5</div>
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
                <span>архив ВсОШ по ИИ (подборка кураторов трека).</span>
              </li>
            </ul>
          </Panel>

          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">§ 6</div>
            <h2 className="mt-2 display text-3xl">Программа дней</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Чтобы понимать, что и когда происходит.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/days/2" className="btn btn-accent">
                День 2 — сегодня →
              </Link>
              <Link href="/schedule" className="btn">
                Все три дня
              </Link>
            </div>
          </Panel>
        </div>
      </Container>
    </>
  );
}
