import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI University & Portfolio Advisor Endpoint
app.post('/api/gemini/advisor', async (req: Request, res: Response) => {
  try {
    const { studentProfile, language = 'th' } = req.body;

    if (!aiClient) {
      // High-quality localized heuristic guidance fallback
      const isTh = language === 'th';
      return res.json({
        success: true,
        source: 'heuristic',
        advice: isTh
          ? `คำแนะนำกลยุทธ์ TCAS รอบ 1 Portfolio:\n1. มุ่งเน้นการคัดเลือกผลงานที่สะท้อน 'ความหลงใหลในสาขา' (Passion) มากกว่าปริมาณ 10 หน้าให้คุ้มค่าที่สุด\n2. เรียงลำดับหน้ากิจกรรมจากผลงานระดับชาติ/โอลิมปิก สอวน. ขึ้นก่อน แล้วตามด้วยค่ายวิชาการและโครงงาน\n3. ในหน้า Statement of Purpose ควรเล่า 'จุดเปลี่ยน' ที่ทำให้อยากเรียนคณะนี้ พร้อมยกตัวอย่างกิจกรรมที่ลงมือทำจริงแล้วได้เรียนรู้อะไร\n4. ตรวจสอบเกณฑ์ GPAX ขั้นต่ำและหน่วยกิตวิชาคณิต-วิทย์ของแต่ละมหาวิทยาลัยให้ครบถ้วน`
          : `TCAS Round 1 Portfolio Strategic Advice:\n1. Prioritize depth over volume: your 10 pages must demonstrate clear passion and discipline alignment.\n2. Organize activities from national/Olympiad competitions first, followed by university lab camps and practical projects.\n3. In your Statement of Purpose, clearly articulate your turning point moment and tie it directly to faculty professors or curriculum tracks.\n4. Ensure your minimum GPAX and prerequisite STEM/Language credits strictly comply with university announcements.`
      });
    }

    const prompt = `You are an elite TCAS (Thai University Central Admission System) admissions consultant and academic coach.
Student Profile:
- Grade: ${studentProfile?.grade || 'M.5'}
- Current GPAX: ${studentProfile?.currentGpax || '3.50'}
- Target Faculty: ${studentProfile?.targetFaculty || 'Engineering / Medicine / Computer Science'}
- Top Holland RIASEC Codes: ${JSON.stringify(studentProfile?.riasecScores || {})}
- Current Activities Count: ${studentProfile?.completedActivitiesCount || 0}
- Language of response: ${language === 'th' ? 'Thai language (สุภาพ เป็นทางการ และให้กำลังใจแก่นักเรียนไทย)' : 'English language (professional, encouraging, and clear)'}

Provide concise, highly actionable guidance for their TCAS Round 1 Portfolio submission:
1. Recommended specific activities or certifications they should complete next to strengthen their application.
2. How to structure their 10-page TCAS portfolio for maximum impact.
3. Common mistakes Thai students make in Round 1 and how to avoid them.
Keep total length under 300 words with clean bullet points.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({
      success: true,
      source: 'gemini',
      advice: response.text || '',
    });
  } catch (error: any) {
    console.error('Advisor error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate guidance',
    });
  }
});

// Statement of Purpose (SOP) Polish & Feedback Endpoint
app.post('/api/gemini/sop-feedback', async (req: Request, res: Response) => {
  try {
    const { sopDraft, targetFaculty, targetUniversity, language = 'th' } = req.body;

    if (!sopDraft || sopDraft.trim().length < 20) {
      return res.status(400).json({
        success: false,
        error: 'SOP draft is too short to analyze',
      });
    }

    if (!aiClient) {
      // Heuristic review
      const isTh = language === 'th';
      return res.json({
        success: true,
        source: 'heuristic',
        feedback: {
          strengths: isTh
            ? ['มีโครงสร้างเจตจำนงที่ชัดเจน', 'แสดงถึงความตั้งใจศึกษาต่อในระดับอุดมศึกษา']
            : ['Clear statement of academic intent', 'Direct enthusiasm for the major'],
          improvements: isTh
            ? ['ควรเพิ่มตัวอย่างโครงงานหรือปัญหาจริงที่ตนเองเคยแก้ไข', 'ระบุเหตุผลว่าทำไมต้องเป็นมหาวิทยาลัยแห่งนี้ (อาจารย์/หลักสูตรเฉพาะ)']
            : ['Provide concrete examples of projects or research problems solved', 'Highlight university-specific facilities, labs, or curriculum specializations'],
          suggestedParagraph: isTh
            ? 'ความมุ่งมั่นของข้าพเจ้าไม่ได้จำกัดอยู่เพียงในห้องเรียน แต่ข้าพเจ้าได้ต่อยอดผ่านการเข้าร่วมกิจกรรมและการศึกษาค้นคว้าด้วยตนเอง ซึ่งทำให้ข้าพเจ้าพร้อมที่จะเป็นกำลังสำคัญในหลักสูตรนี้'
            : 'My commitment extends beyond high school coursework into hands-on research and collaborative initiatives, solidifying my readiness to contribute actively to this university department.'
        }
      });
    }

    const prompt = `You are a university admissions committee reviewer reviewing a Thai high school student's Statement of Purpose (SOP) for TCAS Round 1.
Target Faculty: ${targetFaculty || 'General'}
Target University: ${targetUniversity || 'Top Thai University'}
Draft Content:
"""
${sopDraft}
"""
Language of response: ${language === 'th' ? 'Thai' : 'English'}

Evaluate this draft and respond with strict JSON in the following format:
{
  "strengths": ["bullet 1", "bullet 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "suggestedParagraph": "an exemplary rewritten paragraph polishing their central passion statement"
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      source: 'gemini',
      feedback: parsed,
    });
  } catch (error: any) {
    console.error('SOP review error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to review SOP',
    });
  }
});

// Setup Vite middleware for development, or serve built assets in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TCAS Compass server listening on http://localhost:${PORT}`);
  });
}

startServer();
