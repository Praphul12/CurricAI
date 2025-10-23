// app.post("/api/generateLesson", async (req, res) => {
//   try {
//     const courseTitle = req.body.course;
//     const lessonTitle = req.body.lesson;
//     const moduleTitle = req.body.module;
//     // const topic = req.query.topic || "Introduction to APIS"; // optional query param
//     const lesson = await lessonGenerator(courseTitle,moduleTitle,lessonTitle);
//     res.status(200).json(lesson);
    
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to generate course" });
//   }
// });