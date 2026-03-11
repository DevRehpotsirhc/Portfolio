import { useCallback } from "react";
import cv from "../assets/CV - Christopher Aponte.pdf";

export const useDownloadCV = () => {
  const downloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = cv;
    link.download = "Christopher_Aponte_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return downloadCV;
};