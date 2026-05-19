import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateEmissions } from '../utils/emissionFactors';
import { saveReport } from '../services/db';

const Calculator = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: '',
        sector: '',
        employees: '',
        country: 'مصر',
        city: '',
        reportYear: new Date().getFullYear().toString(),
        electricity: '',
        diesel: '',
        gasoline: '',
        naturalGas: '',
        generalWaste: '',
        medicalWaste: '',
        recycledWaste: '',
        waterConsumption: ''
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCalculate = (e) => {
        e.preventDefault();

        // 1. Calculate each category
        const emissions = {
            electricity: calculateEmissions(formData.electricity, 'electricity'),
            diesel: calculateEmissions(formData.diesel, 'diesel'),
            gasoline: calculateEmissions(formData.gasoline, 'gasoline'),
            naturalGas: calculateEmissions(formData.naturalGas, 'naturalGas'),
            generalWaste: calculateEmissions(formData.generalWaste, 'generalWaste'),
            medicalWaste: calculateEmissions(formData.medicalWaste, 'medicalWaste'),
            recycledWaste: calculateEmissions(formData.recycledWaste, 'recycledWaste'),
            water: calculateEmissions(formData.waterConsumption, 'water'),
        };

        // 2. Group for dashboard visualization
        const breakdown = {
            electricity: emissions.electricity,
            fuel: emissions.diesel + emissions.gasoline + emissions.naturalGas,
            waste: emissions.generalWaste + emissions.medicalWaste + emissions.recycledWaste,
            water: emissions.water
        };

        const totalEmissions = Object.values(breakdown).reduce((a, b) => a + b, 0);

        // 3. Save report
        const reportData = {
            inputData: formData,
            emissionsBreakdown: breakdown,
            totalEmissions: totalEmissions
        };

        const savedReport = saveReport(reportData);

        if (savedReport) {
            navigate('/dashboard', { state: { reportId: savedReport.id } });
        } else {
            alert('حدث خطأ أثناء حفظ التقرير.');
        }
    };

    return (
        <div className="calculator-page section-padding" style={{ width: '100%' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="section-header text-center">
                    <h2>حساب البصمة الكربونية</h2>
                    <div className="divider"></div>
                    <p>أدخل بيانات مؤسستك بدقة للحصول على تقرير مفصل</p>
                </div>

                <div className="calculator-container" style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-md)' }}>
                    <div className="steps-indicator" style={{ marginBottom: '2rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-green)' }}>
                        <span>الخطوة {step} من 5</span>
                    </div>

                    <form onSubmit={step === 5 ? handleCalculate : (e) => { e.preventDefault(); nextStep(); }}>
                        {step === 1 && (
                            <div className="form-step fade-in">
                                <h3>1. البيانات الأساسية</h3>
                                <div className="form-group mb-3">
                                    <label>اسم المؤسسة</label>
                                    <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>القطاع (صناعي، تجاري، طبي...)</label>
                                    <input type="text" name="sector" value={formData.sector} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>سنة التقرير</label>
                                    <input type="number" name="reportYear" value={formData.reportYear} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="form-step fade-in">
                                <h3>2. استهلاك الكهرباء</h3>
                                <div className="form-group mb-3">
                                    <label>الاستهلاك السنوي للكهرباء (ك.و.س - kWh)</label>
                                    <input type="number" step="0.01" name="electricity" value={formData.electricity} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="form-step fade-in">
                                <h3>3. استهلاك الوقود والانتقالات</h3>
                                <div className="form-group mb-3">
                                    <label>استهلاك السولار السنوي (لتر)</label>
                                    <input type="number" step="0.01" name="diesel" value={formData.diesel} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>استهلاك البنزين السنوي للسيارات (لتر)</label>
                                    <input type="number" step="0.01" name="gasoline" value={formData.gasoline} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>استهلاك الغاز الطبيعي (متر مكعب)</label>
                                    <input type="number" step="0.01" name="naturalGas" value={formData.naturalGas} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="form-step fade-in">
                                <h3>4. إدارة المخلفات</h3>
                                <div className="form-group mb-3">
                                    <label>كمية المخلفات العامة الموجهة للمدافن السنوية (كجم)</label>
                                    <input type="number" step="0.01" name="generalWaste" value={formData.generalWaste} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>المخلفات الطبية/الخطرة السنوية (كجم)</label>
                                    <input type="number" step="0.01" name="medicalWaste" value={formData.medicalWaste} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>المخلفات المعاد تدويرها السنوية صعودًا (كجم)</label>
                                    <input type="number" step="0.01" name="recycledWaste" value={formData.recycledWaste} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="form-step fade-in">
                                <h3>5. استهلاك المياه</h3>
                                <div className="form-group mb-3">
                                    <label>الاستهلاك السنوي للمياه (متر مكعب)</label>
                                    <input type="number" step="0.01" name="waterConsumption" value={formData.waterConsumption} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                                </div>
                            </div>
                        )}

                        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                            {step > 1 ? (
                                <button type="button" className="btn-secondary" onClick={prevStep}>السابق</button>
                            ) : <div></div>}

                            {step < 5 ? (
                                <button type="submit" className="btn-primary">التالي</button>
                            ) : (
                                <button type="submit" className="btn-primary">احسب الانبعاثات</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
