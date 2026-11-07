import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Compass, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, setActiveTab, setSelectedFacultyFilter } = useApp();
  const isTh = language === 'th';

  return (
    <div className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background architectural aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
              <span>TCAS 68 · 69 · 70 Portfolio Round</span>
              <span aria-hidden="true">/</span>
              <span>Thailand University Admission</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance mb-5">
              {isTh ? (
                <>
                  ค้นหาคณะที่ใช่ วางแผนกิจกรรม <br className="hidden sm:inline" />
                  สร้างพอร์ตโฟลิโอ <span className="text-blue-600">10 หน้าสู่มหาวิทยาลัย</span>
                </>
              ) : (
                <>
                  Find Your Dream Major, Plan Extracurriculars, <br className="hidden sm:inline" />
                  and Build Your <span className="text-blue-600">TCAS 10-Page Portfolio</span>
                </>
              )}
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              {isTh
                ? 'ระบบช่วยเหลือนักเรียน ม.4 - ม.6 ที่ยังสับสนในการเลือกสาขา วิเคราะห์จุดแข็งตามแบบทดสอบ Holland RIASEC พร้อมคลังกิจกรรม ค่ายโอลิมปิก และเช็กเกณฑ์รับสมัคร TCAS รอบ 1 แบบตรงจุด'
                : 'Empowering Thai high school students to discover their ideal university faculty via RIASEC assessment, explore verified academic camps, and assemble standardized 10-page TCAS portfolios.'}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('assessment')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>{isTh ? 'เริ่มทำแบบประเมินค้นหาคณะ' : 'Start RIASEC Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('activities')}
                className="px-6 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>{isTh ? 'สำรวจคลังกิจกรรม & ค่าย' : 'Browse Activities & Camps'}</span>
              </button>
            </div>

            {/* Value checklist indicators */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isTh ? 'เกณฑ์มาตรฐาน TCAS 10 หน้า' : 'Official 10-Page TCAS Standard'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isTh ? 'แบบประเมิน RIASEC + วิชาที่ถนัด' : 'Holland RIASEC & Subject Strengths'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {isTh ? 'ส่งออก PDF ได้ทันที' : 'Instant Print & PDF Export'}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Container at Matching Height */}
          <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[440px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 group">
            <img
              src="/src/assets/images/hero_thai_students_1794065836852.jpg"
              alt="Thai high school students collaborating on university portfolio preparation"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle scrim overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-1">
                {isTh ? 'รอบแฟ้มสะสมผลงาน (Portfolio)' : 'TCAS Round 1 Portfolio'}
              </div>
              <div className="text-base font-bold text-white mb-1">
                {isTh ? 'จุฬาฯ · ธรรมศาสตร์ · มหิดล · เกษตรฯ · มจธ.' : 'Chulalongkorn · Thammasat · Mahidol · Kasetsart'}
              </div>
              <p className="text-xs text-slate-200 line-clamp-2">
                {isTh
                  ? 'สร้างโปรไฟล์ให้น่าประทับใจต่อหน้าคณะกรรมการคัดเลือกด้วยโครงสร้างที่ถูกต้องตรงเกณฑ์'
                  : 'Tailor your high school achievements precisely to what university admissions committees look for.'}
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width Metric/KPI Row Below the Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">10 หน้า</span>
            <span className="text-xs text-slate-500 mt-1">
              {isTh ? 'ขนาดมาตรฐานแฟ้มสะสมผลงาน' : 'Official TCAS Page Limit'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono tabular-nums">6 มิติ</span>
            <span className="text-xs text-slate-500 mt-1">
              {isTh ? 'วิเคราะห์อาชีพ Holland RIASEC' : 'Holland RIASEC Dimensions'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">100% ฟรี</span>
            <span className="text-xs text-slate-500 mt-1">
              {isTh ? 'ไม่ต้องสมัครสมาชิก ใช้งานได้ทันที' : 'No Signup Required, Client-First'}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">A4 PDF</span>
            <span className="text-xs text-slate-500 mt-1">
              {isTh ? 'ส่งออกพร้อมยื่นมหาวิทยาลัย' : 'Print & Submit Ready Format'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
