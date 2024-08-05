import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar.component";
import NoteList from "./pages/NoteList.component";
import TableList from "./pages/TableList.component";
import BoardList from "./pages/BoardList.component";

function App() {
 
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
          <Route exact path='/' element={<NoteList/>} />
          <Route path='/tables' element={<TableList/>} />
          <Route path='boards' element={<BoardList/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;