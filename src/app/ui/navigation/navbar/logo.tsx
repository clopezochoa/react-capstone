"use client";

import Link from "next/link";
import ImgFromCloud from "app/ui/utils/ImageFromCloud";
import useWindow from "app/hooks/useWindow";

const Logo = () => {
  const window_width = useWindow();

  return <>
    <Link className="brand" href="/" >
      <div style={{alignSelf: "center", translate: "0pt -1.5pt"}}>Stay Healthy</div>
      <ImgFromCloud filename="dna" filetype="ico" format="svg" width='48' height='48' altText='logo' style={{ display: window_width < 640 ? "none" : "flex" }}/>
    </Link>
  </>
};

export default Logo;