# Plantilla de Tarjetas CRC

Proyecto front-end para elaborar tarjetas CRC (Clase, Responsabilidades y Colaboradores) incorporando las columnas **Pensamiento en objetos** y **Propiedad**, de acuerdo con el enfoque presentado por Kendall & Kendall.

## Funcionalidades
- Crear múltiples tarjetas CRC.
- Registrar nombre de clase, superclases y subclases.
- Agregar responsabilidades, colaboradores, pensamiento en objetos y propiedades.
- Agregar/eliminar filas.
- Guardar todas las tarjetas en un archivo JSON.
- Cargar posteriormente el JSON para continuar editando.
- Imprimir o guardar las tarjetas como PDF desde el navegador.
- Funciona únicamente en front-end, sin servidor ni base de datos.

## Publicar en GitHub Pages
1. Crear un repositorio en GitHub.
2. Subir `index.html`, `styles.css` y `script.js`.
3. Abrir **Settings > Pages**.
4. En **Build and deployment**, seleccionar **Deploy from a branch**.
5. Elegir la rama `main` y la carpeta `/ (root)`.
6. Guardar y esperar a que GitHub muestre la dirección pública.

## Generar PDF
Abrir la aplicación, completar las tarjetas y pulsar **Imprimir / PDF**. En la ventana del navegador elegir **Guardar como PDF**.

## Referencia conceptual
Kendall, K. E. y Kendall, J. E., *Análisis y diseño de sistemas*, capítulo 10, sección sobre tarjetas CRC y pensamiento en objetos, pp. 284-286.
