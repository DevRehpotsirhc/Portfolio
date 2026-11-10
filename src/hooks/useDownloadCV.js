import { useCallback } from "react";
import cv from "../assets/CV - Christopher Aponte.pdf";
import { profile } from "../data";

export const useDownloadCV = () => {
  const downloadCV = useCallback(() => {
    const link = document.createElement("a");
    link.href = cv;
    link.download = profile.cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return downloadCV;
};