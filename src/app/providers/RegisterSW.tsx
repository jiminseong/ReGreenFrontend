"use client";

import { useEffect } from "react";

export const RegisterSW = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW 등록됨:", registration.scope);
        })
        .catch((error) => {
          console.error("SW 등록 실패:", error);
        });
    }
  }, []);

  return null;
};
