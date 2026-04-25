"""
Собирает два ноутбука для Д2П2:
  - d2p2_student.ipynb — с пропусками (TODO) для учителей на семинаре
  - d2p2_filled.ipynb  — заполненная версия для препода

Логика: каждое задание описано как (тайминг, markdown_условие, код_пропуск, код_полный).
Скрипт собирает JSON .ipynb и сохраняет в public/notebooks/.
"""

import nbformat as nbf

OUT_STUDENT = "/Users/ozmld/Sammit_KZ/site/public/notebooks/d2p2_student.ipynb"
OUT_FILLED = "/Users/ozmld/Sammit_KZ/site/public/notebooks/d2p2_filled.ipynb"

# ---------- шапка (общая) ----------
HEADER_MD = """# Д2П2 · ML-практикум

**II Саммит талантов · трек ИИ · 25 апреля 2026**
**Иван Эйдлин · 45 минут**

---

За 45 минут мы с нуля обучим модель, которая предсказывает: **сдаст ли школьник ОГЭ по математике** — по его оценкам, посещаемости и активности на Учи.ру.

Что сделаем:
1. Прочитаем CSV с данными на 300 школьников.
2. Обучим **три разные модели** одной и той же командой — покажем, что `sklearn` — это «гайка одного ключа».
3. Посчитаем честные метрики качества — увидим, что **accuracy врёт**.
4. Построим confusion matrix — картинку, которая объясняет, кого мы путаем.
5. Увидим переобучение **собственными глазами**.
6. В конце — **челлендж:** у меня baseline 0.82. Кто побьёт — расскажет как.

Ноутбук идёт вместе с моим рассказом. Там где `# TODO` — дописываете сами.
Кто застрял — поднимает руку, я подхожу.

---

## Как открыть этот ноутбук (30 секунд)

1. Откройте [**Google Colab**](https://colab.research.google.com/) в новой вкладке.
2. Меню: **File → Upload notebook** → выберите скачанный `d2p2_student.ipynb`.
3. Всё, ноутбук открыт. Ничего устанавливать не надо.

**Если Colab ругается на вход** — войдите под своим Google-аккаунтом (тем же, что используете для Drive).

---
"""

DATA_URL = (
    "https://summit-ai-track.vercel.app/datasets/students_pass.csv"
)


def task_block(
    number: int,
    minutes: int,
    title: str,
    body_md: str,
    student_code: str,
    filled_code: str,
    *,
    extra_md_after: str | None = None,
):
    """Возвращает список (md_header, code_cell_student, code_cell_filled)."""
    header = f"""## Задание {number} · ~{minutes} мин · {title}

{body_md.strip()}
"""
    blocks = [("md", header, header)]
    blocks.append(("code", student_code, filled_code))
    if extra_md_after:
        blocks.append(("md", extra_md_after, extra_md_after))
    return blocks


# ---------- теория: мини-шпаргалка про модели ----------
MODELS_MD = """## Три модели, которыми будем пользоваться

Не будем углубляться в математику — это будет в следующей паре у Макса. Пока — на пальцах.

### Логистическая регрессия (`LogisticRegression`)

Проводит **прямую границу** между классами. Для каждого признака модель
подбирает коэффициент — «насколько этот признак влияет на ответ».

*Аналогия:* учитель ставит отметку по формуле «0.4 · контрольная + 0.3 · домашки
+ 0.3 · активность». Логистическая регрессия делает то же, только формулу
подбирает сама по данным.

### K ближайших соседей (`KNeighborsClassifier`)

Чтобы классифицировать нового ученика, модель **находит K самых похожих
учеников** в тренировочных данных и смотрит, кто из них сдал. Как они
ответили большинством — такой и ответ.

*Аналогия:* когда берём реферат у пяти одноклассников и копируем самое
популярное слово. Если рядом трое сдали — предсказание «сдал».

Параметр `k` (обычно 5 или 9) — сколько соседей смотрим.

### Случайный лес (`RandomForestClassifier`)

Строит **много деревьев вопросов**: «оценка > 3.5? → да → посещаемость > 80%?
→ нет → не сдал». Каждое дерево видит немножко разные данные, итог — голосование.

*Аналогия:* педсовет из 100 учителей, каждый посмотрел на ученика со своей
стороны, итоговое решение — большинством.

### Ключевой факт про `sklearn`

У **всех трёх моделей** одинаковый интерфейс:

```python
model = Модель(...)         # создали
model.fit(X_train, y_train) # обучили
model.predict(X_new)        # получили предсказание
model.score(X_test, y_test) # померили качество
```

Меняется только имя класса. Код — тот же.
"""

