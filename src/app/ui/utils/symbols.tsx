import React from 'react'

export function Circle({color, size} : {color: string, size: number}) {
  const radius = (size/2).toString()
  const diameter = (size).toString()
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`} fill="none">
      <circle cx={radius} cy={radius} r={radius} fill={color}/>
    </svg>
  )
} 