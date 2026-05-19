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
                        منصة "مهندسون من أجل مصر المستدامة" تقدم لك أداة دقيقة لحساب الانبعاثات الكربونية وتقارير استدامة معتمدة تتماشى مع رؤية مصر 2030.
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
                        <div className="about-text">
                            <p>
                                نحن كيان مؤسسي يهدف إلى تقديم حلول مبتكرة في مجالات الاستدامة وتغير المناخ.
                                نعمل على تمكين المؤسسات والشركات للتحول نحو الاقتصاد الأخضر، عبر تقديم استشارات متخصصة وبرامج تحول تدعم معايير البيئة والمجتمع والحوكمة (ESG).
                            </p>
                        </div>
                        <div className="about-features">
                            <div className="feature-card">
                                <h3>خبرات متعددة</h3>
                                <p>فريق يضم نخبة من الاستشاريين في مجالات البيئة والطاقة والطيران والمعلومات.</p>
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
