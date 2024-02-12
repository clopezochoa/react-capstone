"use client";

import { useEffect } from "react";


export default function ClientApplication({children}: any) {
  useEffect(() => {
    const body = document.querySelector('body');
    const resizeWindow = () => {
      if (body) {
        body.style.height = `${window.innerHeight}px`;
        const footer = body.querySelector('footer')!;
        footer.style.visibility = "visible"; 
      }
    };
    resizeWindow();
    window.removeEventListener("resize", resizeWindow)
    window.addEventListener('resize', resizeWindow);
  });

  return children;
}