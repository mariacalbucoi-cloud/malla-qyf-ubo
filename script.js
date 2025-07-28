const malla = {
  "Primer semestre": [
    { id: "algebra", nombre: "Álgebra I" },
    { id: "biologia", nombre: "Fund. de Biología y Genética Humana" },
    { id: "intro", nombre: "Introducción a la Química y Farmacia" },
    { id: "quimica", nombre: "Química General y Técnicas de Lab." },
    { id: "ingles1", nombre: "Inglés I" },
    { id: "hab1", nombre: "Habilidades Académicas I" },
  ],
  "Segundo semestre": [
    { id: "calculo1", nombre: "Cálculo I", prerequisitos: ["algebra"] },
    { id: "fisica", nombre: "Física General" },
    { id: "fisiologia", nombre: "Fisiología", prerequisitos: ["biologia"] },
    { id: "organica", nombre: "Química Orgánica" },
    { id: "ingles2", nombre: "Inglés II", prerequisitos: ["ingles1"] },
    { id: "hab2", nombre: "Habilidades Académicas II", prerequisitos: ["hab1"] },
  ],
  "Tercer semestre": [
    { id: "calculo2", nombre: "Cálculo II", prerequisitos: ["calculo1"] },
    { id: "analitica", nombre: "Química Analítica", prerequisitos: ["quimica"] },
    { id: "fisiopato", nombre: "Fisiopatología", prerequisitos: ["fisiologia"] },
    { id: "bioquimica", nombre: "Bioquímica", prerequisitos: ["biologia"] },
    { id: "ingles3", nombre: "Inglés III", prerequisitos: ["ingles2"] },
    { id: "etica", nombre: "Ética y Ciudadanía" },
  ],
  "Cuarto semestre": [
    { id: "fisicoquimica", nombre: "Fisicoquímica", prerequisitos: ["calculo2"] },
    { id: "microbio", nombre: "Microbiología y Agentes Infecciosos", prerequisitos: ["bioquimica"] },
    { id: "farmaco1", nombre: "Farmacología I", prerequisitos: ["fisiopato"] },
    { id: "instrumental", nombre: "Análisis Instrumental", prerequisitos: ["analitica"] },
    { id: "ingles4", nombre: "Inglés IV", prerequisitos: ["ingles3"] },
    { id: "rsu", nombre: "Responsabilidad Social Universitaria", prerequisitos: ["etica"] },
  ],
  "Quinto semestre": [
    { id: "bioestad", nombre: "Bioestadística" },
    { id: "bioqclinica", nombre: "Bioquímica Clínica", prerequisitos: ["bioquimica"] },
    { id: "farmaco2", nombre: "Farmacología II", prerequisitos: ["farmaco1"] },
    { id: "farmacoq1", nombre: "Farmacoquímica I", prerequisitos: ["fisicoquimica"] },
    { id: "economia", nombre: "Economía" },
    { id: "electivo1", nombre: "Electivo Formación General I" },
    { id: "practica1", nombre: "Práctica Integrada en QF", prerequisitos: ["farmaco1"] },
  ],
  "Sexto semestre": [
    { id: "farmacoclinica", nombre: "Farmacología Clínica y Polifarmacia", prerequisitos: ["farmaco2"] },
    { id: "industriales", nombre: "Procesos Industriales", prerequisitos: ["fisicoquimica"] },
    { id: "gestion", nombre: "Gestión Farmacéutica" },
    { id: "botanica", nombre: "Botánica y Farmacognosia", prerequisitos: ["instrumental"] },
    { id: "farmacoq2", nombre: "Farmacoquímica II", prerequisitos: ["farmacoq1"] },
    { id: "contabilidad", nombre: "Contabilidad y Costos", prerequisitos: ["economia"] },
    { id: "electivo2", nombre: "Electivo Formación General II" },
  ],
  "Séptimo semestre": [
    { id: "calidad", nombre: "Sistemas de Gestión de Calidad Farmacéutica", prerequisitos: ["gestion"] },
    { id: "tecno", nombre: "Tecnología Farmacéutica", prerequisitos: ["industriales"] },
    { id: "salud", nombre: "Salud Pública y Epidemiología", prerequisitos: ["bioestad"] },
    { id: "biofarma", nombre: "Biofarmacia y Farmacocinética", prerequisitos: ["bioestad"] },
    { id: "toxico", nombre: "Toxicología", prerequisitos: ["farmacoclinica"] },
    { id: "marketing", nombre: "Marketing Farmacéutico", prerequisitos: ["contabilidad"] },
  ],
  "Octavo semestre": [
    { id: "cosmetica", nombre: "Tecnología Cosmética", prerequisitos: ["tecno"] },
    { id: "legislacion", nombre: "Legislación Farmacéutica", prerequisitos: ["calidad"] },
    { id: "proyectos", nombre: "Preparación y Evaluación de Proyectos" },
    { id: "asistencial", nombre: "Atención Farmacéutica y Farmacia Asistencial", prerequisitos: ["gestion"] },
    { id: "talento", nombre: "Administración y Gestión del Talento Humano", prerequisitos: ["marketing"] },
  ],
  "Noveno semestre": [
    { id: "metodologia", nombre: "Metodología de la Investigación", prerequisitos: ["bioestad"] },
    { id: "famacovigilancia", nombre: "Famacovigilancia", prerequisitos: ["salud"] },
    { id: "clinica", nombre: "Farmacia Clínica", prerequisitos: ["asistencial"] },
    { id: "nutricion", nombre: "Nutrición y Bromatología" },
    { id: "practica2", nombre: "Práctica Profesional", prerequisitos: ["cosmetica", "legislacion", "proyectos", "asistencial", "talento"] },
  ],
  "Décimo semestre": [
    { id: "titulacion", nombre: "Actividad de Titulación", prerequisitos: ["metodologia"] },
    { id: "electivo_prof", nombre: "Electivo de Profundización", prerequisitos: ["clinica"] },
  ]
};

const estado = {};
const contenedor = document.getElementById("malla-container");

Object.entries(malla).forEach(([semestre, ramos]) => {
  const bloque = document.createElement("div");
  bloque.className = "semestre-bloque";

  const titulo = document.createElement("h2");
  titulo.textContent = semestre;
  bloque.appendChild(titulo);

  const lista = document.createElement("div");
  lista.className = "malla";

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.id = ramo.id;
    div.innerHTML = ramo.nombre;

    div.addEventListener("click", () => toggleRamo(ramo, div));
    estado[ramo.id] = false;
    lista.appendChild(div);
  });

  bloque.appendChild(lista);
  contenedor.appendChild(bloque);
});

function toggleRamo(ramo, div) {
  if (ramo.prerequisitos) {
    const bloqueado = ramo.prerequisitos.some(id => !estado[id]);
    if (bloqueado && !estado[ramo.id]) {
      alert("Este ramo está bloqueado. Requiere prerrequisitos.");
      return;
    }
  }

  estado[ramo.id] = !estado[ramo.id];
  div.classList.toggle("activo", estado[ramo.id]);
}

