'use client'

import { Tip } from 'app/lib/types';
import { useEffect, useState } from 'react'

function useTips() {
  const [tips, setTips] = useState<Array<Tip>>([]);

  const getTipsList = async () => {
    try {
      const tips = await fetch('/api/tip', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonTips = await tips.json();
      
      if(jsonTips.data) {
        setTips(jsonTips.data);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTipsList();
  }, [])
    
  return tips;
}

export default useTips