
import './App.css';
import Authentication from './components/Authentication';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute';
import Lesson from './components/LessonRenderer';
import { useEffect, useState } from 'react';
function App() {
  
  const [theme,setTheme] = useState('dark');
  useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);


    const handleTheme = ()=>{
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }
  return (
    <Router>
      <Routes>

        <Route path='/' element = {<Navigate to ="/login" replace/>}/>
        <Route path='/login' element = {<Authentication/>}/>
        <Route path='/home' element = {<ProtectedRoute component={<Home handleTheme = {handleTheme}/>}/>}/>
        
        <Route path='/lesson/:courseTitle/:moduleTitle/:lessonTitle' element = {<ProtectedRoute component={<Lesson/>}/>}/>
        <Route path='*' element = {<div>page not found</div>}/>
        
      </Routes>
    </Router>
  )
};

export default App;
