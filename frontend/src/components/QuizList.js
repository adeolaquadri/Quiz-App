import { useEffect, useState } from "react";
import axios from "axios";

const QuizList = () => {
    const [quiz, setQuiz] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get("http://localhost:4030/quiz", {withCredentials: true});
                if (response.status === 403) {
                    setError("Invalid Token")
                }else {
                    setQuiz(response.data);
                    console.log(response.data)
                }
            } catch (err) {
                setError("Error fetching quiz");
            }
        };

        fetchQuiz();
    }, []);

    // const Logout = async () => {
    //     try {
    //       const logout =  await axios.get("http://localhost:4030/logout");
    //       console.log(logout.data.message)
    //       if(logout && logout.data.message)
    //         alert("Logged out!");
    //         window.location.href = "/login"; // Redirect to login page
    //     } catch (error) {
    //         alert("Logout failed");
    //     }
    // };
    
    if (error) return <h2>{error}</h2>;
    if (!quiz) return <h2>Loading...</h2>;
    return(
      <>
      <div>
          <h2>Select Quiz...</h2>
        {quiz.map((quiz, index) => 
            <ul>
               <li key={quiz._id}><a href={`http://localhost:3000/questionbyquiz/${quiz._id}`}>{quiz.title}</a></li>
            </ul>
         )}
      </div>
      </>
    )}
export default QuizList;
