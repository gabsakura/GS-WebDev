// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Slideshow code
let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

setInterval(() => {
    changeSlide(1);
}, 5000);

// Quiz code
const questions = [
    {
        question: "Qual é a capital do Brasil?",
        choices: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correct: 2
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        choices: ["Terra", "Marte", "Júpiter", "Saturno"],
        correct: 2
    },
    {
        question: "Quem pintou a Mona Lisa?",
        choices: ["Van Gogh", "Leonardo da Vinci", "Picasso", "Michelangelo"],
        correct: 1
    },
    {
        question: "Qual é o maior oceano do mundo?",
        choices: ["Atlântico", "Índico", "Pacífico", "Ártico"],
        correct: 2
    },
    {
        question: "Em que ano começou a Primeira Guerra Mundial?",
        choices: ["1914", "1918", "1939", "1945"],
        correct: 0
    },
    {
        question: "Qual é o elemento químico com símbolo 'O'?",
        choices: ["Ouro", "Oxigênio", "Ósmio", "Osmio"],
        correct: 1
    },
    {
        question: "Qual é o maior deserto do mundo?",
        choices: ["Saara", "Gobi", "Antártico", "Atacama"],
        correct: 2
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        choices: ["Machado de Assis", "José de Alencar", "Eça de Queirós", "Lima Barreto"],
        correct: 0
    },
    {
        question: "Qual é o país com maior população do mundo?",
        choices: ["Estados Unidos", "Índia", "China", "Indonésia"],
        correct: 2
    },
    {
        question: "Qual é o maior osso do corpo humano?",
        choices: ["Fêmur", "Tíbia", "Úmero", "Rádio"],
        correct: 0
    }
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;
    showQuestion();
    updateProgress();
    updateNavigationButtons();
}

function showQuestion() {
    const questionEl = document.getElementById("question");
    const choicesEl = document.getElementById("choices");
    const currentQ = questions[currentQuestion];

    questionEl.textContent = currentQ.question;
    choicesEl.innerHTML = "";

    currentQ.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => selectChoice(index);
        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }
        choicesEl.appendChild(button);
    });
}

function selectChoice(choiceIndex) {
    userAnswers[currentQuestion] = choiceIndex;
    showQuestion(); // Atualiza a visualização para mostrar a seleção
    updateNavigationButtons();
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgress();
        updateNavigationButtons();
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
        updateNavigationButtons();
    }
}

function updateProgress() {
    document.getElementById("currentQuestionNumber").textContent = currentQuestion + 1;
    document.getElementById("totalQuestions").textContent = questions.length;
}

function updateNavigationButtons() {
    const prevButton = document.getElementById("prevQuestion");
    const nextButton = document.getElementById("nextQuestion");
    const submitButton = document.getElementById("submit");

    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = currentQuestion === questions.length - 1;
    
    // Verifica se todas as questões foram respondidas
    const allAnswered = userAnswers.every(answer => answer !== null);
    submitButton.disabled = !allAnswered;
}

function submitQuiz() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            score++;
        }
    });

    const quizEl = document.getElementById("quiz");
    const resultsEl = document.getElementById("results");
    const scoreEl = document.getElementById("score");

    quizEl.classList.add("hide");
    resultsEl.classList.remove("hide");
    scoreEl.textContent = `Você acertou ${score} de ${questions.length} questões!`;
}

document.getElementById("restart").addEventListener("click", () => {
    document.getElementById("quiz").classList.remove("hide");
    document.getElementById("results").classList.add("hide");
    startQuiz();
});

// Start the quiz when the page loads
startQuiz();

// Background Color Change
const themeIcons = document.querySelectorAll('.theme-icon');

themeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const color = icon.getAttribute('data-color');
        document.body.style.backgroundColor = color;
        
        // Salvar a preferência do usuário
        localStorage.setItem('backgroundColor', color);
    });
});

// Carregar a cor de fundo salva
const savedColor = localStorage.getItem('backgroundColor');
if (savedColor) {
    document.body.style.backgroundColor = savedColor;
} 