import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Rocket, Trophy, Link2, Sparkles, BookOpen } from 'lucide-react';

export const DiscoverHub: React.FC = () => {
  const { language, setDiscoverView, profile } = useApp();
  const isTh = language === 'th';

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Banner / Announcement matching draft aesthetic */}
      <div className="text-center pt-2 pb-1">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-500/25">
          <Sparkles className="w-4 h-4 text-blue-200" />
          <span>{isTh ? 'ค้นพบตัวเอง (Discover)' : 'Discover'}</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {isTh ? 'เลือกเครื่องมือเพื่อเริ่มต้นค้นหาคณะและสร้างเส้นทาง TCAS ของคุณ' : 'Choose a feature to discover your dream faculty and plan your path'}
        </p>
      </div>

      {/* The EXACT 2x2 Grid from the Draft Diagram */}
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1: Major Finder */}
        <button
          onClick={() => setDiscoverView('major-finder')}
          className="relative text-left p-5 rounded-3xl bg-[#C8E8FF] border-2 border-[#93C5FD] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between min-h-[175px] group"
        >
          {/* Top Row: Badge 1 */}
          <div className="flex items-start justify-between w-full">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              1
            </div>
            {/* Annotation hint matching draft */}
            <span className="text-[10px] font-semibold text-blue-800 bg-white/70 px-2 py-0.5 rounded-full">
              {isTh ? 'แบบประเมิน' : 'Quiz & Guide'}
            </span>
          </div>

          {/* Center Circular Icon */}
          <div className="my-2 self-center">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Compass className="w-8 h-8 text-blue-600 stroke-[2.2]" />
            </div>
          </div>

          {/* Card Title & Subtitle */}
          <div className="text-center w-full">
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              {isTh ? 'ค้นหาคณะที่ใช่' : 'Major Finder'}
            </h3>
            <p className="text-[11px] text-blue-900 font-medium mt-1 leading-snug line-clamp-2">
              {isTh ? 'ทำแบบประเมินค้นหาคณะและคู่มือสัมภาษณ์' : 'Search and find your ideal major'}
            </p>
          </div>
        </button>

        {/* Card 2: Explore Major */}
        <button
          onClick={() => setDiscoverView('explore-major')}
          className="relative text-left p-5 rounded-3xl bg-[#D4F6C5] border-2 border-[#86EFAC] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between min-h-[175px] group"
        >
          {/* Top Row: Badge 2 */}
          <div className="flex items-start justify-between w-full">
            <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              2
            </div>
            <span className="text-[10px] font-semibold text-emerald-800 bg-white/70 px-2 py-0.5 rounded-full">
              {isTh ? 'คลังคณะ' : 'Directory'}
            </span>
          </div>

          {/* Center Circular Icon */}
          <div className="my-2 self-center">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
              <Rocket className="w-8 h-8 text-blue-600 stroke-[2.2]" />
            </div>
          </div>

          {/* Card Title & Subtitle */}
          <div className="text-center w-full">
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              {isTh ? 'สำรวจหลักสูตร' : 'Explore Major'}
            </h3>
            <p className="text-[11px] text-emerald-950 font-medium mt-1 leading-snug line-clamp-2">
              {isTh ? 'ข้อมูลลึกทุกสาขา โอกาสทำงาน และเงินเดือน' : 'Learn more about different majors'}
            </p>
          </div>
        </button>

        {/* Card 4 (Bottom-Left in diagram): TCAS Link */}
        <button
          onClick={() => setDiscoverView('tcas-link')}
          className="relative text-left p-5 rounded-3xl bg-[#E9D5FF] border-2 border-[#D8B4FE] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between min-h-[175px] group"
        >
          {/* Top Row: Badge 4 */}
          <div className="flex items-start justify-between w-full">
            <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              4
            </div>
            <span className="text-[10px] font-semibold text-purple-900 bg-white/70 px-2 py-0.5 rounded-full">
              {isTh ? 'เกณฑ์ ทปอ.' : 'Official Info'}
            </span>
          </div>

          {/* Center Circular Icon */}
          <div className="my-2 self-center">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Link2 className="w-8 h-8 text-purple-700 stroke-[2.2]" />
            </div>
          </div>

          {/* Card Title & Subtitle */}
          <div className="text-center w-full">
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              {isTh ? 'ข้อมูล TCAS' : 'TCAS Link'}
            </h3>
            <p className="text-[11px] text-purple-950 font-medium mt-1 leading-snug line-clamp-2">
              {isTh ? 'กำหนดการ เกณฑ์คะแนน และเช็กคุณสมบัติ' : 'Get important TCAS information'}
            </p>
          </div>
        </button>

        {/* Card 3 (Bottom-Right in diagram): Course Challenge */}
        <button
          onClick={() => setDiscoverView('course-challenge')}
          className="relative text-left p-5 rounded-3xl bg-[#FFE5C2] border-2 border-[#FDE68A] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col justify-between min-h-[175px] group"
        >
          {/* Top Row: Badge 3 */}
          <div className="flex items-start justify-between w-full">
            <div className="w-7 h-7 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              3
            </div>
            <span className="text-[10px] font-semibold text-amber-900 bg-white/70 px-2 py-0.5 rounded-full">
              {isTh ? 'สะสมแต้ม' : 'Challenges'}
            </span>
          </div>

          {/* Center Circular Icon */}
          <div className="my-2 self-center">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
              <Trophy className="w-8 h-8 text-amber-500 fill-amber-400 stroke-[2]" />
            </div>
          </div>

          {/* Card Title & Subtitle */}
          <div className="text-center w-full">
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              {isTh ? 'ท้าทายความรู้' : 'Course Challenge'}
            </h3>
            <p className="text-[11px] text-amber-950 font-medium mt-1 leading-snug line-clamp-2">
              {isTh ? 'ตอบคำถามท้าทาย สะสมคะแนนความพร้อม' : 'Test your knowledge with fun challenges'}
            </p>
          </div>
        </button>
      </div>

      {/* Target major status indicator at bottom of Discover */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400 block text-[11px]">
            {isTh ? 'คณะเป้าหมายปัจจุบันของคุณ:' : 'Your Selected Target Major:'}
          </span>
          <span className="font-bold text-slate-800">{profile.targetFaculty}</span>
        </div>

        <button
          onClick={() => setDiscoverView('major-finder')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
        >
          {isTh ? 'เปลี่ยน / ค้นหาใหม่' : 'Change'}
        </button>
      </div>
    </div>
  );
};
