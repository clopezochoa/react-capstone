"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchImage } from "app/lib/image-fetch";

const Icon = () => {
  const [imgURL, setImgURL] = useState("");
  const [isIconLoaded, setIsIconLoaded] = useState(false);

  useEffect(() => {
    const path = fetchImage("author", "ico", "svg");
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
        alt="Author Icon"
        width={"48"}
        height={"48"}
        className="me-4"
        style={{ display: window_width < 840 ? "none" : "flex" }}
      />
    </>
  }
};

export default Icon;