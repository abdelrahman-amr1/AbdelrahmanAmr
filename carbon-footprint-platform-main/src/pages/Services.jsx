import React from 'react';

const Services = () => {
    const servicesList = [
        { title: "قياس البصمة الكربونية", desc: "أدوات متطورة لحساب انبعاثات الشركات بدقة وتحديد فرص التقليل." },
        { title: "إعداد تقارير الاستدامة", desc: "نساعدكم في توثيق إنجازاتكم البيئية والاجتماعية بمعايير عالمية." },
        { title: "استشارات ESG", desc: "تحسين الحوكمة البيئية والاجتماعية وحوكمة الشركات لجذب الاستثمارات." },
        { title: "تحليل البيانات البيئية", desc: "لوحات متطورة لتحليل بيانات استهلاك الطاقة والموارد في مؤسستكم." },
        { title: "خطط خفض الانبعاثات", desc: "استراتيجيات مصممة خصيصاً للوصول للحياد الكربوني." },
        { title: "التدريب وبناء القدرات", desc: "برامج تدريبية لرفع كفاءة الفرق في مجالات البيئة والاستدامة." }
    ];

    return (
        <div className="services-page section-padding">
            <div className="container">
                <div className="section-header text-center">
                    <h2>خدماتنا المتخصصة</h2>
                    <div className="divider"></div>
                    <p>باقة متكاملة من الحلول لدعم المؤسسات في رحلة التحول نحو الاستدامة</p>
                </div>

                <div className="services-grid">
                    {servicesList.map((service, index) => (
                        <div key={index} className="service-card">
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
