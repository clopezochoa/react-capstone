import React, { useEffect, useState } from 'react'
import 'styles/utils.css'

function CollapseServiceFront({children, hidden, height, reverse}: {children: React.ReactNode, hidden: boolean, height: string, reverse: boolean}) {
  const transition = 'all 1s ease-in-out';
  var fullOpacity = {
    opacity: 1.0,
    transition: transition,
    height: height,
  };
  var noOpacity = {
    opacity: 0.0,
    transition: transition,
    height: "0px",
  };

  const [currentOpacity, setCurrentOpacity] = useState(!reverse ? fullOpacity : noOpacity);
  
  useEffect(() => {
    setCurrentOpacity(hidden ? noOpacity : fullOpacity);
  }, [hidden]);

  return (
    <div style={currentOpacity} className='collapse-service-front'>
      {children}
    </div>
  )
}

export default CollapseServiceFront