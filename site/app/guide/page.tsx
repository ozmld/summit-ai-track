import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { Container, PageHeader, Panel } from "@/components/section";
import { Markdown } from "@/components/markdown";

export const metadata = {
  title: "Гайд для учителей · II Саммит талантов",
};

export default async function GuidePage() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "project",
    "team-guide.md",
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
        eyebrow="Проект · инструкция"
        title="Гайд для учителей по командному проекту"
        lead="Коротко: что такое модуль, куда складывать файлы, как оцениваем и что сдавать к защите."
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
                  <Link href="/project" className="link-underline">
                    ТЗ проекта →
                  </Link>
                </li>
                <li>
                  <Link href="/module-template" className="link-underline">
                    Шаблон модуля →
                  </Link>
                </li>
                <li>
                  <Link href="/teams" className="link-underline">
                    Папка моей команды →
                  </Link>
                </li>
                <li>
                  <Link href="/days/2" className="link-underline">
                    План Дня 2 →
                  </Link>
                </li>
              </ul>
            </Panel>
            <Panel>
              <div className="eyebrow mb-3">Скачать</div>
              <a
                href="/project/team-guide.md"
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
