import Link from "next/link";
import { Container, Panel, SectionHead } from "@/components/section";
import { schedule } from "@/lib/data/schedule";
import { teams } from "@/lib/data/teams";
import { juries } from "@/lib/data/juries";
import { site } from "@/lib/site";
import { day2Pairs } from "@/lib/data/day2";

export default function Home() {
  const totalMembers = teams.reduce((s, t) => s + t.members.length, 0);

  return (
    <>
      <section className="border-b border-[var(--ink)]">
        <Container className="py-14 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-end">
            <div>
              <div className="eyebrow mb-6">
                Трек ИИ · Выпуск I · {site.dates}
              </div>
              <h1 className="display text-[44px] sm:text-[84px] leading-[0.9]">
                Учим учителей{" "}
                <span className="display-italic text-[var(--accent)]">
                  готовить
                </span>{" "}
                школьников к{" "}
                <span className="display-italic text-[var(--accent)]">
                  олимпиадам
                </span>{" "}
                по искусственному интеллекту.
              </h1>
              <p className="mt-8 serif italic text-xl text-[var(--ink-muted)] max-w-2xl">
                Три дня в Астане: лекции, контест с ловушками для LLM,
                командный проект — готовый олимпиадный модуль, который
                учитель унесёт в свою школу.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/project" className="btn btn-accent">
                  Читать ТЗ проекта →
                </Link>
                <Link href="/schedule" className="btn">
                  Программа саммита
                </Link>
                <Link href="/leaderboard" className="btn">
                  Лидерборд контеста
                </Link>
              </div>
            </div>

            <div className="lg:border-l lg:border-[var(--rule)] lg:pl-10">
              <div className="eyebrow">Повестка</div>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="flex items-baseline gap-3">
                  <span className="num text-2xl text-[var(--accent)]">01</span>
                  <span>Две лекции об ИИ и инструментах</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="num text-2xl text-[var(--accent)]">02</span>
                  <span>Контест из 12 задач (4 с ловушкой для ИИ)</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="num text-2xl text-[var(--accent)]">03</span>
                  <span>Проект: олимпиадный модуль по ИИ</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="num text-2xl text-[var(--accent)]">04</span>
                  <span>Защита перед жюри + выдача материалов</span>
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b-2 border-[var(--ink)] bg-[var(--paper-2)]/40">
        <Container className="py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <div className="eyebrow">Сегодняшний выпуск</div>
              <div className="section-number mt-2">№ 02</div>
              <h2 className="display text-4xl sm:text-5xl mt-2">
                День 2.{" "}
                <span className="display-italic text-[var(--accent)]">
                  Инструменты и методика
                </span>
              </h2>
              <p className="serif italic text-[var(--ink-muted)] mt-4">
                25 апреля · четыре пары подряд · к вечеру у всех 8 команд
                готовы Разделы 0–2 их модуля.
              </p>
              <Link href="/days/2" className="btn btn-accent mt-6">
                Открыть план дня →
              </Link>
            </div>
            <ol className="border-t border-[var(--ink)]">
              {day2Pairs.map((p, i) => (
                <li
                  key={p.slug}
                  className="grid grid-cols-[50px_1fr_70px] gap-4 items-baseline border-b border-[var(--rule-soft)] py-3"
                >
                  <span className="num text-2xl text-[var(--accent)]">
                    П{i + 1}
                  </span>
                  <span>
                    <Link
                      href={`/days/2#${p.slug}`}
                      className="serif text-lg leading-tight link-underline"
                    >
                      {p.title}
                    </Link>
                    <div className="text-xs text-[var(--ink-muted)] mt-1">
                      {p.speakers}
                    </div>
                  </span>
                  <span className="text-right mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
                    {p.code}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-b border-[var(--rule)] pb-10">
          <div>
            <div className="num text-5xl">{teams.length}</div>
            <div className="eyebrow mt-2">Команд</div>
          </div>
          <div>
            <div className="num text-5xl">{totalMembers}</div>
            <div className="eyebrow mt-2">Учителей</div>
          </div>
          <div>
            <div className="num text-5xl">12</div>
            <div className="eyebrow mt-2">Задач в контесте</div>
          </div>
          <div>
            <div className="num text-5xl">4</div>
            <div className="eyebrow mt-2">Ловушки для LLM</div>
          </div>
        </div>
      </Container>

      <Container className="py-6">
        <SectionHead
          number="I"
          title="Программа"
          right={
            <Link href="/schedule" className="link-underline">
              Все три дня →
            </Link>
          }
        />
        <div className="mt-8 grid gap-0 sm:grid-cols-3 sm:divide-x sm:divide-[var(--rule)]">
          {schedule.map((day, idx) => (
            <div key={day.date} className="px-0 sm:px-6 first:pl-0 last:pr-0 pb-6">
              <div className="flex items-baseline gap-3">
                <span className="num text-4xl text-[var(--accent)]">
                  0{idx + 1}
                </span>
                <div>
                  <div className="eyebrow">{day.date}</div>
                  <div className="serif text-xl leading-tight">
                    {day.label.replace(/^День \d+ — /, "")}
                  </div>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {day.items.slice(0, 5).map((i) => (
                  <li key={i.time} className="grid grid-cols-[80px_1fr] gap-3">
                    <span className="mono text-xs text-[var(--ink-muted)] pt-0.5">
                      {i.time}
                    </span>
                    <span>{i.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHead
          number="II"
          title="Командный проект"
          right={
            <Link href="/project" className="link-underline">
              ТЗ полностью →
            </Link>
          }
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <p className="serif text-2xl leading-snug">
              <span className="drop">О</span>лимпиадный модуль по ИИ — это
              законченный набор материалов, с которым учитель может прийти
              в свой класс и провести 1–2 урока подготовки к ВсОШ по ИИ.
              Каждая команда разрабатывает собственный модуль за два дня
              саммита.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                {
                  n: "A",
                  t: "Задача",
                  d: "Оригинальное условие уровня ВсОШ, полное решение, формат ответа.",
                },
                {
                  n: "B",
                  t: "Разбор для ученика",
                  d: "Методичка «как думать», типичные ошибки, подсказки.",
                },
                {
                  n: "C",
                  t: "Гайд для учителя",
                  d: "Как вести занятие, критерии оценки, расширения задачи.",
                },
                {
                  n: "D",
                  t: "Задача-ловушка (бонус)",
                  d: "Вариант задачи с подвохом для ИИ — учим школьника не доверять LLM слепо.",
                },
              ].map((b) => (
                <div
                  key={b.n}
                  className="border-t border-[var(--ink)] pt-3"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="num text-3xl text-[var(--accent)]">
                      {b.n}
                    </span>
                    <span className="serif text-lg">{b.t}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Panel>
            <div className="eyebrow">Редакция · жюри</div>
            <ul className="mt-4 space-y-4">
              {juries.map((j) => (
                <li
                  key={j.fio}
                  className="serif text-lg leading-tight border-b border-[var(--rule)] pb-3 last:border-0"
                >
                  {j.fio}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </Container>

      <Container className="py-16">
        <SectionHead
          number="III"
          title="Команды саммита"
          right={
            <Link href="/teams" className="link-underline">
              Все составы →
            </Link>
          }
        />
        <div className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((t, i) => (
            <Link
              key={t.slug}
              href={`/teams#${t.slug}`}
              className="group block border border-[var(--rule)] -ml-px -mt-px p-5 hover:bg-[var(--paper-2)] transition"
            >
              <div className="flex items-baseline justify-between">
                <span className="num text-xl text-[var(--accent)]">
                  № {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono text-xs text-[var(--ink-muted)]">
                  {t.members.length} чел.
                </span>
              </div>
              <div className="mt-3 serif text-xl leading-tight group-hover:text-[var(--accent)]">
                {t.name}
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <div className="border-t-2 border-[var(--ink)] pt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="eyebrow">Колонка редактора</div>
            <p className="mt-4 serif text-2xl italic leading-snug">
              «Если ученик списал ответ у ChatGPT — это не его вина.
              Это вина задачи. На саммите мы учим делать такие задачи, в
              которых LLM сам себя выдаёт, а ученик учится отличать правду
              от галлюцинации.»
            </p>
            <div className="mt-5 eyebrow">
              — команда трека ИИ
            </div>
          </div>
          <Panel>
            <div className="eyebrow">Связаться</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={site.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  Google Drive саммита ↗
                </a>
              </li>
              <li>
                <Link href="/materials" className="link-underline">
                  Материалы и шаблоны
                </Link>
              </li>
              <li>
                <Link href="/contest" className="link-underline">
                  Разбор задач контеста
                </Link>
              </li>
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
