import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

import logoImage from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>⚙️ YourLogo</span>
                </Link>
                <ul className="navbar-menu">
                    <li><Link to="/">الرئيسية</Link></li>
                    <li><Link to="/about">من نحن</Link></li>
                    <li><Link to="/services">خدماتنا</Link></li>
                    <li><Link to="/calculator">حساب البصمة الكربونية</Link></li>
                    <li><Link to="/contact">تواصل معنا</Link></li>
                </ul>
                <div className="navbar-actions">
                    <button className="btn-primary">تسجيل الدخول</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
