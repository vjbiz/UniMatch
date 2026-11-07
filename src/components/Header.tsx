import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types/tcas';
import { BookOpen, Compass, FileCheck2, FolderKanban, Sparkles, GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, toggleLanguage, activeTab, setActiveTab, profile, setIsAiAdvisorOpen } = useApp();
  const isTh = language === 'th';

  const navLinks: { id: NavTab; labelTh: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'assessment', labelTh: 'แบบประเมินค้นหาตัวเอง', labelEn: 'Self Assessment', icon: <Compass className="w-4 h-4" /> },
    { id: 'courses', labelTh: 'ค้นหาหลักสูตร & คณะ', labelEn: 'Course Explorer', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'activities', labelTh: 'คลังกิจกรรม & ค่าย', labelEn: 'Activity Hub', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'checker', labelTh: 'เช็กเกณฑ์ TCAS', labelEn: 'TCAS Checker', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'builder', labelTh: 'สร้างพอร์ต 10 หน้า', labelEn: 'Portfolio Builder', icon: <FolderKanban className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
              เข็ม
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap shrink-0">
                TCAS Compass
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wide uppercase">
                {isTh ? 'เข็มทิศพอร์ตโฟลิโอ TCAS' : 'Thai University Navigator'}
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 Clean single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isTh ? link.labelTh : link.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action & Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* AI Advisor Button */}
            <button
              onClick={() => setIsAiAdvisorOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200/80 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
              title={isTh ? 'ปรึกษา AI กลยุทธ์ TCAS' : 'TCAS AI Advisor'}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isTh ? 'ปรึกษา AI' : 'AI Advisor'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Toggle Language"
            >
              {language === 'th' ? 'EN 🇬🇧' : 'ไทย 🇹🇭'}
            </button>

            {/* Quick Portfolio CTA */}
            <button
              onClick={() => setActiveTab('builder')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {isTh ? 'เปิดพอร์ต 10 หน้า' : 'My Portfolio'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sub-bar navigation */}
      <div className="lg:hidden border-t border-slate-100 px-4 py-2 overflow-x-auto flex items-center gap-4 text-xs font-medium no-scrollbar">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            className={`whitespace-nowrap py-1 ${
              activeTab === link.id ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600'
            }`}
          >
            {isTh ? link.labelTh : link.labelEn}
          </button>
        ))}
      </div>
    </header>
  );
};
