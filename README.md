# Cuaderno Físico

Repositorio de apoyo para el seguimiento de recomposición corporal (objetivo:
físico estético tipo futbolista). Mismo patrón que el proyecto `Mundial`:
CSS/JS estáticos en GitHub Pages, plantilla maestra con placeholders `{{...}}`,
y un HTML ligero por semana.

## Estructura

```
assets/
  style.css     -> "Performance Terminal" — estilos compartidos (no se toca por semana)
  script.js     -> pestañas, checkboxes, notas y gráficos Chart.js (no se toca por semana)
rutinas/
  rutina_sem01.html
  rutina_sem02.html
  ...
RUTINA_TEMPLATE_MASTER.html  -> plantilla de referencia con placeholders {{...}}
```

## Pestañas

- **Resumen** — banner de retroalimentación, KPIs de la semana (peso, % graso,
  adherencia), checklist de "readiness" (gemelo, adherencia, RPE, descanso) y
  foco principal
- **Entreno** — rutina por día (checkboxes, series/reps/carga, RPE, notas)
- **Dieta** — macros objetivo, comidas propuestas, nota de adherencia
- **Progreso** — gráficos Chart.js de peso/% graso y adherencia semana a semana
- **Notas** — observaciones libres

## Flujo semanal

1. Se completa el Excel (Cuaderno Físico) con las medidas y el resumen de la
   semana anterior.
2. Se pide en el Project de Claude la rutina de la semana siguiente.
3. Claude genera `rutinas/rutina_semXX.html` siguiendo `RUTINA_TEMPLATE_MASTER.html`,
   ajustando el contenido según la progresión real (peso, % graso, adherencia,
   RPE) que aparece en el Excel.
4. Se sube el archivo nuevo a `rutinas/` y se consulta desde GitHub Pages.

## GitHub Pages

Activar en Settings → Pages (rama `main`, carpeta raíz `/`). Cada rutina
queda disponible en:

```
https://DavidGonMiran.github.io/<repo>/rutinas/rutina_semXX.html
```
