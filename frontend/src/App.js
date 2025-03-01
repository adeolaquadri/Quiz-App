import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Welcome from './components/Welcome.js';
import Quiz from './components/Quiz.js';
import './App.css';
function App(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/quiz' element={<Quiz />} />
            </Routes>
        </Router>
    );
}

export default App;