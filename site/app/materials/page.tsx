import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";
import { site } from "@/lib/site";

type Material = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
  note?: string;
};

const byDay: { day: number; title: string; items: Material[] }[] = [
  {
    day: 1,
    title: "Тренды и контест",
    items: [
      {
        label: "Лекция Власова: «ИИ сегодня» (PDF)",
        href: "/lectures/lec1-trends.pdf",
        primary: true,
      },
      {
        label: "Яндекс.Контест (12 задач)",
        href: "https://contest.yandex.ru/contest/93693/enter",
        external: true,
        primary: true,
      },
    ],
  },
  {
    day: 2,
    title: "Инструменты, ML и Gandalf",
    items: [
      {
        label: "Д2П1. Применение ИИ — Исупов (PDF)",
        href: "/lectures/lec2-applications.pdf",
      },
      {
        label: "Д2П2. ML-практикум в Colab",
        href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/d2p2_student.ipynb",
        external: true,
        primary: true,
      },
      {
        label: "Д2П2. Скачать d2p2_student.ipynb",
        href: "/notebooks/d2p2_student.ipynb",
      },
      {
        label: "Д2П2. Заполненный d2p2_filled.ipynb",
        href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/d2p2_filled.ipynb",
        external: true,
      },
      {
        label: "Д2П2. Датасет students_pass.csv",
        href: "/datasets/students_pass.csv",
      },
      {
        label: "Д2П3. Игра Gandalf · Lakera",
        href: "https://gandalf.lakera.ai",
        external: true,
      },
      {
        label: "Д2П3. Слайды Игнатьева",
        href: "#",
        note: "скоро",
      },
    ],
  },
  {
    day: 3,
    title: "Генеративные модели и защита",
    items: [
      {
        label: "Д3П1. Открыть Власова в Colab (CV / NLP / LM / Diffusion)",
        href: "https://colab.research.google.com/github/ozmld/summit-ai-track/blob/main/site/public/notebooks/talants_summit_ai.ipynb",
        external: true,
        primary: true,
      },
      {
        label: "Д3П1. Скачать talants_summit_ai.ipynb",
        href: "/notebooks/talants_summit_ai.ipynb",
      },
    ],
  },
];

function MatButton({ m }: { m: Material }) {
  const cls = m.primary ? "btn btn-accent" : "btn";
  if (m.note === "скоро") {
    return (
      <span className="btn opacity-50 cursor-not-allowed">
        {m.label} · скоро
      </span>
    );
  }
  if (m.external) {
    return (
      <a href={m.href} target="_blank" rel="noreferrer" className={cls}>
        {m.label} ↗
      </a>
    );
  }
  return (
    <a href={m.href} target="_blank" className={cls}>
      {m.label} ↓
    </a>
  );
}

export default function MaterialsPage() {
  return (
    <>
      <PageHeader
        number="VII"
        eyebrow="Ресурсы"
        title="Материалы саммита"
        lead="Все материалы трека, сгруппированные по дням. Плюс блок про проект и командные папки Drive."
      />

      <Container className="py-10 space-y-14">
        {byDay.map((d) => (
          <section key={d.day}>
            <div className="flex items-baseline justify-between border-b-2 border-[var(--ink)] pb-3 mb-5">
              <div className="flex items-baseline gap-4">
                <span className="num text-5xl text-[var(--accent)]">
                  Д{d.day}
                </span>
                <h2 className="display text-3xl leading-tight">{d.title}</h2>
              </div>
              <Link href={`/days/${d.day}`} className="link-underline text-sm">
                План дня →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {d.items.map((m) => (
                <MatButton key={m.label} m={m} />
              ))}
            </div>
          </section>
        ))}

        <section className="pt-4">
          <div className="border-b-2 border-[var(--ink)] pb-3 mb-5">
            <div className="eyebrow">Проект</div>
            <h2 className="display text-3xl leading-tight">
              Папки команд, гайд и шаблон модуля
            </h2>
          </div>
          <div className="grid gap-0 md:grid-cols-2">
            <Panel className="-ml-px -mt-px">
              <div className="eyebrow">§ 1</div>
              <h3 className="mt-2 display text-2xl">Папки команд на Drive</h3>
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
              <h3 className="mt-2 display text-2xl">Гайд и шаблон модуля</h3>
              <p className="mt-3 text-sm leading-relaxed">
                Короткая инструкция: что куда заливать, когда что сдавать, как
                будут оценивать. Шаблон — заготовка всех пяти разделов.
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
          </div>
        </section>
      </Container>
    </>
  );
}
