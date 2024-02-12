import React, { useEffect, useState } from 'react'

function useWindow() {
  const [window_width, set_window_width] = useState(1920);
  
  const updateWidth = () => {
    set_window_width(window.innerWidth);
  };
  
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);
  return window_width;
}

export default useWindow