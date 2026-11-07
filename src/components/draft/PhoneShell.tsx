import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Star, User, Smartphone, Monitor, Sparkles } from 'lucide-react';
import { DiscoverHub } from './DiscoverHub';
import { ExperienceHub } from './ExperienceHub';
import { ProfileHub } from './ProfileHub';
import { AssessmentView } from '../AssessmentView';
import { CourseExplorerView } from '../CourseExplorerView';
import { CourseChallengeView } from './CourseChallengeView';
import { TcasLinkView } from './TcasLinkView';

export const PhoneShell: React.FC = () => {
  const {
    language,
    toggleLanguage,
    mainTab,
    setMainTab,
    discoverView,
    setDiscoverView,
    experienceView,
    setExperienceView,
    profileView,
    setProfileView,
    phoneFrameMode,
    togglePhoneFrameMode,
    setIsAiAdvisorOpen,
  } = useApp();
  const isTh = language === 'th';

  // Render active content inside the screen
  const renderScreenContent = () => {
    if (mainTab === 'discover') {
      if (discoverView === 'hub') return <DiscoverHub />;
      if (discoverView === 'major-finder') return <AssessmentView />;
      if (discoverView === 'explore-major') return <CourseExplorerView />;
      if (discoverView === 'course-challenge') return <CourseChallengeView />;
      if (discoverView === 'tcas-link') return <TcasLinkView />;
    }

    if (mainTab === 'experience') {
      return <ExperienceHub />;
    }

    if (mainTab === 'profile') {
      return <ProfileHub />;
    }

    return <DiscoverHub />;
  };

  return (
    <div className="py-6 sm:py-10 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      {/* Top Floating Control Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-sm text-xs">
        {/* Toggle Phone Frame vs Expanded View */}
        <button
          onClick={togglePhoneFrameMode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          title="Toggle between phone mockup and expanded canvas"
        >
          {phoneFrameMode ? <Smartphone className="w-4 h-4 text-blue-600" /> : <Monitor className="w-4 h-4 text-blue-600" />}
          <span>{phoneFrameMode ? (isTh ? '📱 มุมมองสมาร์ตโฟน (ตามแบบร่าง)' : '📱 Phone Mockup View') : (isTh ? '🖥️ มุมมองเต็มจอ' : '🖥️ Expanded Canvas View')}</span>
        </button>

        {/* AI Advisor Button */}
        <button
          onClick={() => setIsAiAdvisorOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors border border-blue-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{isTh ? 'ปรึกษา AI กลยุทธ์' : 'AI Advisor'}</span>
        </button>

        {/* Language switch */}
        <button
          onClick={toggleLanguage}
          className="px-3 py-1.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
        >
          {language === 'th' ? 'EN 🇬🇧' : 'ไทย 🇹🇭'}
        </button>
      </div>

      {/* Main Container: either Phone Frame Mockup or Expanded Mode */}
      <div
        className={`transition-all duration-300 w-full ${
          phoneFrameMode
            ? 'max-w-[440px] bg-black p-3.5 rounded-[52px] shadow-2xl border-4 border-slate-800'
            : 'max-w-6xl bg-white rounded-3xl border border-slate-200 shadow-lg p-2'
        }`}
      >
        {/* Inside Phone Screen Bezel */}
        <div
          className={`w-full bg-white flex flex-col justify-between overflow-hidden relative ${
            phoneFrameMode
              ? 'rounded-[42px] min-h-[780px] max-h-[880px] border border-slate-200'
              : 'rounded-2xl min-h-[700px]'
          }`}
        >
          {/* Top Notch / Dynamic Island (Phone Mode only) */}
          {phoneFrameMode && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 pointer-events-none flex items-center justify-end px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
            </div>
          )}

          {/* Screen Scrollable Content Body */}
          <div className={`flex-1 overflow-y-auto no-scrollbar ${phoneFrameMode ? 'pt-8 pb-4' : 'pt-4 pb-4'}`}>
            {renderScreenContent()}
          </div>

          {/* Bottom Navigation Bar (The exact 3 icons from draft diagram) */}
          <div className="border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-2.5 flex items-center justify-around shrink-0 z-30">
            {/* 1. Discover Tab */}
            <button
              onClick={() => {
                setMainTab('discover');
                setDiscoverView('hub');
              }}
              className={`flex flex-col items-center gap-1 transition-all ${
                mainTab === 'discover'
                  ? 'text-blue-600 font-extrabold scale-105'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                mainTab === 'discover' ? 'bg-blue-50 text-blue-600' : 'text-slate-400'
              }`}>
                <Compass className="w-5 h-5 stroke-[2.3]" />
              </div>
              <span className="text-[11px] leading-none">
                {isTh ? 'ค้นพบ' : 'Discover'}
              </span>
            </button>

            {/* 2. Experience Tab */}
            <button
              onClick={() => {
                setMainTab('experience');
                setExperienceView('hub');
              }}
              className={`flex flex-col items-center gap-1 transition-all ${
                mainTab === 'experience'
                  ? 'text-emerald-600 font-extrabold scale-105'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                mainTab === 'experience' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-400'
              }`}>
                <Star className="w-5 h-5 stroke-[2.3]" />
              </div>
              <span className="text-[11px] leading-none">
                {isTh ? 'ประสบการณ์' : 'Experience'}
              </span>
            </button>

            {/* 3. Profile Tab */}
            <button
              onClick={() => {
                setMainTab('profile');
                setProfileView('overview');
              }}
              className={`flex flex-col items-center gap-1 transition-all ${
                mainTab === 'profile'
                  ? 'text-cyan-600 font-extrabold scale-105'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                mainTab === 'profile' ? 'bg-cyan-50 text-cyan-600' : 'text-slate-400'
              }`}>
                <User className="w-5 h-5 stroke-[2.3]" />
              </div>
              <span className="text-[11px] leading-none">
                {isTh ? 'โปรไฟล์' : 'Profile'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
