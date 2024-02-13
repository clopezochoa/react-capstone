import React, { CSSProperties, useEffect, useState } from 'react'
import Image from "next/image";
import { fetchImage } from 'app/lib/image-fetch';
import { InputEvent } from 'app/lib/types';

interface ImgCloudProps {
  filename: string;
  filetype: string;
  format: string;
  width: number | `${number}`;
  height: number | `${number}`;
  altText?: string;
  style?: CSSProperties;
  className?: string;
  onClick?: (event: InputEvent) => void;
}

const ImgFromCloud: React.FC<ImgCloudProps> = ({ filename, filetype, format, width, height, altText, style, className, onClick }) => {
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
        className={className}
        onClick={onClick}
      />
    </>
  }
}

export default ImgFromCloud