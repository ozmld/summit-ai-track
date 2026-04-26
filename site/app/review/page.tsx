import { Container, PageHeader, Panel } from "@/components/section";
import { teams } from "@/lib/data/teams";
import { artifacts } from "@/lib/data/artifacts";
import { ReviewForm } from "./review-form";

export const metadata = {
  title: "Peer review",
};

export default function ReviewIndexPage() {
  const teamsWithArtifacts = teams.map((t) => {
    const a = artifacts.find((x) => x.slug === t.slug);
    return {
      slug: t.slug,
      name: t.name,
      members: t.members,
      driveFolder: t.driveFolder ?? "",
      files: a?.files ?? [],
    };
  });
  return (
    <>
      <PageHeader
        number="P"
        eyebrow="Peer review · Д3"
        title="Оценка модулей коллег"
        lead="Вместо защиты-презентации каждый учитель оценивает 3 чужих модуля. Система сама выберет, кому попадёте вы — чтобы нагрузка была равномерной и никто не оценивал свою команду."
      />
      <Container className="py-12 space-y-10">
        <Panel>
          <div className="grid gap-6 sm:grid-cols-[2fr_3fr]">
            <div>
              <div className="eyebrow">Как это работает</div>
              <h2 className="display text-2xl mt-2">Коротко, по шагам</h2>
            </div>
            <ol className="space-y-3 text-sm serif text-base">
              <li>
                <b>1.</b> Представьтесь — выберите свою команду и напишите ФИО.
              </li>
              <li>
                <b>2.</b> Увидите 3 случайно назначенные вам команды (свою —
                исключаем).
              </li>
              <li>
                <b>3.</b> По каждой — откройте файлы из её папки на Drive,
                посмотрите модуль, поставьте 5 оценок (1–5) и напишите 1-2
                предложения обратной связи.
              </li>
              <li>
                <b>4.</b> Нажмите «Отправить» — оценки уходят в общий журнал.
              </li>
            </ol>
          </div>
        </Panel>

        <ReviewForm teams={teamsWithArtifacts} />
      </Container>
    </>
  );
}
