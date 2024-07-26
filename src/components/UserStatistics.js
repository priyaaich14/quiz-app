
// import { useEffect, useState } from 'react';

// export default function UserStatistics() {
//   const [statistics, setStatistics] = useState([])

//   useEffect(() => {
//     const attempts = JSON.parse(localStorage.getItem('attempts')) || {}
//     const stats = Object.keys(attempts)
//       .filter(username => username && username !== 'null' && attempts[username].length > 0) // Filter out null or undefined usernames and users with no attempts
//       .map(username => {
//         const userAttempts = attempts[username]
//         const totalScore = userAttempts.reduce((sum, attempt) => sum + attempt.score, 0)
//         const averageScore = userAttempts.length ? (totalScore / userAttempts.length).toFixed(2) : 'N/A'
//         return { username, totalScore, averageScore }
//       })
//       .filter(stat => !isNaN(stat.totalScore)) // Filter out stats with NaN totalScore

//     setStatistics(stats)
//   }, [])

//   return (
//     <div>
//       <h3>User Statistics</h3>
//       <ul>
//         {statistics.map((stat, index) => (
//           <li key={index}>
//             {stat.username}: Total Score: {stat.totalScore}, Average Score: {stat.averageScore}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

import { useEffect, useState } from 'react';

export default function UserStatistics() {
  const [statistics, setStatistics] = useState([])

  useEffect(() => {
    const attempts = JSON.parse(localStorage.getItem('attempts')) || {};
    const stats = Object.keys(attempts)
      .filter(username => username && username !== 'null' && username !== 'undefined') // Filter out null, undefined, or invalid usernames
      .map(username => {
        const userAttempts = attempts[username]
        const totalScore = userAttempts.reduce((sum, attempt) => sum + attempt.score, 0)
        const averageScore = (totalScore / userAttempts.length).toFixed(2)
        return { username, totalScore, averageScore }
      })
    setStatistics(stats)
  }, [])

  return (
    <div>
      <h3>User Statistics</h3>
      <ul>
        {statistics.map((stat, index) => (
          <li key={index}>
            {stat.username}: Total Score: {stat.totalScore}, Average Score: {stat.averageScore}
          </li>
        ))}
      </ul>
    </div>
  )
}