METRICS_MD = """## Метрики: почему accuracy врёт

`accuracy` — доля правильных ответов. Кажется логичной, но есть засада.

**Пример:** в нашем датасете 75% учеников сдали ОГЭ. Модель **«все сдадут»**
без всякого обучения даст accuracy **0.75**. Звучит внушительно, а толку ноль:
мы не находим тех, кто НЕ сдал — а именно им нужна помощь.

Поэтому смотрим две метрики раздельно:

| метрика | вопрос, на который она отвечает |
|---|---|
| **precision** | Когда модель сказала «не сдал» — она была права? |
| **recall**    | Модель нашла **всех**, кто не сдал? Или половину пропустила? |

`f1` — компромисс между ними (примерно среднее, но штрафует за перекос).

**Медицинский аналог.** Тест на болезнь.
- Высокий precision, низкий recall — редко поднимаем ложную тревогу, но пропускаем больных.
- Высокий recall, низкий precision — находим всех больных, но кучу здоровых пугаем.

**Confusion matrix** — одна картинка, которая показывает обе ошибки сразу:

```
                 предсказание
                  не сдал  сдал
реально не сдал    [TN]    [FN]   ← пропустили (не нашли проблему)
реально сдал       [FP]    [TP]   ← ложная тревога
```

На диагонали — правильно. Вне диагонали — ошибки.
"""

OVERFIT_MD = """## Переобучение — видим глазами

Есть модель «решающее дерево». У него параметр **`max_depth`** — глубина.
- `max_depth=1` — одно правило, модель недообучилась.
- `max_depth=20` — 20 уровней правил. Модель **запомнила** тренировочные данные.
  На `train` почти 100% точность, на `test` — падает.

Сейчас мы это увидим графиком.
"""

CHALLENGE_MD = """## Челлендж · побей мой baseline

Мой LogReg без скейлинга дал **0.822** на test. Задача на **5 минут**: обучите свою модель и получите accuracy **строго больше 0.822**.

Что можно крутить (подсказки по возрастанию хитрости):

1. **Отскейлить признаки** — `StandardScaler` перед моделью. У нас `uchi_tasks` до 500, а `avg_grade` до 5 — моделям это не нравится.
2. Сменить модель: `RandomForestClassifier`, `GradientBoostingClassifier`.
3. Покрутить гиперпараметры: `n_estimators`, `max_depth`, `n_neighbors`.
4. Если поймали **≥ 0.85** — это уже элитный уровень, рассказываете коллегам, что сработало.

Правило: `random_state` и `test_size` **не трогаем** — иначе сравнение нечестное.
"""

FINAL_MD = """## Что учитель уносит в класс

1. `sklearn` — это «гайка одного ключа». Выучил `fit/predict/score` — знаешь интерфейс сотни моделей.
2. **Accuracy сама по себе врёт.** Всегда смотри на неё вместе с precision и recall — особенно если классы несбалансированы.
3. **Confusion matrix** — первая картинка, которую строим после обучения. На ней видно, каких учеников модель путает.
4. **train ≠ test.** Если обучили и проверили на одном и том же — модель «запомнила», а не поняла.
5. **Переобучение** — когда качество на train растёт, а на test падает. Лечится упрощением модели.

На следующей паре Макс расскажет, **почему** всё это работает — математика под капотом.

---

## Сдача работы · заливаем ноутбук в свою папку на Drive

**Важно:** свой заполненный ноутбук каждый сохраняет **в папку своей команды на Drive** — именно её потом увидят коллеги при peer-review.

1. В Colab меню **File → Download → Download .ipynb** — скачали свой файл на ноутбук.
2. Открыли страницу [`summit-ai-track.vercel.app/teams`](https://summit-ai-track.vercel.app/teams), нашли свою команду, нажали **«Открыть папку команды на Drive»**.
3. В папке команды создали подпапку `resources/d2p2_ml/` (если её ещё нет) и **перетащили** туда свой `.ipynb`.
4. Готово. У вас теперь свой рабочий пример ML-инженерии под рукой — можно обращаться к нему в любой момент из своей команды.

Если кому-то сложно — сосед по команде поможет, у них у всех есть доступ в ту же папку.
"""


