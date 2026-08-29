import pptxgen from "pptxgenjs";

const COLORS = {
  primary: "2563EB",
  secondary: "OF172A",
  text: "334155",
  light: "F8FAFC",
  border: "E2E8F0",
  white: "FFFFFF",
  muted: "64748B",
};

export const generatePpt = async (data) => {
  const ppt = new pptxgen();
  ((ppt.layout = "LAYOUT_WIDE"), (ppt.author = "AgentVerseAI"));
  ppt.title = data.title;
  ppt.subject = data.title;
  ppt.company = "AgentVerseAI";
  ppt.lang = "en-US";
  ppt.theme = {
    headFontFace: "Aptos",
    bodyFontFace: "Aptos",
    lang: "en-US",
  };

  const addCover = () => {
    const slide = ppt.addSlide();
    slide.background = {
      color: COLORS.primary,
    };
    slide.addShape(ppt.ShapeType.rect);
  };

  addCover(ppt, data);
  data?.slides?.forEach(
    (s, i) =>
      addContentSlide(ppt, s.title, s.points, i + 1, data.slides.length, {
        x: 0,
        y: 0,
        w: 13.33,
        h: 0.18,
        fill: {
          color: "#60A5FA",
        },
        line: {
          color: "#60A5FA",
        },
      }),

    slide.addText(data.title, {
      x: 0.7,
      y: 1.7,
      w: 12,
      h: 0.8,
      align: "center",
      color: COLORS.white,
      bold: true,
      fontSize: 28,
    }),
  );

  addThankYou(ppt);

  return ppt;
};
