'use client'

import { InputEvent } from 'app/lib/types';
import ImgFromCloud from 'app/ui/utils/ImageFromCloud';
import React, { useEffect, useRef } from 'react';
import 'styles/headings.css'
import 'styles/search.css' 

interface SearchInputProps {
    hideFront: () => void;
    showFront: () => void;
    search: (event: InputEvent) => void;
    resetSearch: () => void;
  }

const SearchInput: React.FC<SearchInputProps> = ({hideFront, showFront, search, resetSearch}) => {
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
                className='search-input search-input-size'
                onInput={search}
                onEmptied={resetSearch}
            />
            <ImgFromCloud
                filename="search"
                filetype="ico"
                format="svg"
                width="24"
                height="24"
                altText="An icon of a magnifying glass"
                className='search-ico'
            />
        </div>
    )
}

export default SearchInput