import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Welcome from './components/Welcome.js';
import Quiz from './components/Quiz.js';
import Login from './components/Login.js';
import QuizList from './components/QuizList.js';
import Signup from './components/Signup.js';
import './App.css';
function App(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/login' element={<Login />} />
                <Route path='/quiz' element={<QuizList />} />
                <Route path="/question/:quizId" element={<Quiz />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;