import React, { CSSProperties, useEffect, useState } from 'react'
import Image from "next/image";
import { fetchImage } from 'app/lib/image-fetch';

interface ImgCloudProps {
  filename: string;
  filetype: string;
  format: string;
  width: number | `${number}`;
  height: number | `${number}`;
  altText?: string;
  style?: CSSProperties;
}

const ImgFromCloud: React.FC<ImgCloudProps> = ({ filename, filetype, format, width, height, altText, style }) => {
  const [imgURL, setImgURL] = useState("");
  const [isImgLoaded, setIsIconLoaded] = useState(false);
  
  useEffect(() => {
    const path = fetchImage(filename, filetype, format);
    setImgURL(path);
    setIsIconLoaded(true);
  }, [filename, filetype, format]);
  
  
  if (!isImgLoaded) {
    return <></>;
  } else {
    return <>
      <Image
        src={imgURL}
        alt={altText ?? ""}
        width={`${width}`}
        height={`${height}`}
        style={style}
      />
    </>
  }
}

export default ImgFromCloud