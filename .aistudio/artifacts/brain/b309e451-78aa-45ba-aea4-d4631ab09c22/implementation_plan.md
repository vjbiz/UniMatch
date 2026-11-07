# TCAS Compass (เข็มทิศ TCAS): University Course & Portfolio Navigator

A bilingual (Thai/English) platform dedicated to helping Thai high school students (M.4–M.6) discover their ideal university course through a Holland RIASEC & academic strengths assessment, find curated portfolio activities (camps, competitions, open houses, volunteer, certs), organize achievements, verify TCAS Round 1 requirements, and export standard 10-page TCAS portfolios.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following specifications were confirmed during Phase 1 clarification:
> - **Language**: Seamless bilingual toggle between Thai (ภาษาไทย) and English (EN) throughout the entire experience.
> - **Assessment Architecture**: RIASEC Holland Codes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) cross-referenced with academic subject strengths and TCAS discipline weights.
> - **Extracurricular Activities Catalog**: Rich searchable repository spanning Academic Competitions & Olympiads (POSN/สอวน.), University Camps & Open Houses (CU, TU, Mahidol, etc.), Volunteering & Community Leadership, and Verified MOOCs & Certifications (Chula MOOC, Thai MOOC, Coursera).
> - **Portfolio Tools**: Full interactive TCAS 10-Page Portfolio Builder with instant print/PDF export, Activity & Certificate Tracker with deadline countdowns, and TCAS Round 1 Faculty Requirement Checker (GPAX, credits, required activity criteria).

- **Confirmed Decision 1**: Bilingual Thai/EN support with authentic TCAS terminology (e.g., รอบพอร์ต, GPAX, แฟ้มสะสมผลงาน, ค่ายวิชาการ).
- **Confirmed Decision 2**: Local browser storage for student profiles, assessment results, and portfolio drafts with JSON backup/import for zero data loss and private editing.
- **Confirmed Decision 3**: AI-assisted Gemini portfolio reflection and course matching engine to generate tailored activity recommendations and personal statement ideas.

---

### 1. Overview & Core Concept

- **What It Does**:
  1. **Course & Major Matcher**: A 15-question RIASEC + academic interest assessment that analyzes student traits and recommends top-matched Thai university faculties (e.g., Chula Engineering, TU Law, Mahidol Medicine, Kasetsart Computer Science, KMUTT Architecture) along with career pathways and required portfolio skillsets.
  2. **Activity & Camp Discovery Hub**: A dynamic directory of real and curated Thai high-school extracurriculars filterable by faculty target, activity category (Hackathon/Olympiad, Open House/Camp, Volunteering, Certs), format (Online/On-site), and application deadlines.
  3. **TCAS Round 1 Requirement Checker**: Live evaluation matrix against real admission guidelines across major Thai universities (GPAX thresholds, portfolio page limits, required science/math credits, prerequisite test scores).
  4. **TCAS 10-Page Portfolio Builder & PDF Exporter**: Drag-and-drop page builder strictly adhering to the standard 10-page TCAS guideline:
     - Page 1: Cover Page (หน้าปก) with student portrait, target faculty/university, high school
     - Page 2: Personal Profile & Resume (ประวัติส่วนตัว) with contact, education, GPAX
     - Page 3: Statement of Purpose (เหตุผลและความมุ่งมั่น)
     - Pages 4–7: Core Academic Achievements & Major-Related Projects (ผลงานและกิจกรรมทางวิชาการ)
     - Pages 8–9: Volunteering, Leadership & Soft Skills (กิจกรรมเพื่อสังคมและความเป็นผู้นำ)
     - Page 10: Certificates & Recommendations (เกียรติบัตรและเอกสารรับรอง)
  5. **Activity & Certificate Tracker**: Personal dashboard with status tracking (Planned, Applied, Completed), uploadable proof photos, reflection notes, and countdown timers to registration deadlines.

