"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchImage } from "app/lib/image-fetch";

const Logo = () => {
  const [imgURL, setImgURL] = useState("");
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    const path = fetchImage("Biotech.png", "ico");
    setImgURL(path);
    setIsLogoLoaded(true);
  }, []);

  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  if (!isLogoLoaded) {
    return <></>;
  } else {
    return <>
    <Link className="brand" href="/" style={{ display: width < 400 ? "none" : "flex" }}>
      <div style={{alignSelf: "center", translate: "0pt -1.5pt"}}>Stay Healthy</div>
      <Image
        src={imgURL}
        alt="Logo"
        width={"48"}
        height={"48"}
        className="logo"
      />
    </Link>
    </>
  }
};

export default Logo;