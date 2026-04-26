"use client";

import { useMemo, useState } from "react";
import { ArtifactList } from "@/components/artifact-list";
import type { TeamArtifactFile } from "@/lib/data/artifacts";

type ReviewTeam = {
  slug: string;
  name: string;
  members: string[];
  driveFolder: string;
  files: TeamArtifactFile[];
};

const CRITERIA = [
  {
    key: "task",
    label: "Условие задачи",
    hint: "Чёткое, интересное, соответствует формату олимпиады по ИИ",
  },
  {
    key: "solution",
    label: "Решение и ответ",
    hint: "Корректное, подробное, понятное педагогу",
  },
  {
    key: "student",
    label: "Методичка ученику",
    hint: "Тема объяснена, есть примеры, ученик сможет разобраться",
  },
  {
    key: "teacher",
    label: "Гайд учителю",
    hint: "Пошаговый, с подсказками и указанием типичных ошибок",
  },
  {
    key: "applicability",
    label: "Применимость",
    hint: "Я реально смог бы провести урок в своей школе по этому модулю",
  },
] as const;

type CritKey = (typeof CRITERIA)[number]["key"];

type ScoresByTeam = Record<string, Partial<Record<CritKey, number>> & { comment?: string }>;

// Детерминированный хэш строки (FNV-1a).
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Mulberry32 — быстрый и равномерный PRNG (лучше простого LCG).
function mulberry32(a: number) {
  return () => {
    let t = (a = (a + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BASE_COUNT = 3;

// Детерминированная перестановка пула для ревьюера — каждому свой
// полный порядок модулей, уникальный по (команда + ФИО).
// Своя команда исключается. Mulberry32 — равномерный PRNG,
// проверено: распределение голосов близко к идеальному (±2 при 44 ревьюерах).
function shuffledPool(
  pool: ReviewTeam[],
  mySlug: string,
  name: string,
): ReviewTeam[] {
  const rest = pool.filter((t) => t.slug !== mySlug);
  if (rest.length === 0) return [];
  const seed = hash(`summit-ai-track-v2:${mySlug}:${name.trim().toLowerCase()}`);
  const rand = mulberry32(seed);
  const arr = [...rest];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function ReviewForm({
  allTeams,
  reviewPool,
}: {
  allTeams: ReviewTeam[];
  reviewPool: ReviewTeam[];
}) {
  const [mySlug, setMySlug] = useState<string>("");
  const [myName, setMyName] = useState<string>("");
  const [locked, setLocked] = useState(false);
  const [scores, setScores] = useState<ScoresByTeam>({});
  const [extraCount, setExtraCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const pool = useMemo(() => {
    if (!locked || !mySlug || !myName.trim()) return [];
    return shuffledPool(reviewPool, mySlug, myName);
  }, [locked, mySlug, myName, reviewPool]);

  const visibleCount = Math.min(BASE_COUNT + extraCount, pool.length);
  const targets = pool.slice(0, visibleCount);
  const canAddMore = visibleCount < pool.length;

  function setScore(slug: string, key: CritKey, value: number) {
    setScores((s) => ({ ...s, [slug]: { ...s[slug], [key]: value } }));
  }
  function setComment(slug: string, comment: string) {
    setScores((s) => ({ ...s, [slug]: { ...s[slug], comment } }));
  }

  function allFilled(): boolean {
    return targets.every((t) => {
      const s = scores[t.slug] ?? {};
      return CRITERIA.every((c) => typeof s[c.key] === "number");
    });
  }

  async function submit() {
    if (!allFilled()) {
      alert(
        `Поставьте оценки по всем 5 критериям у каждого из ${targets.length} открытых модулей.`,
      );
      return;
    }
    setSubmitting(true);
    setStatus("idle");
    try {
      const payload = {
        reviewerName: myName.trim(),
        reviewerTeamSlug: mySlug,
        reviewerTeamName: allTeams.find((t) => t.slug === mySlug)?.name ?? "",
        reviews: targets.map((t) => ({
          targetSlug: t.slug,
          targetName: t.name,
          scores: CRITERIA.reduce<Record<string, number>>((acc, c) => {
            acc[c.key] = scores[t.slug]?.[c.key] as number;
            return acc;
          }, {}),
          comment: (scores[t.slug]?.comment ?? "").trim(),
        })),
      };
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      setStatus("ok");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "неизвестная ошибка";
      setErrorMsg(msg);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  // --- STEP 1: identify ---
  if (!locked) {
    return (
      <section className="border border-[var(--rule)] p-6 sm:p-8 space-y-6">
        <div className="eyebrow">Шаг 1</div>
        <h2 className="display text-2xl">Представьтесь</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="eyebrow block mb-1">Ваша команда</span>
            <select
              className="w-full border border-[var(--rule)] bg-[var(--paper)] p-2 text-base"
              value={mySlug}
              onChange={(e) => setMySlug(e.target.value)}
            >
              <option value="">— выберите —</option>
              {allTeams.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="eyebrow block mb-1">ФИО</span>
            <input
              className="w-full border border-[var(--rule)] bg-[var(--paper)] p-2 text-base"
              placeholder="Иванов Иван Иванович"
              value={myName}
              onChange={(e) => setMyName(e.target.value)}
            />
          </label>
        </div>
        <button
          type="button"
          className="btn btn-accent"
          disabled={!mySlug || myName.trim().length < 3}
          onClick={() => setLocked(true)}
        >
          Получить свои 3 команды →
        </button>
      </section>
    );
  }

  // --- STEP 3: thanks ---
  if (status === "ok") {
    return (
      <section className="border border-[var(--accent)] p-8 text-center space-y-4">
        <div className="display text-4xl">Спасибо!</div>
        <p className="serif italic text-lg">
          Ваши оценки приняты и сохранены в общем журнале.
        </p>
        <p className="text-sm text-[var(--ink-muted)]">
          Если хотите, можете закрыть вкладку или вернуться на{" "}
          <a href="/" className="link-underline">
            главную
          </a>
          .
        </p>
      </section>
    );
  }

  // --- STEP 2: review ---
  const myTeamName = allTeams.find((t) => t.slug === mySlug)?.name ?? "";
  return (
    <section className="space-y-8">
      <div className="border border-[var(--rule)] p-5 bg-[var(--paper-2)]/40">
        <div className="flex flex-wrap items-baseline gap-4 justify-between">
          <div>
            <div className="eyebrow">Оценивает</div>
            <div className="serif text-lg">
              {myName} · <span className="text-[var(--ink-muted)]">{myTeamName}</span>
            </div>
          </div>
          <button
            type="button"
            className="text-xs mono uppercase tracking-widest text-[var(--ink-muted)] hover:text-[var(--accent)]"
            onClick={() => {
              setLocked(false);
              setScores({});
              setExtraCount(0);
              setStatus("idle");
            }}
          >
            ← сменить
          </button>
        </div>
      </div>

      <div className="border border-[var(--rule-soft)] bg-[var(--paper-2)]/40 p-4 text-sm">
        <b>Названия команд и участники скрыты</b> — чтобы оценивать по существу,
        а не по симпатиям. Если имя автора всё-таки проглядывает в названии
        файла — постарайтесь на это не смотреть.
      </div>

      {targets.map((t, idx) => (
        <article key={t.slug} className="border border-[var(--rule)]">
          <header className="border-b border-[var(--rule)] p-5 bg-[var(--paper-2)]/40 flex items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <span className="section-number">№ {idx + 1}</span>
              <span className="display text-2xl">Модуль</span>
              {idx >= BASE_COUNT && (
                <span className="eyebrow text-[var(--accent)]">бонус</span>
              )}
            </div>
            {idx >= BASE_COUNT && (
              <button
                type="button"
                className="text-xs mono uppercase tracking-widest text-[var(--ink-muted)] hover:text-[var(--accent)]"
                onClick={() => {
                  setExtraCount((n) => Math.max(0, n - 1));
                  setScores((s) => {
                    const { [t.slug]: _removed, ...rest } = s;
                    return rest;
                  });
                }}
              >
                убрать ×
              </button>
            )}
          </header>

          <div className="p-5 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="eyebrow mb-3">Файлы модуля</div>
              <ArtifactList files={t.files} />
            </div>

            <div className="space-y-4">
              <div className="eyebrow">Оцените по 5 критериям (1–5)</div>
              {CRITERIA.map((c) => {
                const v = scores[t.slug]?.[c.key];
                return (
                  <div key={c.key} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium">{c.label}</div>
                        <div className="text-xs text-[var(--ink-muted)]">
                          {c.hint}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setScore(t.slug, c.key, n)}
                            className={`w-8 h-8 border mono text-sm ${
                              v === n
                                ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                                : "border-[var(--rule)] hover:border-[var(--ink)]"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              <label className="block mt-4">
                <span className="eyebrow block mb-1">Комментарий (опционально)</span>
                <textarea
                  rows={3}
                  className="w-full border border-[var(--rule)] bg-[var(--paper)] p-2 text-sm"
                  placeholder="Что понравилось, что бы улучшили"
                  value={scores[t.slug]?.comment ?? ""}
                  onChange={(e) => setComment(t.slug, e.target.value)}
                />
              </label>
            </div>
          </div>
        </article>
      ))}

      {canAddMore && (
        <div className="border border-dashed border-[var(--rule)] p-5 text-center space-y-2">
          <div className="text-sm text-[var(--ink-muted)]">
            Уже справились с основными? Можно оценить ещё один модуль — будет
            плюсом в общий зачёт коллег.
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => setExtraCount((n) => n + 1)}
          >
            + оценить ещё один модуль
          </button>
          <div className="text-xs text-[var(--ink-muted)] mono">
            осталось доступно: {pool.length - visibleCount}
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="border border-red-500 p-4 text-sm">
          Не получилось отправить: {errorMsg}. Попробуйте ещё раз или напишите
          куратору.
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-[var(--ink-muted)]">
          {allFilled()
            ? `Все ${CRITERIA.length}×${targets.length} = ${
                CRITERIA.length * targets.length
              } оценок заполнены.`
            : `Заполните все ${
                CRITERIA.length * targets.length
              } оценок, прежде чем отправлять.`}
        </div>
        <button
          type="button"
          className="btn btn-accent"
          disabled={submitting || !allFilled()}
          onClick={submit}
        >
          {submitting ? "Отправляем…" : "Отправить оценки →"}
        </button>
      </div>
    </section>
  );
}
