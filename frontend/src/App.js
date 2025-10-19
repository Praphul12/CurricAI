
import './App.css';
import Authentication from './components/Authentication';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute';
function App() {

  // const {isLoggedIn, setLogin} = useState();
  return (
    <Router>
      <Routes>

        <Route path='/' element = {<Navigate to ="/login" replace/>}/>
        <Route path='/login' element = {<Authentication/>}/>
        <Route path='/home' element = {<ProtectedRoute component={<Home/>}/>}/>
        <Route path='*' element = {<div>page not found</div>}/>
        
      </Routes>
    </Router>
  )
};

export default App;
