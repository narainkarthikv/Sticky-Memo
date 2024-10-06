import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import NoteList from "./pages/NoteList";
import TableList from "./pages/TableList";
import BoardList from "./pages/BoardList";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<NoteList/>} />
          <Route path='/tables' element={<TableList/>} />
          <Route path='/boards' element={<BoardList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
