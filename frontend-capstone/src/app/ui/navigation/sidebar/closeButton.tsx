"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchImage } from "app/lib/image-fetch";


const CloseButton = () => {
  const [imgURL, setImgURL] = useState("");
  const [isIconLoaded, setIsIconLoaded] = useState(false);

  useEffect(() => {
    const path = fetchImage("Close.png", "ico");
    setImgURL(path);
    setIsIconLoaded(true);
  }, []);

  if (!isIconLoaded) {
    return <></>;
  } else {
    return <>
      <Image
        src={imgURL}
        alt="Close Button"
        width={"40"}
        height={"40"}
        className="me-5"
      />
    </>
  }
};
export default CloseButton;