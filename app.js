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