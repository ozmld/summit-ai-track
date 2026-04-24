## II Саммит талантов — трек ИИ

Материалы и сайт саммита для учителей по подготовке школьников к Олимпиадам по ИИ.

### Структура

- `day1/` — лекции (PDF), материалы контеста (задачи, csv, разборы), результаты.
- `site/` — Next.js сайт (этот корень для Vercel).

### Запуск сайта локально

```bash
cd site
npm install
npm run dev
```

Открыть http://localhost:3000

### Сборка

```bash
cd site
npm run build
```

Все страницы предрендерятся как статика, деплой подходит под Vercel / Netlify / Cloudflare Pages.

### Деплой на Vercel

1. Залить репозиторий на GitHub (user: `ozmld`).
2. Import в Vercel с Root Directory = `site`.
3. Домен: `summit-ai-track.vercel.app`.

### Контент-редактирование

Все данные — в `site/lib/data/*`:

- `juries.ts` — жюри
- `teams.ts` — команды
- `schedule.ts` — расписание
- `lectures.ts` — лекции
- `tasks.ts` — задачи контеста
- `results.ts` — лидерборд
