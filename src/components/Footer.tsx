import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { language, setActiveTab } = useApp();
  const isTh = language === 'th';

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-12 text-slate-500 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-2">
            <div className="text-base font-bold text-slate-900">
              TCAS Compass (เข็มทิศ TCAS)
            </div>
            <p className="max-w-sm text-slate-600 leading-relaxed">
              {isTh
                ? 'แพลตฟอร์มช่วยเหลือนักเรียนไทยในการค้นหาตัวตน วางแผนกิจกรรมค่าย และสร้างแฟ้มสะสมผลงาน 10 หน้าตามมาตรฐาน ทปอ. (TCAS รอบที่ 1)'
                : 'A dedicated navigator for Thai high school students to explore academic pathways, discover extracurricular opportunities, and build official 10-page TCAS portfolios.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-semibold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
              {isTh ? 'เครื่องมือหลัก' : 'Features'}
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('assessment')}
                  className="hover:text-blue-600 transition-colors"
                >
                  {isTh ? 'แบบประเมิน RIASEC ค้นหาคณะ' : 'Holland RIASEC Assessment'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="hover:text-blue-600 transition-colors"
                >
                  {isTh ? 'คลังหลักสูตร & มหาวิทยาลัย' : 'University Course Explorer'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('activities')}
                  className="hover:text-blue-600 transition-colors"
                >
                  {isTh ? 'คลังกิจกรรม ค่าย และจิตอาสา' : 'Extracurricular & Camps Hub'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('builder')}
                  className="hover:text-blue-600 transition-colors"
                >
                  {isTh ? 'สร้างพอร์ต 10 หน้า A4' : '10-Page Portfolio Builder'}
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="font-semibold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">
              {isTh ? 'แหล่งข้อมูลทางการ' : 'Official Resources'}
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.mytcas.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  myTCAS (ทปอ.)
                </a>
              </li>
              <li>
                <a
                  href="https://www.posn.or.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  มูลนิธิ สอวน. (POSN)
                </a>
              </li>
              <li>
                <a
                  href="https://mooc.chula.ac.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  CHULA MOOC
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} TCAS Compass. All rights reserved. Built for Thai high school students.
          </div>
          <div className="flex items-center gap-4">
            <span>Thai University Central Admission System (TCAS)</span>
            <span aria-hidden="true">·</span>
            <span>Portfolio Round 1 Guideline</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
