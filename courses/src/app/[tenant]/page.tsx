"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function TenantStudentPortal({
  params,
}: {
  params: { tenant: string };
}) {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAttending, setIsAttending] = useState(false);

  const handleLogin = () => {
    if (username.length > 2) {
      setIsLoggedIn(true);
    } else {
      alert("يرجى إدخال اسم المستخدم الصحيح (الذي أنشأه الأدمن)");
    }
  };

  const handleAttend = async () => {
    setIsAttending(true);
    try {
      // Simulate POST request to Google Apps Script Webhook
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: username,
          courseName: "دورة تطوير الويب الشامل",
          lectureNumber: 1,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert("✅ تم تسجيل حضورك بنجاح في Google Sheets! سيتم تحويلك الآن إلى رابط Zoom...");
        // Redirect to actual Zoom Link
        window.open("https://zoom.us/test", "_blank");
      }
    } catch (error) {
      alert("حدث خطأ في تسجيل الحضور.");
    } finally {
      setIsAttending(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">مرحباً بك مجدداً!</h2>
        <p className="text-slate-500 mb-8">تم تسجيل الدخول بنجاح كطالب في مركز {params.tenant}.</p>
        
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 w-full max-w-3xl mb-8 text-right">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">دوراتك الحالية</h3>
          <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
            <div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">دورة تطوير الويب الشامل</p>
              <p className="text-sm text-slate-500">المحاضرة القادمة: المحاضرة رقم 1</p>
            </div>
            <button 
              onClick={handleAttend}
              disabled={isAttending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isAttending ? "جاري تسجيل الحضور..." : "حضور المحاضرة الآن 🎥"}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => router.push(`/${params.tenant}/flashcards`)} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors">
            العب الكروت التفاعلية (Flashcards)
          </button>
          <button onClick={() => router.push(`/${params.tenant}/certificate`)} className="bg-white border border-slate-200 text-slate-800 dark:bg-slate-800 dark:text-white dark:border-slate-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-slate-50 transition-colors">
            استعراض الشهادة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          بوابة الطلاب - مركز {params.tenant}
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl">
          قم بتسجيل الدخول للوصول إلى دوراتك، روابط تسجيل الحضور، ولعبة البطاقات التفاعلية.
        </p>
        
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-md w-full mx-auto">
          <form className="flex flex-col gap-5 text-right">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">اسم المستخدم (Username)</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">كلمة المرور</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="button" onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors mt-4 shadow-lg shadow-blue-500/30">
              دخول للطالب
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
