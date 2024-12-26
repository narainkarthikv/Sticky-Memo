import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import NoteList from "./pages/NoteList";
import TableList from "./pages/TableList";
import BoardList from "./pages/BoardList";
import NotFoundPage from "./pages/NotFoundPage";
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Box sx={{ textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<NoteList />} />
          <Route path='/tables' element={<TableList />} />
          <Route path='/boards' element={<BoardList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
