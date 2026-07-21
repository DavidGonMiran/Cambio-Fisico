# Cuaderno Físico

Repositorio de apoyo para el seguimiento de recomposición corporal (objetivo:
físico estético tipo futbolista). Aloja los estilos y la lógica compartida de
las rutinas semanales que genera Claude, para que cada rutina sea solo HTML
ligero sin repetir CSS/JS.

## Estructura

```
assets/
  style.css     -> estilos compartidos (no se toca por semana)
  script.js     -> checkboxes, notas y medidor de progreso (no se toca por semana)
rutinas/
  rutina_sem01.html
  rutina_sem02.html
  ...
RUTINA_TEMPLATE_MASTER.html  -> plantilla de referencia con placeholders {{...}}
```

## Flujo semanal

1. Se completa el Excel (Cuaderno Físico) con las medidas y el resumen de la
   semana anterior.
2. Se pide en el Project de Claude la rutina de la semana siguiente.
3. Claude genera `rutinas/rutina_semXX.html` siguiendo `RUTINA_TEMPLATE_MASTER.html`,
   ajustando el contenido según la progresión real (peso, adherencia, RPE).
4. Se sube el archivo nuevo a `rutinas/` y se consulta desde GitHub Pages.
