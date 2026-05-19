import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Calculator from './pages/Calculator';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import RequestConsulting from './pages/RequestConsulting';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/calculator" element={<Calculator />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/request-consulting" element={<RequestConsulting />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
