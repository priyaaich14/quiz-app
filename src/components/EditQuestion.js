import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionForm from './QuestionForm';

export default function EditQuestion() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState({})

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || []
    const questionToEdit = savedQuestions.find(q => q.id === parseInt(id))
    if (questionToEdit) {
      setInitialData(questionToEdit)
    }
  }, [id])

  const handleSave = (updatedQuestion) => {
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || []
    const updatedQuestions = savedQuestions.map(q => (q.id === parseInt(id) ? { ...q, ...updatedQuestion } : q))
    localStorage.setItem('questions', JSON.stringify(updatedQuestions))
    navigate('/admin/questions')
  }

  return (
    <QuestionForm 
      onSave={handleSave} 
      initialData={initialData} 
    />
  )
}


