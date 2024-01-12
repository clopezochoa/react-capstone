"use client";

import { useEffect, useState } from "react";
import ImgFromCloud from "../ImageFromCloud";

const Icon = () => {
  const [window_width, set_window_width] = useState(0);

  const updateWidth = () => {
    set_window_width(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  return <>
    <ImgFromCloud filename="author" filetype="ico" format="svg" width='48' height='48' altText='Author Icon' style={{ marginInlineEnd:'20px', display: window_width < 840 ? "none" : "flex" }}/>
  </>
};

export default Icon;