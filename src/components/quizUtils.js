export const saveQuizResults = (answers, questions, username) => {
  const results = Object.keys(answers).map(questionId => {
      const question = questions.find(q => q.id.toString() === questionId)
      const answer = answers[questionId]
      return {
          question: question ? question.question : null,
          answer,
          correct: question ? question.correctAnswer === answer : false
      }
  })

  const currentScore = results.reduce((total, result) => total + (result.correct ? 2 : 0), 0)

  const userResults = {
      score: currentScore,
      date: new Date().toISOString()
  }

  const attempts = JSON.parse(localStorage.getItem('attempts')) || {}
  if (!attempts[username]) {
      attempts[username] = []
  }
  attempts[username].push(userResults)
  localStorage.setItem('attempts', JSON.stringify(attempts))
}
