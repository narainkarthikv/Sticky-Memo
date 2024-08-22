import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import NoteList from "./pages/NoteList";
import TableList from "./pages/TableList";
import BoardList from "./pages/BoardList";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path='/' element={<ProtectedRoute element={<NoteList/>}/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/tables' element={<ProtectedRoute element={<TableList />} />} />
            <Route path='/boards' element={<ProtectedRoute element={<BoardList />} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