- **Target Audience / Persona**:
  - Thai High School Students (Mattayom 4–6 / Grade 10–12) navigating the Thai University Central Admission System (TCAS68/69+), specifically targeting the competitive **Round 1 Portfolio**.
  - Parents and school guidance counselors seeking structured, stress-free portfolio planning for their students.

- **Key Value**:
  - Eliminates the confusion of "What should I study?" and "What activities do I need for my dream faculty?" by directly connecting career aptitude to concrete portfolio activities and TCAS requirements.

---

### 2. User Experience & Visual Design

#### Aesthetic Direction & Color Palette
- **Style**: Contemporary academic editorial meets modern productivity app — clean, welcoming, and inspiring without playful clutter or sterile corporate heaviness.
- **Typography**:
  - Primary Sans: `Outfit` & `Plus Jakarta Sans` for clean, contemporary headers and UI.
  - Thai Font Pairing: `Sarabun` / `Prompt` fallback via system fonts for crisp, legible Thai characters.
  - Tabular Figures: `font-mono tabular-nums` for GPAX, page counters, dates, and deadlines.
- **60-30-10 Color Distribution**:
  - **60% Canvas**: Crisp clean white (`#FFFFFF`) / calm light slate (`#F8FAFC`), with smooth dark mode (`#0B0F19` canvas, `#111827` cards).
  - **30% Structural Surfaces**: Clean slate borders (`#E2E8F0` / `#1F2937`), soft card backgrounds, hairline dividers.
  - **10% Accent Palette**:
    - TCAS Royal Indigo (`#2563EB`) as primary brand color.
    - Warm Amber Gold (`#F59E0B`) for deadlines and highlights.
    - Mint Emerald (`#10B981`) for completed milestones and requirement compliance.

#### Top Bar Contract
- **Zone 1 (Brand Wordmark)**: `TCAS Compass` (with subtle Thai subscript `เข็มทิศมหาวิทยาลัย`).
- **Zone 2 (Nav Links)**:
  - `Assessment` (แบบประเมินค้นหาตัวเอง)
  - `Course Explorer` (หลักสูตร & คณะ)
  - `Activities` (คลังกิจกรรม & ค่าย)
  - `Requirement Checker` (เช็กเกณฑ์ TCAS)
  - `Portfolio Builder` (สร้างพอร์ต 10 หน้า)
- **Zone 3 (Actions)**:
  - Language Toggle (`TH` | `EN`)
  - `My Portfolio` quick-access button with completion badge.

#### Key User Flows
1. **Discover Flow**: Student takes the RIASEC + Subject Assessment $\rightarrow$ gets interactive spider chart showing top 3 Holland traits $\rightarrow$ unlocks top 5 recommended Thai faculties with salary potential, work environment, and required portfolio profile.
2. **Explore Activities Flow**: Student clicks on a recommended faculty (e.g. "Computer Engineering") $\rightarrow$ view filters automatically to relevant hackathons, university open houses, and coding camps $\rightarrow$ clicks "Add to My Activities" with a single click.
3. **Verify Requirements Flow**: Student inputs current GPAX (e.g. 3.45) and target university/faculty (e.g. Chulalongkorn Engineering) $\rightarrow$ instant checklist highlights passed criteria and warns if any specific requirements (e.g. Math credit minimums) need attention.
4. **Build & Export Flow**: Student opens the 10-Page Portfolio Builder $\rightarrow$ pulls tracked activities directly into pages 4–9 $\rightarrow$ fills in Statement of Purpose with optional AI reflection prompt assistant $\rightarrow$ live preview in authentic A4 aspect ratio $\rightarrow$ one-click print/PDF export formatted for TCAS submission.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: RIASEC Holland Model vs. Simple Major Quiz**
  - *Chosen Approach*: Validated 6-dimension Holland Code (RIASEC) combined with student academic preferences (STEM, Languages, Humanities, Arts, Social Sciences).
  - *Why*: Gives high diagnostic reliability used internationally and in Thai educational guidance, avoiding arbitrary quiz answers.
  - *Alternative Considered*: Random 5-question personality quiz (discarded as too shallow for university admissions).

