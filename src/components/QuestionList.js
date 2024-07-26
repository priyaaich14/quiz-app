import React from 'react';
import QuestionItem from './QuestionItem';

export default function QuestionList({ questions, onDelete }) {
  return (
    <ul>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} onDelete={onDelete} />
      ))}
    </ul>
  )
}


