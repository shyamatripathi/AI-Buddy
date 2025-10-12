let currentQuizAnswers = [];
const API_BASE_URL = 'http://localhost:8000';

// Handle file upload
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (!file) {
        showError('Please select a file');
        return;
    }
    
    // Show loading, hide other sections
    showSection('loading-section');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        console.log('Uploading file to:', `${API_BASE_URL}/upload/`);
        const response = await fetch(`${API_BASE_URL}/upload/`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            displayResults(data);
        } else {
            showError(data.detail || 'Processing failed');
        }
        
    } catch (error) {
        console.error('Upload error:', error);
        showError('Network error: ' + error.message);
    }
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    document.getElementById(sectionId).classList.remove('hidden');
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    showSection('error-section');
}

function resetApp() {
    document.getElementById('upload-form').reset();
    showSection('upload-section');
}

function displayResults(data) {
    // Set filename
    document.getElementById('filename').textContent = data.filename;
    
    // Display summary
    displaySummary(data.processed_data.summary);
    
    // Display flashcards
    displayFlashcards(data.processed_data.flashcards);
    
    // Display quiz
    displayQuiz(data.processed_data.quiz);
    
    // Show results section
    showSection('results-section');
}

function displaySummary(summary) {
    const summaryContent = document.getElementById('summary-content');
    summaryContent.innerHTML = `
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
            <div style="white-space: pre-wrap; line-height: 1.6;">${summary}</div>
        </div>
    `;
}

function displayFlashcards(flashcards) {
    const flashcardsContent = document.getElementById('flashcards-content');
    
    if (!flashcards || flashcards.length === 0) {
        flashcardsContent.innerHTML = '<p>No flashcards generated.</p>';
        return;
    }
    
    let html = `<p>${flashcards.length} flashcards generated. Click to flip!</p>`;
    
    flashcards.forEach((card, index) => {
        html += `
            <div class="flashcard" onclick="flipFlashcard(this)">
                <div class="flashcard-front">
                    <strong>Question ${index + 1}:</strong> ${card.question}
                </div>
                <div class="flashcard-back" style="display: none;">
                    <strong>Answer:</strong> ${card.answer}
                </div>
            </div>
        `;
    });
    
    flashcardsContent.innerHTML = html;
}

function flipFlashcard(element) {
    const front = element.querySelector('.flashcard-front');
    const back = element.querySelector('.flashcard-back');
    
    if (front.style.display !== 'none') {
        front.style.display = 'none';
        back.style.display = 'block';
    } else {
        front.style.display = 'block';
        back.style.display = 'none';
    }
}

function displayQuiz(quiz) {
    const quizContent = document.getElementById('quiz-content');
    currentQuizAnswers = [];
    
    if (!quiz || quiz.length === 0) {
        quizContent.innerHTML = '<p>No quiz questions generated.</p>';
        return;
    }
    
    let html = `<p>${quiz.length} quiz questions generated. Test your knowledge!</p>`;
    
    quiz.forEach((question, index) => {
        currentQuizAnswers.push(question.correct_answer);
        
        let optionsHtml = '';
        question.options.forEach((option, optIndex) => {
            optionsHtml += `
                <div class="option" onclick="selectOption(this, ${index})" data-option="${optIndex}">
                    ${String.fromCharCode(65 + optIndex)}. ${option}
                </div>
            `;
        });
        
        html += `
            <div class="quiz-question" id="question-${index}">
                <h4>Question ${index + 1}</h4>
                <p>${question.question}</p>
                <div class="options">
                    ${optionsHtml}
                </div>
            </div>
        `;
    });
    
    quizContent.innerHTML = html;
}

function selectOption(element, questionIndex) {
    // Remove selection from other options in this question
    const questionElement = document.getElementById(`question-${questionIndex}`);
    questionElement.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select this option
    element.classList.add('selected');
    element.setAttribute('data-selected', 'true');
}

function checkQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;
    
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('.option.selected');
        
        if (selectedOption) {
            const selectedAnswer = parseInt(selectedOption.getAttribute('data-option'));
            const correctAnswer = currentQuizAnswers[index];
            
            // Remove previous styling
            question.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
            });
            
            // Style correct answer
            const correctOption = question.querySelector(`[data-option="${correctAnswer}"]`);
            correctOption.classList.add('correct');
            
            // Style user's selection if wrong
            if (selectedAnswer !== correctAnswer) {
                selectedOption.classList.add('incorrect');
            } else {
                score++;
            }
        }
    });
    
    // Show score
    const scoreElement = document.createElement('div');
    scoreElement.className = 'card';
    scoreElement.style.background = '#d4edda';
    scoreElement.innerHTML = `
        <h3>Quiz Results</h3>
        <p>You scored ${score} out of ${questions.length} (${Math.round((score/questions.length)*100)}%)</p>
    `;
    
    document.getElementById('quiz-content').appendChild(scoreElement);
}

function showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}