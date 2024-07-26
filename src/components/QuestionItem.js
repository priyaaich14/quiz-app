import React from 'react';
import { Link } from 'react-router-dom';

export default function QuestionItem({ question, onDelete }) {
  return (
    <li>
      {question.question}
      <button onClick={() => onDelete(question.id)}>Delete</button>
      <Link to={`/admin/edit-question/${question.id}`}> Edit</Link>
    </li>
  )
}


