
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Ensure useAuth is imported here
import Login from './components/Login';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import AdminDashboard from './components/AdminDashboard';
import AllQuestions from './components/AllQuestions';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';
import AllUsers from './components/AllUsers';
import Quiz from './components/Quiz';
import QuizPreview from './components/QuizPreview';
import Score from './components/Score';
import ThankYouPage from './components/ThankYouPage';
import ProtectedRoute from './components/ProtectedRoute';

const RedirectToHome = () => {
  const { user } = useAuth() // Correct usage after import
  if (!user) return <Navigate to="/login" />
  return user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/user" />
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<RedirectToHome />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminHome /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute role="user"><UserHome /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/questions" element={<ProtectedRoute role="admin"><AllQuestions /></ProtectedRoute>} />
        <Route path="/admin/add-question" element={<ProtectedRoute role="admin"><AddQuestion /></ProtectedRoute>} />
        <Route path="/admin/edit-question/:id" element={<ProtectedRoute role="admin"><EditQuestion /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AllUsers /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute role="user"><Quiz /></ProtectedRoute>} />
        <Route path="/preview" element={<ProtectedRoute role="user"><QuizPreview /></ProtectedRoute>} />
        <Route path="/score" element={<ProtectedRoute role="user"><Score /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </AuthProvider>
  )
}


// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext'; // Ensure useAuth is imported here
// import { QuestionProvider } from './context/QuestionContext';
// import Login from './components/Login';
// import AdminHome from './components/AdminHome';
// import UserHome from './components/UserHome';
// import AdminDashboard from './components/AdminDashboard';
// import AllQuestions from './components/AllQuestions';
// import AddQuestion from './components/AddQuestion';
// import EditQuestion from './components/EditQuestion';
// import AllUsers from './components/AllUsers';
// import Quiz from './components/Quiz';
// import QuizPreview from './components/QuizPreview';
// import Score from './components/Score';
// import ThankYouPage from './components/ThankYouPage';
// import ProtectedRoute from './components/ProtectedRoute';

// const RedirectToHome = () => {
//   const { user } = useAuth(); // Correct usage after import
//   if (!user) return <Navigate to="/login" />;
//   return user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/user" />;
// };

// export default function App() {
//   return (
//     <AuthProvider>
//       <QuestionProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/home" element={<RedirectToHome />} />
//           <Route path="/admin" element={<ProtectedRoute role="admin"><AdminHome /></ProtectedRoute>} />
//           <Route path="/user" element={<ProtectedRoute role="user"><UserHome /></ProtectedRoute>} />
//           <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
//           <Route path="/admin/questions" element={<ProtectedRoute role="admin"><AllQuestions /></ProtectedRoute>} />
//           <Route path="/admin/add-question" element={<ProtectedRoute role="admin"><AddQuestion /></ProtectedRoute>} />
//           <Route path="/admin/edit-question/:id" element={<ProtectedRoute role="admin"><EditQuestion /></ProtectedRoute>} />
//           <Route path="/admin/users" element={<ProtectedRoute role="admin"><AllUsers /></ProtectedRoute>} />
//           <Route path="/quiz" element={<ProtectedRoute role="user"><Quiz /></ProtectedRoute>} />
//           <Route path="/preview" element={<ProtectedRoute role="user"><QuizPreview /></ProtectedRoute>} />
//           <Route path="/score" element={<ProtectedRoute role="user"><Score /></ProtectedRoute>} />
//           <Route path="/thank-you" element={<ThankYouPage />} />
//           <Route path="*" element={<Navigate to="/home" />} />
//         </Routes>
//       </QuestionProvider>
//     </AuthProvider>
//   );
// }
