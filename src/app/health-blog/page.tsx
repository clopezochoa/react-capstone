'use client'

import useTips from "app/hooks/useTips";
import LoginForm from "app/ui/login";
import AdviceCard from "app/ui/utils/Card";
import React, { useEffect, useState } from "react";

const HealthBlog = () => {
  const adviceData = useTips();
  const [collapse, setCollapse] = useState(false);
  const handleEsc = (event: KeyboardEvent) => {
    if(event.key === 'Escape') {
      if(collapse) {
        collapseOff();
      } else {
        collapseOn();
        setTimeout(() => {
          collapseOff();
        }, 10);
      }
    }
  }

  const collapseOn = () => {
    setCollapse(true);
  }
  const collapseOff = () => {
    setCollapse(false);
  }

  useEffect(() => {
    document.removeEventListener('keydown', handleEsc);
    document.addEventListener('keydown', handleEsc);
  }, []);
  return (
    <div className="bento-container">
      {adviceData.map((item, index) => {
        return <AdviceCard key={index} tip={{...item}} collapse={collapse} />
      })}
    </div>
  );
};

export default HealthBlog;