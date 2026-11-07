import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Star, User, Sparkles } from 'lucide-react';
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
    setExperienceView,
    setProfileView,
    setIsAiAdvisorOpen,
  } = useApp();
  const isTh = language === 'th';

  // Render active content inside the mobile webapp
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
    <div className="min-h-screen bg-slate-100/90 flex flex-col justify-between">
      {/* Mobile-First Webapp Centered Canvas */}
      <div className="w-full max-w-lg mx-auto min-h-screen flex flex-col justify-between bg-white/80 backdrop-blur-xl shadow-2xl border-x border-slate-200/90 relative">
        
        {/* Top Header with Embossed Glass Design */}
        <header className="sticky top-0 z-40 px-4 py-3 bg-white/85 backdrop-blur-md border-b border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-between gap-2">
          {/* Brand Wordmark */}
          <button
            onClick={() => {
              setMainTab('discover');
              setDiscoverView('hub');
            }}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-xl glass-embossed-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
              เข็ม
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-slate-900 leading-tight">
                TCAS Compass
              </span>
              <span className="text-[9px] font-semibold text-blue-600 uppercase tracking-wider">
                {isTh ? 'เข็มทิศรอบพอร์ต' : 'Port Navigator'}
              </span>
            </div>
          </button>

          {/* Center Active Section Capsule (Embossed Glassy Pill) */}
          <div className="px-4 py-1.5 rounded-full glass-embossed-primary text-white font-bold text-xs shadow-md shadow-blue-500/20">
            {mainTab === 'discover' && (isTh ? 'ค้นพบ (Discover)' : 'Discover')}
            {mainTab === 'experience' && (isTh ? 'ประสบการณ์ (Experience)' : 'Experience')}
            {mainTab === 'profile' && (isTh ? 'โปรไฟล์ (Profile)' : 'Profile')}
          </div>

          {/* Right Utilities: AI Advisor & Language Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAiAdvisorOpen(true)}
              className="p-2 rounded-xl glass-embossed-button text-blue-700 hover:text-blue-800"
              title={isTh ? 'ปรึกษา AI กลยุทธ์' : 'AI Advisor'}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl glass-embossed-button text-xs font-bold text-slate-700 hover:text-slate-900"
            >
              {language === 'th' ? 'EN' : 'ไทย'}
            </button>
          </div>
        </header>

        {/* Scrollable Webapp Content Area */}
        <main className="flex-1 pb-24">
          {renderScreenContent()}
        </main>

        {/* Sticky Embossed Glassy Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto bg-white/85 backdrop-blur-xl border-t border-white/80 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.9),0_-4px_20px_rgba(0,0,0,0.06)] px-6 py-2.5 flex items-center justify-around">
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
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
              mainTab === 'discover'
                ? 'glass-card-blue text-blue-700 shadow-md'
                : 'glass-embossed-button text-slate-400'
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
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
              mainTab === 'experience'
                ? 'glass-card-green text-emerald-700 shadow-md'
                : 'glass-embossed-button text-slate-400'
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
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
              mainTab === 'profile'
                ? 'glass-card-cyan text-teal-700 shadow-md'
                : 'glass-embossed-button text-slate-400'
            }`}>
              <User className="w-5 h-5 stroke-[2.3]" />
            </div>
            <span className="text-[11px] leading-none">
              {isTh ? 'โปรไฟล์' : 'Profile'}
            </span>
          </button>
        </nav>

      </div>
    </div>
  );
};
