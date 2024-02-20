import React from 'react'
import 'styles/AccessForms.css'
import 'styles/headings.css'


function LoginAlert({height, dismiss}: {height: number, dismiss: () => void}) {
  return (<>
  <div className="overlay-background" onClick={dismiss}></div>
  <div style={{translate: `0px ${height}px`}} className='loginAlertContainer'>
    <div className='loginAlert'>
      <p className='loginAlertText'>Only logged users can book appointments.</p>
    </div>
  </div>
  </>
  )
}

export default LoginAlert