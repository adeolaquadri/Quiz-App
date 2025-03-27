import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const Quiz = () => {
    const { quizId } = useParams(); // Get quiz ID from URL
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:4030/questionbyquiz/${quizId}`,
                    {withCredentials: true});
                setQuestions(response.data);
            } catch (error) {
                navigate('/login')
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [quizId]);

    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 1;

    // Get Current questions
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexofFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexofFirstQuestion, indexOfLastQuestion);
    

    // Handle page change
    const nextPage = () =>{
        if(currentPage < Math.ceil(questions.length / questionsPerPage)){
            setCurrentPage(currentPage + 1);
        }
 } 
 const prevPage = () =>{
    if(currentPage > 1){
        setCurrentPage(currentPage - 1);
 }

  }

 // Handle option selection
 const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prev) => ({
        ...prev,
        [questionId]: option,
    }));
};

// Handle submission
const handleSubmit = () => {
    console.log("Selected Options:", selectedOptions);

    // Example: Check answers
    let score = 0;
    questions.forEach((q) => {
        if (selectedOptions[q._id] === q.correctAnswer) {
            score += 1;
        }
    });

    alert(`Your score: ${score}/${questions.length}`);
};
    if (loading) return <p>Loading questions...</p>;

    return (
        <>
       <div>
            <h2>Quiz</h2>
            {currentQuestions.map((q) => (
                <div key={q._id}>
                    <h4>{q.question}</h4>

                        <label key={q.options.a} style={{ display: "block" }}>
                            <input
                                type="radio"
                                name={`question-${q._id}`}
                                value="a"
                                checked={selectedOptions[q._id] === "a"}
                                onChange={() => handleOptionChange(q._id, "a")}
                            />
                            {q.options.a}
                        </label>

                        <label key={q.options.b} style={{ display: "block" }}>
                            <input
                                type="radio"
                                name={`question-${q._id}`}
                                value="b"
                                checked={selectedOptions[q._id] === "b"}
                                onChange={() => handleOptionChange(q._id, "b")}
                            />
                            {q.options.b}
                        </label>

                        <label key={q.options.c} style={{ display: "block" }}>
                            <input
                                type="radio"
                                name={`question-${q._id}`}
                                value="c"
                                checked={selectedOptions[q._id] === "c"}
                                onChange={() => handleOptionChange(q._id, "c")}
                            />
                            {q.options.c}
                        </label>

                </div>
            ))}
            {/* <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
                Submit
            </button> */}
           {currentPage <= questions.length - 1 ? (
            <div>
                 <button onClick={prevPage} style={{ marginTop: "10px", marginRight: "20px"}}>
                Prev
            </button>
                <button onClick={nextPage} style={{ marginTop: "10px" }}>
                    Next
                </button>
                </div>
            ) : (
                <div>
            <button onClick={prevPage} style={{ marginTop: "10px", marginRight: "20px"}}>
                Prev
            </button>
                <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
                    Submit
                </button>
                </div>
            )}
        </div>
        </>
    );
};

export default Quiz;