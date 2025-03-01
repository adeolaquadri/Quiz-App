import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

const Quiz = ()=> {
   const [Questions, setQuestions] = useState([]);

   useEffect(() => {
    axios.get("http://localhost:4030/questions").then((response) => {
      setQuestions(response.data);
    });
  }, []);
    
        const [currentPage, setCurrentPage] = useState(1);
        const questionsPerPage = 1;

        //Get Current questions
        const indexOfLastQuestion = currentPage * questionsPerPage;
        const indexofFirstQuestion = indexOfLastQuestion - questionsPerPage;
        const currentQuestions = Questions.slice(indexofFirstQuestion, indexOfLastQuestion);
        

        //Handle page change
        const nextPage = () =>{
            if(currentPage < Math.ceil(Questions.length / questionsPerPage)){
                setCurrentPage(currentPage + 1);
            }
     } 
     const prevPage = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
     }
    
      }
   return(
      <>
      <div className="w-[750px] h-[auto] bg-yellow-500 m-[auto] mt-[50px] p-[30px]" id="myquiz">
      <h1 className="text-3xl mb-[10px]">Quiz Questions</h1><br />
        {currentQuestions.map((quiz, index) =>
        <div key={quiz._id}>
           <p>
         {index += 1}. {quiz.question}
          </p>
       <ul>
       <li>A: {quiz.optionA}</li>
       <li>B: {quiz.optionB}</li>
       <li>C: {quiz.optionC}</li>
</ul>
</div>

)}
<br />
<button className="w-[50px] p-[2px] b-[none] bg-white" onClick={prevPage}>Prev</button>
<button className="w-[50px] p-[2px] b-[none] bg-white ml-[20px]" onClick={nextPage}>Next</button>
      </div>
   </>
   )
   
}

export default Quiz;