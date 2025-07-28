const ramos = [
  // 1° Semestre
  { id: "algebra", nombre: "Álgebra I", semestre: 1 },
  { id: "biologia", nombre: "Fund. de Biología y Genética Humana", semestre: 1 },
  { id: "intro", nombre: "Introducción a la Química y Farmacia", semestre: 1 },
  { id: "quimica", nombre: "Química General y Técnicas de Lab.", semestre: 1 },
  { id: "ingles1", nombre: "Inglés I", semestre: 1 },
  { id: "hab1", nombre: "Habilidades Académicas I", semestre: 1 },

  // 2° Semestre
  { id: "calculo1", nombre: "Cálculo I", semestre: 2, prereq: ["algebra"] },
  { id: "fisica", nombre: "Física General", semestre: 2 },
  { id: "fisiologia", nombre: "Fisiología", semestre: 2, prereq: ["biologia"] },
  { id: "organica", nombre: "Química Orgánica", semestre: 2 },
  { id: "ingles2", nombre: "Inglés II", semestre: 2, prereq: ["ingles1"] },
  { id: "hab2", nombre: "Habilidades Académicas II", semestre: 2, prereq: ["hab1"] },

  // 3° Semestre
  { id: "calculo2", nombre: "Cálculo II", semestre: 3, prereq: ["calculo1"] },
  { id: "analitica", nombre: "Química Analítica", semestre: 3, prereq: ["quimica"] },
  { id: "fisiopato", nombre: "Fisiopatología", semestre: 3, prereq: ["fisiologia"] },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3, prereq: ["biologia"] },
  { id: "ingles3", nombre: "Inglés III", semestre: 3, prereq: ["ingles2"] },
  { id: "etica", nombre: "Ética y Ciudadanía", semestre: 3 },

  // 4° Semestre
  { id: "fisicoquimica", nombre: "Fisicoquímica", semestre: 4, prereq: ["calculo2"] },
  { id: "microbio", nombre: "Microbiología y Agentes Infecciosos", semestre: 4, prereq: ["bioquimica"] },
  { id: "farmaco1", nombre: "Farmacología I", semestre: 4, prereq: ["fisiopato"] },
  { id: "instrumental", nombre: "Análisis Instrumental", semestre: 4, prereq: ["analitica"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 4, prereq: ["ingles3"] },
  { id: "rsu", nombre: "Responsabilidad Social Universitaria", semestre: 4, prereq: ["etica"] },

  // 5° Semestre
  { id: "bioestad", nombre: "Bioestadística", semestre: 5 },
  { id: "bioqclinica", nombre: "Bioquímica Clínica", semestre: 5, prereq: ["bioquimica"] },
  { id: "farmaco2", nombre: "Farmacología II", semestre: 5, prereq: ["farmaco1"] },
  { id: "farmacoq1", nombre: "Farmacoquímica I", semestre: 5, prereq: ["fisicoquimica"] },
  { id: "economia", nombre: "Economía", semestre: 5 },
  { id: "electivo1", nombre: "Electivo Formación General I", semestre: 5 },
  { id: "practica1", nombre: "Práctica Integrada en QF", semestre: 5, prereq: ["farmaco1"] },

  // 6° Semestre
  { id: "farmacoclinica", nombre: "Farmacología Clínica y Polifarmacia", semestre: 6, prereq: ["farmaco2"] },
  { id: "industriales", nombre: "Procesos Industriales", semestre: 6, prereq: ["fisicoquimica"] },
  { id: "gestion", nombre: "Gestión Farmacéutica", semestre: 6 },
  { id: "botanica", nombre: "Botánica y Farmacognosia", semestre: 6, prereq: ["instrumental"] },
  { id: "farmacoq2", nombre: "Farmacoquímica II", semestre: 6, prereq: ["farmacoq1"] },
  { id: "contabilidad", nombre: "Contabilidad y Costos", semestre: 6, prereq: ["economia"] },
  { id: "electivo2", nombre: "Electivo Formación General II", semestre: 6 },

  // 7° Semestre
  { id: "calidad", nombre: "Sistemas de Gestión de Calidad Farmacéutica", semestre: 7, prereq: ["gestion"] },
  { id: "tecno", nombre: "Tecnología Farmacéutica", semestre: 7, prereq: ["industriales"] },
  { id: "salud", nombre: "Salud Pública y Epidemiología", semestre: 7, prereq: ["bioestad"] },
  { id: "biofarma", nombre: "Biofarmacia y Farmacocinética", semestre: 7, prereq: ["bioestad"] },
  { id: "toxico", nombre: "Toxicología", semestre: 7, prereq: ["farmacoclinica"] },
  { id: "marketing", nombre: "Marketing Farmacéutico", semestre: 7, prereq: ["contabilidad"] },

  // 8° Semestre
  { id: "cosmetica", nombre: "Tecnología Cosmética", semestre: 8, prereq: ["tecno"] },
  { id: "legislacion", nombre: "Legislación Farmacéutica", semestre: 8, prereq: ["calidad"] },
  { id: "proyectos", nombre: "Preparación y Evaluación de Proyectos", semestre: 8 },
  { id: "asistencial", nombre: "Atención Farmacéutica y Farmacia Asistencial", semestre: 8, prereq: ["gestion"] },
  { id: "talento", nombre: "Administración y Gestión del Talento Humano", semestre: 8, prereq: ["marketing"] },

  // 9° Semestre
  { id: "metodologia", nombre: "Metodología de la Investigación", semestre: 9, prereq: ["bioestad"] },
  { id: "famacovigilancia", nombre: "Famacovigilancia", semestre: 9, prereq: ["salud"] },
  { id: "clinica", nombre: "Farmacia Clínica", semestre: 9, prereq: ["asistencial"] },
  { id: "nutricion", nombre: "Nutrición y Bromatología", semestre: 9 },
  { id: "practica2", nombre: "Práctica Profesional", semestre: 9, prereq: ["cosmetica", "legislacion", "proyectos", "asistencial", "talento"] },

  // 10° Semestre
  { id: "titulacion", nombre: "Actividad de Titulación", semestre: 10, prereq: ["metodologia"] },
  { id: "electivo_prof", nombre: "Electivo de Profundización", semestre: 10, prereq: ["clinica"] },
];

const estado = {};
const container = document.getElementById("malla-container");

ramos.forEach(ramo => {
  const div = document.createElement("div");
  div.className = "ramo";
  div.id = ramo.id;
  div.innerHTML = `${ramo.nombre}<br>${ramo.semestre}° Semestre`;

  div.addEventListener("click", () => toggleRamo(ramo, div));

  estado[ramo.id] = false;
  container.appendChild(div);
});

function toggleRamo(ramo, div) {
  if (ramo.prereq) {
    const bloqueado = ramo.prereq.some(id => !estado[id]);
    if (bloqueado && !estado[ramo.id]) {
      alert("Este ramo está bloqueado. Requiere prerrequisitos.");
      return;
    }
  }

  estado[ramo.id] = !estado[ramo.id];
  div.classList.toggle("activo", estado[ramo.id]);
}
