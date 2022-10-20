const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
const questions = [
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false }
      ]
    },
    {
      question: 'javascript is an ___ language?',
      answers: [
        { text: 'object-orieented', correct: true },
        { text: 'object-based', correct: false },
        { text: 'procedural', correct: false },
        { text: 'none of the above', correct: false }
      ]
    },
    {
      question: 'which of the followwing keywords is used to define a variabl in javascript?',
      answers: [
        { text: 'var', correct: false },
        { text: 'let', correct: false},
        { text: 'both A and B', correct: true },
        { text: 'none of the above', correct: false }
      ]
    },
    {
      question: 'Upon encountering empty statement, what does the JavaScript Interpreter?',
      answers: [
        { text: 'throws an error', correct: true },
        { text: 'ignores the statement', correct: false },
        { text: 'gives a warning', correct: false },
        { text: 'none of the above', correct: false}
      ]
    }
  ]