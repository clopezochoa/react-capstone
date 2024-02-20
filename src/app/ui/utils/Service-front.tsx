import Divider from 'app/ui/utils/divider';
import React from 'react'

function ServiceFront({children, serviceTitle, classNameHeading}:{children: React.ReactNode, serviceTitle: string, classNameHeading: string}) { 
  return (
    <div style={{display:"grid", justifyItems:"center"}}>
        <h1 className={classNameHeading}>{serviceTitle}</h1>
        <Divider />
        {children}
    </div>
  )
}

export default ServiceFront