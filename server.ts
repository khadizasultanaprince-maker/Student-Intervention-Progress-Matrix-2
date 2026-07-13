import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// API route for AI suggestions
app.post("/api/ai-suggestion", async (req, res) => {
  try {
    const {
      studentName,
      studentClass,
      readingWeaknesses,
      writingWeaknesses,
      behavior,
      learningStyle,
      baselineStatus,
      currentStatus,
      weeklyProgress,
    } = req.body;

    if (!ai) {
      return res.status(200).json({
        suggestion: `⚠️ এআই সাজেশন সক্রিয় করার জন্য সিস্টেমে GEMINI_API_KEY কনফিগার করা আবশ্যক। দয়া করে সেটিংস > সিক্রেটস প্যানেলে কী সেট করুন।

বিকল্প পরামর্শ (অটো-জেনারেটেড):
১. শিক্ষার্থীর শিখন ধরন (${learningStyle || 'ভিজ্যুয়াল'}) অনুযায়ী বর্ণমালা চার্ট ও ছবিযুক্ত বই ব্যবহার করুন।
২. পড়া ও লেখার মধ্যে সম্পর্ক তৈরি করতে প্রতিদিন ছোট ছোট অনুচ্ছেদ অনুশীলন করান।
৩. আগামী একমাস নিয়মিত পর্যবেক্ষণ করুন এবং অভিভাবকের সাথে সাপ্তাহিক যোগাযোগ বজায় রাখুন।`,
      });
    }

    const prompt = `
You are an expert child psychologist and specialized educator for struggling students in Bangladesh primary and secondary schools.
Provide a highly personalized, practical, and empathetic educational strategy and intervention plan for the next 1 month (আগামী ১ মাস) in Bengali language.

Student Details:
- Name: ${studentName || "শিক্ষার্থী"}
- Class: ${studentClass || "N/A"}
- Learning Style: ${learningStyle || "N/A"}
- Behavior & Attitude: ${behavior || "N/A"}
- Baseline Status: ${baselineStatus || "N/A"}
- Current Status: ${currentStatus || "N/A"}

Diagnostic Weakness Grid (পড়া ও লেখার দুর্বলতা):
* Reading (পড়া):
  - Bangla: ${readingWeaknesses?.bangla || "None"}
  - English: ${readingWeaknesses?.english || "None"}
  - Math: ${readingWeaknesses?.math || "None"}
* Writing (লেখা):
  - Bangla: ${writingWeaknesses?.bangla || "None"}
  - English: ${writingWeaknesses?.english || "None"}
  - Math: ${writingWeaknesses?.math || "None"}

4-Week/1-Month Progress Tracking:
- Week 1: ${weeklyProgress?.week1 || "N/A"}
- Week 2: ${weeklyProgress?.week2 || "N/A"}
- Week 3: ${weeklyProgress?.week3 || "N/A"}
- Week 4: ${weeklyProgress?.week4 || "N/A"}

Please analyze these detailed weaknesses and weekly progress trend, and formulate:
1. **১ মাসের অ্যাকশন প্ল্যান (1-Month Detailed Plan)** with weekly targets in Bengali.
2. **শিক্ষকের জন্য বিশেষ কৌশল (Intervention Strategies)** based on their Learning Style (${learningStyle}).
3. **অভিভাবকের দায়িত্ব (Parental Guidance Tasks)** to practice at home.
4. **মনস্তাত্ত্বিক দিক নির্দেশনা (Psychological & Behavioral Guidance)** to boost confidence and address "${behavior}".

Keep the tone encouraging, professional, and easy to read. Use bullet points and clean formatting with Bengali language only.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional educational counselor specializing in student remediation plans.",
      },
    });

    const suggestion = response.text || "দুঃখিত, কোনো সাজেশন জেনারেট করা সম্ভব হয়নি।";
    res.json({ suggestion });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate suggestion." });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
