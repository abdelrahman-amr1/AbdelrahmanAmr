import React from 'react';

const Contact = () => {
    return (
        <div className="contact-page section-padding">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="section-header text-center">
                    <h2>تواصل معنا</h2>
                    <div className="divider"></div>
                    <p>نحن هنا للرد على كافة استفساراتكم حول الاستدامة والتحول المؤسسي</p>
                </div>

                <div className="contact-grid">
                    <div className="contact-info">
                        <h3>معلومات الاتصال</h3>
                        <p><strong>العنوان:</strong> القاهرة، مصر</p>
                        <p><strong>الهاتف:</strong> 0236570700</p>
                        <p><strong>البريد الإلكتروني:</strong> info@ese-eg.com</p>
                    </div>

                    <div className="contact-form">
                        <form>
                            <div className="form-group">
                                <input type="text" placeholder="الاسم الكريم" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="البريد الإلكتروني" required />
                            </div>
                            <div className="form-group">
                                <textarea rows="5" placeholder="رسالتكم..." required></textarea>
                            </div>
                            <button type="submit" className="btn-primary px-4">إرسال الرسالة</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
