import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Printer, Download, RotateCcw, ChevronLeft, ChevronRight, Sparkles, Check, Image as ImageIcon, Plus, Camera, Upload, Trash2 } from 'lucide-react';

export const PortfolioBuilderView: React.FC = () => {
  const {
    language,
    profile,
    portfolioPages,
    updatePortfolioPage,
    resetPortfolioPages,
    trackedActivities,
    exportDataJson,
    setIsAiAdvisorOpen,
  } = useApp();
  const isTh = language === 'th';

  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const currentPage = portfolioPages[activePageIndex];

  // Dedicated file input references
  const photoInputRef = useRef<HTMLInputElement>(null);
  const projectPhotoInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // Working profile photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(isTh ? 'กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, WebP)' : 'Please select an image file (JPG, PNG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updatePortfolioPage(1, { photoUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  // Working project / camp image upload handler
  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updatePortfolioPage(currentPage.pageNumber, { [targetField]: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImportActivityIntoPage = (activityId: string) => {
    const act = trackedActivities.find((t) => t.id === activityId);
    if (!act) return;

    if (currentPage.type === 'academic') {
      updatePortfolioPage(currentPage.pageNumber, {
        projectTitle: act.title,
        competitionName: act.organizer,
        awardTier: act.roleOrAward,
        description: act.reflection,
        projectPhotoUrl: act.imageUrl || '',
      });
    } else if (currentPage.type === 'camp') {
      updatePortfolioPage(currentPage.pageNumber, {
        campName: act.title,
        organizer: act.organizer,
        learnings: act.reflection,
        campPhotoUrl: act.imageUrl || '',
      });
    } else if (currentPage.type === 'activity') {
      updatePortfolioPage(currentPage.pageNumber, {
        activityName: act.title,
        organization: act.organizer,
        achievement: act.roleOrAward,
        impact: act.reflection,
        photoUrl: act.imageUrl || '',
      });
    }
  };

  // Render individual page content in A4 preview
  const renderA4PageContent = (page: typeof currentPage) => {
    const c = page.content;

    switch (page.type) {
      case 'cover':
        return (
          <div className="h-full flex flex-col justify-between p-8 sm:p-12 text-slate-900 border border-slate-300 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 relative overflow-hidden">
            {/* Elegant corner accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-tr-full pointer-events-none" />

            <div className="text-center">
              <div className="text-xs font-black tracking-widest text-blue-700 uppercase mb-2">
                {c.headline || 'TCAS PORTFOLIO ROUND 1'}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isTh ? 'แฟ้มสะสมผลงาน' : 'Academic Portfolio'}
              </h1>
              <div className="text-xs text-slate-500 mt-1 font-mono">
                {c.academicYear || 'ปีการศึกษา 2570'}
              </div>
            </div>

            {/* Clickable Student Portrait Area */}
            <div className="my-8 flex flex-col items-center justify-center">
              <div
                onClick={() => photoInputRef.current?.click()}
                className="w-40 h-52 rounded-2xl border-2 border-dashed border-blue-400 bg-white shadow-md flex flex-col items-center justify-center overflow-hidden p-2 text-center relative group cursor-pointer hover:border-blue-600 hover:scale-[1.02] transition-all"
                title={isTh ? 'คลิกเพื่ออัปโหลดหรือเปลี่ยนรูปถ่าย' : 'Click to upload or change portrait photo'}
              >
                {c.photoUrl ? (
                  <>
                    <img src={c.photoUrl} alt="Student Portrait" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-bold p-2 backdrop-blur-[2px]">
                      <Camera className="w-6 h-6 mb-1 text-white" />
                      <span>{isTh ? 'คลิกเพื่อเปลี่ยนรูป' : 'Click to change'}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-400 flex flex-col items-center p-3 group-hover:text-blue-600 transition-colors">
                    <Camera className="w-9 h-9 mb-2 text-blue-500" />
                    <span className="text-[11px] font-bold text-slate-800 group-hover:text-blue-600">
                      {isTh ? 'คลิกเพื่ออัปโหลดรูป' : 'Click to Upload'}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-1">{isTh ? 'รูปชุดนักเรียน (1.5-2 นิ้ว)' : 'Uniform Portrait'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Student Target Major and Identity */}
            <div className="space-y-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">{c.studentName || profile.name}</div>
                <div className="text-xs text-slate-600 mt-0.5">{c.school || profile.school}</div>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  {isTh ? 'สมัครเข้าศึกษาใน' : 'Target University Program'}
                </div>
                <div className="text-base font-bold text-blue-700">{c.targetFaculty}</div>
                <div className="text-sm font-semibold text-slate-800">{c.targetUniversity}</div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="h-full flex flex-col justify-between p-8 sm:p-10 text-slate-900 bg-white border border-slate-300">
            <div>
              <div className="border-b-2 border-blue-600 pb-2 mb-6">
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">SECTION 01</div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isTh ? 'ประวัติส่วนตัวและผลการเรียน' : 'Personal Profile & Academics'}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6 text-xs">
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">วันเกิด / Birth Date</span>
                  <span className="font-medium text-slate-800">{c.birthDate}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">อีเมล / Email</span>
                  <span className="font-medium text-slate-800 font-mono">{c.contactEmail}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">โทรศัพท์ / Phone</span>
                  <span className="font-medium text-slate-800 font-mono">{c.contactPhone}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">ที่อยู่ / Address</span>
                  <span className="font-medium text-slate-800">{c.address}</span>
                </div>
              </div>

              {/* GPAX Breakdown Matrix */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <div className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wide">
                  {isTh ? 'ผลการเรียนเฉลี่ยสะสม (Academic Records)' : 'Academic Records (GPAX)'}
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block text-[10px] text-slate-400">GPAX รวม</span>
                    <span className="font-mono font-bold text-blue-600 text-sm">{c.gpax || profile.currentGpax.toFixed(2)}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block text-[10px] text-slate-400">คณิตศาสตร์</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">{c.mathGpa || '4.00'}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block text-[10px] text-slate-400">วิทยาศาสตร์</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">{c.sciGpa || '3.92'}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block text-[10px] text-slate-400">ภาษาอังกฤษ</span>
                    <span className="font-mono font-bold text-slate-800 text-sm">{c.engGpa || '3.85'}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800">{isTh ? 'ทักษะความสามารถเฉพาะด้าน: ' : 'Technical Skills: '}</span>
                  <span className="text-slate-600">{c.hardSkills}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800">{isTh ? 'ทักษะทางสังคมและความเป็นผู้นำ: ' : 'Soft Skills: '}</span>
                  <span className="text-slate-600">{c.softSkills}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800">{isTh ? 'ความสามารถทางภาษา: ' : 'Languages: '}</span>
                  <span className="text-slate-600">{c.languages}</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-right font-mono">
              TCAS Portfolio Page 2 / 10
            </div>
          </div>
        );

      case 'sop':
        return (
          <div className="h-full flex flex-col justify-between p-8 sm:p-10 text-slate-900 bg-white border border-slate-300">
            <div>
              <div className="border-b-2 border-blue-600 pb-2 mb-6">
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">SECTION 02</div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isTh ? 'เหตุผลและความมุ่งมั่นในการเข้าศึกษา' : 'Statement of Purpose'}
                </h2>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed whitespace-pre-line text-justify">
                {c.body}
              </div>

              {c.keyHighlights && c.keyHighlights.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-900 block mb-2">
                    {isTh ? 'สรุปความพร้อมที่สำคัญ:' : 'Core Competencies:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {c.keyHighlights.map((hl: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">●</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-400 text-right font-mono">
              TCAS Portfolio Page 3 / 10
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="h-full flex flex-col justify-between p-8 sm:p-10 text-slate-900 bg-white border border-slate-300">
            <div>
              <div className="border-b-2 border-blue-600 pb-2 mb-5">
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  {page.pageNumber === 4 ? 'SECTION 03 · PROJECT 1' : 'SECTION 03 · PROJECT 2'}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{c.projectTitle}</h2>
                <div className="text-xs text-slate-500 font-medium">{c.competitionName}</div>
              </div>

              {/* Award Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5 text-xs">
                <div className="font-bold text-blue-900 mb-0.5">{c.awardTier}</div>
                <div className="text-blue-700">{isTh ? `บทบาท: ${c.role}` : `Role: ${c.role}`}</div>
              </div>

              {/* Project Photo Box */}
              <div className="h-44 w-full bg-slate-100 rounded-xl border border-slate-200 mb-5 overflow-hidden flex items-center justify-center">
                {c.projectPhotoUrl ? (
                  <img src={c.projectPhotoUrl} alt="Project Demo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4 text-slate-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                    <span className="text-xs">{isTh ? 'รูปถ่ายการนำเสนอโครงงาน / การทดสอบฮาร์ดแวร์' : 'Project Demo Photo'}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="text-xs text-slate-700 leading-relaxed mb-4 text-justify">
                {c.description}
              </div>

              {c.toolsUsed && (
                <div className="text-xs text-slate-500 font-mono">
                  <span className="font-bold text-slate-700">{isTh ? 'เครื่องมือที่ใช้: ' : 'Tools/Tech: '}</span>
                  <span>{c.toolsUsed}</span>
                </div>
              )}
            </div>

            <div className="text-[10px] text-slate-400 text-right font-mono">
              TCAS Portfolio Page {page.pageNumber} / 10
            </div>
          </div>
        );

      case 'camp':
        return (
          <div className="h-full flex flex-col justify-between p-8 sm:p-10 text-slate-900 bg-white border border-slate-300">
            <div>
              <div className="border-b-2 border-blue-600 pb-2 mb-5">
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  {page.pageNumber === 6 ? 'SECTION 04 · CAMP 1' : 'SECTION 04 · CAMP 2'}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{c.campName}</h2>
                <div className="text-xs text-slate-500 font-medium">{c.organizer}</div>
              </div>

              <div className="text-xs font-mono text-slate-500 mb-4">
                <span>{isTh ? `ระยะเวลา: ${c.duration}` : `Duration: ${c.duration}`}</span>
              </div>

              <div className="h-44 w-full bg-slate-100 rounded-xl border border-slate-200 mb-5 overflow-hidden flex items-center justify-center">
                {c.campPhotoUrl ? (
                  <img src={c.campPhotoUrl} alt="Camp activity" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4 text-slate-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                    <span className="text-xs">{isTh ? 'รูปถ่ายการทดลองในแล็บ / บรรยากาศค่าย' : 'Camp Workshop Photo'}</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-700 leading-relaxed text-justify">
                <span className="font-bold text-slate-900 block mb-1">
                  {isTh ? 'ความรู้และการพัฒนาตนเองจากการเข้าค่าย:' : 'Core Learnings & Growth:'}
                </span>
                {c.learnings}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-right font-mono">
              TCAS Portfolio Page {page.pageNumber} / 10
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="h-full flex flex-col justify-between p-8 sm:p-10 text-slate-900 bg-white border border-slate-300">
            <div>
              <div className="border-b-2 border-blue-600 pb-2 mb-5">
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  {page.pageNumber === 8 ? 'SECTION 05 · LEADERSHIP 1' : 'SECTION 05 · LEADERSHIP 2'}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{c.activityName}</h2>
                <div className="text-xs text-slate-500 font-medium">{c.organization}</div>
              </div>

              <div className="text-xs font-mono text-slate-500 mb-4">
                <span>{c.duration}</span>
              </div>

              <div className="h-44 w-full bg-slate-100 rounded-xl border border-slate-200 mb-5 overflow-hidden flex items-center justify-center">
                {c.photoUrl ? (
                  <img src={c.photoUrl} alt="Leadership activity" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4 text-slate-400">
                    <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                    <span className="text-xs">{isTh ? 'รูปถ่ายการทำงานร่วมกับทีมหรือชุมชน' : 'Community Activity Photo'}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed text-justify">
                <div>
                  <span className="font-bold text-slate-900">{isTh ? 'ผลงานความสำเร็จ: ' : 'Achievement: '}</span>
                  {c.achievement}
                </div>
                <div>
                  <span className="font-bold text-slate-900">{isTh ? 'ผลกระทบเชิงบวก (Impact): ' : 'Impact & Takeaways: '}</span>
                  {c.impact}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-right font-mono">
              TCAS Portfolio Page {page.pageNumber} / 10
            </div>
          </div>
        );

      case 'certificate':
        return (
          <div className="h-full flex flex-col justify-between p-8 sm:p-10 text-slate-900 bg-white border border-slate-300">
            <div>
              <div className="border-b-2 border-blue-600 pb-2 mb-5">
                <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">SECTION 06 · CERTIFICATES</div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isTh ? 'เกียรติบัตรและเอกสารรับรอง' : 'Certificates & Credentials'}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {(c.certificatesList || []).map((cert: any, i: number) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between min-h-[90px]">
                    <div className="text-xs font-bold text-slate-800 line-clamp-2">{cert.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
                      <span>{cert.issuer}</span>
                      <span className="font-bold">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                {isTh ? c.noteTh : c.noteEn}
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-right font-mono">
              TCAS Portfolio Page 10 / 10 (TCAS Limit)
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Hidden File Inputs for Working Photo Uploads */}
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
      <input
        ref={projectPhotoInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (currentPage.type === 'academic') handleProjectImageUpload(e, 'projectPhotoUrl');
          else if (currentPage.type === 'camp') handleProjectImageUpload(e, 'campPhotoUrl');
          else if (currentPage.type === 'activity') handleProjectImageUpload(e, 'photoUrl');
        }}
        className="hidden"
      />

      {/* Header & Export Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <span>TCAS Round 1 Portfolio</span>
            <span aria-hidden="true">·</span>
            <span>10 Pages Standard</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {isTh ? 'สตูดิโอจัดทำพอร์ตโฟลิโอ 10 หน้า' : 'TCAS 10-Page Portfolio Studio'}
          </h2>
        </div>

        {/* Action buttons with Embossed Glassy Styling */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={exportDataJson}
            className="px-3 py-1.5 text-xs font-bold text-slate-700 glass-embossed-button rounded-xl flex items-center gap-1.5"
            title={isTh ? 'สำรองข้อมูลพอร์ตโฟลิโอเก็บไว้ในเครื่อง' : 'Backup Portfolio JSON'}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isTh ? 'สำรอง JSON' : 'Export'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold text-white glass-embossed-primary rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>{isTh ? 'พิมพ์ / ส่งออก PDF' : 'Print / Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Page Numbers Thumbnail Bar */}
      <div className="p-2.5 rounded-2xl glass-embossed-card overflow-x-auto no-scrollbar shadow-sm">
        <div className="flex items-center gap-2 min-w-max">
          {portfolioPages.map((page, idx) => {
            const isActive = activePageIndex === idx;
            return (
              <button
                key={page.pageNumber}
                onClick={() => setActivePageIndex(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left flex flex-col gap-0.5 ${
                  isActive
                    ? 'glass-card-blue text-blue-900 font-bold scale-[1.02] shadow-sm'
                    : 'glass-embossed-button text-slate-600'
                }`}
              >
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase">
                  {isTh ? `หน้า ${page.pageNumber}` : `Page ${page.pageNumber}`}
                </span>
                <span className="font-semibold truncate max-w-[110px]">
                  {isTh ? page.titleTh.split('(')[0] : page.titleEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Stack */}
      <div className="space-y-6">
        {/* Left Column: Page Form Editor & Import Activities */}
        <div className="p-5 sm:p-6 rounded-3xl glass-embossed-card space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">
                {isTh ? `แก้ไขข้อมูลหน้า ${currentPage.pageNumber}` : `Editing Page ${currentPage.pageNumber}`}
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                {isTh ? currentPage.titleTh : currentPage.titleEn}
              </h3>
            </div>

            {/* AI Advisor Button specifically for SOP */}
            {currentPage.type === 'sop' && (
              <button
                onClick={() => setIsAiAdvisorOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-800 glass-embossed-button rounded-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{isTh ? 'AI ช่วยเกลา SOP' : 'Polish with AI'}</span>
              </button>
            )}
          </div>

          {/* Quick Import from Tracked Activities */}
          {['academic', 'camp', 'activity'].includes(currentPage.type) && trackedActivities.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 text-xs space-y-2 shadow-sm">
              <span className="font-bold text-slate-700 block">
                {isTh ? 'ดึงข้อมูลจากกิจกรรมที่คุณสะสมไว้:' : 'Import from Tracked Activities:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {trackedActivities.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => handleImportActivityIntoPage(act.id)}
                    className="px-2.5 py-1 glass-embossed-button rounded-lg text-[11px] font-semibold text-slate-800 truncate max-w-[200px]"
                    title={act.title}
                  >
                    + {act.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Form based on page type */}
          <div className="space-y-4 text-xs">
            {currentPage.type === 'cover' && (
              <>
                {/* Working Cover Photo Uploader Widget */}
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2 shadow-inner">
                  <label className="block font-bold text-slate-800">
                    {isTh ? 'รูปถ่ายประจำตัว / ชุดนักเรียน (Student Portrait Photo)' : 'Student Portrait Photo'}
                  </label>
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => photoInputRef.current?.click()}
                      className="w-14 h-18 rounded-xl border-2 border-dashed border-blue-400 bg-white overflow-hidden cursor-pointer flex items-center justify-center shrink-0 shadow-sm hover:border-blue-600 group relative"
                      title={isTh ? 'คลิกเพื่อเลือกไฟล์' : 'Click to select photo'}
                    >
                      {currentPage.content.photoUrl ? (
                        <>
                          <img src={currentPage.content.photoUrl} alt="Portrait" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-bold">
                            {isTh ? 'เปลี่ยน' : 'Change'}
                          </div>
                        </>
                      ) : (
                        <Camera className="w-6 h-6 text-blue-500" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="px-3 py-1.5 glass-embossed-button text-xs font-bold text-blue-800 rounded-xl flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{currentPage.content.photoUrl ? (isTh ? 'เปลี่ยนรูปภาพ' : 'Change Photo') : (isTh ? 'อัปโหลดรูปถ่าย...' : 'Upload Photo...')}</span>
                      </button>

                      {currentPage.content.photoUrl && (
                        <button
                          type="button"
                          onClick={() => updatePortfolioPage(1, { photoUrl: '' })}
                          className="text-[11px] text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{isTh ? 'ลบรูปภาพ' : 'Remove Photo'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'ชื่อ-นามสกุล นักเรียน' : 'Student Full Name'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.studentName || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { studentName: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'โรงเรียน' : 'High School Name'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.school || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { school: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'คณะและสาขาเป้าหมาย' : 'Target Faculty & Major'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.targetFaculty || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { targetFaculty: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'มหาวิทยาลัย' : 'Target University'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.targetUniversity || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { targetUniversity: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                  />
                </div>
              </>
            )}

            {currentPage.type === 'profile' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={currentPage.content.contactEmail || ''}
                      onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { contactEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={currentPage.content.contactPhone || ''}
                      onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { contactPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'ทักษะทางเทคนิค (Hard Skills)' : 'Hard Skills'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.hardSkills || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { hardSkills: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'ทักษะทางสังคม (Soft Skills)' : 'Soft Skills'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.softSkills || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { softSkills: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </>
            )}

            {currentPage.type === 'sop' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isTh ? 'เนื้อความเรียงความแสดงเจตจำนง (Statement of Purpose)' : 'Statement of Purpose Body'}
                </label>
                <textarea
                  rows={9}
                  value={currentPage.content.body || ''}
                  onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { body: e.target.value })}
                  className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed font-sans"
                />
              </div>
            )}

            {currentPage.type === 'academic' && (
              <>
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <span className="font-bold text-slate-800">
                    {isTh ? 'รูปภาพโครงงาน / การทดสอบ' : 'Project Photo / Demo'}
                  </span>
                  <button
                    type="button"
                    onClick={() => projectPhotoInputRef.current?.click()}
                    className="px-3 py-1 glass-embossed-button rounded-lg text-xs font-bold text-blue-800 flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{currentPage.content.projectPhotoUrl ? (isTh ? 'เปลี่ยนรูป' : 'Change') : (isTh ? 'อัปโหลดรูป' : 'Upload')}</span>
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'ชื่อโครงงาน / ซอฟต์แวร์' : 'Project Title'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.projectTitle || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { projectTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'การแข่งขันและรางวัลที่ได้รับ' : 'Competition & Award Tier'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.awardTier || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { awardTier: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'คำอธิบายโครงการและระเบียบวิธีทำ' : 'Project Description & Methodology'}
                  </label>
                  <textarea
                    rows={4}
                    value={currentPage.content.description || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { description: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl leading-relaxed"
                  />
                </div>
              </>
            )}

            {currentPage.type === 'camp' && (
              <>
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <span className="font-bold text-slate-800">
                    {isTh ? 'รูปถ่ายบรรยากาศค่าย / ห้องแล็บ' : 'Camp / Lab Photo'}
                  </span>
                  <button
                    type="button"
                    onClick={() => projectPhotoInputRef.current?.click()}
                    className="px-3 py-1 glass-embossed-button rounded-lg text-xs font-bold text-blue-800 flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{currentPage.content.campPhotoUrl ? (isTh ? 'เปลี่ยนรูป' : 'Change') : (isTh ? 'อัปโหลดรูป' : 'Upload')}</span>
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'ชื่อค่ายวิชาการ' : 'Camp Name'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.campName || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { campName: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'สิ่งที่ได้เรียนรู้และการต่อยอด' : 'Learnings & Takeaways'}
                  </label>
                  <textarea
                    rows={4}
                    value={currentPage.content.learnings || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { learnings: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl leading-relaxed"
                  />
                </div>
              </>
            )}

            {currentPage.type === 'activity' && (
              <>
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <span className="font-bold text-slate-800">
                    {isTh ? 'รูปถ่ายกิจกรรมจิตอาสา / ผู้นำ' : 'Activity Photo'}
                  </span>
                  <button
                    type="button"
                    onClick={() => projectPhotoInputRef.current?.click()}
                    className="px-3 py-1 glass-embossed-button rounded-lg text-xs font-bold text-blue-800 flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{currentPage.content.photoUrl ? (isTh ? 'เปลี่ยนรูป' : 'Change') : (isTh ? 'อัปโหลดรูป' : 'Upload')}</span>
                  </button>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'ชื่อกิจกรรมความเป็นผู้นำ / จิตอาสา' : 'Activity Name'}
                  </label>
                  <input
                    type="text"
                    value={currentPage.content.activityName || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { activityName: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isTh ? 'ผลกระทบเชิงบวกต่อสังคม (Impact)' : 'Impact on Society'}
                  </label>
                  <textarea
                    rows={4}
                    value={currentPage.content.impact || ''}
                    onChange={(e) => updatePortfolioPage(currentPage.pageNumber, { impact: e.target.value })}
                    className="w-full px-3 py-2 bg-white/90 border border-slate-200 rounded-xl leading-relaxed"
                  />
                </div>
              </>
            )}
          </div>

          {/* Page navigation controls */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              disabled={activePageIndex === 0}
              onClick={() => setActivePageIndex(activePageIndex - 1)}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 glass-embossed-button px-3 py-1.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isTh ? 'หน้าก่อนหน้า' : 'Previous'}</span>
            </button>

            <span className="font-mono text-xs text-slate-500 font-bold">
              {activePageIndex + 1} / {portfolioPages.length}
            </span>

            <button
              disabled={activePageIndex === portfolioPages.length - 1}
              onClick={() => setActivePageIndex(activePageIndex + 1)}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 glass-embossed-button px-3 py-1.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>{isTh ? 'หน้าถัดไป' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live A4 Aspect Canvas */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
            {isTh ? 'ตัวอย่างหน้ากระดาษ A4 เสมือนจริง (TCAS Portfolio)' : 'Live A4 Print Preview'}
          </div>

          {/* Interactive A4 Sheet Wrapper */}
          <div className="w-full max-w-[440px] aspect-[1/1.414] bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden relative">
            {renderA4PageContent(currentPage)}
          </div>
        </div>
      </div>

      {/* Hidden Full Printable Deck (Triggered on window.print()) */}
      <div className="hidden tcas-print-container">
        {portfolioPages.map((page) => (
          <div key={page.pageNumber} className="tcas-a4-page">
            {renderA4PageContent(page)}
          </div>
        ))}
      </div>
    </div>
  );
};
