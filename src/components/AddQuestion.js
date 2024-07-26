import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from './QuestionForm';

export default function AddQuestion() {
    const navigate = useNavigate()
    const [isSaved, setIsSaved] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')

    const handleSave = (newQuestion) => {
        const savedQuestions = JSON.parse(localStorage.getItem('questions')) || []
        newQuestion.id = Date.now() // Ensure unique ID
        savedQuestions.push(newQuestion)
        localStorage.setItem('questions', JSON.stringify(savedQuestions))
        setIsSaved(true)
        setSaveMessage('Question Saved Successfully!') // Set the save message
    }

    return (
        <div>
            <QuestionForm onSave={handleSave} initialData={{}} />
            {isSaved && (
                <div>
                    <p>{saveMessage}</p> {/* Display the save message */}
                    <div className="nav-buttons">
                        <button onClick={() => navigate('/admin')}>Back to Admin Home</button>
                        <button onClick={() => navigate('/admin/questions')}>All Questions</button>
                    </div>
                </div>
            )}
        </div>
    )
}
