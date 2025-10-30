import html2pdf from "html2pdf.js";
import './index.css';
const LessonPdf = ({ lesson }) => {
  const handleDownload = () => {
    const element = document.querySelector(".lesson-container");
    if (!element) return;

    const clone = element.cloneNode(true);
    const videoBlock = lesson.find((b) => b.type === "video");

    if (videoBlock) {
      const videoIdMatch = videoBlock.url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      const container = document.createElement("div");
      container.style.marginTop = "20px";
      container.style.textAlign = "center";

      if (videoId) {
        const link = document.createElement("a");
        link.href = videoBlock.url;
        link.target = "_blank";

        const img = document.createElement("img");
        img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        img.alt = "YouTube video thumbnail";
        img.style.width = "80%";
        img.style.borderRadius = "8px";
        img.style.marginBottom = "5px";

        const caption = document.createElement("p");
        caption.textContent = "Click thumbnail to watch on YouTube";
        caption.style.fontSize = "14px";
        caption.style.color = "#124559";

        link.appendChild(img);
        container.appendChild(link);
        container.appendChild(caption);
      } else {
        const text = document.createElement("p");
        text.textContent = `🎬 Video: ${videoBlock.url}`;
        container.appendChild(text);
      }

      clone.appendChild(container);
    }

    const title =
      lesson.find((block) => block.type === "heading")?.text || "Lesson";

    const options = {
      margin: 0.5,
      filename: `${title}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    // pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };

    setTimeout(() => {
      html2pdf().set(options).from(clone).save();
    }, 300);
  };

  return (
    <button onClick={handleDownload} className="btn-download">
      Download as PDF
    </button>
  );
};

export default LessonPdf;
