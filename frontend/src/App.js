
import './App.css';
import { useEffect } from 'react';


  
   
function App() {

  useEffect(()=>{
    fetch("http://localhost:5000/api")
    .then(res => res.json())
    .then(data => console.log(data));
   },[]);
  return (
    <h1>Hello</h1>
  )
};

export default App;
