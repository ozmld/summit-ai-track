import Link from "next/link";
import { Container, Card } from "@/components/section";
import { schedule } from "@/lib/data/schedule";
import { teams } from "@/lib/data/teams";
import { juries } from "@/lib/data/juries";
import { site } from "@/lib/site";

export default function Home() {
  const today = schedule[0];
  const tomorrow = schedule[1];
  const day3 = schedule[2];

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <Container className="py-16 sm:py-24">
          <div className="flex items-center gap-2">
            <span className="chip chip-accent">Трек ИИ</span>
            <span className="chip">{site.dates}</span>
            <span className="chip">{site.city}</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
            <span className="gradient-text">II Саммит талантов</span>
            <br />
            для учителей:
            <br />
            готовим школьников к олимпиадам по ИИ.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
            Три дня погружения в искусственный интеллект: лекции, практика,
            контест с ловушками для LLM и командный проект — рабочий модуль для
            подготовки школьников к ВсОШ по ИИ.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/project" className="btn btn-primary">
              Посмотреть ТЗ проекта
            </Link>
            <Link href="/schedule" className="btn btn-ghost">
              Расписание
            </Link>
            <Link href="/leaderboard" className="btn btn-ghost">
              Лидерборд контеста
            </Link>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
              День 1 · сегодня
            </div>
            <div className="mt-2 text-lg font-semibold">{today.label}</div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              {today.items.slice(0, 4).map((i) => (
                <li key={i.time} className="flex gap-3">
                  <span className="w-24 shrink-0 font-mono text-xs text-white/80">
                    {i.time}
                  </span>
                  <span>{i.title}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
              День 2 · завтра
            </div>
            <div className="mt-2 text-lg font-semibold">{tomorrow.label}</div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              {tomorrow.items.slice(0, 4).map((i) => (
                <li key={i.time} className="flex gap-3">
                  <span className="w-24 shrink-0 font-mono text-xs text-white/80">
                    {i.time}
                  </span>
                  <span>{i.title}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
              День 3 · защита
            </div>
            <div className="mt-2 text-lg font-semibold">{day3.label}</div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              {day3.items.slice(0, 4).map((i) => (
                <li key={i.time} className="flex gap-3">
                  <span className="w-24 shrink-0 font-mono text-xs text-white/80">
                    {i.time}
                  </span>
                  <span>{i.title}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
                  Командный проект
                </div>
                <h2 className="mt-2 text-2xl font-semibold">
                  «Олимпиадный модуль по ИИ»
                </h2>
              </div>
              <Link href="/project" className="btn btn-ghost text-sm">
                Открыть ТЗ →
              </Link>
            </div>
            <p className="mt-4 text-[var(--muted)]">
              За 2 дня каждая команда собирает модуль для подготовки школьников
              к ВсОШ по ИИ: одна авторская задача, разбор, гайд для учителя и
              опционально версия с prompt injection для стресс-теста LLM.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[var(--border)] bg-white/[0.02] p-4">
                <div className="text-[var(--accent-2)] text-sm font-medium">
                  1. Задача
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Оригинальное условие + ответ + решение.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white/[0.02] p-4">
                <div className="text-[var(--accent-2)] text-sm font-medium">
                  2. Разбор для ученика
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Методичка «как думать», типичные ошибки, подсказки.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white/[0.02] p-4">
                <div className="text-[var(--accent-2)] text-sm font-medium">
                  3. Гайд для учителя
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Как вести занятие, критерии оценивания, расширения.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
              Жюри
            </div>
            <ul className="mt-3 space-y-3 text-sm">
              {juries.map((j) => (
                <li key={j.fio}>
                  <div className="font-medium">{j.fio}</div>
                  <div className="text-[var(--muted)] text-xs">{j.role}</div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold">
              Команды · {teams.length}
            </h2>
            <Link
              href="/teams"
              className="text-sm text-[var(--accent-2)] hover:underline"
            >
              Все составы →
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((t) => (
              <Link
                key={t.slug}
                href={`/teams#${t.slug}`}
                className="card p-4 transition hover:border-[var(--accent)]/60 hover:-translate-y-0.5"
              >
                <div className="text-lg font-semibold">{t.name}</div>
                <div className="mt-1 text-xs text-[var(--muted)]">
                  {t.members.length} чел.
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
