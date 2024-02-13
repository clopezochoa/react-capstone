import Divider from 'app/ui/utils/divider';
import React from 'react'

function ServiceFront({children, serviceTitle}:{children: React.ReactNode, serviceTitle: string}) {
  return (
    <div style={{display:"grid", justifyItems:"center"}}>
        <h1 className='head-big'>{serviceTitle}</h1>
        <Divider />
        {children}
    </div>
  )
}

export default ServiceFront