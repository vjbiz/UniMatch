import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ActivityCategory,
  Language,
  NavTab,
  PortfolioPageData,
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
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  savedActivityIds: string[];
  toggleSaveActivity: (activityId: string) => void;
  trackedActivities: TrackedActivityItem[];
  addTrackedActivity: (item: Omit<TrackedActivityItem, 'id'>) => void;
  updateTrackedActivity: (id: string, updates: Partial<TrackedActivityItem>) => void;
  removeTrackedActivity: (id: string) => void;
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

const STORAGE_KEY = 'tcas_compass_student_profile_v1';
const LANG_STORAGE_KEY = 'tcas_compass_language_v1';

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

  const [activeTab, setActiveTab] = useState<NavTab>('home');
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

  // Persist profile
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

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activeTab,
        setActiveTab,
        profile,
        updateProfile,
        savedActivityIds: profile.savedActivityIds,
        toggleSaveActivity,
        trackedActivities: profile.trackedActivities,
        addTrackedActivity,
        updateTrackedActivity,
        removeTrackedActivity,
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
