"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchImage } from "app/lib/image-fetch";


const MenuButton = () => {
  const [imgURL, setImgURL] = useState("");
  const [isIconLoaded, setIsIconLoaded] = useState(false);

  useEffect(() => {
    const path = fetchImage("Menu.png", "ico");
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
      <Image
        src={imgURL}
        alt="Menu Button"
        width={"40"}
        height={"40"}
        style={{ display: window_width > 1090 ? "none" : "flex" }}
        className="me-5"
      />
    </>
  }
};
export default MenuButton;