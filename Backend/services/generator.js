import dotenv from 'dotenv';
import { generateCoursePrompt, generateLessonPrompt } from './prompts.js';
dotenv.config();

export const courseGenerator = async (topic) => {
    try {
    // console.log(process.env.OPEN_ROUTER_API);
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_ROUTER_API}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: generateCoursePrompt(topic) // call the function
          },
          {
            role: 'user',
            content: `Create a JSON course outline for the topic: "${topic}"`
          }
        ]
      })
    });

    const data = await res.json();
    // console.log(data);
    return data;

  } catch (err) {
    console.error("Error generating course:", err);
  }
};

export const lessonGenerator = async (course,module,lesson) => {
    try {
    console.log(process.env.OPEN_ROUTER_API);
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_ROUTER_API}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: generateLessonPrompt(course,module,lesson) // call the function
          },
          {
            role: 'user',
            content:`Generate a detailed structured JSON lesson for "${lesson}" under "${module}" in "${course}".`,
          }
        ]
      })
    });

    const data = await res.json();
    // console.log(data);
    return data;

  } catch (err) {
    console.error("Error generating lesson:", err);
  }
};

