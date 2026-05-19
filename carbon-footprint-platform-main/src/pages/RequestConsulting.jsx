import React from 'react';

const RequestConsulting = () => {
    return (
        <div className="consulting-page section-padding">
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="section-header text-center">
                    <h2>طلب استشارة متخصصة</h2>
                    <div className="divider"></div>
                    <p>أكمل النموذج وسيقوم فريق الاستشاريين بالتواصل معك في أقرب وقت</p>
                </div>

                <form className="contact-form">
                    <div className="form-group">
                        <label>اسم المؤسسة</label>
                        <input type="text" placeholder="أدخل اسم شركتك" required />
                    </div>
                    <div className="form-group">
                        <label>اسم المسؤول</label>
                        <input type="text" placeholder="اسم مسؤول التواصل" required />
                    </div>
                    <div className="form-group">
                        <label>البريد الإلكتروني</label>
                        <input type="email" placeholder="example@company.com" required />
                    </div>
                    <div className="form-group">
                        <label>التليفون</label>
                        <input type="tel" placeholder="رقم الموبايل" required />
                    </div>
                    <div className="form-group">
                        <label>نوع الخدمة المطلوبة</label>
                        <select required>
                            <option value="">-- اختر نوع الخدمة --</option>
                            <option value="carbon">حساب وتقليل البصمة الكربونية</option>
                            <option value="esg">جاهزية ESG والتقارير</option>
                            <option value="energy">تحليل استهلاك الطاقة البديلة</option>
                            <option value="training">التدريب المهني المتخصص</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>وصف مختصر للاحتياج</label>
                        <textarea rows="4" placeholder="أيهما تطلب بالضبط؟..." required></textarea>
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>إرسال الطلب</button>
                </form>
            </div>
        </div>
    );
};

export default RequestConsulting;
