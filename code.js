// Constantes Físicas
const GRAVITY = 9.81; // m/s^2

// Elementos del DOM
const massInput = document.getElementById('mass');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculate-btn');
const workOutput = document.getElementById('work-output');
const energyOutput = document.getElementById('energy-output');
const errorMessage = document.getElementById('error-message');
const personIcon = document.getElementById('person-icon');
const stairsContainer = document.querySelector('.stairs-container');
const indicatorLabel = document.getElementById('indicator-label');

// --- Lógica de Cálculo ---
function calculatePhysics(mass, height) {
    if (isNaN(mass) || isNaN(height) || mass <= 0 || height < 0) {
        return null; // Indica error en los datos
    }
    const work = mass * GRAVITY * height;
    const potentialEnergy = work; // En este caso ideal, W = ΔPE
    return { work, potentialEnergy };
}

// --- Actualización Visual ---
function updateVisualization(height) {
    const containerHeight = stairsContainer.offsetHeight; // Altura del contenedor de escaleras en píxeles
    const maxVisualHeight = containerHeight - 40; // Deja un margen arriba y abajo (altura del icono aprox)

    // Escala la altura física (metros) a la altura visual (píxeles)
    // Establece una altura máxima física razonable para la visualización (ej. 10 metros)
    const maxPhysicalHeightForVisual = 10;
    let visualHeightPercentage = Math.min(height / maxPhysicalHeightForVisual, 1); // Limita al 100% de la altura visual máxima

     // Si la altura es 0, la posición es la base
    if (height === 0) {
        visualHeightPercentage = 0;
    }

    // Calcula la posición 'bottom' en píxeles
    // Iniciamos un poco por encima de la base (5px)
    const basePosition = 5;
    const visualBottomPosition = basePosition + (visualHeightPercentage * (maxVisualHeight - basePosition));

    // Aplica la posición al icono de la persona
    personIcon.style.bottom = `${Math.min(visualBottomPosition, maxVisualHeight)}px`; // Asegura que no se salga por arriba

    // Actualiza la etiqueta indicadora de altura
    indicatorLabel.textContent = `${height.toFixed(1)} m`;
}

// --- Manejador de Eventos ---
calculateBtn.addEventListener('click', () => {
    // Limpia mensajes de error y resultados anteriores
    errorMessage.textContent = '';
    workOutput.textContent = '-';
    energyOutput.textContent = '-';

    // Obtiene y valida las entradas
    const mass = parseFloat(massInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(mass) || mass <= 0) {
        errorMessage.textContent = 'Por favor, introduce una masa válida (mayor que 0 kg).';
        return; // Detiene la ejecución
    }
    if (isNaN(height) || height < 0) {
        errorMessage.textContent = 'Por favor, introduce una altura válida (0 o mayor en metros).';
        return; // Detiene la ejecución
    }

    // Realiza los cálculos
    const results = calculatePhysics(mass, height);

    // Muestra los resultados
    if (results) {
        workOutput.textContent = results.work.toFixed(2);
        energyOutput.textContent = results.potentialEnergy.toFixed(2);

        // Actualiza la posición visual de la persona
        updateVisualization(height);
    } else {
        // Esto no debería ocurrir con la validación previa, pero es una salvaguarda
        errorMessage.textContent = 'Ocurrió un error en el cálculo. Verifica las entradas.';
    }
});

// Inicializa la visualización con los valores por defecto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const initialHeight = parseFloat(heightInput.value) || 0;
    updateVisualization(initialHeight);
});