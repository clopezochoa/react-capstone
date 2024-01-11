"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchImage } from "app/lib/image-fetch";

const Logo = () => {
  const [imgURL, setImgURL] = useState("");
  const [isIconLoaded, setIsIconLoaded] = useState(false);

  useEffect(() => {
    const path = fetchImage("dna", "ico", "svg");
    setImgURL(path);
    setIsIconLoaded(true);
  }, []);

  const [window_width, set_window_width] = useState(0);

  const updateWidth = () => {
    set_window_width(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  if (!isIconLoaded) {
    return <></>;
  } else {
    return <>
    <Link className="brand" href="/" >
      <div style={{alignSelf: "center", translate: "0pt -1.5pt"}}>Stay Healthy</div>
      <Image
        src={imgURL}
        alt="Logo"
        width={"48"}
        height={"48"}
        className="logo"
        style={{ display: window_width < 640 ? "none" : "flex" }}
      />
    </Link>
    </>
  }
};

export default Logo;