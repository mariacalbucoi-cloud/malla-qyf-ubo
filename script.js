const malla = {
  "Primer semestre": [
    { nombre: "Introducción a la Química y Farmacia" },
    { nombre: "Química General I" },
    { nombre: "Biología Celular" },
    { nombre: "Matemáticas I" },
    { nombre: "Comunicación Oral y Escrita" },
    { nombre: "Introducción a la Vida Universitaria" }
  ],
  "Segundo semestre": [
    { nombre: "Química General II", prerequisitos: ["Química General I"] },
    { nombre: "Matemáticas II", prerequisitos: ["Matemáticas I"] },
    { nombre: "Química Orgánica I", prerequisitos: ["Química General I"] },
    { nombre: "Biología Molecular y Genética", prerequisitos: ["Biología Celular"] },
    { nombre: "Inglés I" },
    { nombre: "Salud Pública" }
  ],
  "Tercer semestre": [
    { nombre: "Química Orgánica II", prerequisitos: ["Química Orgánica I"] },
    { nombre: "Física", prerequisitos: ["Matemáticas II"] },
    { nombre: "Bioquímica I", prerequisitos: ["Biología Molecular y Genética", "Química Orgánica I"] },
    { nombre: "Microbiología", prerequisitos: ["Biología Molecular y Genética"] },
    { nombre: "Inglés II", prerequisitos: ["Inglés I"] }
  ],
  "Cuarto semestre": [
    { nombre: "Bioquímica II", prerequisitos: ["Bioquímica I"] },
    { nombre: "Fisiología", prerequisitos: ["Biología Celular"] },
    { nombre: "Parasitología", prerequisitos: ["Microbiología"] },
    { nombre: "Química Analítica Cuantitativa", prerequisitos: ["Química General II"] },
    { nombre: "Farmacognosia I", prerequisitos: ["Química Orgánica II"] },
    { nombre: "Ética Profesional" }
  ],
  "Quinto semestre": [
    { nombre: "Farmacología I", prerequisitos: ["Bioquímica II", "Fisiología"] },
    { nombre: "Química Analítica Instrumental", prerequisitos: ["Química Analítica Cuantitativa"] },
    { nombre: "Farmacognosia II", prerequisitos: ["Farmacognosia I"] },
    { nombre: "Tecnología Farmacéutica I", prerequisitos: ["Química Orgánica II"] },
    { nombre: "Immunología", prerequisitos: ["Parasitología"] }
  ],
  "Sexto semestre": [
    { nombre: "Farmacología II", prerequisitos: ["Farmacología I"] },
    { nombre: "Toxicología", prerequisitos: ["Farmacología I"] },
    { nombre: "Tecnología Farmacéutica II", prerequisitos: ["Tecnología Farmacéutica I"] },
    { nombre: "Control de Calidad Físico-Químico", prerequisitos: ["Química Analítica Instrumental"] },
    { nombre: "Biotecnología Farmacéutica", prerequisitos: ["Farmacognosia II"] }
  ],
  "Séptimo semestre": [
    { nombre: "Legislación Farmacéutica" },
    { nombre: "Biofarmacia y Farmacocinética", prerequisitos: ["Farmacología II"] },
    { nombre: "Análisis Microbiológico de Medicamentos", prerequisitos: ["Microbiología"] },
    { nombre: "Farmacia Galénica", prerequisitos: ["Tecnología Farmacéutica II"] },
    { nombre: "Tópicos de Gestión en Salud" }
  ],
  "Octavo semestre": [
    { nombre: "Formulación Magistral", prerequisitos: ["Farmacia Galénica"] },
    { nombre: "Atención Farmacéutica y Farmacia Clínica I", prerequisitos: ["Farmacología II"] },
    { nombre: "Práctica Profesional I", prerequisitos: ["Séptimo semestre"] },
    { nombre: "Taller de Investigación" },
    { nombre: "Electivo Profesional I" }
  ],
  "Noveno semestre": [
    { nombre: "Atención Farmacéutica y Farmacia Clínica II", prerequisitos: ["Atención Farmacéutica y Farmacia Clínica I"] },
    { nombre: "Gestión y Administración Farmacéutica", prerequisitos: ["Tópicos de Gestión en Salud"] },
    { nombre: "Electivo Profesional II" },
    { nombre: "Práctica Profesional II" }
  ],
  "Décimo semestre": [
    { nombre: "Internado Profesional" },
    { nombre: "Seminario de Título" }
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