- **Decision 2: 10-Page Standardized TCAS Structure vs. Freeform Canvas**
  - *Chosen Approach*: Strict 10-page structure with pre-set templates that automatically fit standard TCAS university upload rules, while allowing full customization of content, photos, and layouts within each page.
  - *Why*: TCAS Round 1 strictly penalizes or disqualifies portfolios exceeding 10 pages (excluding cover). A strict page keeper prevents heartbreaking disqualifications.

- **Decision 3: Local-First Client Architecture with Optional Gemini API**
  - *Chosen Approach*: Instant, responsive local storage with JSON profile export/import, plus integration with `@google/genai` (via server proxy) for student reflection polishing and custom camp suggestions.
  - *Why*: Immediate zero-latency experience for high school students on any mobile/desktop browser, zero account registration barrier, fully preserving student privacy.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Client (React 19 + Vite)                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  Top Bar (Brand · 5 Nav Links · Language Toggle [TH/EN] · Port Action)     │
├─────────────────────────────────────────────────────────────────────────────┤
│  View Router:                                                               │
│   ├─ AssessmentView (RIASEC Radar · Questions · Subject Sliders)            │
│   ├─ CourseExplorerView (Faculties · Career Outlook · Admission Intel)      │
│   ├─ ActivitiesView (Filterable Camps · Competitions · Certs · Deadlines)   │
│   ├─ RequirementCheckerView (TCAS Round 1 Matrix · GPAX & Criteria Checker) │
│   └─ PortfolioBuilderView (10-Page A4 Canvas · Drag/Drop · Print/PDF)       │
├─────────────────────────────────────────────────────────────────────────────┤
│  State Store (localStorage):                                                │
│   ├─ StudentProfile (Name, School, Target Universities, GPAX)               │
│   ├─ AssessmentState (Answers, RIASEC Scores, Recommended Courses)          │
│   ├─ SavedActivities (Tracked, Completed, Notes, Attached Certificates)     │
│   └─ PortfolioDocument (10 A4 Pages, Section Content, Images, Layouts)      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                      API Proxy Route: POST /api/gemini
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    Node.js Express Server (server.ts)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  - Gemini API Client (@google/genai)                                        │
│  - Portfolio Reflection Coach & Statement of Purpose Synthesizer            │
│  - Intelligent University Activity Matcher                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Entities
- `CourseRecommendation`: `{ id, titleTh, titleEn, facultyTh, facultyEn, universities: [{ name, campus, minGpax, tcasCode }], riasecFit, careerPaths, recommendedActivityTypes }`
- `ExtracurricularActivity`: `{ id, titleTh, titleEn, organizer, category: 'competition' | 'camp' | 'volunteer' | 'mooc', tags, deadline, eventDate, url, location, targetFaculties }`
- `PortfolioPage`: `{ pageNumber: 1..10, title, type: 'cover' | 'profile' | 'sop' | 'academic_project' | 'activity' | 'certificate', content: Record<string, any> }`
- `RequirementCheckResult`: `{ university, faculty, eligible, passedCriteria: [], missingCriteria: [], tips }`

---

### Verification & Testing Plan
- **Assessment Flow**: Verify all 15 questions update scores accurately, compute dominant RIASEC codes, and rank matching courses.
- **Bilingual Switch**: Verify all UI labels, course descriptions, and activity filters switch dynamically between Thai and English without layout breakage.
- **Portfolio Generator**: Test editing all 10 pages, reordering activities, and triggering the A4 printable format (`@media print`) for pixel-perfect PDF export.
- **Requirement Checker**: Test edge cases (e.g. GPAX below threshold, missing prerequisite subjects) with clear advisory feedback.
- **Lint & Compilation**: Run `compile_applet` and `lint_applet` to ensure zero TypeScript or syntax issues.
