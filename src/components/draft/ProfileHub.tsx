import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, User, Settings, FolderKanban, Award, Bookmark, ShieldCheck, Mail, MapPin, GraduationCap, Download, Upload, Sparkles, Trophy } from 'lucide-react';
import { PortfolioBuilderView } from '../PortfolioBuilderView';

export const ProfileHub: React.FC = () => {
  const { language, profileView, setProfileView, profile, updateProfile, exportDataJson, importDataJson, savedActivityIds } = useApp();
  const isTh = language === 'th';

  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Settings form local state
  const [name, setName] = useState(profile.name);
  const [school, setSchool] = useState(profile.school);
  const [grade, setGrade] = useState(profile.grade);
  const [province, setProvince] = useState(profile.province || 'กรุงเทพมหานคร (Bangkok)');
  const [email, setEmail] = useState(profile.email || 'student@example.com');
  const [privacy, setPrivacy] = useState(profile.privacySetting || 'public');
  const [savedSuccess, setSavedSuccess] = useState(false);

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
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleImport = () => {
    if (!jsonInput) return;
    const ok = importDataJson(jsonInput);
    if (ok) {
      setImportStatus(isTh ? 'นำเข้าข้อมูลสำเร็จแล้ว!' : 'Import successful!');
      setJsonInput('');
    } else {
      setImportStatus(isTh ? 'รูปแบบไฟล์ JSON ไม่ถูกต้อง' : 'Invalid JSON format');
    }
    setTimeout(() => setImportStatus(null), 3000);
  };

  if (profileView === 'portfolio') {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setProfileView('overview')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
          >
            ← {isTh ? 'กลับสู่หน้าโปรไฟล์' : 'Back to Profile'}
          </button>
        </div>
        <PortfolioBuilderView />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Banner matching draft aesthetic */}
      <div className="text-center pt-2 pb-1">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-600 text-white font-bold text-sm tracking-wide shadow-md shadow-cyan-500/25">
          <User className="w-4 h-4 text-cyan-200" />
          <span>{isTh ? 'โปรไฟล์ของฉัน (Profile)' : 'Profile & Settings'}</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {isTh ? 'ติดตามความคืบหน้า จัดการข้อมูลส่วนตัว และเตรียมแฟ้มสะสมผลงาน 10 หน้า' : 'Track your progress, manage settings, and craft your 10-page portfolio'}
        </p>
      </div>

      {/* The 2 Signature Cards from Draft Style */}
      <div className="space-y-5">
        {/* Card 1: My Profile (Cyan/Teal Card #CFFAFE) */}
        <div className="p-6 rounded-3xl bg-[#CFFAFE] border-2 border-[#6EE7B7] shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                1
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isTh ? 'โปรไฟล์ของฉัน (My Profile)' : 'My Profile'}
                </h3>
                <div className="text-xs text-teal-900 font-medium">{profile.name} · {profile.grade} ({profile.school})</div>
              </div>
            </div>

            <button
              onClick={() => setProfileView('portfolio')}
              className="text-xs font-bold text-teal-900 bg-white hover:bg-white/90 px-3 py-1.5 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <FolderKanban className="w-3.5 h-3.5 text-teal-700" />
              <span>{isTh ? 'เปิดพอร์ต 10 หน้า' : '10-Page Portfolio'}</span>
            </button>
          </div>

          {/* 6 Checkmark Items from Draft */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-teal-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'ความก้าวหน้า (View your progress): ' : 'View your progress: '}</span>
                <span className="font-mono text-teal-700 font-bold">GPAX {profile.currentGpax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-teal-200/60">
              <Bookmark className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'เนื้อหาที่บันทึก (Saved content): ' : 'Saved content: '}</span>
                <span className="font-mono text-teal-700 font-bold">{savedActivityIds.length} {isTh ? 'รายการ' : 'items'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-teal-200/60">
              <Trophy className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'ภารกิจที่ผ่าน (Completed challenges): ' : 'Completed challenges: '}</span>
                <span className="font-mono text-teal-700 font-bold">{profile.completedChallengeIds.length} ({profile.points} pts)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-teal-200/60">
              <Award className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'เกียรติบัตร (Certificates): ' : 'Certificates: '}</span>
                <span className="font-mono text-teal-700 font-bold">6 {isTh ? 'ใบในพอร์ต' : 'in portfolio'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-teal-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'ผลงานส่วนบุคคล (Personal achievements): ' : 'Personal achievements: '}</span>
                <span className="font-mono text-teal-700 font-bold">{profile.trackedActivities.length} {isTh ? 'ผลงาน' : 'projects'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-teal-200/60">
              <GraduationCap className="w-4 h-4 text-[#0D9488] shrink-0" />
              <div>
                <span>{isTh ? 'คณะเป้าหมาย (Your major): ' : 'Your major: '}</span>
                <span className="text-teal-900 font-bold truncate">{profile.targetFaculty}</span>
              </div>
            </div>
          </div>

          {/* Quick CTA to open Portfolio */}
          <div className="pt-3 border-t border-teal-300/60 flex items-center justify-between text-xs text-teal-950">
            <span>{isTh ? 'พร้อมส่งออก A4 สำหรับ TCAS รอบ 1' : 'Ready for TCAS Round 1 A4 export'}</span>
            <button
              onClick={() => setProfileView('portfolio')}
              className="font-bold underline hover:text-teal-900"
            >
              {isTh ? 'ไปที่ตัวจัดหน้าพอร์ต 10 หน้า →' : 'Edit 10 Pages →'}
            </button>
          </div>
        </div>

        {/* Card 2: Settings (Purple Card #EDE9FE) */}
        <div className="p-6 rounded-3xl bg-[#EDE9FE] border-2 border-[#C4B5FD] shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                2
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isTh ? 'การตั้งค่า (Settings)' : 'Settings'}
              </h3>
            </div>

            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-white px-3 py-1 rounded-full shadow-sm">
                ✓ {isTh ? 'บันทึกเรียบร้อย' : 'Saved'}
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            {/* 5 Form items from Draft */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* 1. Personal info */}
              <div>
                <label className="block font-semibold text-purple-950 mb-1">
                  {isTh ? 'ชื่อ-นามสกุล (Personal info) *' : 'Personal info (Name) *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* School */}
              <div>
                <label className="block font-semibold text-purple-950 mb-1">
                  {isTh ? 'โรงเรียน (School)' : 'School'}
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* 2. Address (Province/Area) */}
              <div>
                <label className="block font-semibold text-purple-950 mb-1">
                  {isTh ? 'จังหวัด / ภูมิภาค (Address Province/Area)' : 'Address (Province/Area)'}
                </label>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* 3. Email */}
              <div>
                <label className="block font-semibold text-purple-950 mb-1">
                  {isTh ? 'อีเมล (Email)' : 'Email'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                />
              </div>

              {/* 4. Grade */}
              <div>
                <label className="block font-semibold text-purple-950 mb-1">
                  {isTh ? 'ระดับชั้น (Grade)' : 'Grade'}
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="M.4">{isTh ? 'มัธยมศึกษาปีที่ 4 (Grade 10)' : 'Grade 10 (M.4)'}</option>
                  <option value="M.5">{isTh ? 'มัธยมศึกษาปีที่ 5 (Grade 11)' : 'Grade 11 (M.5)'}</option>
                  <option value="M.6">{isTh ? 'มัธยมศึกษาปีที่ 6 (Grade 12)' : 'Grade 12 (M.6)'}</option>
                </select>
              </div>

              {/* 5. Privacy setting */}
              <div>
                <label className="block font-semibold text-purple-950 mb-1">
                  {isTh ? 'ความเป็นส่วนตัว (Privacy setting)' : 'Privacy setting'}
                </label>
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-purple-200 text-purple-800 rounded-xl text-xs font-semibold hover:bg-purple-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isTh ? 'สำรองข้อมูล JSON' : 'Export JSON'}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
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
