import './App.css';
import { BrowserRouter as Router, Routes, Route } from"react-router-dom"; 
import React from "react";
import { useState } from 'react';
import Navbar from './components/Navbar';
import {Home} from './components/Home';//as it is not exported by default it is written in curly bracket
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>    
    <NoteState>
     
      {/* this will allow all components to access notestate */}
      
    <Router>
        <Navbar  />
        <Alert alert = {alert} />
        <div className="container">

      <Routes>
<Route exact path = "/" element={ <Home  showAlert = {showAlert}/>}>
</Route>
      </Routes>
      <Routes>
<Route exact path = "/about" element={ <About/>}></Route>
      </Routes>
      <Routes>
<Route exact path = "/login"  element={ <Login showAlert = {showAlert}/>}></Route>
      </Routes>
      <Routes>
<Route exact path = "/signup" element={ <Signup  showAlert = {showAlert}/>}></Route>
      </Routes>

        </div>
    </Router>
    
    <h1>this is my app</h1>
    
    </NoteState>
   
    </>
  );
}

export default App;