# ---------- задания ----------
tasks = []

tasks.append(
    task_block(
        1,
        4,
        "Импорты и данные",
        """
Подключаем библиотеки и читаем CSV с нашим датасетом.

- `pandas` (`pd`) — таблицы (как Excel в питоне).
- `numpy` (`np`) — числа, массивы.
- `matplotlib.pyplot` (`plt`) — графики.
- `sklearn` — библиотека с готовыми моделями.
""",
        student_code=f"""# TODO: импортируйте pandas как pd, numpy как np, matplotlib.pyplot как plt
# _____

# читаем датасет (он лежит на сайте саммита)
URL = "{DATA_URL}"
df = # TODO: прочитайте CSV по ссылке через pd.read_csv(URL)

df.head()
""",
        filled_code=f"""import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

URL = "{DATA_URL}"
df = pd.read_csv(URL)

df.head()
""",
    )
)

tasks.append(
    task_block(
        2,
        5,
        "Что за данные",
        """
Прежде чем лезть в модели, всегда смотрим на данные глазами.

- `df.shape` — сколько строк и колонок.
- `df.describe()` — средние, минимумы, максимумы по числовым колонкам.
- `df['passed'].value_counts(normalize=True)` — баланс классов: сколько сдали, сколько нет.

**Вопрос, на который надо ответить самому себе:** насколько сбалансированы классы?
Если модель «все сдали» даст accuracy 0.75 — это много или мало?
""",
        student_code="""# TODO: выведите размер датасета
# _____

# TODO: выведите .describe()
# _____

# TODO: посмотрите баланс классов целевой переменной 'passed'
# _____
""",
        filled_code="""print('размер:', df.shape)
print()
print(df.describe().round(2))
print()
print('баланс классов (passed):')
print(df['passed'].value_counts(normalize=True).round(3))
""",
    )
)

tasks.append(
    task_block(
        3,
        8,
        "Train/test split и первая модель",
        """
Разделяем данные на две части:
- **train** — на чём модель учится.
- **test** — на чём проверяем, что она не запомнила, а обобщила.

`stratify=y` — важно: сохраняем пропорцию классов в обеих частях.
`random_state=42` — чтобы результат был воспроизводимым.

Потом учим **логистическую регрессию** (см. шпаргалку выше) и смотрим accuracy.
""",
        student_code="""from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X = df.drop(columns=['passed'])
y = df['passed']

# TODO: разбейте на train/test — test_size=0.3, stratify=y, random_state=42
X_train, X_test, y_train, y_test = # _____

# TODO: создайте модель LogisticRegression(max_iter=1000)
model = # _____

# TODO: обучите модель на (X_train, y_train)
# _____

# TODO: посчитайте accuracy на тесте через model.score(X_test, y_test)
acc = # _____
print(f'LogReg accuracy = {acc:.3f}')
""",
        filled_code="""from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X = df.drop(columns=['passed'])
y = df['passed']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
acc = model.score(X_test, y_test)
print(f'LogReg accuracy = {acc:.3f}')
""",
    )
)

tasks.append(
    task_block(
        4,
        7,
        "Три модели — один код",
        """
Теперь главная фишка `sklearn`: **три разные модели обучаются одним и тем же циклом**.
Меняется только имя класса.

Ниже KNN и случайный лес. Обратите внимание: код `fit/score` — идентичен.
""",
        student_code="""from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# KNN чувствителен к масштабу признаков, поэтому оборачиваем в Pipeline со StandardScaler.
# (Scaler нормирует каждую колонку к среднему 0 и разбросу 1 — иначе "Учи.ру (500)" задавит "оценку (5)")

knn = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  KNeighborsClassifier(n_neighbors=5)),
])

rf = RandomForestClassifier(n_estimators=100, random_state=42)

# TODO: обучите KNN на train и выведите score на test
# _____

# TODO: обучите RandomForest на train и выведите score на test
# _____
""",
        filled_code="""from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

knn = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  KNeighborsClassifier(n_neighbors=5)),
])

rf = RandomForestClassifier(n_estimators=100, random_state=42)

knn.fit(X_train, y_train)
print(f'KNN        accuracy = {knn.score(X_test, y_test):.3f}')

rf.fit(X_train, y_train)
print(f'RandForest accuracy = {rf.score(X_test, y_test):.3f}')
""",
    )
)

