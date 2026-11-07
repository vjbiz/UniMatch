import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Bot, CheckCircle, RefreshCw, Send, BookOpen } from 'lucide-react';

export const AiAdvisorModal: React.FC = () => {
  const { language, isAiAdvisorOpen, setIsAiAdvisorOpen, profile, portfolioPages, updatePortfolioPage } = useApp();
  const isTh = language === 'th';

  const [activeTab, setActiveTab] = useState<'strategy' | 'sop'>('strategy');
  const [loading, setLoading] = useState(false);
  const [adviceText, setAdviceText] = useState<string>('');
  const [sopFeedback, setSopFeedback] = useState<{
    strengths?: string[];
    improvements?: string[];
    suggestedParagraph?: string;
  } | null>(null);

  if (!isAiAdvisorOpen) return null;

  const currentSop = portfolioPages.find((p) => p.type === 'sop')?.content.body || '';

  const handleGetStrategyAdvice = async () => {
    setLoading(true);
    setAdviceText('');
    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentProfile: {
            grade: profile.grade,
            currentGpax: profile.currentGpax,
            targetFaculty: profile.targetFaculty,
            riasecScores: profile.riasecScores,
            completedActivitiesCount: profile.trackedActivities.length,
          },
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.advice) {
        setAdviceText(data.advice);
      } else {
        setAdviceText(isTh ? 'ขออภัย ไม่สามารถประมวลผลคำแนะนำได้ในขณะนี้' : 'Failed to retrieve AI advice.');
      }
    } catch (err) {
      console.error(err);
      setAdviceText(isTh ? 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์' : 'Network error connecting to advisor server.');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSop = async () => {
    if (!currentSop || currentSop.trim().length < 15) {
      alert(isTh ? 'กรุณากรอกข้อความ Statement of Purpose ในหน้า 3 ก่อนขอคำแนะนำ' : 'Please write your SOP draft on Page 3 first.');
      return;
    }

    setLoading(true);
    setSopFeedback(null);
    try {
      const res = await fetch('/api/gemini/sop-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sopDraft: currentSop,
          targetFaculty: profile.targetFaculty,
          targetUniversity: profile.targetUniversities[0] || 'Chulalongkorn University',
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.feedback) {
        setSopFeedback(data.feedback);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestedParagraph = () => {
    if (!sopFeedback?.suggestedParagraph) return;
    const sopPage = portfolioPages.find((p) => p.type === 'sop');
    if (sopPage) {
      const updatedBody = currentSop + '\n\n' + sopFeedback.suggestedParagraph;
      updatePortfolioPage(sopPage.pageNumber, { body: updatedBody });
      alert(isTh ? 'เพิ่มย่อหน้าที่แนะนำลงในหน้า 3 เรียบร้อยแล้ว!' : 'Applied suggested paragraph to Page 3!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isTh ? 'ที่ปรึกษา AI กลยุทธ์ TCAS' : 'TCAS Strategy & SOP AI Coach'}
              </h3>
              <p className="text-xs text-slate-500">
                {isTh ? 'วิเคราะห์โปรไฟล์และตรวจทาน Statement of Purpose' : 'Personalized admissions guidance and SOP feedback'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiAdvisorOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'strategy'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {isTh ? 'กลยุทธ์ภาพรวมรอบพอร์ต' : 'Admission Strategy'}
          </button>

          <button
            onClick={() => setActiveTab('sop')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'sop'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {isTh ? 'ตรวจทานเรียงความ (SOP Review)' : 'SOP Draft Review'}
          </button>
        </div>

        {/* Tab 1: Overall Strategy */}
        {activeTab === 'strategy' && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">
                {isTh ? 'ข้อมูลที่จะนำไปวิเคราะห์:' : 'Student Profile Snapshot:'}
              </div>
              <div>• {isTh ? `เกรดเฉลี่ย GPAX:` : `GPAX:`} {profile.currentGpax.toFixed(2)}</div>
              <div>• {isTh ? `คณะเป้าหมาย:` : `Target Faculty:`} {profile.targetFaculty}</div>
              <div>• {isTh ? `จำนวนกิจกรรมที่สะสม:` : `Tracked Activities:`} {profile.trackedActivities.length} {isTh ? 'รายการ' : 'items'}</div>
            </div>

            <button
              onClick={handleGetStrategyAdvice}
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isTh ? 'กำลังประมวลผลคำแนะนำ...' : 'Analyzing profile...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{isTh ? 'สร้างคำแนะนำกลยุทธ์เฉพาะตัว' : 'Generate Strategic Recommendations'}</span>
                </>
              )}
            </button>

            {adviceText && (
              <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                {adviceText}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: SOP Review */}
        {activeTab === 'sop' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">
                {isTh ? 'ร่าง Statement of Purpose ปัจจุบันของคุณ (จากหน้า 3):' : 'Current SOP Draft from Page 3:'}
              </span>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-36 overflow-y-auto italic line-clamp-4 text-slate-700">
                {currentSop || (isTh ? '(ยังไม่มีข้อความในหน้า 3)' : '(No text yet on Page 3)')}
              </div>
            </div>

            <button
              onClick={handleReviewSop}
              disabled={loading || !currentSop}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isTh ? 'กำลังวิเคราะห์เรียงความ...' : 'Evaluating SOP...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isTh ? 'ประเมินและให้ข้อเสนอแนะ SOP' : 'Review & Critique SOP Draft'}</span>
                </>
              )}
            </button>

            {sopFeedback && (
              <div className="space-y-3 pt-2 text-xs">
                {sopFeedback.strengths && sopFeedback.strengths.length > 0 && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <span className="font-bold text-emerald-900 block mb-1">
                      {isTh ? 'จุดเด่นของเรียงความ:' : 'Key Strengths:'}
                    </span>
                    <ul className="list-disc list-inside text-emerald-800 space-y-0.5">
                      {sopFeedback.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {sopFeedback.improvements && sopFeedback.improvements.length > 0 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="font-bold text-amber-900 block mb-1">
                      {isTh ? 'จุดที่ควรเสริมเพิ่มเติม:' : 'Areas to Strengthen:'}
                    </span>
                    <ul className="list-disc list-inside text-amber-800 space-y-0.5">
                      {sopFeedback.improvements.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {sopFeedback.suggestedParagraph && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <span className="font-bold text-blue-900 block mb-1">
                      {isTh ? 'ตัวอย่างประโยค/ย่อหน้าที่แนะนำเพิ่มเติม:' : 'Suggested Exemplary Paragraph:'}
                    </span>
                    <p className="text-blue-800 leading-relaxed italic mb-3">
                      "{sopFeedback.suggestedParagraph}"
                    </p>
                    <button
                      onClick={applySuggestedParagraph}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs"
                    >
                      {isTh ? '+ ใส่ย่อหน้านี้ลงในหน้า 3' : '+ Insert into Page 3'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
