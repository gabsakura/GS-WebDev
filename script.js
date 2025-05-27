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
    
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";
        if (dots[slideIndex-1]) {
            dots[slideIndex-1].className += " active";
        }
    }
}

// Adiciona tratamento de erro para imagens
document.querySelectorAll('.slide img').forEach(img => {
    img.onerror = function() {
        this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22217.7%22%3EImagem%20não%20encontrada%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
    };
});

// Inicia o slideshow apenas se houver slides
if (document.getElementsByClassName("slide").length > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

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
    
    const quizContent = document.getElementById('quiz-content');
    const resultsEl = document.getElementById('results');
    
    if (quizContent && resultsEl) {
        quizContent.style.display = 'block';
        resultsEl.style.display = 'none';
    }
    
    showQuestion();
    updateProgress();
    updateNavigationButtons();
}

function showQuestion() {
    const questionEl = document.getElementById("question");
    const choicesEl = document.getElementById("choices");
    
    if (!questionEl || !choicesEl) return;
    
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
    showQuestion();
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
    const currentNumber = document.getElementById("currentQuestionNumber");
    const totalNumber = document.getElementById("totalQuestions");
    
    if (currentNumber && totalNumber) {
        currentNumber.textContent = currentQuestion + 1;
        totalNumber.textContent = questions.length;
    }
}

function updateNavigationButtons() {
    const prevButton = document.getElementById("prevQuestion");
    const nextButton = document.getElementById("nextQuestion");
    const submitButton = document.getElementById("submit");
    
    if (prevButton && nextButton && submitButton) {
        prevButton.disabled = currentQuestion === 0;
        nextButton.disabled = currentQuestion === questions.length - 1;
        submitButton.disabled = userAnswers.includes(null);
    }
}

function submitQuiz() {
    if (userAnswers.includes(null)) {
        alert("Por favor, responda todas as questões antes de finalizar!");
        return;
    }

    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            score++;
        }
    });

    const quizContent = document.getElementById('quiz-content');
    const resultsEl = document.getElementById('results');
    const scoreEl = document.getElementById('score');
    
    if (quizContent && resultsEl && scoreEl) {
        quizContent.style.display = 'none';
        resultsEl.style.display = 'block';
        scoreEl.textContent = `Respondido obrigado -> ${score} respostas Corretas :) `;
    }
}

// Inicializa o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    startQuiz();
    
    // Adiciona o evento de reiniciar
    const restartButton = document.getElementById('restart');
    if (restartButton) {
        restartButton.addEventListener('click', startQuiz);
    }
});

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