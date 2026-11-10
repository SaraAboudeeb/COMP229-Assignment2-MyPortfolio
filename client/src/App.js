import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectForm from './pages/ProjectForm';
import Education from './pages/Education';
import QualificationForm from './pages/QualificationForm';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Messages from './pages/Messages';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<AdminRoute><ProjectForm /></AdminRoute>} />
            <Route path="/projects/edit/:id" element={<AdminRoute><ProjectForm /></AdminRoute>} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/new" element={<AdminRoute><QualificationForm /></AdminRoute>} />
            <Route path="/education/edit/:id" element={<AdminRoute><QualificationForm /></AdminRoute>} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/edit/:id" element={<AdminRoute><Contact /></AdminRoute>} />
            <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;