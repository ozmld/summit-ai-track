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
              <Link href="/guide" className="btn btn-accent">
                Гайд для учителей →
              </Link>
              <Link href="/module-template" className="btn">
                Шаблон модуля →
              </Link>
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
                href="https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/d2p2_student.ipynb"
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent"
              >
                Д2П2. Открыть в Colab ↗
              </a>
              <a
                href="/notebooks/d2p2_student.ipynb"
                target="_blank"
                className="btn"
              >
                d2p2_student.ipynb ↓
              </a>
              <a
                href="/datasets/students_pass.csv"
                target="_blank"
                className="btn"
              >
                students_pass.csv ↓
              </a>
              <Link href="/lectures" className="btn">
                Все лекции →
              </Link>
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
                <span>модули других 7 команд — 8 штук в сумме;</span>
              </li>
              <li className="flex gap-3">
                <span className="num text-[var(--accent)]">C</span>
                <span>ноутбуки ML-практикума и PDF лекций;</span>
              </li>
              <li className="flex gap-3">
                <span className="num text-[var(--accent)]">D</span>
                <span>peer-review на модули коллег.</span>
              </li>
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
