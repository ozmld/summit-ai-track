import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";

export const metadata = {
  title: "Архив ВсОШ по ИИ",
};

export default function VoshArchivePage() {
  return (
    <>
      <PageHeader
        number="VII"
        eyebrow="Материалы"
        title="Архив задач ВсОШ по ИИ"
        lead="Раздел в подготовке. Ссылки на задачи и официальный архив появятся в течение саммита — чтобы у команд был понятный референс, как выглядит задача формата ВсОШ."
      />

      <Container className="py-12">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Panel>
            <div className="eyebrow mb-3">Скоро здесь</div>
            <p className="serif text-xl leading-snug">
              Подборка задач ВсОШ по ИИ как образец формата, в котором
              команды будут писать собственные модули.
            </p>
            <p className="mt-4 text-sm text-[var(--ink-muted)] leading-relaxed">
              Кураторы трека сформируют список задач для живого разбора и
              дадут ссылку на официальный архив. Сразу после — материалы
              появятся на этой странице.
            </p>
            <div className="mt-5">
              <span className="tag tag-accent">в работе</span>
            </div>
          </Panel>

          <Panel>
            <div className="eyebrow mb-3">Пока можно смотреть</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contest" className="link-underline">
                  Задачи контеста Дня 1 →
                </Link>
              </li>
              <li>
                <Link href="/project" className="link-underline">
                  ТЗ командного проекта →
                </Link>
              </li>
            </ul>
          </Panel>
        </div>
      </Container>
    </>
  );
}
