'use client'

import React, { useEffect, useRef, useState } from 'react';
import 'styles/Tips.css'
import 'styles/buttons.css'
import { maitree } from 'app/lib/fonts';
import { Circle } from './symbols';
import { Tip } from 'app/lib/types';
import ImgFromCloud from './ImageFromCloud';
import {useWindowWidth} from 'app/hooks/useWindow';

const minHeight = 200;
const lowerPad = 30;

const AdviceCard = ({tip, collapse}: {tip: Tip, collapse: boolean}) => {
  const content = useRef(null);
  const width = useWindowWidth(1920);
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  }

  useEffect(() => {
    setOpen(false);
  }, [collapse]);

  useEffect(() => {
    const element = content.current;
    if(element) {
      const child = (element as HTMLDivElement);
      const parent =child?.parentElement;
      if(open) {
        parent?.setAttribute("style", `height: ${child.clientHeight + lowerPad}px`)
      } else {
        parent?.setAttribute("style", `height: ${minHeight}px`)
      }
    }
  }, [open, width])
  
  return (
    <div className="bento-cell"
     style={{height:`${minHeight}px`}}
     >
      <div ref={content} style={{height:"fit-content"}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem'}}>
          <Circle color={"#7A7A7A"} size={24}></Circle>
          <div className='read-button' onClick={toggle}>{!open ? "Read More" : "Read Less"}</div>
        </div>
        <h3>{tip.title}</h3>
        <h4>{tip.subtitle}</h4>
        <p className={maitree.className}>{tip.body}</p>
        <div className='img'>
          {tip.img ? <ImgFromCloud filename={tip.img.name} filetype={tip.img.type} format={tip.img.format} width={1000} height={1000} altText={""} className='img-border' /> : null}
        </div>
      </div>
    </div>
  );
};

export default AdviceCard;