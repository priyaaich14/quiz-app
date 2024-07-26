import { useState, useEffect } from 'react';

export default function QuestionForm({ onSave, initialData }) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || '')
      setOptions(initialData.options || ['', '', '', ''])
      setCorrectAnswer(initialData.correctAnswer || '')
    }
  }, [initialData])

  const runClientValidation = () => {
    const newErrors = {}
    if (!question) newErrors.question = 'Question is required'
    options.forEach((option, index) => {
      if (!option) newErrors[`option${index}`] = `Option ${index + 1} is required`
    })
    if (!correctAnswer) newErrors.correctAnswer = 'Correct answer is required'
    if (!options.includes(correctAnswer)) newErrors.correctAnswer = 'Correct answer must be one of the options'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!runClientValidation()) return

    const newQuestion = {
      id: initialData.id || Date.now(),
      question,
      options,
      correctAnswer
    }
    onSave(newQuestion)
  }

  return (
    <div>
      <h2>{initialData.id ? 'Edit Question' : 'Add New Question'}</h2>
      <input 
        type="text" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
        placeholder="Enter question" 
      />
      {errors.question && <p className="error">{errors.question}</p>}
      {options.map((option, index) => (
        <div key={index}>
          <input 
            type="text" 
            value={option} 
            onChange={(e) => {
              const newOptions = [...options]
              newOptions[index] = e.target.value
              setOptions(newOptions)
            }} 
            placeholder={`Option ${index + 1}`} 
          />
          {errors[`option${index}`] && <p className="error">{errors[`option${index}`]}</p>}
        </div>
      ))}
      <div className="form-section">
        <label>Correct Answer: </label>
        <input 
          type="text" 
          value={correctAnswer} 
          onChange={(e) => setCorrectAnswer(e.target.value)} 
          placeholder="Correct answer" 
        />
        {errors.correctAnswer && <p className="error">{errors.correctAnswer}</p>}
      </div>
      <button className="button-bottom" onClick={handleSave}>{initialData.id ? 'Update Question' : 'Save Question'}</button>
    </div>
  )
}

