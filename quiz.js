const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"],
        correct: 2
    },
    {
        question: "What is the largest ocean?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = -1;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = `${currentQuestion + 1}. ${q.question}`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsDiv.appendChild(button);
    });
    
    selectedOption = -1;
    document.getElementById('next').style.display = 'none';
}

function selectOption(index) {
    selectedOption = index;
    document.querySelectorAll('.option').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
    document.getElementById('next').style.display = 'block';
}

function nextQuestion() {
    if (selectedOption === questions[currentQuestion].correct) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('score').textContent = `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    loadQuestion();
}

// Start the quiz
loadQuestion();