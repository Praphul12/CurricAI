export function generateCoursePrompt(topic) {
  return `
You are an expert curriculum designer.
Create a complete structured course outline for the topic "${topic}".

Return only valid JSON in this structure:
{
  "title": "<course title>",
  "description": "<brief overview>",
  "tags": ["<tag1>", "<tag2>", "<tag3>"],
  "modules": [
    {
      "title": "<module title>",
      "lessons": ["<lesson title 1>", "<lesson title 2>"]
    }
  ]
}

Guidelines:
- Progress logically from beginner to advanced topics.
- Include 4–6 modules, each with 3–5 lessons.
- Output raw JSON only, no markdown or commentary.
`;
}


export function generateLessonPrompt(course, module, lesson) {
  return `
You are an expert instructor preparing structured lesson content.

Course: "${course}"
Module: "${module}"
Lesson: "${lesson}"

Return only valid JSON like this:
{
  "title": "<lesson title>",
  "objectives": ["<objective1>", "<objective2>"],
  "content": [
    { "type": "heading", "text": "..." },
    { "type": "paragraph", "text": "..." },
    { "type": "code", "language": "python", "text": "..." },
    { "type": "video", "url": "search query" },
    {
      "type": "mcq",
      "question": "...",
      "options": ["...", "...", "..."],
      "answer": 1,
      "explanation": "..."
    }
  ]
}

Rules:
- Start with heading + intro paragraph.
- Add a code block only when relevant.
- End with 4–5 MCQs with explanations.
- Output raw JSON only.
`;
}

