import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { getReports } from '../services/db';
import logoImage from '../assets/logo.png';

const COLORS = ['#0a5f38', '#f59e0b', '#e11d48', '#3b82f6'];

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);

    useEffect(() => {
        // Find the report either from the passed ID in state or use the latest one
        const reports = getReports();
        if (reports.length === 0) {
            navigate('/calculator');
            return;
        }

        const reportId = location.state?.reportId;
        const currentReport = reportId
            ? reports.find(r => r.id === reportId)
            : reports[reports.length - 1]; // fallback to latest

        if (currentReport) {
            setReport(currentReport);
        } else {
            navigate('/calculator');
        }
    }, [location, navigate]);

    if (!report) return <div className="text-center p-5">جاري التحميل...</div>;

    const { inputData, emissionsBreakdown, totalEmissions } = report;

    // Prepare data for Recharts
    const chartData = [
        { name: 'الكهرباء', value: Math.round(emissionsBreakdown.electricity || 0) },
        { name: 'الوقود والمحروقات', value: Math.round(emissionsBreakdown.fuel || 0) },
        { name: 'المخلفات', value: Math.round(emissionsBreakdown.waste || 0) },
        { name: 'المياه', value: Math.round(emissionsBreakdown.water || 0) },
    ].filter(item => item.value > 0);

    // Find highest emission source
    let highestSource = { name: 'لا يوجد', value: 0 };
    if (chartData.length > 0) {
        highestSource = chartData.reduce((prev, current) => (prev.value > current.value) ? prev : current);
    }

    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <div className="dashboard-page section-padding" id="pdf-report-content">
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="print-header" style={{ display: 'none', textAlign: 'center', marginBottom: '2rem' }}>
                    <img src={logoImage} alt="ESE Logo" style={{ height: '80px', objectFit: 'contain' }} />
                </div>
                <div className="section-header text-center">
                    <h2>تقرير البصمة الكربونية لمؤسسة: {inputData.companyName}</h2>
                    <div className="divider"></div>
                    <p>تقرير انبعاثات عام {inputData.reportYear} - قطاع {inputData.sector}</p>
                </div>

                <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', alignItems: 'stretch' }}>

                    <div className="summary-card total-emissions" style={{ background: 'var(--deep-blue)', color: 'white', padding: '2rem', borderRadius: 'var(--border-radius)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ color: 'white', marginBottom: '1rem' }}>إجمالي الانبعاثات التقديرية</h3>
                        <div className="value" style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--warning)', marginBottom: '1rem' }}>
                            {Math.round(totalEmissions).toLocaleString()} <span style={{ fontSize: '1.25rem' }}>kg CO₂e</span>
                        </div>
                        <p style={{ color: '#cbd5e1' }}>
                            مما يعادل تقريباً <strong>{(totalEmissions / 1000).toFixed(2)}</strong> طن متري من مكافئ ثاني أكسيد الكربون (tCO₂e)
                        </p>
                        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                            <p style={{ margin: 0, color: 'white' }}>أعلى مصدر للانبعاثات:</p>
                            <h4 style={{ color: 'var(--warning)', margin: '0.5rem 0' }}>{highestSource.name}</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>بمقدار {highestSource.value.toLocaleString()} kg CO₂e</p>
                        </div>
                    </div>

                    <div className="chart-container" style={{ background: 'white', padding: '2rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-green)' }}>توزيع الانبعاثات بالقطاعات</h3>
                        {chartData.length > 0 ? (
                            <div className="chart-wrapper" style={{ direction: 'ltr', display: 'flex', justifyContent: 'center' }}>
                                {/* Screen-only Responsive Chart */}
                                <div className="screen-only" style={{ width: '100%', height: '100%' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`${value} kg CO₂e`, 'الانبعاثات']} />
                                            <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={true}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Print-only Fixed Dimension Chart */}
                                <div className="print-only">
                                    <BarChart width={700} height={250} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`${value} kg CO₂e`, 'الانبعاثات']} />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                لم يتم إدخال بيانات كافية لحساب الانبعاثات ورسم المخطط.
                            </div>
                        )}
                    </div>
                </div>

                <div className="recommendations" style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ color: 'var(--primary-green)', marginBottom: '1rem' }}>توصيات أولية للتحسين والتخفيف (عينة)</h3>
                    <ul style={{ listStyleType: 'disc', paddingRight: '1.5rem', lineHeight: '1.8' }}>
                        {highestSource.name === 'الكهرباء' && (
                            <>
                                <li><strong>ترشيد استهلاك الكهرباء:</strong> التوسع في استخدام إضاءة LED والحساسات الآلية في المباني الإدارية.</li>
                                <li><strong>الطاقة المتجددة:</strong> إجراء دراسة جدوى مبدئية لتركيب ألواح طاقة شمسية (PV Modules) لتعويض جزء من حمولة الشبكة.</li>
                            </>
                        )}
                        {highestSource.name === 'الوقود والمحروقات' && (
                            <li><strong>ترشيد الوقود:</strong> تحديث أسطول النقل بصيانة دورية للانبعاثات والتفكير تدريجياً في المركبات الكهربائية لبعض المسارات.</li>
                        )}
                        <li><strong>الحوكمة البيئية (ESG):</strong> البدء في بناء استراتيجية توثيق الاستدامة المؤسسية لتحسين التصنيف البيئي.</li>
                        <li><strong>إدارة المخلفات:</strong> تفعيل سياسات الفصل من المنبع (Source Segregation) لتقليل النفايات المتجهة للمدافن.</li>
                    </ul>
                </div>

                <div id="dashboard-actions-row" className="dashboard-actions" style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button className="btn-secondary lg" onClick={handleDownloadPDF}>
                        طباعة / تحميل التقرير PDF
                    </button>
                    <Link to="/request-consulting" className="btn-primary lg">
                        طلب تقرير شامل (استشارة متخصصة)
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
