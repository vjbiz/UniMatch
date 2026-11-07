import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ActivityCategory,
  DiscoverView,
  ExperienceView,
  Language,
  MainNavTab,
  NavTab,
  PortfolioPageData,
  ProfileView,
  StudentProfile,
  TrackedActivityItem,
} from '../types/tcas';
import { INITIAL_PORTFOLIO_PAGES, INITIAL_STUDENT_PROFILE } from '../data/tcasData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  mainTab: MainNavTab;
  setMainTab: (tab: MainNavTab) => void;
  discoverView: DiscoverView;
  setDiscoverView: (view: DiscoverView) => void;
  experienceView: ExperienceView;
  setExperienceView: (view: ExperienceView) => void;
  profileView: ProfileView;
  setProfileView: (view: ProfileView) => void;
  phoneFrameMode: boolean;
  setPhoneFrameMode: (enabled: boolean) => void;
  togglePhoneFrameMode: () => void;
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  savedActivityIds: string[];
  toggleSaveActivity: (activityId: string) => void;
  trackedActivities: TrackedActivityItem[];
  addTrackedActivity: (item: Omit<TrackedActivityItem, 'id'>) => void;
  updateTrackedActivity: (id: string, updates: Partial<TrackedActivityItem>) => void;
  removeTrackedActivity: (id: string) => void;
  completeChallenge: (challengeId: string, points: number) => void;
  portfolioPages: PortfolioPageData[];
  updatePortfolioPage: (pageNumber: number, content: Record<string, any>) => void;
  resetPortfolioPages: () => void;
  selectedFacultyFilter: string | null;
  setSelectedFacultyFilter: (faculty: string | null) => void;
  isAiAdvisorOpen: boolean;
  setIsAiAdvisorOpen: (open: boolean) => void;
  exportDataJson: () => void;
  importDataJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'tcas_compass_student_profile_v2';
const LANG_STORAGE_KEY = 'tcas_compass_language_v2';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      return (saved === 'th' || saved === 'en') ? saved : 'th';
    } catch {
      return 'th';
    }
  });

  // Navigation matching draft style
  const [mainTab, setMainTab] = useState<MainNavTab>('discover');
  const [discoverView, setDiscoverView] = useState<DiscoverView>('hub');
  const [experienceView, setExperienceView] = useState<ExperienceView>('hub');
  const [profileView, setProfileView] = useState<ProfileView>('overview');

  // Phone Frame toggle (allows viewing exact phone frame mockup from draft, or full width)
  const [phoneFrameMode, setPhoneFrameMode] = useState<boolean>(true);

  const [selectedFacultyFilter, setSelectedFacultyFilter] = useState<string | null>(null);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState<boolean>(false);

  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STUDENT_PROFILE,
          ...parsed,
          portfolioPages: parsed.portfolioPages && parsed.portfolioPages.length === 10
            ? parsed.portfolioPages
            : INITIAL_PORTFOLIO_PAGES,
        };
      }
    } catch (e) {
      console.error('Failed to load profile from localStorage', e);
    }
    return INITIAL_STUDENT_PROFILE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  const togglePhoneFrameMode = () => {
    setPhoneFrameMode(!phoneFrameMode);
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const toggleSaveActivity = (activityId: string) => {
    setProfile((prev) => {
      const exists = prev.savedActivityIds.includes(activityId);
      const newSaved = exists
        ? prev.savedActivityIds.filter((id) => id !== activityId)
        : [...prev.savedActivityIds, activityId];
      return { ...prev, savedActivityIds: newSaved };
    });
  };

  const addTrackedActivity = (item: Omit<TrackedActivityItem, 'id'>) => {
    const newItem: TrackedActivityItem = {
      ...item,
      id: `track-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setProfile((prev) => ({
      ...prev,
      trackedActivities: [newItem, ...prev.trackedActivities],
    }));
  };

  const updateTrackedActivity = (id: string, updates: Partial<TrackedActivityItem>) => {
    setProfile((prev) => ({
      ...prev,
      trackedActivities: prev.trackedActivities.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const removeTrackedActivity = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      trackedActivities: prev.trackedActivities.filter((item) => item.id !== id),
    }));
  };

  const completeChallenge = (challengeId: string, points: number) => {
    setProfile((prev) => {
      if (prev.completedChallengeIds.includes(challengeId)) return prev;
      return {
        ...prev,
        points: prev.points + points,
        completedChallengeIds: [...prev.completedChallengeIds, challengeId],
      };
    });
  };

  const updatePortfolioPage = (pageNumber: number, content: Record<string, any>) => {
    setProfile((prev) => ({
      ...prev,
      portfolioPages: prev.portfolioPages.map((page) =>
        page.pageNumber === pageNumber ? { ...page, content: { ...page.content, ...content } } : page
      ),
    }));
  };

  const resetPortfolioPages = () => {
    setProfile((prev) => ({
      ...prev,
      portfolioPages: INITIAL_PORTFOLIO_PAGES,
    }));
  };

  const exportDataJson = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tcas-compass-${profile.name || 'portfolio'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        setProfile({
          ...INITIAL_STUDENT_PROFILE,
          ...parsed,
          portfolioPages: parsed.portfolioPages || INITIAL_PORTFOLIO_PAGES,
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import', e);
    }
    return false;
  };

  const setActiveTab = (tab: NavTab) => {
    if (tab === 'home' || tab === 'assessment' || tab === 'courses') {
      setMainTab('discover');
      if (tab === 'assessment') setDiscoverView('major-finder');
      else if (tab === 'courses') setDiscoverView('explore-major');
      else setDiscoverView('hub');
    } else if (tab === 'activities') {
      setMainTab('experience');
      setExperienceView('activities');
    } else if (tab === 'checker') {
      setMainTab('discover');
      setDiscoverView('tcas-link');
    } else if (tab === 'builder') {
      setMainTab('profile');
      setProfileView('portfolio');
    }
  };

  const activeTab: NavTab =
    mainTab === 'discover'
      ? discoverView === 'major-finder'
        ? 'assessment'
        : discoverView === 'explore-major'
        ? 'courses'
        : discoverView === 'tcas-link'
        ? 'checker'
        : 'home'
      : mainTab === 'experience'
      ? 'activities'
      : profileView === 'portfolio'
      ? 'builder'
      : 'home';

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activeTab,
        setActiveTab,
        mainTab,
        setMainTab,
        discoverView,
        setDiscoverView,
        experienceView,
        setExperienceView,
        profileView,
        setProfileView,
        phoneFrameMode,
        setPhoneFrameMode,
        togglePhoneFrameMode,
        profile,
        updateProfile,
        savedActivityIds: profile.savedActivityIds,
        toggleSaveActivity,
        trackedActivities: profile.trackedActivities,
        addTrackedActivity,
        updateTrackedActivity,
        removeTrackedActivity,
        completeChallenge,
        portfolioPages: profile.portfolioPages,
        updatePortfolioPage,
        resetPortfolioPages,
        selectedFacultyFilter,
        setSelectedFacultyFilter,
        isAiAdvisorOpen,
        setIsAiAdvisorOpen,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
