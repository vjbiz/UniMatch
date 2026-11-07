import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, User, Settings, FolderKanban, Award, Bookmark, ShieldCheck, Mail, MapPin, GraduationCap, Download, Upload, Sparkles, Trophy, Camera, Trash2 } from 'lucide-react';
import { PortfolioBuilderView } from '../PortfolioBuilderView';

export const ProfileHub: React.FC = () => {
  const {
    language,
    profileView,
    setProfileView,
    profile,
    updateProfile,
    updatePortfolioPage,
    portfolioPages,
    exportDataJson,
    savedActivityIds,
  } = useApp();
  const isTh = language === 'th';

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings form local state
  const [name, setName] = useState(profile.name);
  const [school, setSchool] = useState(profile.school);
  const [grade, setGrade] = useState(profile.grade);
  const [province, setProvince] = useState(profile.province || 'กรุงเทพมหานคร (Bangkok)');
  const [email, setEmail] = useState(profile.email || 'student@example.com');
  const [privacy, setPrivacy] = useState(profile.privacySetting || 'public');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [photoMessage, setPhotoMessage] = useState<string | null>(null);

  // Get current cover photo from Page 1
  const coverPage = portfolioPages.find((p) => p.pageNumber === 1);
  const currentPhotoUrl = coverPage?.content?.photoUrl || '';

  // Working Profile Photo Upload Handler
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        // Update Page 1 of the portfolio
        updatePortfolioPage(1, { photoUrl: dataUrl });
        setPhotoMessage(isTh ? 'อัปเดตรูปถ่ายสำเร็จแล้ว!' : 'Photo updated successfully!');
        setTimeout(() => setPhotoMessage(null), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updatePortfolioPage(1, { photoUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPhotoMessage(isTh ? 'ลบรูปภาพแล้ว' : 'Photo removed');
    setTimeout(() => setPhotoMessage(null), 2500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      school,
      grade,
      province,
      email,
      privacySetting: privacy,
    });
    // Also update studentName & school on Cover Page
    updatePortfolioPage(1, { studentName: name, school });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (profileView === 'portfolio') {
    return (
      <div className="space-y-4">
        <div className="p-3 bg-white/70 backdrop-blur-md border-b border-white/60 flex items-center justify-between">
          <button
            onClick={() => setProfileView('overview')}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 glass-embossed-button px-3 py-1.5 rounded-xl shadow-sm"
          >
            ← {isTh ? 'กลับสู่หน้าโปรไฟล์' : 'Back to Profile'}
          </button>
        </div>
        <PortfolioBuilderView />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 space-y-5">
      {/* Hidden File Input for Working Photo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoFileChange}
        className="hidden"
      />

      {/* Top Banner matching draft aesthetic */}
      <div className="text-center pt-2 pb-1">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-embossed-primary text-white font-bold text-sm tracking-wide shadow-md">
          <User className="w-4 h-4 text-cyan-200" />
          <span>{isTh ? 'โปรไฟล์ของฉัน (Profile)' : 'Profile & Settings'}</span>
        </div>
        <p className="text-xs text-slate-600 mt-2 font-medium">
          {isTh ? 'ติดตามความคืบหน้า อัปโหลดรูปถ่าย และจัดการพอร์ตโฟลิโอ 10 หน้า' : 'Track progress, upload profile photo, and prepare your 10-page portfolio'}
        </p>
      </div>

      {/* The 2 Signature Cards from Draft Style */}
      <div className="space-y-4">
        {/* Card 1: My Profile (Cyan/Teal Card with Embossed Glass) */}
        <div className="p-5 sm:p-6 rounded-3xl glass-card-cyan shadow-xl relative overflow-hidden">
          {/* Header Row: Title & Portfolio Action */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.15)]">
                1
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isTh ? 'โปรไฟล์ของฉัน (My Profile)' : 'My Profile'}
                </h3>
                <div className="text-xs text-teal-900 font-semibold">{profile.name} · {profile.grade} ({profile.school})</div>
              </div>
            </div>

            <button
              onClick={() => setProfileView('portfolio')}
              className="text-xs font-bold text-teal-900 glass-embossed-button px-3.5 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <FolderKanban className="w-3.5 h-3.5 text-teal-700" />
              <span>{isTh ? 'เปิดพอร์ต 10 หน้า' : '10-Page Portfolio'}</span>
            </button>
          </div>

          {/* Working Profile Photo Uploader Section */}
          <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-white/90 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.95),0_4px_10px_rgba(13,148,136,0.08)] mb-5 flex items-center gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-20 rounded-xl border-2 border-dashed border-teal-300 bg-teal-50/50 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-teal-500 hover:scale-105 transition-all shadow-sm shrink-0 relative group"
              title={isTh ? 'คลิกเพื่ออัปโหลดรูปถ่าย' : 'Click to upload portrait'}
            >
              {currentPhotoUrl ? (
                <img src={currentPhotoUrl} alt="Student Portrait" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-teal-600 p-1 text-center">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[9px] font-bold leading-tight">{isTh ? 'ใส่รูป' : 'Photo'}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                {isTh ? 'เปลี่ยน' : 'Change'}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-xs font-bold text-slate-900">
                {isTh ? 'รูปถ่ายประจำตัว / ชุดนักเรียน' : 'Official Student Portrait Photo'}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {isTh ? 'ใช้สำหรับหน้าปกแฟ้มสะสมผลงาน (หน้า 1) ขนาด 1.5 - 2 นิ้ว' : 'Syncs automatically to Page 1 of your TCAS portfolio'}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1 rounded-lg glass-embossed-button text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center gap-1"
                >
                  <Upload className="w-3 h-3" />
                  <span>{currentPhotoUrl ? (isTh ? 'เปลี่ยนรูป' : 'Change Photo') : (isTh ? 'อัปโหลดรูปถ่าย' : 'Upload Photo')}</span>
                </button>

                {currentPhotoUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                    title={isTh ? 'ลบรูปถ่าย' : 'Remove photo'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {photoMessage && (
                <div className="text-[11px] font-bold text-teal-700 mt-1">
                  ✓ {photoMessage}
                </div>
              )}
            </div>
          </div>

          {/* 6 Checkmark Items from Draft */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2.5 p-2.5 bg-white/85 backdrop-blur-md rounded-2xl text-xs font-bold text-slate-900 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(13,148,136,0.06)]">
              <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'ความก้าวหน้า (View your progress): ' : 'View your progress: '}</span>
                <span className="font-mono text-teal-700 font-extrabold">GPAX {profile.currentGpax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/85 backdrop-blur-md rounded-2xl text-xs font-bold text-slate-900 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(13,148,136,0.06)]">
              <Bookmark className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'เนื้อหาที่บันทึก (Saved content): ' : 'Saved content: '}</span>
                <span className="font-mono text-teal-700 font-extrabold">{savedActivityIds.length} {isTh ? 'รายการ' : 'items'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/85 backdrop-blur-md rounded-2xl text-xs font-bold text-slate-900 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(13,148,136,0.06)]">
              <Trophy className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'ภารกิจที่ผ่าน (Completed challenges): ' : 'Completed challenges: '}</span>
                <span className="font-mono text-teal-700 font-extrabold">{profile.completedChallengeIds.length} ({profile.points} pts)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/85 backdrop-blur-md rounded-2xl text-xs font-bold text-slate-900 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(13,148,136,0.06)]">
              <Award className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'เกียรติบัตร (Certificates): ' : 'Certificates: '}</span>
                <span className="font-mono text-teal-700 font-extrabold">6 {isTh ? 'ใบพร้อมยื่น' : 'in portfolio'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/85 backdrop-blur-md rounded-2xl text-xs font-bold text-slate-900 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(13,148,136,0.06)]">
              <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'ผลงานส่วนบุคคล (Personal achievements): ' : 'Personal achievements: '}</span>
                <span className="font-mono text-teal-700 font-extrabold">{profile.trackedActivities.length} {isTh ? 'ผลงาน' : 'projects'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/85 backdrop-blur-md rounded-2xl text-xs font-bold text-slate-900 border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_6px_rgba(13,148,136,0.06)]">
              <GraduationCap className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div className="truncate">
                <span>{isTh ? 'คณะเป้าหมาย (Your major): ' : 'Your major: '}</span>
                <span className="text-teal-900 font-extrabold">{profile.targetFaculty}</span>
              </div>
            </div>
          </div>

          {/* Quick CTA to open Portfolio */}
          <div className="pt-3 border-t border-teal-300/60 flex items-center justify-between text-xs text-teal-950 font-semibold">
            <span>{isTh ? 'พร้อมส่งออก A4 สำหรับ TCAS รอบ 1' : 'Ready for TCAS Round 1 A4 export'}</span>
            <button
              onClick={() => setProfileView('portfolio')}
              className="font-extrabold underline hover:text-teal-900"
            >
              {isTh ? 'ไปที่ตัวจัดหน้าพอร์ต 10 หน้า →' : 'Edit 10 Pages →'}
            </button>
          </div>
        </div>

        {/* Card 2: Settings (Purple Card with Embossed Glass) */}
        <div className="p-5 sm:p-6 rounded-3xl glass-card-purple shadow-xl relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.15)]">
                2
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isTh ? 'การตั้งค่า (Settings)' : 'Settings'}
              </h3>
            </div>

            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-800 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                ✓ {isTh ? 'บันทึกเรียบร้อย' : 'Saved'}
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* 1. Personal info */}
              <div>
                <label className="block font-bold text-purple-950 mb-1">
                  {isTh ? 'ชื่อ-นามสกุล (Personal info) *' : 'Personal info (Name) *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/90 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-semibold shadow-inner"
                />
              </div>

              {/* School */}
              <div>
                <label className="block font-bold text-purple-950 mb-1">
                  {isTh ? 'โรงเรียน (School)' : 'School'}
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3 py-2 bg-white/90 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-semibold shadow-inner"
                />
              </div>

              {/* 2. Address (Province/Area) */}
              <div>
                <label className="block font-bold text-purple-950 mb-1">
                  {isTh ? 'จังหวัด / ภูมิภาค (Address Province/Area)' : 'Address (Province/Area)'}
                </label>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3 py-2 bg-white/90 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-semibold shadow-inner"
                />
              </div>

              {/* 3. Email */}
              <div>
                <label className="block font-bold text-purple-950 mb-1">
                  {isTh ? 'อีเมล (Email)' : 'Email'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/90 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono shadow-inner"
                />
              </div>

              {/* 4. Grade */}
              <div>
                <label className="block font-bold text-purple-950 mb-1">
                  {isTh ? 'ระดับชั้น (Grade)' : 'Grade'}
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white/90 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-semibold shadow-inner"
                >
                  <option value="M.4">{isTh ? 'มัธยมศึกษาปีที่ 4 (Grade 10)' : 'Grade 10 (M.4)'}</option>
                  <option value="M.5">{isTh ? 'มัธยมศึกษาปีที่ 5 (Grade 11)' : 'Grade 11 (M.5)'}</option>
                  <option value="M.6">{isTh ? 'มัธยมศึกษาปีที่ 6 (Grade 12)' : 'Grade 12 (M.6)'}</option>
                </select>
              </div>

              {/* 5. Privacy setting */}
              <div>
                <label className="block font-bold text-purple-950 mb-1">
                  {isTh ? 'ความเป็นส่วนตัว (Privacy setting)' : 'Privacy setting'}
                </label>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white/90 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-semibold shadow-inner"
                >
                  <option value="public">{isTh ? 'สาธารณะ (เปิดเผยต่อเพื่อนและรุ่นพี่)' : 'Public (Shared with peers)'}</option>
                  <option value="friends">{isTh ? 'เฉพาะเพื่อนที่เพิ่มไว้ (Friends only)' : 'Friends only'}</option>
                  <option value="private">{isTh ? 'ส่วนตัวเท่านั้น (Private)' : 'Private'}</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-300/60">
              <button
                type="button"
                onClick={exportDataJson}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 glass-embossed-button text-purple-900 rounded-xl text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isTh ? 'สำรองข้อมูล JSON' : 'Export JSON'}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 glass-embossed-button font-bold text-purple-950 rounded-xl text-xs shadow-md"
              >
                {isTh ? 'บันทึกการตั้งค่า' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
