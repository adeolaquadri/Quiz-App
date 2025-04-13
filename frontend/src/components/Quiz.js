import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"

const Quiz = () => {
    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [image, setImage] = useState("")
    const [quizInfo, setQuizInfo] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://quiz-app-0yfq.onrender.com/question/${quizId}`, {
                    withCredentials: true
                });
                if (res.data.user) {
                setIsLoggedIn(true);
                setQuestions(res.data.questions);
                setQuizInfo(res.data.quiz); // assuming quiz info has logo and techName
                setUser(res.data.user);
                }else{
                    window.location.href = "/login"
                }
            } catch (err) {
                console.error(err);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [quizId]);
    
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get(`http://localhost:4030/getImage/${quizId}`, {
                    withCredentials: true
                });
                setImage(res.data.image);
            } catch (err) {
                setIsLoggedIn(false);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [quizId]);

    
        const handleLogout = async () => {
            try {
              await axios.get("http://localhost:4030/logout", { withCredentials: true });
              navigate("/login");
            } catch (err) {
              console.log("Logout failed", err);
            }
          };

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: option,
        }));
    };

    const nextPage = () => {
        if (!selectedOptions[questions[currentPage - 1]._id]) {
            alert("Please select an option before proceeding!");
            return;
        }
        setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        let score = 0;
        questions.forEach((q) => {
            if (selectedOptions[q._id] === q.correctAnswer) {
                score += 1;
            }
        });

        const totalQuestions = questions.length;
        const percentage = (score / totalQuestions) * 100;
        const username = user?.username;
        alert(`Dear ${username}, your score is ${score}/${totalQuestions}`);

        try {
            await axios.post(
                "http://localhost:4030/add-score",
                { username, quizId, score, totalQuestions, percentage },
                { withCredentials: true }
            );
        } catch (err) {
            console.error("Failed to submit score:", err);
        }
    };

    if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

    const currentQuestion = questions[currentPage - 1];

    return (
        <>  
       <Header username={user.username} email={user.email} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>     
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-[#0f172a] text-white rounded-xl shadow-xl w-full max-w-4xl flex flex-col overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* LEFT SIDE */}
                    <img src={image}></img>
                    {/* RIGHT SIDE */}
                    <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
                        <div className="space-y-4">
                            {Object.entries(currentQuestion.options).map(([key, value]) => (
                                <label
                                    key={key}
                                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-md border ${
                                        selectedOptions[currentQuestion._id] === key
                                            ? "bg-green-600 border-green-500"
                                            : "bg-gray-900 border-gray-700"
                                    }`}
                                >
                                    <span className="font-bold text-green-400 text-lg">{key}</span>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion._id}`}
                                        value={key}
                                        checked={selectedOptions[currentQuestion._id] === key}
                                        onChange={() => handleOptionChange(currentQuestion._id, key)}
                                        className="hidden"
                                    />
                                    <span>{value}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER NAVIGATION */}
                <div className="bg-black flex justify-between items-center p-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="text-white font-medium disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {currentPage < questions.length ? (
                        <button
                            onClick={nextPage}
                            className="text-white font-medium"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="text-white font-medium"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Quiz;
