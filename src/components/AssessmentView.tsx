import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RIASEC_ASSESSMENT_QUESTIONS, THAI_UNIVERSITY_COURSES } from '../data/tcasData';
import { RIASECDimension, RIASECScore, SubjectStrengths, UniversityCourse } from '../types/tcas';
import { ArrowRight, Check, RotateCcw, Sparkles, BookOpen, ChevronRight, Award, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AssessmentView: React.FC = () => {
  const { language, profile, updateProfile, setActiveTab, setSelectedFacultyFilter } = useApp();
  const isTh = language === 'th';

  // Local state for assessment flow
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [subjects, setSubjects] = useState<SubjectStrengths>(profile.subjectStrengths);
  const [isCompleted, setIsCompleted] = useState<boolean>(profile.completedAssessment);

  const questions = RIASEC_ASSESSMENT_QUESTIONS;
  const currentQ = questions[currentStep];

  const handleSelectOption = (value: number) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate scores and finalize
      finishAssessment(newAnswers);
    }
  };

  const finishAssessment = (finalAnswers: Record<number, number>) => {
    const scores: RIASECScore = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    questions.forEach((q) => {
      const val = finalAnswers[q.id] || 3;
      scores[q.dimension] += val;
    });

    updateProfile({
      riasecScores: scores,
      subjectStrengths: subjects,
      completedAssessment: true,
    });

    setIsCompleted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Ignore if canvas-confetti is not available
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Compute matched courses
  const scores = profile.riasecScores;
  const sortedDimensions = (Object.keys(scores) as RIASECDimension[]).sort(
    (a, b) => scores[b] - scores[a]
  );
  const topDimensions = sortedDimensions.slice(0, 3);

  const matchedCourses = THAI_UNIVERSITY_COURSES.map((course) => {
    // Score based on RIASEC match
    let matchPoints = 0;
    course.primaryRiasec.forEach((dim) => {
      matchPoints += (scores[dim] || 0) * 1.5;
    });
    // Add subject strength influence
    if (course.facultyEn.toLowerCase().includes('engineering') || course.facultyEn.toLowerCase().includes('information')) {
      matchPoints += subjects.mathematics * 1.2 + subjects.scienceTech * 1.2;
    } else if (course.facultyEn.toLowerCase().includes('medicine') || course.facultyEn.toLowerCase().includes('food')) {
      matchPoints += subjects.scienceTech * 1.5 + subjects.mathematics * 0.8;
    } else if (course.facultyEn.toLowerCase().includes('law') || course.facultyEn.toLowerCase().includes('commerce')) {
      matchPoints += subjects.socialHumanities * 1.3 + subjects.languages * 1.2;
    }

    const percentage = Math.min(98, Math.max(65, Math.round((matchPoints / 55) * 100)));
    return { course, percentage };
  }).sort((a, b) => b.percentage - a.percentage);

  // Dimension details for interpretation
  const dimensionInfo: Record<RIASECDimension, { nameTh: string; nameEn: string; descTh: string; descEn: string; color: string }> = {
    R: {
      nameTh: 'Realistic (นักลงมือปฏิบัติ)',
      nameEn: 'Realistic (Doer)',
      descTh: 'ชอบจับต้องอุปกรณ์ เครื่องจักร เครื่องมือ และสร้างสรรค์วัตถุทางกายภาพ',
      descEn: 'Practical, hands-on mechanical orientation, working with physical systems.',
      color: '#EA580C',
    },
    I: {
      nameTh: 'Investigative (นักวิจัยและสืบเสาะ)',
      nameEn: 'Investigative (Thinker)',
      descTh: 'ชอบค้นคว้า ตั้งสมมติฐาน ไขปริศนาวิทยาศาสตร์ และวิเคราะห์ข้อมูลซับซ้อน',
      descEn: 'Analytical, scientific curiosity, problem-solver and research-driven.',
      color: '#0284C7',
    },
    A: {
      nameTh: 'Artistic (นักสร้างสรรค์ศิลปะ)',
      nameEn: 'Artistic (Creator)',
      descTh: 'ชอบจินตนาการ ออกแบบภาพ ภาษา และการสื่อสารอย่างมีสไตล์ส่วนตัว',
      descEn: 'Imaginative, expressive, design-centric, and non-conformist vision.',
      color: '#8B5CF6',
    },
    S: {
      nameTh: 'Social (นักพัฒนาสังคมและผู้คน)',
      nameEn: 'Social (Helper)',
      descTh: 'ชอบช่วยเหลือ สอน ให้คำปรึกษา และทำงานร่วมกับผู้อื่นเพื่อประโยชน์ส่วนรวม',
      descEn: 'Empathetic, communicative, oriented toward teaching and healing society.',
      color: '#10B981',
    },
    E: {
      nameTh: 'Enterprising (นักบริหารและผู้นำ)',
      nameEn: 'Enterprising (Persuader)',
      descTh: 'ชอบเจรจาต่อรอง วางแผนธุรกิจ นำทีม และริเริ่มโครงการใหม่ๆ',
      descEn: 'Goal-oriented, leadership drive, persuasive negotiator, and entrepreneurial.',
      color: '#F59E0B',
    },
    C: {
      nameTh: 'Conventional (นักจัดการระเบียบและข้อมูล)',
      nameEn: 'Conventional (Organizer)',
      descTh: 'ชอบระบบระเบียบ ความถูกต้องของข้อมูล สัญญา กฎหมาย และงบประมาณ',
      descEn: 'Detail-focused, structured, compliant with standards and precise processes.',
      color: '#64748B',
    },
  };

  // Pure SVG Radar / Spider Chart Math
  const renderRadarChart = () => {
    const size = 260;
    const center = size / 2;
    const radius = 95;
    const dimensions: RIASECDimension[] = ['R', 'I', 'A', 'S', 'E', 'C'];
    const total = dimensions.length;

    // Normalize score to 0..1 scale (assuming max ~ 15)
    const points = dimensions.map((dim, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const rawScore = scores[dim] || 3;
      const r = Math.min(radius, Math.max(15, (rawScore / 12) * radius));
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={size} height={size} className="mx-auto overflow-visible">
        {/* Background Web Polygons */}
        {[0.25, 0.5, 0.75, 1].map((level, idx) => {
          const polyPoints = dimensions.map((_, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const r = radius * level;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(' ');
          return (
            <polygon
              key={idx}
              points={polyPoints}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis Spokes */}
        {dimensions.map((_, i) => {
          const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          );
        })}

        {/* Student Score Polygon */}
        <polygon
          points={points}
          fill="rgba(37, 99, 235, 0.25)"
          stroke="#2563EB"
          strokeWidth="2.5"
        />

        {/* Vertex Labels */}
        {dimensions.map((dim, i) => {
          const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
          const labelDist = radius + 22;
          const x = center + labelDist * Math.cos(angle);
          const y = center + labelDist * Math.sin(angle);
          const isTop = topDimensions.includes(dim);
          return (
            <text
              key={dim}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-xs font-bold ${isTop ? 'fill-blue-600' : 'fill-slate-500'}`}
            >
              {dim} ({scores[dim] || 0})
            </text>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
          <span>Holland RIASEC Model</span>
          <span aria-hidden="true">·</span>
          <span>15 Questions</span>
          <span aria-hidden="true">·</span>
          <span>Subject Weights</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isTh ? 'แบบประเมินค้นหาหลักสูตรและคณะที่ใช่' : 'RIASEC University Course Discovery'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
          {isTh
            ? 'วิเคราะห์บุคลิกภาพความถนัด 6 ด้านตามทฤษฎีจิตวิทยาการเลือกอาชีพของ จอห์น ฮอลแลนด์ (John Holland) พร้อมคำนวณน้ำหนักร่วมกับวิชาที่ชื่นชอบ เพื่อแนะนำคณะมหาวิทยาลัยชั้นนำในระบบ TCAS'
            : 'Explore your vocational inclinations across 6 psychological domains and cross-reference them with your subject aptitudes for tailored TCAS faculty recommendations.'}
        </p>
      </div>

      {!isCompleted ? (
        /* Quiz Active State */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Question Card */}
          <div className="lg:col-span-8 glass-embossed-card rounded-3xl p-6 sm:p-8">
            {/* Progress Bar & Counter */}
            <div className="flex items-center justify-between mb-4 text-xs font-semibold text-slate-600">
              <span>
                {isTh ? `คำถามข้อที่ ${currentStep + 1} จากทั้งหมด ${questions.length}` : `Question ${currentStep + 1} of ${questions.length}`}
              </span>
              <span className="font-mono tabular-nums text-blue-700 font-bold">
                {Math.round(((currentStep + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200/70 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Details */}
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-600">
              {isTh ? currentQ.categoryTh : currentQ.categoryEn}
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug mb-8 min-h-[64px]">
              {isTh ? currentQ.scenarioTh : currentQ.scenarioEn}
            </h3>

            {/* Answer Options (1 to 5 Likert Scale) */}
            <div className="space-y-3">
              {[
                { val: 5, labelTh: 'ตรงกับตัวฉันมากที่สุด (แน่นอนที่สุด)', labelEn: 'Strongly Agree (Very Much Me)' },
                { val: 4, labelTh: 'ค่อนข้างตรงกับฉัน', labelEn: 'Agree (Mostly Like Me)' },
                { val: 3, labelTh: 'ปานกลาง / เฉยๆ', labelEn: 'Neutral / Moderately' },
                { val: 2, labelTh: 'ไม่ค่อยตรงกับฉัน', labelEn: 'Disagree (Rarely Like Me)' },
                { val: 1, labelTh: 'ไม่ตรงกับฉันเลย', labelEn: 'Strongly Disagree (Not Me At All)' },
              ].map((opt) => {
                const isSelected = answers[currentQ.id] === opt.val;
                return (
                  <button
                    key={opt.val}
                    onClick={() => handleSelectOption(opt.val)}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'glass-embossed-primary text-white shadow-md'
                        : 'glass-embossed-button text-slate-800 hover:text-slate-900'
                    }`}
                  >
                    <span>{isTh ? opt.labelTh : opt.labelEn}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-white bg-white text-blue-600'
                        : 'border-slate-300 group-hover:border-blue-500 bg-white/60'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed glass-embossed-button px-3.5 py-1.5 rounded-xl cursor-pointer"
              >
                {isTh ? '← ข้อก่อนหน้า' : '← Previous Question'}
              </button>

              <button
                onClick={resetQuiz}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 underline cursor-pointer"
              >
                {isTh ? 'เริ่มทำใหม่' : 'Restart Quiz'}
              </button>
            </div>
          </div>

          {/* Right Column: Subject Strengths Sliders */}
          <div className="lg:col-span-4 glass-embossed-card rounded-3xl p-6">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              {isTh ? 'ความถนัดในรายวิชา (Subject Strengths)' : 'Subject Strengths'}
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              {isTh
                ? 'ปรับระดับวิชาที่คุณรู้สึกทำคะแนนได้ดีหรือชอบเรียน เพื่อเพิ่มความแม่นยำในการคัดเลือกหลักสูตร'
                : 'Fine-tune your academic comfort levels (1 to 5) to balance personality with classroom performance.'}
            </p>

            <div className="space-y-4">
              {[
                { key: 'mathematics', labelTh: 'คณิตศาสตร์ (Mathematics)', labelEn: 'Mathematics' },
                { key: 'scienceTech', labelTh: 'วิทยาศาสตร์ & ไอที (Science & Tech)', labelEn: 'Science & Tech' },
                { key: 'languages', labelTh: 'ภาษาต่างประเทศ (Languages)', labelEn: 'Languages' },
                { key: 'socialHumanities', labelTh: 'สังคมศาสตร์ & นิติ (Social/Law)', labelEn: 'Social & Law' },
                { key: 'artsDesign', labelTh: 'ศิลปะ & การออกแบบ (Arts & Design)', labelEn: 'Arts & Design' },
              ].map((item) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>{isTh ? item.labelTh : item.labelEn}</span>
                    <span className="font-mono font-bold text-blue-700">
                      {subjects[item.key as keyof SubjectStrengths]}/5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={subjects[item.key as keyof SubjectStrengths]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      const updated = { ...subjects, [item.key]: val };
                      setSubjects(updated);
                      updateProfile({ subjectStrengths: updated });
                    }}
                    className="w-full h-2 bg-slate-200/80 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isTh ? 'ระบบจะปรับผลลัพธ์อัตโนมัติ' : 'Results adapt dynamically'}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-10">
          {/* Top Banner: Holland Profile Summary */}
          <div className="glass-embossed-card rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Radar Chart */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {isTh ? 'แผนภูมิใยแมงมุมความถนัด 6 ด้าน' : 'RIASEC Radar Topology'}
                </div>
                {renderRadarChart()}
              </div>

              {/* Dominant Traits Analysis */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>{isTh ? 'รหัสบุคลิกภาพเด่นของคุณ' : 'Your Dominant RIASEC Code'}</span>
                </div>

                <div className="text-3xl font-black text-slate-900 tracking-tight font-mono mb-4">
                  {topDimensions.join(' · ')}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {isTh
                    ? `บุคลิกภาพของคุณมีความโดดเด่นในกลุ่ม ${topDimensions.map((d) => dimensionInfo[d].nameTh).join(', ')} เหมาะกับคณะที่เน้นการค้นคว้าวิจัยควบคู่กับการประยุกต์ใช้เพื่อแก้ไขปัญหาจริงในสังคม`
                    : `Your leading traits reflect strong inclinations in ${topDimensions.map((d) => dimensionInfo[d].nameEn).join(', ')}, making you an exceptional candidate for applied research, engineering, and analytical programs.`}
                </p>

                {/* Trait Breakdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {topDimensions.map((dim) => {
                    const info = dimensionInfo[dim];
                    return (
                      <div key={dim} className="p-3.5 rounded-2xl bg-white/70 border border-white/80 shadow-xs">
                        <div className="text-xs font-bold text-slate-900 mb-1">
                          {isTh ? info.nameTh : info.nameEn}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-2">
                          {isTh ? info.descTh : info.descEn}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 glass-embossed-button px-3.5 py-1.5 rounded-xl cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isTh ? 'ทำแบบประเมินใหม่อีกครั้ง' : 'Retake Assessment'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('builder')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white glass-embossed-primary px-3.5 py-1.5 rounded-xl cursor-pointer"
                  >
                    <span>{isTh ? 'นำผลไปสร้างพอร์ต 10 หน้า' : 'Apply to 10-Page Portfolio'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Thai University Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {isTh ? 'หลักสูตรและคณะที่แนะนำสำหรับคุณ' : 'Top Recommended University Programs'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isTh
                    ? 'คำนวณจากผลคะแนน RIASEC และวิชาที่ถนัด เรียงตามความเหมาะสมสูงสุด'
                    : 'Ranked by personality aptitude and your self-reported subject strengths.'}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>{isTh ? 'ดูคณะทั้งหมด' : 'Explore All Courses'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchedCourses.slice(0, 4).map(({ course, percentage }) => (
                <div
                  key={course.id}
                  className="glass-embossed-card rounded-2xl p-6 transition-all flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    {/* Top unboxed metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">
                          {isTh ? course.universityTh : course.universityEn}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{isTh ? course.campusTh : course.campusEn}</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-600">
                        {percentage}% {isTh ? 'แมตช์' : 'Fit'}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h4 className="text-base font-bold text-slate-900 mb-1">
                      {isTh ? course.nameTh : course.nameEn}
                    </h4>
                    <div className="text-xs font-medium text-slate-500 mb-3">
                      {isTh ? course.facultyTh : course.facultyEn}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {isTh ? course.descriptionTh : course.descriptionEn}
                    </p>

                    {/* Career Prospects */}
                    <div className="text-[11px] text-slate-500 mb-4">
                      <span className="font-semibold text-slate-700">
                        {isTh ? 'เส้นทางอาชีพ: ' : 'Careers: '}
                      </span>
                      <span>
                        {(isTh ? course.careerOutlookTh : course.careerOutlookEn).slice(0, 3).join(', ')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedFacultyFilter(course.facultyTh);
                        setActiveTab('activities');
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isTh ? 'หากิจกรรมใส่พอร์ตสำหรับคณะนี้' : 'Find Matching Activities'}</span>
                    </button>

                    <button
                      onClick={() => {
                        updateProfile({
                          targetFaculty: course.facultyTh,
                          targetUniversities: [course.universityTh],
                        });
                        setActiveTab('checker');
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      {isTh ? 'เช็กเกณฑ์รับ' : 'Check Criteria'} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
