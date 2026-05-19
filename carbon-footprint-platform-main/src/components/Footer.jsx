import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div class="footer-section">
                    <h3>شعار شركتك (Your Company)</h3>
                    <p>شريكك الموثوق في التحول نحو الاستدامة الرقمية والبيئية.</p>
                </div>
                <div className="footer-section">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="/about">من نحن</a></li>
                        <li><a href="/services">خدماتنا</a></li>
                        <li><a href="/calculator">البصمة الكربونية</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>تواصل معنا</h4>
                    <p>البريد الإلكتروني: eng.abdelrahman.amr@gmail.com</p>
                    <p>الهاتف: 01128007078</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 تم التطوير بواسطة م. عبدالرحمن عمرو | نسخة عرض (Demo).</p>
            </div>
        </footer>
    );
};

export default Footer;
