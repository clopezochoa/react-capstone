'use client'

import ImgFromCloud from 'app/ui/utils/ImageFromCloud';
import React, { useEffect, useRef } from 'react';
import 'styles/headings.css'
import 'styles/book.css' 

const SearchInput = ({hideFront, showFront, search} : {hideFront: () => void, showFront: () => void, search: () => void}) => {
    const input = useRef(null);
    const handleEsc = (event: KeyboardEvent) => {
        if(event.key === 'Escape') {
            if(input.current) {
              const element = (input.current as HTMLInputElement);
              element.value = "";
              element.blur();
          }
          showFront();
        }
    };

    useEffect(() => {
        document.removeEventListener('keydown', handleEsc);
        document.addEventListener('keydown', handleEsc);
      }, []);

    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <input
                ref={input}
                type="text"
                placeholder='Search doctors, clinics, hospitals, etc.'
                onFocus={hideFront}
                className='search-input search-input-size' />
            <ImgFromCloud
                filename="search"
                filetype="ico"
                format="svg"
                width="24"
                height="24"
                altText="An icon of a magnifying glass"
                className='search-ico'
                onClick={search}
            />
        </div>
    )
}

export default SearchInput