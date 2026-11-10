/* CATÁLOGO MODO
   Para añadir cursos, duplica un objeto siguiendo el ejemplo del README.
   Las URL de YouTube pueden ser enlaces normales o youtu.be.
*/

window.MODO_COURSES = [
  {
    id: "guaripola-pro",
    title: "Guaripola Pro",
    category: "Arte y expresión",
    level: "Práctico",
    description: "Descubre el arte de la guaripola, desarrolla tu coordinación y aprende técnicas y movimientos con estilo.",
    cover: "assets/img/cursos/guaripola-pro.png",
    symbol: "✦",
    lessons: [
      {
        title: "Clase 1 · Técnica y movimiento",
        youtube: "https://youtu.be/YaNsH4otRnE"
      }
    ]
  },
  {
    id: "cocina-facil",
    title: "Cocina Fácil",
    category: "Gastronomía",
    level: "Inicial",
    description: "Aprende a preparar deliciosas recetas de manera sencilla, práctica y divertida.",
    cover: "assets/img/cursos/cocina-facil.png",
    symbol: "✦",
    lessons: [
      {
        title: "Capítulo 1 · Primeras recetas",
        youtube: "https://youtu.be/Z9VD57OlDfM"
      },
      {
        title: "Capítulo 2 · Nuevas preparaciones",
        youtube: "https://youtu.be/j-YpNjRzOX4"
      }
    ]
  }
];


window.MODO_PRICES = [
  ["Clase básica",25],["Clase completa",35],["Clase especializada",50],
  ["Paquete de 3 clases",90],["Paquete de 5 clases",140],
  ["Acceso mensual a todas las clases",185],["Seminarios",60]
];

window.MODO_TEAM = [
  ["Luciana López", "Gerente General"],
  ["Camila Escobar", "Directora de Marketing"],
  ["Natalia Solíz", "Vicepresidenta de Asociados"],
  ["Luciana Solíz", "Vicepresidenta de Desarrollo Institucional"],
  ["Uriel Méndez", "Vicepresidente de Desarrollo Comercial y Alianzas Estratégicas"],
  ["Zeus Méndez", "Vicepresidente de Relaciones Institucionales e Internacionales"]
];
