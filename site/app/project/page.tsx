import { Container, Card, PageTitle } from "@/components/section";
import { juries } from "@/lib/data/juries";
import { site } from "@/lib/site";

export default function ProjectPage() {
  return (
    <Container>
      <PageTitle
        eyebrow="Командный проект"
        title="Олимпиадный модуль по ИИ"
        description="За 2 дня команда собирает законченный учебный модуль, которым учитель реально сможет пользоваться в школе для подготовки к ВсОШ по ИИ."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold">Что должна сделать команда</h2>
          <ol className="mt-4 space-y-4 text-[var(--muted)]">
            <li>
              <div className="font-medium text-white">
                1. Авторская задача
              </div>
              <p className="mt-1">
                Оригинальная задача уровня ВсОШ по ИИ (школьный/муниципальный
                этап). Обязательно: формулировка, чистый ответ, полное решение,
                формат ввода/вывода.
              </p>
            </li>
            <li>
              <div className="font-medium text-white">
                2. Разбор «для ученика»
              </div>
              <p className="mt-1">
                Пошаговый разбор: как подступиться, какие идеи пробовать, какие
                ошибки типичны, какие подсказки дать, если застрял.
              </p>
            </li>
            <li>
              <div className="font-medium text-white">
                3. Гайд «для учителя»
              </div>
              <p className="mt-1">
                Как провести это занятие: тайминг, вопросы для класса, критерии
                оценивания, как расширять задачу до проекта или урока.
              </p>
            </li>
            <li>
              <div className="font-medium text-white">
                4. (Опционально) Trap-версия
              </div>
              <p className="mt-1">
                Переделанная версия задачи с prompt injection — чтобы показать
                ученику, что слепо копировать ответ у LLM нельзя. Оценивается
                бонусом.
              </p>
            </li>
            <li>
              <div className="font-medium text-white">5. Защита</div>
              <p className="mt-1">
                7 минут презентация + 3 минуты вопросы от жюри в день 3.
              </p>
            </li>
          </ol>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Критерии оценки</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between gap-3">
              <span>Оригинальность задачи</span>
              <span className="text-[var(--accent-2)]">20</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Корректность и полнота решения</span>
              <span className="text-[var(--accent-2)]">20</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Качество методички для ученика</span>
              <span className="text-[var(--accent-2)]">20</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Гайд для учителя</span>
              <span className="text-[var(--accent-2)]">20</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Презентация и защита</span>
              <span className="text-[var(--accent-2)]">10</span>
            </li>
            <li className="flex justify-between gap-3 text-[var(--muted)]">
              <span>Бонус: trap-версия</span>
              <span>+10</span>
            </li>
            <li className="flex justify-between gap-3 border-t border-[var(--border)] pt-3 font-semibold">
              <span>Итого</span>
              <span className="text-[var(--accent-2)]">100 (+10)</span>
            </li>
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold">Форматы задач</h2>
          <p className="mt-2 text-[var(--muted)]">
            На выбор — возьмите тот, который ближе вашему предмету.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] p-4">
              <div className="font-medium">Логика / алгоритмы</div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Задачи на устный счёт, инварианты, жадные алгоритмы — без
                программирования.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-4">
              <div className="font-medium">Классическое ML</div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Метрики (accuracy, recall, F1), confusion matrix, ансамбли,
                переобучение — как в МЛ-1, МЛ-3.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-4">
              <div className="font-medium">LLM и промпты</div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Разбор галлюцинаций, prompt injection, сравнение ответов
                разных LLM — как наш блок trap-задач.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-4">
              <div className="font-medium">Работа с данными</div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Чтение CSV, агрегации, простая визуализация, элементарная
                статистика.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Жюри</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {juries.map((j) => (
              <li key={j.fio}>
                <div className="font-medium">{j.fio}</div>
                <div className="text-[var(--muted)] text-xs">{j.role}</div>
              </li>
            ))}
          </ul>
          <a
            href={site.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-5 text-sm"
          >
            Открыть Drive команды
          </a>
        </Card>
      </div>
    </Container>
  );
}
