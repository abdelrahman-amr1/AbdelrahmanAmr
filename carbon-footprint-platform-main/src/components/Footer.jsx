import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                        <img src={logoImage} alt="Abdelrahman Amr" style={{ height: '40px', background: 'rgba(255,255,255,0.95)', padding: '4px', borderRadius: '8px', objectFit: 'contain' }} />
                        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>م. عبدالرحمن عمرو</h3>
                    </div>
                    <p>شريكك الموثوق في التحول الرقمي وحلول الاستدامة الذكية والابتكار التقني.</p>
                </div>
                <div className="footer-section">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><Link to="/about">من نحن</Link></li>
                        <li><Link to="/services">خدماتنا</Link></li>
                        <li><Link to="/calculator">البصمة الكربونية</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>تواصل معنا</h4>
                    <p>البريد الإلكتروني: eng.abdelrahman.amr@gmail.com</p>
                    <p>الهاتف: 01128007078</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 تم التطوير بواسطة م. عبدالرحمن عمرو | جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
};

export default Footer;
