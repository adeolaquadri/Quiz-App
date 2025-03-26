import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Welcome from './components/Welcome.js';
import Quiz from './components/Quiz.js';
import Login from './components/Login.js';
import QuizList from './components/QuizList.js';
import './App.css';
function App(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/login' element={<Login />} />
                <Route path='/quiz' element={<QuizList />} />
                <Route path="/questionbyquiz/:quizId" element={<Quiz />} />
            </Routes>
        </Router>
    );
}

export default App;