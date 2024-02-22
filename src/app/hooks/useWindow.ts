'use client'


import React, { useEffect, useState } from 'react'

export function useWindowWidth(initial: number) {
  const [window_width, set_window_width] = useState(initial);
  
  const updateWidth = () => {
    set_window_width(window.innerWidth);
  };
  
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);
  return window_width;
}

export function useWindowHeight(initial: number) {
  const [window_height, set_window_height] = useState(initial);
  
  const updateHeight = () => {
    set_window_height(window.innerHeight);
  };
  
  useEffect(() => {
    window.addEventListener("resize", updateHeight);
    updateHeight();
  }, []);
  return window_height;
}