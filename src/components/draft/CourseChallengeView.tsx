import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COURSE_CHALLENGES } from '../../data/tcasData';
import { CourseChallengeItem } from '../../types/tcas';
import { Trophy, CheckCircle, ArrowLeft, Award, Sparkles, Check, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CourseChallengeView: React.FC = () => {
  const { language, profile, completeChallenge, setDiscoverView } = useApp();
  const isTh = language === 'th';

  const [activeChallenge, setActiveChallenge] = useState<CourseChallengeItem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (activeChallenge && idx === activeChallenge.correctIndex) {
      setIsCorrect(true);
      completeChallenge(activeChallenge.id, activeChallenge.points);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextChallenge = () => {
    setActiveChallenge(null);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setDiscoverView('hub')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isTh ? 'กลับหน้าค้นพบ' : 'Back to Discover'}</span>
        </button>

        {/* Total Points Badge */}
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold font-mono">
          <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{profile.points} {isTh ? 'แต้ม' : 'PTS'}</span>
        </div>
      </div>

      {!activeChallenge ? (
        /* Challenges List */
        <div className="space-y-4">
          <div className="bg-amber-100/60 border border-amber-200/80 rounded-2xl p-5 text-amber-950">
            <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-amber-700">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>{isTh ? 'ภารกิจทดสอบความรู้ตามสาขา' : 'Course Challenge Arena'}</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {isTh ? 'ท้าทายความรู้ เตรียมความพร้อมสู่มหาวิทยาลัย' : 'Test Your Major Knowledge'}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {isTh
                ? 'ตอบคำถามสั้นๆ เพื่อทดสอบว่าคุณมีความเข้าใจและคุ้นเคยกับสาขาวิชาในฝันมากแค่ไหน พร้อมสะสมแต้มผลงานใส่โปรไฟล์!'
                : 'Solve realistic problem scenarios across engineering, medicine, law, and business to earn achievement badges!'}
            </p>
          </div>

          <div className="space-y-3">
            {COURSE_CHALLENGES.map((challenge, idx) => {
              const isDone = profile.completedChallengeIds.includes(challenge.id);
              return (
                <div
                  key={challenge.id}
                  onClick={() => {
                    setActiveChallenge(challenge);
                    setSelectedAnswer(null);
                    setIsAnswered(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isDone
                      ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-100 text-amber-800 group-hover:bg-amber-500 group-hover:text-white transition-colors'
                    }`}>
                      {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>{isTh ? challenge.majorCategoryTh : challenge.majorCategoryEn}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-amber-600">+{challenge.points} pts</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                        {isTh ? challenge.titleTh : challenge.titleEn}
                      </h4>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all">
                    {isDone ? (isTh ? 'ทำแล้ว' : 'Done') : (isTh ? 'เริ่มทำ' : 'Start')} →
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active Challenge Question */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-amber-700 uppercase tracking-wide">
              {isTh ? activeChallenge.majorCategoryTh : activeChallenge.majorCategoryEn}
            </span>
            <span className="font-bold font-mono text-amber-600">+{activeChallenge.points} PTS</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {isTh ? activeChallenge.questionTh : activeChallenge.questionEn}
          </h3>

          <div className="space-y-2.5">
            {(isTh ? activeChallenge.optionsTh : activeChallenge.optionsEn).map((opt, i) => {
              const isSelected = selectedAnswer === i;
              const isRight = i === activeChallenge.correctIndex;

              let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';
              if (isAnswered) {
                if (isRight) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnStyle = 'border-red-400 bg-red-50 text-red-950';
                } else {
                  btnStyle = 'border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isRight && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={`p-4 rounded-xl text-xs space-y-2 ${
              isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {isCorrect ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>{isTh ? 'ถูกต้อง! ยอดเยี่ยมมาก' : 'Correct! Great job!'}</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-red-600" />
                    <span>{isTh ? 'ยังไม่ถูกต้อง' : 'Not quite right'}</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed">
                {isTh ? activeChallenge.explanationTh : activeChallenge.explanationEn}
              </p>

              <div className="pt-2">
                <button
                  onClick={handleNextChallenge}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold text-xs hover:bg-slate-800 transition-colors"
                >
                  {isTh ? 'ดูภารกิจอื่นต่อไป' : 'View Other Challenges'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
