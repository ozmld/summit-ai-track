import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";
import { Markdown } from "@/components/markdown";

export const metadata = {
  title: "Шаблон модуля · II Саммит талантов",
};

export default async function ModuleTemplatePage() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "project",
    "module-template.md",
  );
  const raw = await fs.readFile(filePath, "utf8");
  const content = raw
    .split("\n")
    .filter((line, i) => !(i === 0 && line.startsWith("# ")))
    .join("\n")
    .trim();

  return (
    <>
      <PageHeader
        number="VI"
        eyebrow="Проект · заготовка"
        title="Шаблон модуля"
        lead="Скопируйте в Google Doc вашей команды и заполняйте по мере прохождения пар. Разделы 0–2 — День 2, 3–4 — День 3, приложения под бусты — параллельно."
      />
      <Container className="py-10">
        <div className="grid gap-10 lg:grid-cols-[3fr_1fr] lg:items-start">
          <article>
            <Markdown content={content} />
          </article>
          <aside className="space-y-6 lg:sticky lg:top-6">
            <Panel>
              <div className="eyebrow mb-3">Быстрые ссылки</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/guide" className="link-underline">
                    Гайд для учителей →
                  </Link>
                </li>
                <li>
                  <Link href="/project" className="link-underline">
                    ТЗ проекта →
                  </Link>
                </li>
                <li>
                  <Link href="/teams" className="link-underline">
                    Папка моей команды →
                  </Link>
                </li>
              </ul>
            </Panel>
            <Panel>
              <div className="eyebrow mb-3">Скачать</div>
              <a
                href="/project/module-template.md"
                target="_blank"
                className="btn"
              >
                Исходный .md ↗
              </a>
            </Panel>
          </aside>
        </div>
      </Container>
    </>
  );
}
