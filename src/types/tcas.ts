export type Language = 'th' | 'en';

export type NavTab = 'home' | 'assessment' | 'courses' | 'activities' | 'checker' | 'builder';

export type MainNavTab = 'discover' | 'experience' | 'profile';

export type DiscoverView = 'hub' | 'major-finder' | 'explore-major' | 'course-challenge' | 'tcas-link';

export type ExperienceView = 'hub' | 'activities' | 'connect';

export type ProfileView = 'overview' | 'hub' | 'portfolio' | 'certificates' | 'settings';

export type RIASECDimension = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RIASECScore {
  R: number; // Realistic
  I: number; // Investigative
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

export interface SubjectStrengths {
  mathematics: number;
  scienceTech: number;
  languages: number;
  socialHumanities: number;
  artsDesign: number;
}

export interface AssessmentQuestion {
  id: number;
  dimension: RIASECDimension;
  categoryTh: string;
  categoryEn: string;
  scenarioTh: string;
  scenarioEn: string;
  weight: number;
}

export interface UniversityQuota {
  nameTh: string;
  nameEn: string;
  minGpax: number;
  minSciCredits?: number;
  minMathCredits?: number;
  minEngCredits?: number;
  seats: number;
  specialCriteriaTh: string;
  specialCriteriaEn: string;
}

export interface UniversityCourse {
  id: string;
  nameTh: string;
  nameEn: string;
  facultyTh: string;
  facultyEn: string;
  universityTh: string;
  universityEn: string;
  universityAbbr: string;
  campusTh: string;
  campusEn: string;
  accentColor: string;
  primaryRiasec: RIASECDimension[];
  descriptionTh: string;
  descriptionEn: string;
  careerOutlookTh: string[];
  careerOutlookEn: string[];
  salaryEstTh: string;
  salaryEstEn: string;
  quotas: UniversityQuota[];
  recommendedActivityTypes: Array<'competition' | 'camp' | 'volunteer' | 'mooc'>;
  portfolioTipsTh: string[];
  portfolioTipsEn: string[];
}

export type ActivityCategory = 'competition' | 'camp' | 'volunteer' | 'mooc' | 'internship' | 'workshop';

export interface ExtracurricularActivity {
  id: string;
  titleTh: string;
  titleEn: string;
  organizerTh: string;
  organizerEn: string;
  category: ActivityCategory;
  targetFaculties: string[];
  deadlineDate: string; // YYYY-MM-DD
  eventDateTh: string;
  eventDateEn: string;
  locationTh: string;
  locationEn: string;
  format: 'online' | 'onsite' | 'hybrid';
  feeTh: string;
  feeEn: string;
  descriptionTh: string;
  descriptionEn: string;
  tcasWeight: 'high' | 'medium';
  skillsGainedTh: string[];
  skillsGainedEn: string[];
  imagePath?: string;
  url: string;
}

export interface TrackedActivityItem {
  id: string;
  activityId?: string;
  title: string;
  organizer: string;
  category: ActivityCategory;
  date: string;
  status: 'planned' | 'applied' | 'completed';
  roleOrAward: string;
  reflection: string;
  certificateNote?: string;
  imageUrl?: string;
}

export interface CourseChallengeItem {
  id: string;
  titleTh: string;
  titleEn: string;
  majorCategoryTh: string;
  majorCategoryEn: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  questionTh: string;
  questionEn: string;
  optionsTh: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationTh: string;
  explanationEn: string;
  completed?: boolean;
}

export interface CommunityDiscussionPost {
  id: string;
  authorName: string;
  authorGrade: string;
  targetMajor: string;
  timeAgoTh: string;
  timeAgoEn: string;
  titleTh: string;
  titleEn: string;
  bodyTh: string;
  bodyEn: string;
  likes: number;
  commentsCount: number;
  tags: string[];
}

export interface PortfolioPageData {
  pageNumber: number;
  type: 'cover' | 'profile' | 'sop' | 'academic' | 'camp' | 'activity' | 'certificate';
  titleTh: string;
  titleEn: string;
  content: Record<string, any>;
}

export interface StudentProfile {
  name: string;
  school: string;
  studyTrack: string;
  grade: 'M.4' | 'M.5' | 'M.6';
  province: string;
  email: string;
  currentGpax: number;
  mathCredits: number;
  sciCredits: number;
  engCredits: number;
  targetUniversities: string[];
  targetFaculty: string;
  privacySetting: 'public' | 'friends' | 'private';
  points: number;
  completedChallengeIds: string[];
  riasecScores: RIASECScore;
  subjectStrengths: SubjectStrengths;
  completedAssessment: boolean;
  savedActivityIds: string[];
  trackedActivities: TrackedActivityItem[];
  portfolioPages: PortfolioPageData[];
}