tasks.append(
    task_block(
        5,
        7,
        "Метрики и confusion matrix",
        """
Считаем precision / recall / f1 и строим картинку ошибок.

Используем `classification_report` — одной командой выдаёт все метрики по каждому классу.
""",
        student_code="""from sklearn.metrics import classification_report, ConfusionMatrixDisplay

y_pred = model.predict(X_test)   # берём предсказания нашей LogReg

# TODO: выведите classification_report(y_test, y_pred, target_names=['не сдал', 'сдал'])
# _____

# TODO: постройте confusion matrix:
# ConfusionMatrixDisplay.from_predictions(y_test, y_pred, display_labels=['не сдал', 'сдал'])
# plt.show()
# _____
""",
        filled_code="""from sklearn.metrics import classification_report, ConfusionMatrixDisplay

y_pred = model.predict(X_test)

print(classification_report(
    y_test, y_pred, target_names=['не сдал', 'сдал']
))

fig, ax = plt.subplots(figsize=(4, 4))
ConfusionMatrixDisplay.from_predictions(
    y_test, y_pred,
    display_labels=['не сдал', 'сдал'],
    ax=ax, colorbar=False,
)
ax.set_title('Confusion matrix · LogReg')
plt.show()
""",
        extra_md_after="""**Что здесь ценно:**
- Смотрим в строку «не сдал» — это тот класс, который нас действительно интересует (кому нужна помощь).
- Recall для этого класса — сколько из реально не сдавших мы поймали. Если 0.7 — значит 30% не сдавших модель пропустила и отправила на ОГЭ.
- Precision для этого класса — сколько из наших «не сдаст» реально не сдадут.
""",
    )
)

tasks.append(
    task_block(
        6,
        8,
        "Переобучение глазами",
        """
Берём **решающее дерево** и увеличиваем глубину от 1 до 20.
Смотрим, что происходит с accuracy на train и на test.
""",
        student_code="""from sklearn.tree import DecisionTreeClassifier

depths = range(1, 21)
train_acc, test_acc = [], []

for d in depths:
    # TODO: создайте DecisionTreeClassifier(max_depth=d, random_state=42)
    tree = # _____
    # TODO: обучите на X_train, y_train
    # _____
    # TODO: добавьте train-accuracy и test-accuracy в списки
    train_acc.append( # _____ )
    test_acc.append(  # _____ )

plt.figure(figsize=(6, 4))
plt.plot(list(depths), train_acc, 'o-', label='train')
plt.plot(list(depths), test_acc,  's-', label='test')
plt.xlabel('max_depth')
plt.ylabel('accuracy')
plt.title('Переобучение решающего дерева')
plt.legend()
plt.grid(alpha=0.3)
plt.show()
""",
        filled_code="""from sklearn.tree import DecisionTreeClassifier

depths = range(1, 21)
train_acc, test_acc = [], []

for d in depths:
    tree = DecisionTreeClassifier(max_depth=d, random_state=42)
    tree.fit(X_train, y_train)
    train_acc.append(tree.score(X_train, y_train))
    test_acc.append(tree.score(X_test, y_test))

plt.figure(figsize=(6, 4))
plt.plot(list(depths), train_acc, 'o-', label='train')
plt.plot(list(depths), test_acc,  's-', label='test')
plt.xlabel('max_depth')
plt.ylabel('accuracy')
plt.title('Переобучение решающего дерева')
plt.legend()
plt.grid(alpha=0.3)
plt.show()
""",
        extra_md_after="""**Что видим:**
- train-кривая (синяя) **растёт монотонно** — чем глубже дерево, тем лучше оно
  запоминает тренировочные данные.
- test-кривая (оранжевая) **сначала растёт, потом падает** — модель начинает
  запоминать шум и ломаться на новых данных.

Это и есть переобучение. Оптимум — где-то в точке расхождения.
""",
    )
)

