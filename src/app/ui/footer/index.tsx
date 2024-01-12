import React from 'react'
import 'styles/footer.css'
import fonts from 'app/lib/fonts'
import Icon from './icon'

function Footer() {
    return (
    <>
      <footer className= {`${fonts[0].className} w-full bg-dark text-clear container-custom`}>
        <div className='footer-start'>
          <Icon />
          Designed by Carlos López-Ochoa Aledo
        </div>
        <div className='footer-end'>
          Vectors and icons by <a href="https://www.svgrepo.com" target="_blank">SVG Repo</a>
        </div>
      </footer>
    </>
  )
}

export default Footer