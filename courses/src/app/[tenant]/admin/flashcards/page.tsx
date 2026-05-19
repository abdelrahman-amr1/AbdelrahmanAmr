"use client";

import React, { useState } from "react";
import { PlusCircle, Save } from "lucide-react";

export default function FlashcardsBuilder({
  params,
}: {
  params: { tenant: string };
}) {
  const [cards, setCards] = useState([{ id: 1, question: "", answer: "" }]);

  const addCard = () => {
    setCards([...cards, { id: Date.now(), question: "", answer: "" }]);
  };

  const updateCard = (id: number, field: "question" | "answer", value: string) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">صانع الكروت (Flashcards Builder)</h2>
          <p className="text-slate-500">أضف أسئلة وأجوبة للدورات ليتمكن الطلاب من التدرب عليها.</p>
        </div>
        <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm font-medium">
          <option>دورة تطوير الويب الشامل</option>
          <option>دورة التسويق الرقمي</option>
        </select>
      </div>

      <div className="space-y-6">
        {cards.map((card, index) => (
          <div key={card.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-bold text-blue-600 mb-2">السؤال {index + 1}</label>
              <textarea 
                value={card.question}
                onChange={(e) => updateCard(card.id, "question", e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="اكتب السؤال هنا..."
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-green-600 mb-2">الإجابة النموذجية</label>
              <textarea 
                value={card.answer}
                onChange={(e) => updateCard(card.id, "answer", e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="اكتب الإجابة هنا..."
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          onClick={addCard}
          className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white px-6 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} /> إضافة بطاقة جديدة
        </button>
        <button 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-colors flex items-center justify-center gap-2"
        >
          <Save size={20} /> حفظ الحزمة (Deck)
        </button>
      </div>
    </div>
  );
}
