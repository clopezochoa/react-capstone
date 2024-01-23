"use client";

import { useEffect } from "react";

const body = document.querySelector('body');
const resizeWindow = () => {
  if (body) {
    body.style.height = `${window.innerHeight}px`;
    const footer = body.querySelector('footer')!;
    footer.style.visibility = "visible"; 
  }
};

export default function ClientApplication({children}: any) {
  useEffect(() => {
    resizeWindow();
    window.removeEventListener("resize", resizeWindow)
    window.addEventListener('resize', resizeWindow);
  });

  return children;
}