"use client";

import { useEffect, useState } from "react";
import ImgFromCloud from "../utils/ImageFromCloud";
import useWindow from "app/hooks/useWindow";

const Icon = () => {
  const window_width = useWindow();
  return <>
    <ImgFromCloud filename="author" filetype="ico" format="svg" width='48' height='48' altText='Author Icon' style={{ marginInlineEnd:'20px', display: window_width < 840 ? "none" : "flex" }}/>
  </>
};

export default Icon;