const malla = {
  "Primer semestre": [
    { nombre: "Álgebra I" },
    { nombre: "Fundamentos de Biología y Genética Humana" },
    { nombre: "Introducción a la Química y Farmacia" },
    { nombre: "Química General y Técnicas de Laboratorio" },
    { nombre: "Inglés I" },
    { nombre: "Habilidades Académicas I" }
  ],
  "Segundo semestre": [
    { nombre: "Cálculo I", prerequisitos: ["Álgebra I"] },
    { nombre: "Física General" },
    { nombre: "Fisiología", prerequisitos: ["Fundamentos de Biología y Genética Humana"] },
    { nombre: "Química Orgánica" },
    { nombre: "Inglés II", prerequisitos: ["Inglés I"] },
    { nombre: "Habilidades Académicas II", prerequisitos: ["Habilidades Académicas I"] }
  ],
  "Tercer semestre": [
    { nombre: "Cálculo II", prerequisitos: ["Cálculo I"] },
    { nombre: "Química Analítica", prerequisitos: ["Química General y Técnicas de Laboratorio"] },
    { nombre: "Fisiopatología", prerequisitos: ["Fisiología"] },
    { nombre: "Bioquímica", prerequisitos: ["Fundamentos de Biología y Genética Humana"] },
    { nombre: "Inglés III", prerequisitos: ["Inglés II"] },
    { nombre: "Ética y Ciudadanía" }
  ],
  "Cuarto semestre": [
    { nombre: "Fisicoquímica", prerequisitos: ["Cálculo II"] },
    { nombre: "Microbiología y Agentes Infecciosos", prerequisitos: ["Bioquímica"] },
    { nombre: "Farmacología I", prerequisitos: ["Fisiopatología"] },
    { nombre: "Análisis Instrumental", prerequisitos: ["Química Analítica"] },
    { nombre: "Inglés IV", prerequisitos: ["Inglés III"] },
    { nombre: "Responsabilidad Social Universitaria", prerequisitos: ["Ética y Ciudadanía"] }
  ],
  "Quinto semestre": [
    { nombre: "Bioestadística" },
    { nombre: "Bioquímica Clínica", prerequisitos: ["Bioquímica"] },
    { nombre: "Farmacología II", prerequisitos: ["Farmacología I"] },
    { nombre: "Farmacoquímica I", prerequisitos: ["Fisicoquímica"] },
    { nombre: "Economía" },
    { nombre: "Electivo de Formación General I" },
    { nombre: "Práctica Integrada en Química y Farmacia", prerequisitos: ["Farmacología I"] }
  ],
  "Sexto semestre": [
    { nombre: "Farmacología Clínica y Polifarmacia", prerequisitos: ["Farmacología II"] },
    { nombre: "Procesos Industriales", prerequisitos: ["Fisicoquímica"] },
    { nombre: "Gestión Farmacéutica" },
    { nombre: "Botánica y Farmacognosia", prerequisitos: ["Análisis Instrumental"] },
    { nombre: "Farmacoquímica II", prerequisitos: ["Farmacoquímica I"] },
    { nombre: "Contabilidad y Costos", prerequisitos: ["Economía"] },
    { nombre: "Electivo de Formación General II" }
  ],
  "Séptimo semestre": [
    { nombre: "Sistemas de Gestión de Calidad Farmacéutica", prerequisitos: ["Gestión Farmacéutica"] },
    { nombre: "Tecnología Farmacéutica", prerequisitos: ["Procesos Industriales"] },
    { nombre: "Salud Pública y Epidemiología", prerequisitos: ["Bioestadística"] },
    { nombre: "Biofarmacia y Farmacocinética", prerequisitos: ["Bioestadística"] },
    { nombre: "Toxicología", prerequisitos: ["Farmacología Clínica y Polifarmacia"] },
    { nombre: "Marketing Farmacéutico", prerequisitos: ["Contabilidad y Costos"] }
  ],
  "Octavo semestre": [
    { nombre: "Tecnología Cosmética", prerequisitos: ["Tecnología Farmacéutica"] },
    { nombre: "Legislación Farmacéutica", prerequisitos: ["Sistemas de Gestión de Calidad Farmacéutica"] },
    { nombre: "Preparación y Evaluación de Proyectos" },
    { nombre: "Atención Farmacéutica y Farmacia Asistencial", prerequisitos: ["Gestión Farmacéutica"] },
    { nombre: "Administración y Gestión del Talento Humano", prerequisitos: ["Marketing Farmacéutico"] }
  ],
  "Noveno semestre": [
    { nombre: "Metodología de la Investigación", prerequisitos: ["Bioestadística"] },
    { nombre: "Famacovigilancia", prerequisitos: ["Salud Pública y Epidemiología"] },
    { nombre: "Farmacia Clínica", prerequisitos: ["Atención Farmacéutica y Farmacia Asistencial"] },
    { nombre: "Nutrición y Bromatología" },
    { nombre: "Práctica Profesional", prerequisitos: [
      "Tecnología Cosmética",
      "Legislación Farmacéutica",
      "Preparación y Evaluación de Proyectos",
      "Atención Farmacéutica y Farmacia Asistencial",
      "Administración y Gestión del Talento Humano"
    ] }
  ],
  "Décimo semestre": [
    { nombre: "Actividad de Titulación", prerequisitos: ["Metodología de la Investigación"] },
    { nombre: "Electivo de Profundización", prerequisitos: ["Farmacia Clínica"] }
  ]
};

const aprobados = new Set();

function puedeDesbloquear(prerequisitos) {
  return (prerequisitos || []).every(req => aprobados.has(req));
}

function actualizarEstadoRamos() {
  document.querySelectorAll('.ramo').forEach(divRamo => {
    const nombre = divRamo.dataset.nombre;
    const prerequisitos = JSON.parse(divRamo.dataset.prerequisitos || '[]');
    if (aprobados.has(nombre)) {
      divRamo.classList.remove('bloqueado');
      divRamo.classList.add('aprobado');
    } else if (puedeDesbloquear(prerequisitos)) {
      divRamo.classList.remove('bloqueado');
      divRamo.classList.remove('aprobado');
    } else {
      divRamo.classList.add('bloqueado');
      divRamo.classList.remove('aprobado');
    }
  });
}

function crearMallaInteractiva() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  for (const [semestre, ramos] of Object.entries(malla)) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";
    divSemestre.innerHTML = `<h2>${semestre}</h2>`;

    ramos.forEach(ramo => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo bloqueado";
      divRamo.textContent = ramo.nombre;
      divRamo.dataset.nombre = ramo.nombre;
      divRamo.dataset.prerequisitos = JSON.stringify(ramo.prerequisitos || []);

      divRamo.addEventListener("click", () => {
        if (puedeDesbloquear(ramo.prerequisitos)) {
          if (aprobados.has(ramo.nombre)) {
            aprobados.delete(ramo.nombre);
          } else {
            aprobados.add(ramo.nombre);
          }
          actualizarEstadoRamos();
        } else {
          alert("Aún no cumples con los prerrequisitos para: " + ramo.nombre);
        }
      });

      divSemestre.appendChild(divRamo);
    });

    contenedor.appendChild(divSemestre);
  }
  actualizarEstadoRamos();
}

document.addEventListener("DOMContentLoaded", crearMallaInteractiva);
