import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { THAI_UNIVERSITY_COURSES } from '../data/tcasData';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles, FileText, ArrowRight, Info } from 'lucide-react';

export const RequirementCheckerView: React.FC = () => {
  const { language, profile, updateProfile, setActiveTab } = useApp();
  const isTh = language === 'th';

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    THAI_UNIVERSITY_COURSES[0].id
  );

  const selectedCourse =
    THAI_UNIVERSITY_COURSES.find((c) => c.id === selectedCourseId) ||
    THAI_UNIVERSITY_COURSES[0];

  const primaryQuota = selectedCourse.quotas[0];

  // Evaluation criteria
  const gpaxPass = profile.currentGpax >= primaryQuota.minGpax;
  const sciPass = !primaryQuota.minSciCredits || profile.sciCredits >= primaryQuota.minSciCredits;
  const mathPass = !primaryQuota.minMathCredits || profile.mathCredits >= primaryQuota.minMathCredits;
  const engPass = !primaryQuota.minEngCredits || profile.engCredits >= primaryQuota.minEngCredits;

  const totalActivities = profile.trackedActivities.length;
  const activitySufficient = totalActivities >= 3;

  const allPassed = gpaxPass && sciPass && mathPass && engPass && activitySufficient;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
          <span>TCAS Round 1 Portfolio Audit</span>
          <span aria-hidden="true">·</span>
          <span>GPAX & Credit Verification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isTh ? 'ตรวจสอบเกณฑ์คุณสมบัติ TCAS รอบ 1' : 'TCAS Round 1 Requirement Checker'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
          {isTh
            ? 'จำลองการตรวจสอบคุณสมบัติเบื้องต้นตามประกาศรับสมัครจริงของมหาวิทยาลัย ทั้งเกรดเฉลี่ยสะสม (GPAX) หน่วยกิตกลุ่มสาระการเรียนรู้ และประเภทผลงานที่จำเป็น'
            : 'Simulate university qualification checks against actual admission announcements: minimum GPAX, high-school curriculum credits, and quota-specific portfolio deliverables.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Student Academic Inputs */}
        <div className="lg:col-span-5 glass-embossed-card rounded-3xl p-6 space-y-5">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200/60 pb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span>{isTh ? 'ข้อมูลการเรียนของคุณ' : 'Your Academic Credentials'}</span>
          </h3>

          {/* Select Target Course */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {isTh ? 'เลือกคณะและมหาวิทยาลัยเป้าหมาย' : 'Target University & Major'}
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            >
              {THAI_UNIVERSITY_COURSES.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.universityAbbr} - {isTh ? course.nameTh : course.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* GPAX Input */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>{isTh ? 'เกรดเฉลี่ยสะสม (GPAX 4 หรือ 5 ภาคเรียน)' : 'Current GPAX (4-5 Terms)'}</span>
              <span className="font-mono text-blue-600 font-bold">{profile.currentGpax.toFixed(2)}</span>
            </div>
            <input
              type="number"
              min="2.00"
              max="4.00"
              step="0.01"
              value={profile.currentGpax}
              onChange={(e) => updateProfile({ currentGpax: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Credit Hours Inputs */}
          <div className="space-y-3 pt-2">
            <span className="block text-xs font-semibold text-slate-700">
              {isTh ? 'หน่วยกิตกลุ่มสาระการเรียนรู้ (สะสม ม.4 - ม.6)' : 'Cumulative Credit Hours'}
            </span>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  {isTh ? 'วิทย์ (Sci)' : 'Science'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={profile.sciCredits}
                  onChange={(e) => updateProfile({ sciCredits: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-2 py-1.5 font-mono text-center bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  {isTh ? 'คณิต (Math)' : 'Math'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={profile.mathCredits}
                  onChange={(e) => updateProfile({ mathCredits: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-2 py-1.5 font-mono text-center bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  {isTh ? 'ภาษา (Eng)' : 'English'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={profile.engCredits}
                  onChange={(e) => updateProfile({ engCredits: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-2 py-1.5 font-mono text-center bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{isTh ? 'ข้อมูลนี้จะถูกบันทึกเพื่อใช้ในหน้าประวัติส่วนตัวของพอร์ต' : 'Data syncs automatically into your portfolio profile.'}</span>
          </div>
        </div>

        {/* Right Column: Audit Evaluation Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Status Card */}
          <div className={`p-6 rounded-2xl border ${
            allPassed
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/60 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-start gap-3">
              {allPassed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}

              <div>
                <div className="text-sm font-bold">
                  {allPassed
                    ? (isTh ? 'คุณมีคุณสมบัติผ่านเกณฑ์ขั้นต่ำเบื้องต้น!' : 'You Meet All Baseline Admission Criteria!')
                    : (isTh ? 'มีเกณฑ์บางข้อที่ต้องปรับปรุงหรือเสริมเพิ่มเติม' : 'Some Criteria Require Attention')}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isTh
                    ? `สำหรับ ${selectedCourse.universityTh} - ${selectedCourse.nameTh} (${primaryQuota.nameTh})`
                    : `For ${selectedCourse.universityEn} - ${selectedCourse.nameEn}`}
                </p>
              </div>
            </div>
          </div>

          {/* Criteria Checklist */}
          <div className="glass-embossed-card rounded-3xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isTh ? 'รายการตรวจสอบเกณฑ์ตามประกาศ' : 'Admission Criteria Breakdown'}
            </h4>

            {/* GPAX Check */}
            <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                {gpaxPass ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <div>
                  <span className="font-semibold text-slate-900">{isTh ? 'เกรดเฉลี่ยสะสม (GPAX)' : 'GPAX Requirement'}</span>
                  <div className="text-slate-500 text-[11px]">
                    {isTh ? `เกณฑ์ขั้นต่ำ: ${primaryQuota.minGpax.toFixed(2)} (ของคุณ: ${profile.currentGpax.toFixed(2)})` : `Min required: ${primaryQuota.minGpax.toFixed(2)} (Yours: ${profile.currentGpax.toFixed(2)})`}
                  </div>
                </div>
              </div>
              <span className={`font-semibold ${gpaxPass ? 'text-emerald-600' : 'text-red-500'}`}>
                {gpaxPass ? (isTh ? 'ผ่าน' : 'Passed') : (isTh ? 'ต่ำกว่าเกณฑ์' : 'Below')}
              </span>
            </div>

            {/* Science Credits Check */}
            {primaryQuota.minSciCredits && (
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  {sciPass ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <span className="font-semibold text-slate-900">{isTh ? 'หน่วยกิตกลุ่มสาระวิทยาศาสตร์' : 'Science Credits'}</span>
                    <div className="text-slate-500 text-[11px]">
                      {isTh ? `ต้องการอย่างน้อย ${primaryQuota.minSciCredits} หน่วยกิต (ของคุณ: ${profile.sciCredits})` : `Min: ${primaryQuota.minSciCredits} cr. (Yours: ${profile.sciCredits})`}
                    </div>
                  </div>
                </div>
                <span className={`font-semibold ${sciPass ? 'text-emerald-600' : 'text-red-500'}`}>
                  {sciPass ? (isTh ? 'ผ่าน' : 'Passed') : (isTh ? 'ไม่ครบ' : 'Insufficient')}
                </span>
              </div>
            )}

            {/* Math Credits Check */}
            {primaryQuota.minMathCredits && (
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  {mathPass ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <span className="font-semibold text-slate-900">{isTh ? 'หน่วยกิตกลุ่มสาระคณิตศาสตร์' : 'Math Credits'}</span>
                    <div className="text-slate-500 text-[11px]">
                      {isTh ? `ต้องการอย่างน้อย ${primaryQuota.minMathCredits} หน่วยกิต (ของคุณ: ${profile.mathCredits})` : `Min: ${primaryQuota.minMathCredits} cr. (Yours: ${profile.mathCredits})`}
                    </div>
                  </div>
                </div>
                <span className={`font-semibold ${mathPass ? 'text-emerald-600' : 'text-red-500'}`}>
                  {mathPass ? (isTh ? 'ผ่าน' : 'Passed') : (isTh ? 'ไม่ครบ' : 'Insufficient')}
                </span>
              </div>
            )}

            {/* Portfolio Activity Readiness Check */}
            <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                {activitySufficient ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
                <div>
                  <span className="font-semibold text-slate-900">{isTh ? 'ผลงานและกิจกรรมที่พร้อมใส่พอร์ต' : 'Tracked Portfolio Deliverables'}</span>
                  <div className="text-slate-500 text-[11px]">
                    {isTh ? `มีผลงานในระบบ ${totalActivities} กิจกรรม (แนะนำอย่างน้อย 3-5 รายการ)` : `${totalActivities} activities ready (Recommend 3-5 key highlights)`}
                  </div>
                </div>
              </div>
              <span className={`font-semibold ${activitySufficient ? 'text-emerald-600' : 'text-amber-600'}`}>
                {activitySufficient ? (isTh ? 'พร้อม' : 'Sufficient') : (isTh ? 'ควรเพิ่ม' : 'Need More')}
              </span>
            </div>

            {/* Special Quota Criteria Tip */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-slate-800 mb-1">
                {isTh ? 'เกณฑ์พิเศษสำหรับโควตานี้:' : 'Special Quota Criteria:'}
              </span>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                {isTh ? primaryQuota.specialCriteriaTh : primaryQuota.specialCriteriaEn}
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setActiveTab('activities');
              }}
              className="text-xs font-bold text-slate-700 glass-embossed-button px-3.5 py-2 rounded-xl cursor-pointer"
            >
              ← {isTh ? 'ไปหากิจกรรมเพิ่ม' : 'Explore More Activities'}
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white glass-embossed-primary rounded-xl cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isTh ? 'จัดวางพอร์ต 10 หน้าตามเกณฑ์นี้' : 'Build 10-Page Portfolio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
