const questions = [
    "¿Cómo te describirías en una conversación?",
    "¿Cómo manejas las situaciones nuevas o inesperadas?",
    "¿Cómo te relacionas con los demás?",
    "¿Cómo sueles actuar en situaciones de estrés?",
    "¿Cuál es tu enfoque hacia el trabajo o estudios?",
    "¿Qué actitud tomas ante los conflictos?"
    // Añadir más preguntas aquí
];

const options = [
    { value: 'sanguineo', text: 'Sanguíneo' },
    { value: 'colerico', text: 'Colérico' },
    { value: 'melancolico', text: 'Melancólico' },
    { value: 'flematico', text: 'Flemático' }
];

let currentQuestionIndex = 0;
let scores = {
    sanguineo: 0,
    colerico: 0,
    melancolico: 0,
    flematico: 0
};

function startTest() {
    document.querySelector('.intro').style.display = 'none';
    document.getElementById('temperamentTest').style.display = 'block';
    showQuestion(currentQuestionIndex);
}

function createQuestionHTML(question, index) {
    let html = `<div class="question"><p>${index + 1}. ${question}</p>`;
    options.forEach(option => {
        html += `<label><input type="radio" name="q${index + 1}" value="${option.value}"> ${option.text}</label><br>`;
    });
    html += '</div>';
    return html;
}

function showQuestion(index) {
    const container = document.getElementById('questionContainer');
    container.innerHTML = createQuestionHTML(questions[index], index);
    document.getElementById('prevButton').style.display = index > 0 ? 'inline-block' : 'none';
    document.getElementById('nextButton').textContent = index < questions.length - 1 ? 'Siguiente' : 'Enviar';
}

function nextQuestion() {
    const form = document.getElementById('temperamentTest');
    const formData = new FormData(form);
    const answer = formData.get(`q${currentQuestionIndex + 1}`);
    
    if (answer) {
        scores[answer]++;
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            calculateResults();
        }
    } else {
        alert("Por favor, selecciona una respuesta.");
    }
}

function prevQuestion() {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
}

function calculateResults() {
    let highestScore = Math.max(scores.sanguineo, scores.colerico, scores.melancolico, scores.flematico);
    let temperament = '';

    if (highestScore === scores.sanguineo) {
        temperament = 'Sanguíneo';
    } else if (highestScore === scores.colerico) {
        temperament = 'Colérico';
    } else if (highestScore === scores.melancolico) {
        temperament = 'Melancólico';
    } else if (highestScore === scores.flematico) {
        temperament = 'Flemático';
    }

    document.getElementById('result').innerText = '¡Enhorabuena! La probabilidad de que tu temperamento sea: ' + temperament;
    document.getElementById('books').innerText = 'Recomendación de libros:';
    document.getElementById('listBook').innerText = 'Libro 1 / Libro 2 / Libro 3';
    document.getElementById('result').style.display = 'block';
    document.getElementById('temperamentTest').style.display = 'none';
}

window.onload = function() {
    // El test comenzará cuando el usuario haga clic en el botón "Iniciar"
};
