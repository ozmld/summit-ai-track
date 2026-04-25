"""
Генератор датасета для Д2П2: "сдаст ли ученик ОГЭ по математике".

Признаки:
  - avg_grade       средняя оценка за четверть (2.0–5.0)
  - attendance      посещаемость в % (40–100)
  - uchi_tasks      кол-во решённых задач на Учи.ру (0–500)
  - school_level    уровень школы (1=обычная, 2=гимназия, 3=лицей при вузе)
  - study_hours     часов подготовки в неделю (0–20)

Целевая:
  - passed          1 если сдал ОГЭ, 0 если нет

Логика: лог-регрессия с реалистичными весами + немного шума.
Класс 1 (сдал) примерно 70%, класс 0 (не сдал) 30% — достаточно, чтобы
accuracy наивного классификатора "всегда сдал" давала ~70% и выглядела
обманчиво хорошо.
"""

import numpy as np
import pandas as pd

rng = np.random.default_rng(20260425)
N = 300

avg_grade = np.clip(rng.normal(3.7, 0.7, N), 2.0, 5.0).round(1)
attendance = np.clip(rng.normal(85, 12, N), 40, 100).round(0).astype(int)
uchi_tasks = np.clip(rng.gamma(2, 60, N), 0, 500).round(0).astype(int)
school_level = rng.choice([1, 2, 3], size=N, p=[0.55, 0.3, 0.15])
study_hours = np.clip(rng.normal(6, 3.5, N), 0, 20).round(0).astype(int)

logit = (
    -16.0
    + 3.0 * avg_grade
    + 0.05 * attendance
    + 0.005 * uchi_tasks
    + 0.8 * school_level
    + 0.15 * study_hours
)
noise = rng.normal(0, 0.6, N)
prob = 1 / (1 + np.exp(-(logit + noise)))
passed = (rng.random(N) < prob).astype(int)

df = pd.DataFrame(
    {
        "avg_grade": avg_grade,
        "attendance": attendance,
        "uchi_tasks": uchi_tasks,
        "school_level": school_level,
        "study_hours": study_hours,
        "passed": passed,
    }
)

print(df.head())
print()
print("размер:", df.shape)
print("баланс классов:")
print(df["passed"].value_counts(normalize=True).round(3))

out = "/Users/ozmld/Sammit_KZ/site/public/datasets/students_pass.csv"
import os
os.makedirs(os.path.dirname(out), exist_ok=True)
df.to_csv(out, index=False)
print(f"\n→ сохранено: {out}")
