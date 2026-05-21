import React from 'react';

const Services = () => {
    const servicesList = [
        { title: "إنشاء وتطوير الأنظمة والمواقع الرقمية", desc: "تصميم وبرمجة مواقع ويب احترافية وأنظمة متكاملة متجاوبة تناسب جميع الشاشات والأعمال." },
        { title: "سيستم للتحول من ورقي إلى رقمي", desc: "بناء أنظمة أرشفة ذكية وإدارة للمعلومات للتخلص من المعاملات الورقية وتدريب طاقم العمل." },
        { title: "حساب البصمة الكربونية للمؤسسات", desc: "أدوات متطورة وحلول برمجية لقياس الانبعاثات الكربونية وتقييم الأثر البيئي بدقة عالية." },
        { title: "استشارات الحوكمة والتحول الرقمي", desc: "تقديم الدعم الفني لحوكمة الأنظمة والبيانات وضمان توافقها مع رؤية مصر 2030." },
        { title: "حلول وتطبيقات الذكاء الاصطناعي", desc: "بناء تطبيقات ذكية للمؤسسات مع برامج تدريبية لتمكين الموظفين من أدوات الذكاء الاصطناعي." },
        { title: "التدريب وبناء القدرات والـ ESG", desc: "برامج تدريبية لفرق العمل والشركات في مجالات التحول الرقمي والاستدامة والمسئولية المؤسسية." }
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
