const MAX_ALUMNOS = 10;
const nombres = []; 
const notas = [];  
const form = document.getElementById('student-form');
const nombreInput = document.getElementById('nombre');
const c1Input = document.getElementById('c1');
const c2Input = document.getElementById('c2');
const c3Input = document.getElementById('c3');
const messageDiv = document.getElementById('message');
const resultsCard = document.getElementById('results-card');
const resultsContent = document.getElementById('results-content');
const btnSubmit = document.getElementById('btn-submit');

function esNotaValida(nota) {
  return !isNaN(nota) && nota >= 10 && nota <= 100;
}

function mostrarMensaje(texto, tipo = 'error') {
  messageDiv.textContent = texto;
  messageDiv.className = `message ${tipo}`;
}

function limpiarMensaje() {
  messageDiv.className = 'message hidden';
  messageDiv.textContent = '';
}

const calcularPromedio = (arr) => arr.length === 0 ? 0 : arr.reduce((acc, curr) => acc + curr, 0) / arr.length;

function agregarAlumno(nombre, n1, n2, n3) {
  if (nombres.length >= MAX_ALUMNOS) return;

  nombres.push(nombre);
  notas.push([n1, n2, n3]);
}

function generarResultados() {
  const promediosAlumnos = notas.map(filaNotas => calcularPromedio(filaNotas));
  const promC1 = calcularPromedio(notas.map(row => row[0]));
  const promC2 = calcularPromedio(notas.map(row => row[1]));
  const promC3 = calcularPromedio(notas.map(row => row[2]));


  const promGeneral = calcularPromedio(promediosAlumnos);


  const aprobados = promediosAlumnos.filter(p => p >= 55).length;
  const reprobados = promediosAlumnos.filter(p => p < 55).length;


  const listaAlumnos = nombres.map((nom, idx) => ({
    nombre: nom,
    notas: notas[idx],
    promedio: promediosAlumnos[idx]
  }));

  listaAlumnos.sort((a, b) => b.promedio - a.promedio);

  let htmlOutput = '<div class="result-block">';

  listaAlumnos.forEach((al, index) => {
    htmlOutput += `
      <p><strong>Nombre ${index + 1}:</strong> ${al.nombre}</p>
      <p>C1: ${al.notas[0]}</p>
      <p>C2: ${al.notas[1]}</p>
      <p>C3: ${al.notas[2]}</p>
      <p>Promedio: ${al.promedio.toFixed(2)}</p>
      <br>
    `;
  });

  htmlOutput += `
    <p><strong>Promedio del curso C1:</strong> ${promC1.toFixed(2)}</p>
    <p><strong>Promedio del curso C2:</strong> ${promC2.toFixed(2)}</p>
    <p><strong>Promedio del curso C3:</strong> ${promC3.toFixed(2)}</p>
    <p><strong>Promedio Final Curso:</strong> ${promGeneral.toFixed(2)}</p>
    <p><strong>Aprobados:</strong> ${aprobados}</p>
    <p><strong>Reprobados:</strong> ${reprobados}</p>
  </div>`;

  resultsContent.innerHTML = htmlOutput;
  resultsCard.classList.remove('hidden');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  limpiarMensaje();

  const nombre = nombreInput.value.trim();
  const n1 = parseFloat(c1Input.value);
  const n2 = parseFloat(c2Input.value);
  const n3 = parseFloat(c3Input.value);

  if (!nombre) {
    mostrarMensaje('Por favor, ingresa un nombre válido.');
    return;
  }

  if (!esNotaValida(n1) || !esNotaValida(n2) || !esNotaValida(n3)) {
    mostrarMensaje('Las notas deben ser valores numéricos entre 10 y 100.');
    return;
  }

  agregarAlumno(nombre, n1, n2, n3);
  form.reset();
  nombreInput.focus();

  generarResultados();

  if (nombres.length === MAX_ALUMNOS) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Límite alcanzado (10/10)';
    mostrarMensaje('Se ha registrado el máximo de 10 alumnos.', 'info');
  } else {
    mostrarMensaje(`Alumno registrado (${nombres.length}/${MAX_ALUMNOS})`, 'info');
  }
});