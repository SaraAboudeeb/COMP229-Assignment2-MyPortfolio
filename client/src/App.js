import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

// load the page only when the user opens it
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectForm = lazy(() => import('./pages/ProjectForm'));
const Education = lazy(() => import('./pages/Education'));
const QualificationForm = lazy(() => import('./pages/QualificationForm'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Messages = lazy(() => import('./pages/Messages'));
const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          {/* show loading until the page is ready */}
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
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
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;