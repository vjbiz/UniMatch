import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { THAI_UNIVERSITY_COURSES } from '../data/tcasData';
import { UniversityCourse } from '../types/tcas';
import { Search, BookOpen, CheckCircle, GraduationCap, Building2, ChevronRight, Sparkles } from 'lucide-react';

export const CourseExplorerView: React.FC = () => {
  const { language, profile, updateProfile, setActiveTab, setSelectedFacultyFilter } = useApp();
  const isTh = language === 'th';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUni, setSelectedUni] = useState<string>('all');
  const [selectedCourseModal, setSelectedCourseModal] = useState<UniversityCourse | null>(null);

  const universities = [
    { id: 'all', nameTh: 'ทุกมหาวิทยาลัย', nameEn: 'All Universities' },
    { id: 'CU', nameTh: 'จุฬาลงกรณ์มหาวิทยาลัย (CU)', nameEn: 'Chulalongkorn (CU)' },
    { id: 'MU', nameTh: 'มหาวิทยาลัยมหิดล (MU)', nameEn: 'Mahidol (MU)' },
    { id: 'TU', nameTh: 'มหาวิทยาลัยธรรมศาสตร์ (TU)', nameEn: 'Thammasat (TU)' },
    { id: 'KU', nameTh: 'มหาวิทยาลัยเกษตรศาสตร์ (KU)', nameEn: 'Kasetsart (KU)' },
    { id: 'KMUTT', nameTh: 'มจธ. (KMUTT)', nameEn: 'KMUTT' },
  ];

  const filteredCourses = THAI_UNIVERSITY_COURSES.filter((course) => {
    const matchesUni = selectedUni === 'all' || course.universityAbbr === selectedUni;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      course.nameTh.toLowerCase().includes(q) ||
      course.nameEn.toLowerCase().includes(q) ||
      course.facultyTh.toLowerCase().includes(q) ||
      course.facultyEn.toLowerCase().includes(q) ||
      course.universityTh.toLowerCase().includes(q);
    return matchesUni && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* View Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
          <span>TCAS Round 1 Course Directory</span>
          <span aria-hidden="true">·</span>
          <span>Official University Criteria</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isTh ? 'คลังหลักสูตรและคณะยอดนิยม' : 'University Course & Faculty Explorer'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
          {isTh
            ? 'ค้นหาหลักสูตรปริญญาตรีที่เปิดรับสมัครใน TCAS รอบ 1 แฟ้มสะสมผลงาน (Portfolio) พร้อมเกณฑ์คะแนน GPAX จำนวนรับ และคำแนะนำการสร้างพอร์ตเฉพาะทาง'
            : 'Browse bachelor degree programs accepting Round 1 Portfolio applications across top Thai institutions with verified GPAX and credit requirements.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTh ? 'ค้นหาชื่อหลักสูตร, คณะ หรือมหาวิทยาลัย เช่น วิศวะคอม, หมอศิริราช, นิติศาสตร์...' : 'Search by major, faculty or university...'}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* University Selector */}
          <div className="md:col-span-4">
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {isTh ? u.nameTh : u.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick faculty tags (unboxed inline text buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs text-slate-500 pt-2 border-t border-slate-100 no-scrollbar">
          <span className="font-semibold shrink-0">{isTh ? 'สาขาแนะนำ:' : 'Quick Focus:'}</span>
          {['วิศวกรรมศาสตร์', 'แพทยศาสตร์', 'นิติศาสตร์', 'พาณิชยศาสตร์และการบัญชี', 'เทคโนโลยีสารสนเทศ (SIT)', 'อุตสาหกรรมเกษตร'].map((fac) => (
            <button
              key={fac}
              onClick={() => setSearchQuery(fac)}
              className="hover:text-blue-600 hover:underline transition-colors shrink-0"
            >
              {fac}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isTarget = profile.targetFaculty === course.facultyTh;
          return (
            <div
              key={course.id}
              className={`bg-white border rounded-2xl p-6 shadow-sm transition-all flex flex-col justify-between ${
                isTarget ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300 hover:shadow'
              }`}
            >
              <div>
                {/* Header Unboxed Metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">
                      {isTh ? course.universityTh : course.universityEn}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{course.universityAbbr}</span>
                  </div>
                  {isTarget && (
                    <span className="text-[11px] font-semibold text-blue-600">
                      ★ {isTh ? 'คณะเป้าหมาย' : 'Target'}
                    </span>
                  )}
                </div>

                {/* Major Name */}
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                  {isTh ? course.nameTh : course.nameEn}
                </h3>
                <div className="text-xs font-medium text-slate-500 mb-3">
                  {isTh ? course.facultyTh : course.facultyEn}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {isTh ? course.descriptionTh : course.descriptionEn}
                </p>

                {/* Admission Quotas Snapshot */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-4 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>{isTh ? 'เกรดเฉลี่ยขั้นต่ำ (GPAX):' : 'Min GPAX:'}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {course.quotas[0]?.minGpax.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>{isTh ? 'จำนวนรับรอบพอร์ต:' : 'Round 1 Seats:'}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {course.quotas.reduce((acc, q) => acc + q.seats, 0)} {isTh ? 'ที่นั่ง' : 'seats'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>{isTh ? 'ประมาณการเงินเดือน:' : 'Est. Salary:'}</span>
                    <span className="font-mono text-emerald-600 font-semibold text-[11px]">
                      {isTh ? course.salaryEstTh : course.salaryEstEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCourseModal(course)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900"
                  >
                    {isTh ? 'ดูเกณฑ์ฉบับเต็ม' : 'Full Criteria'} →
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFacultyFilter(course.facultyTh);
                      setActiveTab('activities');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isTh ? 'กิจกรรมที่ตรงสาย' : 'Matching Activities'}</span>
                  </button>
                </div>

                {!isTarget ? (
                  <button
                    onClick={() => {
                      updateProfile({
                        targetFaculty: course.facultyTh,
                        targetUniversities: [course.universityTh],
                      });
                    }}
                    className="w-full mt-2 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200 hover:border-blue-200"
                  >
                    {isTh ? '+ ตั้งเป็นคณะเป้าหมายหลัก' : '+ Set as Dream Faculty'}
                  </button>
                ) : (
                  <div className="w-full mt-2 py-1.5 text-xs font-semibold text-center text-blue-700 bg-blue-50 rounded-lg border border-blue-200">
                    ✓ {isTh ? 'คณะเป้าหมายหลักของคุณ' : 'Your Dream Faculty Target'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">
            {isTh ? 'ไม่พบหลักสูตรที่ตรงกับคำค้นหา' : 'No courses match your search'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isTh ? 'ลองค้นหาด้วยคำอื่น หรือเลือกตัวกรองทุกมหาวิทยาลัย' : 'Try adjusting your search query or selecting All Universities.'}
          </p>
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  {isTh ? selectedCourseModal.universityTh : selectedCourseModal.universityEn}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isTh ? selectedCourseModal.nameTh : selectedCourseModal.nameEn}
                </h3>
                <div className="text-xs text-slate-500">
                  {isTh ? selectedCourseModal.facultyTh : selectedCourseModal.facultyEn}
                </div>
              </div>

              <button
                onClick={() => setSelectedCourseModal(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Quotas & Requirements List */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isTh ? 'โครงการที่เปิดรับในรอบที่ 1 (TCAS Round 1 Quotas)' : 'Round 1 Admission Quotas'}
              </h4>

              {selectedCourseModal.quotas.map((quota, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-2">
                    <span>{isTh ? quota.nameTh : quota.nameEn}</span>
                    <span className="font-mono text-blue-600">{quota.seats} {isTh ? 'ที่นั่ง' : 'seats'}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2 text-slate-600 font-mono">
                    <div>GPAX: {quota.minGpax.toFixed(2)}</div>
                    {quota.minSciCredits && <div>{isTh ? `วิทย์: ${quota.minSciCredits} หน่วย` : `Sci: ${quota.minSciCredits} cr.`}</div>}
                    {quota.minMathCredits && <div>{isTh ? `คณิต: ${quota.minMathCredits} หน่วย` : `Math: ${quota.minMathCredits} cr.`}</div>}
                  </div>

                  <p className="text-slate-600 leading-relaxed border-t border-slate-200/80 pt-2">
                    <span className="font-semibold text-slate-800">{isTh ? 'คุณสมบัติพิเศษ: ' : 'Special Criteria: '}</span>
                    {isTh ? quota.specialCriteriaTh : quota.specialCriteriaEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Portfolio Tips for this Faculty */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {isTh ? 'คำแนะนำการทำพอร์ตโฟลิโอเฉพาะคณะนี้' : 'Faculty Portfolio Best Practices'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {(isTh ? selectedCourseModal.portfolioTipsTh : selectedCourseModal.portfolioTipsEn).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                {isTh ? 'ปิดหน้าต่าง' : 'Close'}
              </button>

              <button
                onClick={() => {
                  setSelectedFacultyFilter(selectedCourseModal.facultyTh);
                  setSelectedCourseModal(null);
                  setActiveTab('activities');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isTh ? 'หากิจกรรมสำหรับคณะนี้' : 'Find Matching Activities'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
