import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EXTRACURRICULAR_ACTIVITIES } from '../data/tcasData';
import { ActivityCategory, ExtracurricularActivity } from '../types/tcas';
import { Search, Calendar, MapPin, ExternalLink, Bookmark, CheckCircle, Plus, Filter, Sparkles, FolderPlus } from 'lucide-react';

export const ActivitiesView: React.FC = () => {
  const {
    language,
    savedActivityIds,
    toggleSaveActivity,
    addTrackedActivity,
    selectedFacultyFilter,
    setSelectedFacultyFilter,
    setActiveTab,
  } = useApp();
  const isTh = language === 'th';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [isAddCustomOpen, setIsAddCustomOpen] = useState<boolean>(false);
  const [showAddedToast, setShowAddedToast] = useState<string | null>(null);

  // Custom activity form state
  const [customTitle, setCustomTitle] = useState('');
  const [customOrganizer, setCustomOrganizer] = useState('');
  const [customCategory, setCustomCategory] = useState<ActivityCategory>('camp');
  const [customDate, setCustomDate] = useState('2026-11-20');
  const [customRole, setCustomRole] = useState('');
  const [customReflection, setCustomReflection] = useState('');

  const categories: { id: string; labelTh: string; labelEn: string }[] = [
    { id: 'all', labelTh: 'ทั้งหมด', labelEn: 'All Types' },
    { id: 'competition', labelTh: 'การแข่งขัน & โอลิมปิก', labelEn: 'Competitions & Olympiads' },
    { id: 'camp', labelTh: 'ค่ายวิชาการ & เปิดบ้าน', labelEn: 'Camps & Open Houses' },
    { id: 'volunteer', labelTh: 'จิตอาสา & ผู้นำ', labelEn: 'Volunteering & Leadership' },
    { id: 'mooc', labelTh: 'คอร์สเรียน & ประกาศนียบัตร', labelEn: 'MOOCs & Certifications' },
  ];

  const filteredActivities = EXTRACURRICULAR_ACTIVITIES.filter((act) => {
    const matchesCat = selectedCategory === 'all' || act.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || act.format === selectedFormat;
    const matchesFaculty =
      !selectedFacultyFilter ||
      act.targetFaculties.some((f) => f.includes(selectedFacultyFilter) || selectedFacultyFilter.includes(f));
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      act.titleTh.toLowerCase().includes(q) ||
      act.titleEn.toLowerCase().includes(q) ||
      act.organizerTh.toLowerCase().includes(q) ||
      act.descriptionTh.toLowerCase().includes(q) ||
      act.skillsGainedTh.some((s) => s.toLowerCase().includes(q)) ||
      act.skillsGainedEn.some((s) => s.toLowerCase().includes(q));

    return matchesCat && matchesFormat && matchesFaculty && matchesSearch;
  });

  const handleAddToPortfolio = (act: ExtracurricularActivity) => {
    addTrackedActivity({
      activityId: act.id,
      title: isTh ? act.titleTh : act.titleEn,
      organizer: isTh ? act.organizerTh : act.organizerEn,
      category: act.category,
      date: act.deadlineDate,
      status: 'planned',
      roleOrAward: isTh ? 'ผู้เข้าร่วมกิจกรรม / กำลังเตรียมผลงาน' : 'Participant / Submitting Candidate',
      reflection: isTh ? act.descriptionTh : act.descriptionEn,
      imageUrl: act.imagePath,
    });

    setShowAddedToast(isTh ? act.titleTh : act.titleEn);
    setTimeout(() => setShowAddedToast(null), 3000);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle) return;

    addTrackedActivity({
      title: customTitle,
      organizer: customOrganizer || (isTh ? 'กิจกรรมโรงเรียน / หน่วยงานภายนอก' : 'School / Independent'),
      category: customCategory,
      date: customDate,
      status: 'completed',
      roleOrAward: customRole || (isTh ? 'ผู้มีส่วนร่วมสำคัญ' : 'Key Contributor'),
      reflection: customReflection || (isTh ? 'ได้เรียนรู้การทำงานร่วมกันเป็นทีมและการแก้ไขปัญหาเฉพาะหน้า' : 'Gained team collaboration and practical problem-solving experience.'),
    });

    setIsAddCustomOpen(false);
    setCustomTitle('');
    setCustomOrganizer('');
    setCustomRole('');
    setCustomReflection('');

    setShowAddedToast(customTitle);
    setTimeout(() => setShowAddedToast(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Toast notification */}
      {showAddedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <div className="font-semibold">{isTh ? 'เพิ่มลงในพอร์ตโฟลิโอแล้ว!' : 'Added to My Portfolio!'}</div>
            <div className="text-slate-300 truncate max-w-xs">{showAddedToast}</div>
          </div>
          <button
            onClick={() => setActiveTab('builder')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 ml-2 underline"
          >
            {isTh ? 'เปิดดูพอร์ต' : 'View'}
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <span>Portfolio Round Extracurriculars</span>
            <span aria-hidden="true">·</span>
            <span>Competitions · Camps · Volunteer · MOOCs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTh ? 'คลังกิจกรรมและค่ายเพื่อสะสมพอร์ตโฟลิโอ' : 'Extracurricular & Activity Hub'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            {isTh
              ? 'รวบรวมค่ายวิชาการโอลิมปิก สอวน. เวทีแข่งขันโครงงานระดับชาติ กิจกรรมจิตอาสา และหลักสูตรออนไลน์ที่มหาวิทยาลัยให้คะแนนสูงในรอบพอร์ต'
              : 'Discover verified academic Olympiads, hackathons, open houses, and volunteering initiatives explicitly valued by TCAS admissions panels.'}
          </p>
        </div>

        {/* Add custom activity button */}
        <button
          onClick={() => setIsAddCustomOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isTh ? '+ เพิ่มกิจกรรมของฉันเอง' : '+ Add My Own Activity'}</span>
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        {/* Active Faculty Filter Banner (if coming from Course Explorer) */}
        {selectedFacultyFilter && (
          <div className="flex items-center justify-between p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {isTh ? `กำลังแสดงกิจกรรมที่ตรงกับคณะ: ` : `Filtered for faculty: `}
                <strong>{selectedFacultyFilter}</strong>
              </span>
            </div>
            <button
              onClick={() => setSelectedFacultyFilter(null)}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline"
            >
              {isTh ? 'ล้างตัวกรอง' : 'Clear filter'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTh ? 'ค้นหากิจกรรม เช่น สอวน., NSC, เปิดบ้าน, อ่านหนังสือคนตาบอด, Python...' : 'Search activities, camps, volunteering...'}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Format selector */}
          <div className="md:col-span-4">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="all">{isTh ? 'ทุกรูปแบบ (Onsite / Online)' : 'All Formats (Onsite/Online)'}</option>
              <option value="onsite">{isTh ? 'ออนไซต์ (On-site)' : 'On-site Only'}</option>
              <option value="online">{isTh ? 'ออนไลน์ (Online)' : 'Online Only'}</option>
              <option value="hybrid">{isTh ? 'ไฮบริด (Hybrid)' : 'Hybrid'}</option>
            </select>
          </div>
        </div>

        {/* Category Segmented Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isTh ? cat.labelTh : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredActivities.map((act) => {
          const isSaved = savedActivityIds.includes(act.id);
          return (
            <div
              key={act.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Optional Photo Banner */}
              {act.imagePath && (
                <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={act.imagePath}
                    alt={isTh ? act.titleTh : act.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                    {act.format.toUpperCase()}
                  </div>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Unboxed Header Metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">
                        {isTh ? act.organizerTh : act.organizerEn}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{act.category}</span>
                    </div>

                    <button
                      onClick={() => toggleSaveActivity(act.id)}
                      className={`text-slate-400 hover:text-amber-500 transition-colors p-1 rounded ${
                        isSaved ? 'text-amber-500' : ''
                      }`}
                      title={isTh ? 'บันทึกรายการนี้' : 'Bookmark'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                    {isTh ? act.titleTh : act.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {isTh ? act.descriptionTh : act.descriptionEn}
                  </p>

                  {/* Context Info */}
                  <div className="space-y-1.5 text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{isTh ? `กำหนดการ: ${act.eventDateTh}` : `Event Date: ${act.eventDateEn}`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{isTh ? act.locationTh : act.locationEn}</span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 mb-4">
                    <span className="font-semibold text-slate-600">{isTh ? 'ทักษะที่ได้:' : 'Skills:'}</span>
                    {(isTh ? act.skillsGainedTh : act.skillsGainedEn).map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {act.url && (
                    <a
                      href={act.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <span>{isTh ? 'เว็บผู้จัดงาน' : 'Official Site'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => handleAddToPortfolio(act)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-sm"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>{isTh ? 'ใส่ลงพอร์ตโฟลิโอ' : 'Add to Portfolio'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Activity Modal */}
      {isAddCustomOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {isTh ? 'บันทึกกิจกรรมส่วนตัวลงพอร์ต' : 'Add Custom Activity'}
              </h3>
              <button
                onClick={() => setIsAddCustomOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isTh ? 'ชื่อกิจกรรม / โครงงาน / การแข่งขัน *' : 'Activity / Project Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder={isTh ? 'เช่น ประธานชุมนุมหุ่นยนต์, อาสาปลูกป่าชุมชน...' : 'e.g. Robotics Club President, Science Fair...'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTh ? 'หน่วยงาน / โรงเรียนที่จัด' : 'Organizer / School'}
                  </label>
                  <input
                    type="text"
                    value={customOrganizer}
                    onChange={(e) => setCustomOrganizer(e.target.value)}
                    placeholder={isTh ? 'เช่น โรงเรียนเตรียมอุดมศึกษา' : 'e.g. High School Science Dept'}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isTh ? 'หมวดหมู่' : 'Category'}
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as ActivityCategory)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="competition">{isTh ? 'การแข่งขัน' : 'Competition'}</option>
                    <option value="camp">{isTh ? 'ค่าย / อบรม' : 'Camp / Workshop'}</option>
                    <option value="volunteer">{isTh ? 'จิตอาสา / ผู้นำ' : 'Volunteer / Leadership'}</option>
                    <option value="mooc">{isTh ? 'คอร์สเรียน / Cert' : 'Online Course / Cert'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isTh ? 'บทบาทหน้าที่ หรือ รางวัลที่ได้รับ' : 'Role or Award Tier'}
                </label>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder={isTh ? 'เช่น หัวหน้าทีมเขียนโปรแกรม, รางวัลชนะเลิศอันดับ 1' : 'e.g. Lead Programmer, First Place Gold'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isTh ? 'การสะท้อนคิด & สิ่งที่ได้เรียนรู้ (Reflection)' : 'Reflection & Key Learnings'}
                </label>
                <textarea
                  rows={3}
                  value={customReflection}
                  onChange={(e) => setCustomReflection(e.target.value)}
                  placeholder={isTh ? 'เขียนบรรยายสั้นๆ ว่ากิจกรรมนี้ทำให้เราพร้อมเข้าเรียนคณะเป้าหมายอย่างไร...' : 'Briefly describe what you learned and how it proves your passion for your target faculty...'}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddCustomOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {isTh ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {isTh ? 'บันทึกกิจกรรม' : 'Save Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
