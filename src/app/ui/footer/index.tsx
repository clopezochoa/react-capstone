'use client'

import React from 'react'
import 'styles/footer.css'
import Notification from '../notification'
import { useWindowWidth } from 'app/hooks/useWindow'
import { useIcon } from 'app/hooks/useIcon'

function Footer() {
  const window_width = useWindowWidth(1920);
  const icon = useIcon({window_width: window_width})
  return (
    <>
    <div>
        <Notification />
    </div>

      <footer className= {`w-full bg-dark text-clear container-custom`} style={{visibility:"hidden"}}>
        <a className='footer-start' target="_blank" rel="noopener noreferrer" href="https://www.lopezochoa.com">
          {icon}
          Designed by Carlos López-Ochoa Aledo
        </a>
        <div className='footer-end'>
          Vectors and icons by <a href="https://www.svgrepo.com" target="_blank" rel="noopener noreferrer">SVG Repo</a>
        </div>
      </footer>
    </>
  )
}

export default Footer