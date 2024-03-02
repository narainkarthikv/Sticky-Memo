import React from "react";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom/dist';
import './App.css';
import "./components/styles.css";
import Navbar from "./components/Navbar.component";
import NoteList from "./components/NoteList.component";


function App() {
 
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
          <Route exact path='/' element={<NoteList/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;