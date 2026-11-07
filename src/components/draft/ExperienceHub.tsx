import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMMUNITY_DISCUSSIONS, EXTRACURRICULAR_ACTIVITIES } from '../../data/tcasData';
import { CheckCircle2, MessageSquare, Users, Sparkles, Plus, ThumbsUp, ArrowRight, Share2, Award, Briefcase, BookOpen } from 'lucide-react';
import { ActivitiesView } from '../ActivitiesView';

export const ExperienceHub: React.FC = () => {
  const { language, experienceView, setExperienceView, profile, addTrackedActivity } = useApp();
  const isTh = language === 'th';

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionBody, setNewQuestionBody] = useState('');
  const [isAskingOpen, setIsAskingOpen] = useState(false);
  const [discussions, setDiscussions] = useState(COMMUNITY_DISCUSSIONS);

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      authorName: profile.name || (isTh ? 'นักเรียน ม.ปลาย' : 'High School Student'),
      authorGrade: `${profile.grade} / ${profile.school || 'Thailand'}`,
      targetMajor: profile.targetFaculty,
      timeAgoTh: 'เพิ่งโพสต์',
      timeAgoEn: 'Just now',
      titleTh: newQuestionTitle,
      titleEn: newQuestionTitle,
      bodyTh: newQuestionBody || newQuestionTitle,
      bodyEn: newQuestionBody || newQuestionTitle,
      likes: 1,
      commentsCount: 0,
      tags: [profile.targetFaculty, 'TCAS', 'คำถามเด็กม.ปลาย'],
    };

    setDiscussions([newPost, ...discussions]);
    setNewQuestionTitle('');
    setNewQuestionBody('');
    setIsAskingOpen(false);
  };

  const handleLikePost = (postId: string) => {
    setDiscussions(discussions.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  if (experienceView === 'activities') {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setExperienceView('hub')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm"
          >
            ← {isTh ? 'กลับสู่หน้า Experience' : 'Back to Experience Hub'}
          </button>
        </div>
        <ActivitiesView />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Banner matching draft aesthetic */}
      <div className="text-center pt-2 pb-1">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-600 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-500/25">
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>{isTh ? 'ประสบการณ์ & การเชื่อมต่อ (Experience)' : 'Experience'}</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {isTh ? 'พัฒนาทักษะ สะสมกิจกรรมค่าย และแลกเปลี่ยนข้อมูลกับเพื่อนและรุ่นพี่' : 'Build practical skills, explore competitions, and connect with peers'}
        </p>
      </div>

      {/* The 2 Signature Cards from Draft Style */}
      <div className="space-y-5">
        {/* Card 1: Experience (Green Card #D4F6C5) */}
        <div className="p-6 rounded-3xl bg-[#D4F6C5] border-2 border-[#86EFAC] shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                2
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isTh ? 'ประสบการณ์ (Experience)' : 'Experience'}
              </h3>
            </div>

            <button
              onClick={() => setExperienceView('activities')}
              className="text-xs font-bold text-emerald-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-xl transition-colors shadow-sm flex items-center gap-1"
            >
              <span>{isTh ? 'เปิดคลังกิจกรรม' : 'Explore All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-emerald-950 font-medium mb-4">
            {isTh
              ? 'รวบรวมประสบการณ์จริงเพื่อสร้างความโดดเด่นในแฟ้มสะสมผลงานรอบพอร์ต'
              : 'Cultivate tangible experiences across foundational disciplines to excel in Round 1.'}
          </p>

          {/* 5 Checkmark Items matching Draft */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
            {[
              { id: 'study', labelTh: 'Study experience (ประสบการณ์การเรียนรู้เชิงลึก)', labelEn: 'Study experience' },
              { id: 'skills', labelTh: 'Practical skills (ทักษะภาคปฏิบัติ & โครงงาน)', labelEn: 'Practical skills' },
              { id: 'internships', labelTh: 'Internships (การฝึกงาน & ดูงานโรงพยาบาล/บริษัท)', labelEn: 'Internships' },
              { id: 'competitions', labelTh: 'Competitions (การแข่งขันโอลิมปิก & แฮกกาธอน)', labelEn: 'Competitions' },
              { id: 'workshops', labelTh: 'Workshops (เวิร์กช็อปแล็บ & ค่ายวิชาการ)', labelEn: 'Workshops' },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => setExperienceView('activities')}
                className="flex items-center gap-2.5 p-2.5 bg-white/80 hover:bg-white rounded-xl text-xs font-semibold text-slate-900 transition-colors cursor-pointer border border-emerald-200/60"
              >
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{isTh ? item.labelTh : item.labelEn}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-emerald-300/60 text-xs text-emerald-900">
            <span>{isTh ? `คุณสะสมไว้แล้ว ${profile.trackedActivities.length} กิจกรรม` : `You have ${profile.trackedActivities.length} tracked activities`}</span>
            <button
              onClick={() => setExperienceView('activities')}
              className="font-bold underline hover:text-emerald-950"
            >
              {isTh ? '+ เพิ่มกิจกรรมใหม่' : '+ Add New Activity'}
            </button>
          </div>
        </div>

        {/* Card 2: Connect (Red/Pink Card #FEE2E2) */}
        <div className="p-6 rounded-3xl bg-[#FEE2E2] border-2 border-[#FCA5A5] shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                2
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isTh ? 'เชื่อมต่อเพื่อน & รุ่นพี่ (Connect)' : 'Connect'}
              </h3>
            </div>

            <button
              onClick={() => setIsAskingOpen(!isAskingOpen)}
              className="text-xs font-bold text-red-900 bg-white/80 hover:bg-white px-3 py-1.5 rounded-xl transition-colors shadow-sm flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isTh ? 'ตั้งคำถามใหม่' : 'Ask Question'}</span>
            </button>
          </div>

          <p className="text-xs text-red-950 font-medium mb-4">
            {isTh
              ? 'แลกเปลี่ยนประสบการณ์จริงกับรุ่นพี่ที่เคยติด TCAS รอบพอร์ต และหาเพื่อนร่วมทีมแข่งขัน'
              : 'Ask questions about college life, share your story, and discover suggested peers.'}
          </p>

          {/* 3 Checkmark Items from Draft */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-red-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>{isTh ? 'ถามคำถามเกี่ยวกับการเรียนมหาวิทยาลัย (Ask questions about college)' : 'Ask questions about college'}</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-red-200/60">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>{isTh ? 'แบ่งปันประสบการณ์การทำกิจกรรม (Share experience)' : 'Share experience'}</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl text-xs font-semibold text-slate-900 border border-red-200/60">
              <Users className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>{isTh ? 'เพิ่มเพื่อนผ่านรายชื่อแนะนำ (Add friends through suggested contacts)' : 'Add friends through suggested contacts'}</span>
            </div>
          </div>

          {/* Ask Question Form Drawer */}
          {isAskingOpen && (
            <form onSubmit={handlePostQuestion} className="bg-white p-4 rounded-2xl border border-red-200 mb-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-900">
                {isTh ? 'โพสต์คำถามถึงรุ่นพี่และเพื่อนๆ' : 'Post Question to Community'}
              </h4>
              <input
                type="text"
                required
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
                placeholder={isTh ? 'หัวข้อคำถาม เช่น ควรใส่เกียรติบัตรค่ายกี่ใบดี?' : 'Question title...'}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <textarea
                rows={2}
                value={newQuestionBody}
                onChange={(e) => setNewQuestionBody(e.target.value)}
                placeholder={isTh ? 'รายละเอียดเพิ่มเติม...' : 'More details...'}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAskingOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  {isTh ? 'ยกเลิก' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  {isTh ? 'โพสต์คำถาม' : 'Post'}
                </button>
              </div>
            </form>
          )}

          {/* Live Discussions Feed */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {isTh ? 'กระทู้ถาม-ตอบล่าสุด' : 'Recent Community Threads'}
            </h4>

            {discussions.map((post) => (
              <div key={post.id} className="p-4 bg-white rounded-2xl border border-red-100 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800">{post.authorName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.authorGrade}</span>
                  </div>
                  <span>{isTh ? post.timeAgoTh : post.timeAgoEn}</span>
                </div>

                <h5 className="text-xs font-bold text-slate-900 leading-snug">
                  {isTh ? post.titleTh : post.titleEn}
                </h5>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isTh ? post.bodyTh : post.bodyEn}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-3 text-slate-500">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-1 hover:text-red-600 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentsCount} {isTh ? 'ความเห็น' : 'comments'}</span>
                    </span>
                  </div>

                  <span className="text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-semibold">
                    {post.targetMajor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
