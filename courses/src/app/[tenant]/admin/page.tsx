"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, GraduationCap, LayoutDashboard } from "lucide-react";

export default function TenantAdminDashboard({
  params,
}: {
  params: { tenant: string };
  const [students, setStudents] = useState([
    { id: 1, name: "أحمد محمود", email: "ahmed@example.com", course: "دورة تطوير الويب" }
  ]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", course: "دورة تطوير الويب" });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      setStudents([...students, { id: Date.now(), name: newStudent.name, email: newStudent.email, course: newStudent.course }]);
      setNewStudent({ name: "", email: "", course: "دورة تطوير الويب" });
      alert("✅ تم إنشاء الحساب بنجاح! \nسيقوم النظام الآن بتوليد كلمة مرور عشوائية وإرسالها إلى الإيميل: " + newStudent.email);
    }
  };
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">لوحة تحكم المركز</h2>
          <p className="text-slate-500 dark:text-slate-400">إدارة الدورات، الطلاب، وإعدادات المركز الخاصة بك.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30">
          إضافة دورة جديدة +
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "إجمالي الطلاب", value: "120", icon: <Users size={24} /> },
          { title: "الدورات النشطة", value: "8", icon: <BookOpen size={24} /> },
          { title: "الشهادات المُصدرة", value: "85", icon: <GraduationCap size={24} /> },
          { title: "ألعاب تفاعلية", value: "12", icon: <LayoutDashboard size={24} /> },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">إدارة الدورات والحجوزات</h3>
            <button className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition-colors">
              + إضافة دورة جديدة
            </button>
          </div>
          {/* Table Placeholder */}
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <th className="pb-3 font-medium">اسم الدورة</th>
                  <th className="pb-3 font-medium">عدد المحاضرات</th>
                  <th className="pb-3 font-medium">السعر</th>
                  <th className="pb-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "تطوير الويب الشامل", lectures: 24, price: 500 },
                  { name: "التسويق الرقمي", lectures: 12, price: 350 }
                ].map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-50 dark:border-slate-700/50">
                    <td className="py-4 font-bold text-slate-800 dark:text-white">{item.name}</td>
                    <td className="py-4 text-slate-500">{item.lectures} محاضرة</td>
                    <td className="py-4 font-bold text-green-600">{item.price} ج.م</td>
                    <td className="py-4 text-blue-600 cursor-pointer hover:underline">الكروت (Flashcards)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">إضافة طالب جديد (تسجيل ذكي)</h3>
          <p className="text-sm text-slate-500 mb-6">سيقوم النظام بتوليد كلمة مرور عشوائية وإرسالها لإيميل الطالب فوراً.</p>
          <form className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="الاسم الكامل" 
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="email" 
              placeholder="البريد الإلكتروني (Email)" 
              value={newStudent.email}
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
              dir="ltr"
            />
            <select 
              value={newStudent.course}
              onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 font-medium">
              <option>دورة تطوير الويب الشامل</option>
              <option>دورة التسويق الرقمي</option>
            </select>
            <button type="button" onClick={handleAddStudent} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-bold transition-all mt-2 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
              حجز وإنشاء حساب <Users size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
