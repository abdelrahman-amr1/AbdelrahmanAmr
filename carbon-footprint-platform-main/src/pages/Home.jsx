import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>حساب وتخفيض البصمة الكربونية لمؤسستك بسهولة وموثوقية</h1>
                    <p>
                        أقدم لك كمدرب معتمد وسفير، أداة دقيقة لحساب الانبعاثات الكربونية وتقارير استدامة معتمدة تتماشى مع رؤية مصر 2030، حيث قمت بتصميم هذه الصفحة خصيصاً لتسهيل حساب البصمة الكربونية.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/calculator" className="btn-primary lg">ابدأ حساب البصمة الكربونية</Link>
                        <Link to="/services" className="btn-secondary lg">تعرف على خدماتنا</Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-preview section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>من نحن</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="about-grid">
                        <div class="about-text">
                            <p>
                                بصفتي مدرباً وسفيراً معتمداً في مجال الاستدامة وتغير المناخ، أهدف إلى تقديم حلول مبتكرة في هذا المجال. أعمل على تمكين المؤسسات والشركات للتحول نحو الاقتصاد الأخضر، عبر تقديم استشارات متخصصة وبرامج تحول تدعم معايير البيئة والمجتمع والحوكمة (ESG).
                            </p>
                        </div>
                        <div className="about-features">
                            <div className="feature-card">
                                <h3>خبرة متخصصة</h3>
                                <p>خبرة واسعة في مجالات البيئة والطاقة كمدرب حساب البصمة الكربونية.</p>
                            </div>
                            <div className="feature-card">
                                <h3>حلول عملية</h3>
                                <p>خطط قابلة للتنفيذ لخفض الانبعاثات وتحقيق كفاءة استهلاك الموارد.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