tasks.append(
    task_block(
        7,
        6,
        "Челлендж · побей 0.85",
        """
Ваш ход. Любая модель, любые параметры. Задача — получить на `X_test, y_test` accuracy **≥ 0.85**.

Кто первый — поднимает руку и рассказывает, что сработало.

Подсказки (если застряли):
- `RandomForestClassifier(n_estimators=300, max_depth=5)` — часто хороший старт.
- `GradientBoostingClassifier()` из `sklearn.ensemble`.
- KNN почти всегда выигрывает от `StandardScaler`.
""",
        student_code="""# Ваш код — любая модель, любые параметры.
# Цель: model.score(X_test, y_test) >= 0.85

# TODO: придумайте и обучите свою модель


""",
        filled_code="""# Рабочее решение: просто отскейлить признаки.
# Этого уже хватает, чтобы LogReg перешёл с 0.822 → 0.833.

scaled_lr = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  LogisticRegression(max_iter=1000)),
])
scaled_lr.fit(X_train, y_train)
print(f'LogReg + Scaler accuracy = {scaled_lr.score(X_test, y_test):.3f}')

# Если хочется ≥ 0.85 — пробуем бустинг с правильными параметрами.
# На этом сплите он пройдёт или нет в зависимости от версии sklearn,
# поэтому показательнее сначала scaler.
from sklearn.ensemble import GradientBoostingClassifier
gb = GradientBoostingClassifier(
    n_estimators=200, max_depth=3, learning_rate=0.05, random_state=42
)
gb.fit(X_train, y_train)
print(f'GradBoost       accuracy = {gb.score(X_test, y_test):.3f}')
""",
    )
)


def build_notebook(kind: str) -> nbf.NotebookNode:
    nb = nbf.v4.new_notebook()
    cells = []
    cells.append(nbf.v4.new_markdown_cell(HEADER_MD))
    cells.append(nbf.v4.new_markdown_cell(MODELS_MD))
    # task 1, 2, 3
    for tb in tasks[:3]:
        for cell_type, stud, filled in tb:
            src = filled if kind == "filled" else stud
            if cell_type == "md":
                cells.append(nbf.v4.new_markdown_cell(src))
            else:
                cells.append(nbf.v4.new_code_cell(src))
    # task 4
    for cell_type, stud, filled in tasks[3]:
        src = filled if kind == "filled" else stud
        if cell_type == "md":
            cells.append(nbf.v4.new_markdown_cell(src))
        else:
            cells.append(nbf.v4.new_code_cell(src))
    # metrics theory
    cells.append(nbf.v4.new_markdown_cell(METRICS_MD))
    # task 5
    for cell_type, stud, filled in tasks[4]:
        src = filled if kind == "filled" else stud
        if cell_type == "md":
            cells.append(nbf.v4.new_markdown_cell(src))
        else:
            cells.append(nbf.v4.new_code_cell(src))
    # overfit theory
    cells.append(nbf.v4.new_markdown_cell(OVERFIT_MD))
    # task 6
    for cell_type, stud, filled in tasks[5]:
        src = filled if kind == "filled" else stud
        if cell_type == "md":
            cells.append(nbf.v4.new_markdown_cell(src))
        else:
            cells.append(nbf.v4.new_code_cell(src))
    # challenge
    cells.append(nbf.v4.new_markdown_cell(CHALLENGE_MD))
    for cell_type, stud, filled in tasks[6]:
        src = filled if kind == "filled" else stud
        if cell_type == "md":
            cells.append(nbf.v4.new_markdown_cell(src))
        else:
            cells.append(nbf.v4.new_code_cell(src))
    # final
    cells.append(nbf.v4.new_markdown_cell(FINAL_MD))
    nb["cells"] = cells
    return nb


for kind, path in [("student", OUT_STUDENT), ("filled", OUT_FILLED)]:
    nb = build_notebook(kind)
    with open(path, "w", encoding="utf-8") as f:
        nbf.write(nb, f)
    print(f"{kind:8s} → {path}  ({len(nb['cells'])} ячеек)")
