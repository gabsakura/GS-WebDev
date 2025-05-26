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

// Auto advance slides every 5 seconds
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
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
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
        choicesEl.appendChild(button);
    });
}

function selectChoice(choiceIndex) {
    const currentQ = questions[currentQuestion];
    if (choiceIndex === currentQ.correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
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

// Form Validation
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 3) {
        nameError.textContent = 'O nome deve ter pelo menos 3 caracteres';
        return false;
    }
    nameError.textContent = '';
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Por favor, insira um email válido';
        return false;
    }
    emailError.textContent = '';
    return true;
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message.length < 10) {
        messageError.textContent = 'A mensagem deve ter pelo menos 10 caracteres';
        return false;
    }
    messageError.textContent = '';
    return true;
}

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
        // Aqui você pode adicionar o código para enviar o formulário
        alert('Formulário enviado com sucesso!');
        form.reset();
    }
}); 