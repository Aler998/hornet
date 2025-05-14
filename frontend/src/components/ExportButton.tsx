import { FC } from "react";
import { PDFDocument } from "pdf-lib";
import html2canvas from "html2canvas";
import { IoMdDownload } from "react-icons/io";

type ExportPdfProps = {
  immagini: string[];
};

const ExportPdfButton: FC<ExportPdfProps> = ({ immagini }) => {
  const exportPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const A4_WIDTH = 595.28;
    const A4_HEIGHT = 841.89;

    // --------------------
    // 📄 1. Prima sezione
    // --------------------
    const section1 = document.getElementById("details");
    if (section1) {
      const canvas = await html2canvas(section1, { scale: 2 });
      const imageData = canvas.toDataURL("image/png");
      const img = await pdfDoc.embedPng(imageData);

      const dims = img.scaleToFit(A4_WIDTH, A4_HEIGHT);
      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      page.drawImage(img, {
        x: 0,
        y: A4_HEIGHT - dims.height,
        width: dims.width,
        height: dims.height,
      });
    }

    // --------------------
    // 🖼️ 2. Sezione immagini (layout fluido)
    // --------------------
    const MAX_WIDTH = 150;
    const MAX_HEIGHT = 150;
    const MARGIN = 20;
    const SPACING = 10;

    let x = MARGIN;
    let y = A4_HEIGHT - MARGIN;

    let page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

    for (const src of immagini) {
      try {
        const canvas = await loadImageFromUrlToCanvas(src);
        const dataUrl = canvas.toDataURL("image/jpeg");
        const img = await pdfDoc.embedJpg(dataUrl);

        const { width: drawWidth, height: drawHeight } = scaleToFit(
          canvas.width,
          canvas.height,
          MAX_WIDTH,
          MAX_HEIGHT,
        );

        if (x + drawWidth > A4_WIDTH - MARGIN) {
          x = MARGIN;
          y -= drawHeight + SPACING;

          if (y - drawHeight < MARGIN) {
            page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
            x = MARGIN;
            y = A4_HEIGHT - MARGIN;
          }
        }

        page.drawImage(img, {
          x,
          y: y - drawHeight,
          width: drawWidth,
          height: drawHeight,
        });

        x += drawWidth + SPACING;
      } catch (err) {
        console.warn("Errore caricamento immagine:", err);
      }
    }

    // --------------------
    // 💾 Salva PDF
    // --------------------
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportPDF}
      className="text-white bg-honda px-5 py-1 border-none cursor-pointer text-base flex items-center justify-center"
    >
      Esporta
      <IoMdDownload className="ml-2" />
    </button>
  );
};

export default ExportPdfButton;

const loadImageFromUrlToCanvas = async (
  url: string,
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      } else {
        reject("Errore nel creare il contesto canvas");
      }
    };
    img.onerror = (err) => reject(err);
    img.src = url;
  });
};

function scaleToFit(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
) {
  const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
  return {
    width: originalWidth * ratio,
    height: originalHeight * ratio,
  };
}
