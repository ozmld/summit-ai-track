import { Container, PageHeader, Panel } from "@/components/section";
import { teams } from "@/lib/data/teams";
import { artifacts } from "@/lib/data/artifacts";
import { ReviewForm } from "./review-form";

export const metadata = {
  title: "Peer review",
};

export default function ReviewIndexPage() {
  const allTeams = teams.map((t) => {
    const a = artifacts.find((x) => x.slug === t.slug);
    return {
      slug: t.slug,
      name: t.name,
      members: t.members,
      driveFolder: t.driveFolder ?? "",
      files: a?.files ?? [],
    };
  });
  const reviewPool = allTeams;
  return (
    <>
      <PageHeader
        number="P"
        eyebrow="Peer review · Д3"
        title="Анонимная оценка модулей"
        lead="Вместо защиты-презентации каждый учитель оценивает минимум 3 чужих модуля. Если останется время — можно посмотреть и больше. Названия команд и участники скрыты — видны только сами материалы. Систему не обмануть: свою команду оценить нельзя."
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
                <b>2.</b> Увидите 3 случайно назначенных вам модуля. Они
                обезличены: «Модуль №1», «Модуль №2», «Модуль №3». Свой модуль
                мы исключаем автоматически.
              </li>
              <li>
                <b>3.</b> По каждому — откройте файлы, посмотрите содержимое,
                поставьте 5 оценок (1–5) и напишите пару фраз обратной связи.
              </li>
              <li>
                <b>4.</b> Остались силы? Под тремя карточками есть кнопка{" "}
                <b>«+ оценить ещё один модуль»</b> — можно добавить ещё один,
                потом ещё. Каждая дополнительная оценка идёт в общий зачёт.
              </li>
              <li>
                <b>5.</b> Нажмите «Отправить» — оценки уходят в общий журнал.
              </li>
            </ol>
          </div>
        </Panel>

        <ReviewForm allTeams={allTeams} reviewPool={reviewPool} />
      </Container>
    </>
  );
}
