import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get("https://quiz-app-0yfq.onrender.com/quiz", 
                       {headers: {
                          Authorization: `Bearer ${token}`,
                        },});
                if (response.data.user) {
                    setIsLoggedIn(true);
                    setUser(response.data.user)
                }
                if (response.status === 403) {
                    setError("Invalid Token");
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    setQuizzes(response.data.quiz);
                    console.log(response.data);
                }
            } catch (err) {
                setIsLoggedIn(false)
                setError("Error fetching quiz. Redirecting...");
                setTimeout(() => navigate("/login"), 2000);
            }
        };

        fetchQuizzes();
    }, [navigate]);

        const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          };
         
    

    if (error) return <h2 className="text-red-500 text-center">{error}</h2>;
    if (quizzes.length === 0) return <h2 className="text-center text-lg">Loading...</h2>;

    return (
        <>
        <Header username={user.username} email={user.email} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-blue-100 p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <div key={quiz._id} className="w-60 h-80 rounded-xl bg-white shadow-lg flex flex-col justify-between">
                        <div className="flex-grow flex items-center justify-center">
                            <img src={quiz.image || "/default-quiz.png"} alt={quiz.title} className="w-24 h-24" />
                        </div>
                        <div className="text-center font-bold text-xl text-gray-800">{quiz.title}</div>
                        <a href={`/question/${quiz._id}`} className="w-full py-3 bg-blue-500 text-white text-center font-medium rounded-b-xl hover:bg-blue-600 transition">
                            Start Quiz
                        </a>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default QuizList;
