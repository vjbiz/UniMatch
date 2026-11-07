import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AssessmentView } from './components/AssessmentView';
import { CourseExplorerView } from './components/CourseExplorerView';
import { ActivitiesView } from './components/ActivitiesView';
import { RequirementCheckerView } from './components/RequirementCheckerView';
import { PortfolioBuilderView } from './components/PortfolioBuilderView';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { Footer } from './components/Footer';
import { Compass, BookOpen, FileCheck2, FolderKanban, ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';
import { EXTRACURRICULAR_ACTIVITIES, THAI_UNIVERSITY_COURSES } from './data/tcasData';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, language, setSelectedFacultyFilter } = useApp();
  const isTh = language === 'th';

  return (
    <main className="flex-1">
      {activeTab === 'home' && (
        <>
          <Hero />

          {/* 3 Steps to TCAS Round 1 Success */}
          <section className="py-16 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  {isTh ? 'เส้นทางสู่มหาวิทยาลัยในฝัน' : 'Your 3-Step Roadmap'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {isTh ? '3 ขั้นตอนพิชิต TCAS รอบ Portfolio' : 'How TCAS Compass Guides You'}
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  {isTh
                    ? 'จากความลังเลใจ สู่การวางแผนที่ชัดเจน พร้อมเอกสาร 10 หน้าที่ตรงใจคณะกรรมการ'
                    : 'From indecision to strategic execution with an official 10-page university portfolio.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div
                  onClick={() => setActiveTab('assessment')}
                  className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      01
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {isTh ? 'ทำแบบประเมิน RIASEC ค้นหาตัวเอง' : 'Discover Your Holland RIASEC'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {isTh
                        ? 'ประเมิน 15 ข้อคำถามเชิงสถานการณ์เพื่อค้นหารหัสบุคลิกภาพที่แท้จริง พร้อมจับคู่วิชาที่ถนัดกับคณะที่ตรงกับตัวคุณที่สุด'
                        : 'Answer 15 vocational questions to uncover your psychological aptitude code and match with high-affinity courses.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>{isTh ? 'เริ่มทำแบบทดสอบ' : 'Take Quiz'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  onClick={() => setActiveTab('activities')}
                  className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      02
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {isTh ? 'เลือกกิจกรรมและค่ายวิชาการ' : 'Collect Target Extracurriculars'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {isTh
                        ? 'ค้นหาค่ายเปิดบ้าน โอลิมปิก สอวน. เวทีแข่งขันโครงงาน และงานจิตอาสาที่มหาวิทยาลัยให้คะแนนสูงในรอบพอร์ต'
                        : 'Browse academic Olympiads, hackathons, open houses, and verified community projects weighted heavily by faculties.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 group-hover:text-amber-700">
                    <span>{isTh ? 'สำรวจกิจกรรม' : 'Explore Activities'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  onClick={() => setActiveTab('builder')}
                  className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      03
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {isTh ? 'ประกอบพอร์ต 10 หน้า พร้อมส่งออก' : 'Assemble & Export 10 Pages'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {isTh
                        ? 'จัดหน้า A4 อย่างเป็นระบบตามเกณฑ์มาตรฐาน ทปอ. ป้องกันการถูกตัดสิทธิ์จากการใส่หน้าเกิน พร้อมส่งออกเป็น PDF ทันที'
                        : 'Format strictly to the 10-page TCAS rulebook with authentic A4 previews and direct print-to-PDF export.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                    <span>{isTh ? 'เปิดสตูดิโอทำพอร์ต' : 'Open Portfolio Studio'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Upcoming Activities Teaser */}
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                    {isTh ? 'กิจกรรมยอดนิยมรอบนี้' : 'Featured Opportunities'}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {isTh ? 'ค่ายและการแข่งขันที่นักเรียน ม.ปลาย ไม่ควรพลาด' : 'High-Impact TCAS Extracurriculars'}
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTab('activities')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>{isTh ? 'ดูกิจกรรมทั้งหมด' : 'View All Activities'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EXTRACURRICULAR_ACTIVITIES.slice(0, 3).map((act) => (
                  <div
                    key={act.id}
                    onClick={() => setActiveTab('activities')}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-slate-700">
                          {isTh ? act.organizerTh : act.organizerEn}
                        </span>
                        <span className="capitalize">{act.category}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                        {isTh ? act.titleTh : act.titleEn}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {isTh ? act.descriptionTh : act.descriptionEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{isTh ? act.feeTh : act.feeEn}</span>
                      <span className="font-semibold text-blue-600">
                        {isTh ? 'ดูรายละเอียด' : 'Learn More'} →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TCAS Round 1 Portfolio Rules FAQ */}
          <section className="py-16 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  {isTh ? 'คำถามที่พบบ่อย' : 'TCAS Round 1 FAQ'}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {isTh ? 'ข้อควรรู้เกี่ยวกับ TCAS รอบที่ 1 Portfolio' : 'Essential TCAS Portfolio Rules'}
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    qTh: 'กฎ 10 หน้าของ TCAS นับรวมหน้าอะไรบ้าง?',
                    qEn: 'What counts toward the strict 10-page TCAS limit?',
                    aTh: 'ตามประกาศของ ทปอ. กำหนดให้แฟ้มสะสมผลงานมีจำนวนไม่เกิน 10 หน้ากระดาษ A4 (ไม่รวมหน้าปก) โดยทั่วไปจะแบ่งเป็น: ประวัติส่วนตัว (1 หน้า), เหตุผลในการเข้าศึกษา (1 หน้า), ผลงานทางวิชาการและโครงงาน (3-4 หน้า), กิจกรรมจิตอาสา/ผู้นำ (2-3 หน้า), และเกียรติบัตรรับรอง (1 หน้า) หากเกิน 10 หน้า มหาวิทยาลัยบางแห่งจะตัดคะแนนหรือไม่ตรวจหน้าที่เกิน',
                    aEn: 'Official TCAS guidelines stipulate a maximum of 10 A4 pages excluding the front cover. Portfolios exceeding 10 pages risk automatic point deduction or committee disqualification.',
                  },
                  {
                    qTh: 'เด็ก ม.4 หรือ ม.5 ควรเริ่มเตรียมตัวอย่างไร?',
                    qEn: 'How should Grade 10-11 students begin their preparation?',
                    aTh: 'ควรเริ่มจากการทำแบบทดสอบค้นหาตัวเองเพื่อเลือกสายคณะที่ชัดเจน จากนั้นมุ่งเก็บกิจกรรมที่มีน้ำหนักสูง เช่น การเข้าค่ายโอลิมปิกวิชาการ สอวน., การประกวดโครงงานระดับภาค/ชาติ, และการทำกิจกรรมจิตอาสาอย่างต่อเนื่องพร้อมขอใบรับรองสะสมไว้',
                    aEn: 'Identify your target faculty early, then systematically collect high-weight extracurriculars: POSN Olympiad camps, national science fairs, and verifiable community impact projects.',
                  },
                  {
                    qTh: 'ถ้า GPAX ไม่ถึงเกณฑ์ขั้นต่ำ สามารถยื่นรอบพอร์ตได้หรือไม่?',
                    qEn: 'Can I apply for Round 1 if my GPAX is below the minimum threshold?',
                    aTh: 'หากเกรดเฉลี่ยสะสม (GPAX) หรือหน่วยกิตกลุ่มวิชาวิทย์-คณิตไม่ถึงตามประกาศ ระบบคัดกรองเบื้องต้นจะปฏิเสธใบสมัครโดยอัตโนมัติ แนะนำให้ตรวจสอบเกณฑ์ของโครงการอื่น หรือเตรียมตัวสำหรับ TCAS รอบที่ 2 (โควตา) หรือรอบที่ 3 (Admission)',
                    aEn: 'No. Minimum GPAX and credit hours are strict gating criteria. Applications falling below the cutoff are disqualified automatically before portfolio review.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 text-xs">
                    <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{isTh ? item.qTh : item.qEn}</span>
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-justify pl-6">
                      {isTh ? item.aTh : item.aEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'assessment' && <AssessmentView />}
      {activeTab === 'courses' && <CourseExplorerView />}
      {activeTab === 'activities' && <ActivitiesView />}
      {activeTab === 'checker' && <RequirementCheckerView />}
      {activeTab === 'builder' && <PortfolioBuilderView />}

      {/* Global AI Advisor Modal */}
      <AiAdvisorModal />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </AppProvider>
  );
}
