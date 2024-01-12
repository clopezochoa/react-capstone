"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImgFromCloud from "app/ui/ImageFromCloud";

const Logo = () => {


  const [window_width, set_window_width] = useState(0);

  const updateWidth = () => {
    set_window_width(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  return <>
    <Link className="brand" href="/" >
      <div style={{alignSelf: "center", translate: "0pt -1.5pt"}}>Stay Healthy</div>
      <ImgFromCloud filename="dna" filetype="ico" format="svg" width='48' height='48' altText='logo' style={{ display: window_width < 640 ? "none" : "flex" }}/>
    </Link>
  </>
};

export default Logo;