import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieInfoPage from './pages/MovieInfoPage';
import './App.css';
import BookmarkPage from './pages/BookmarkPage';

const App = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/movie/:id' element={<MovieInfoPage />} />
                    <Route path='/bookmark' element={<BookmarkPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;