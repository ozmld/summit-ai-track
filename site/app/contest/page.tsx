import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";

const CONTEST_URL = "https://contest.yandex.ru/contest/93693/enter";

export const metadata = {
  title: "Контест · Практика с ИИ-ассистентами",
};

export default function ContestPage() {
  return (
    <>
      <PageHeader
        number="IV"
        eyebrow="Практика Дня 1"
        title="Контест: практика с ИИ-ассистентами"
        lead="12 задач по математике, физике и ИИ, часть из них с «ловушками» для LLM. Учителя решают с помощью ChatGPT / DeepSeek / Gemini и смотрят, где модель помогает, а где уверенно галлюцинирует."
      />

      <Container className="py-12">
        <div className="grid gap-0 md:grid-cols-[2fr_1fr]">
          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">Площадка</div>
            <h2 className="mt-2 display text-3xl leading-tight">
              Яндекс.Контест
            </h2>
            <p className="mt-4 serif text-lg leading-snug">
              Контест живёт на платформе Яндекс.Контест — там собраны все
              условия, автопроверка ответов и персональные результаты. Вход
              по логину Яндекса.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={CONTEST_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent"
              >
                Открыть контест ↗
              </a>
              <Link href="/leaderboard" className="btn">
                Общий лидерборд →
              </Link>
            </div>
          </Panel>

          <Panel className="-ml-px -mt-px">
            <div className="eyebrow">В цифрах</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-baseline gap-3">
                <span className="num text-3xl text-[var(--accent)]">12</span>
                <span>задач</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="num text-3xl text-[var(--accent)]">3</span>
                <span>направления: математика, физика, ИИ/ML</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="num text-3xl text-[var(--accent)]">4</span>
                <span>задачи содержат ловушки для LLM</span>
              </li>
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
