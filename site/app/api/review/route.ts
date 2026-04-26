import { NextResponse } from "next/server";

export const runtime = "edge";

type ReviewPayload = {
  reviewerName: string;
  reviewerTeamSlug: string;
  reviewerTeamName: string;
  reviews: Array<{
    targetSlug: string;
    targetName: string;
    scores: Record<string, number>;
    comment: string;
  }>;
};

export async function POST(req: Request) {
  let body: ReviewPayload;
  try {
    body = (await req.json()) as ReviewPayload;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }
  if (
    !body.reviewerName ||
    !body.reviewerTeamSlug ||
    !Array.isArray(body.reviews) ||
    body.reviews.length === 0
  ) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const webhook = process.env.REVIEW_WEBHOOK_URL;
  if (!webhook) {
    // Бэкенд не настроен — возвращаем 503, но лог пишем.
    console.error("[review] REVIEW_WEBHOOK_URL is not set");
    return new NextResponse(
      "Сервер оценок временно недоступен. Сообщите куратору.",
      { status: 503 },
    );
  }

  // flatten в строки (одна строка = одна пара reviewer → target → критерий)
  const timestamp = new Date().toISOString();
  const rows = body.reviews.flatMap((r) =>
    Object.entries(r.scores).map(([criterion, score]) => ({
      timestamp,
      reviewerName: body.reviewerName,
      reviewerTeamSlug: body.reviewerTeamSlug,
      reviewerTeamName: body.reviewerTeamName,
      targetSlug: r.targetSlug,
      targetName: r.targetName,
      criterion,
      score,
      comment: r.comment || "",
    })),
  );

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("[review] webhook failed", res.status, t);
      return new NextResponse("Не удалось сохранить оценки.", { status: 502 });
    }
  } catch (e) {
    console.error("[review] webhook error", e);
    return new NextResponse("Сеть прилегла. Попробуйте ещё раз.", {
      status: 502,
    });
  }

  return NextResponse.json({ ok: true, count: rows.length });
}
