'use client'

import ImgFromCloud from "app/ui/utils/ImageFromCloud";

export const useIcon = ({window_width}: {window_width: number}) => {
  return <>
    <ImgFromCloud filename="author" filetype="ico" format="svg" width='48' height='48' altText='Author Icon' style={{ marginInlineEnd:'20px', display: window_width < 840 ? "none" : "flex" }}/>
  </>
};