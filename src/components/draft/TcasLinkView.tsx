import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link2, ArrowLeft, ExternalLink, Calendar, CheckCircle2, ShieldAlert, FileText, ArrowRight } from 'lucide-react';
import { RequirementCheckerView } from '../RequirementCheckerView';

export const TcasLinkView: React.FC = () => {
  const { language, setDiscoverView, setProfileView, setMainTab } = useApp();
  const isTh = language === 'th';

  const [activeSubTab, setActiveSubTab] = React.useState<'rounds' | 'checker'>('rounds');

  const tcasRounds = [
    {
      round: 1,
      nameTh: 'รอบที่ 1: Portfolio (แฟ้มสะสมผลงาน)',
      nameEn: 'Round 1: Portfolio',
      periodTh: 'พฤศจิกายน 2569 - มกราคม 2570',
      periodEn: 'November 2026 - January 2027',
      focusTh: 'เน้นความสามารถพิเศษ ผลงานโอลิมปิก สอวน. โครงงาน กิจกรรมจิตอาสา และ GPAX ไม่ใช้คะแนนสอบข้อเขียนกลาง',
      focusEn: 'Focuses on 10-page portfolio, POSN Olympiad, academic projects, and GPAX. No central written exam.',
      status: 'active',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      round: 2,
      nameTh: 'รอบที่ 2: Quota (โควตาพื้นที่ & โรงเรียน)',
      nameEn: 'Round 2: Quota',
      periodTh: 'กุมภาพันธ์ - เมษายน 2570',
      periodEn: 'February - April 2027',
      focusTh: 'เน้นนักเรียนในเขตพื้นที่ ภูมิภาค เครือข่ายโรงเรียน หรือความสามารถเฉพาะทาง อาจใช้คะแนน TGAT/TPAT หรือข้อสอบเฉพาะมหาวิทยาลัย',
      focusEn: 'Regional school quotas and provincial networks. Evaluates TGAT/TPAT and university-specific tests.',
      status: 'upcoming',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      round: 3,
      nameTh: 'รอบที่ 3: Admission (แอดมิชชันกลาง)',
      nameEn: 'Round 3: Admission',
      periodTh: 'พฤษภาคม 2570',
      periodEn: 'May 2027',
      focusTh: 'รอบคัดเลือกด้วยคะแนนสอบกลาง 100% (TGAT, TPAT, A-Level) เลือกได้สูงสุด 10 อันดับ ประมวลผล 2 ครั้ง',
      focusEn: 'Ranked admission based on standardized examination scores (TGAT, TPAT, A-Level). Rank up to 10 choices.',
      status: 'upcoming',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      round: 4,
      nameTh: 'รอบที่ 4: Direct Admission (รับตรงอิสระ)',
      nameEn: 'Round 4: Direct Admission',
      periodTh: 'พฤษภาคม - มิถุนายน 2570',
      periodEn: 'Late May - June 2027',
      focusTh: 'มหาวิทยาลัยเปิดรับเพิ่มเติมสำหรับสาขาที่ยังมีที่นั่งว่าง เกณฑ์ขึ้นอยู่กับแต่ละสถาบันกำหนดโดยตรง',
      focusEn: 'Direct admissions by individual institutions for remaining vacant seats.',
      status: 'upcoming',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header with back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setDiscoverView('hub')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isTh ? 'กลับหน้าค้นพบ' : 'Back to Discover'}</span>
        </button>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('rounds')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeSubTab === 'rounds' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            {isTh ? 'ไทม์ไลน์ 4 รอบ' : '4 TCAS Rounds'}
          </button>
          <button
            onClick={() => setActiveSubTab('checker')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              activeSubTab === 'checker' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            {isTh ? 'เช็กเกณฑ์คุณสมบัติ' : 'Eligibility Checker'}
          </button>
        </div>
      </div>

      {activeSubTab === 'rounds' ? (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="bg-purple-100/60 border border-purple-200/80 rounded-2xl p-5 text-purple-950">
            <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-purple-700">
              <Link2 className="w-4 h-4 text-purple-600" />
              <span>{isTh ? 'ศูนย์ข้อมูลระบบ TCAS ประเทศไทย' : 'Official TCAS Gateway'}</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {isTh ? 'ข้อมูลและกำหนดการคัดเลือกเข้ามหาวิทยาลัย' : 'Thai University Central Admission System'}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {isTh
                ? 'ระบบการคัดเลือกกลางบุคคลเข้าศึกษาในสถาบันอุดมศึกษา บริหารจัดการโดย ทปอ. (ที่ประชุมอธิการบดีแห่งประเทศไทย)'
                : 'Centralized admissions governance overseen by the Association of Thai University Presidents.'}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://www.mytcas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                <span>myTCAS.com (เว็บทางการ ทปอ.)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setMainTab('profile');
                  setProfileView('portfolio');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-purple-200 text-purple-800 rounded-lg text-xs font-semibold hover:bg-purple-50 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isTh ? 'สร้างพอร์ต 10 หน้า รอบ 1' : 'Create 10-Page Portfolio'}</span>
              </button>
            </div>
          </div>

          {/* 4 Rounds Card List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isTh ? 'รอบการคัดเลือกทั้ง 4 รอบ' : 'Admission Lifecycle'}
            </h4>

            {tcasRounds.map((r) => (
              <div
                key={r.round}
                className={`p-5 rounded-2xl border bg-white shadow-sm transition-all ${
                  r.round === 1 ? 'border-purple-300 ring-2 ring-purple-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm font-mono">
                      {r.round}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {isTh ? r.nameTh : r.nameEn}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{isTh ? r.periodTh : r.periodEn}</span>
                      </div>
                    </div>
                  </div>

                  {r.round === 1 && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      {isTh ? 'รอบปัจจุบัน' : 'Target'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pl-10">
                  {isTh ? r.focusTh : r.focusEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <RequirementCheckerView />
      )}
    </div>
  );
};
