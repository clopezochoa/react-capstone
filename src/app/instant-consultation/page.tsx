'use client'

import useWindow from 'app/hooks/useWindow'
import ImgFromCloud from 'app/ui/utils/ImageFromCloud'
import DoctorCard from 'app/ui/book/DoctorCardIC/DoctorCard'
import SearchInput from 'app/ui/book/SearchInput/SearchInput'
import CollapseServiceFront from 'app/ui/utils/CollapseServiceFront'
import ServiceFront from 'app/ui/utils/Service-front'
import React, { useEffect, useState } from 'react'
import useDoctorsList from 'app/hooks/useDoctorsList'

function InstantConsultation() {
  const window_width = useWindow();
  const [isSearch, setIsSearch] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState('');
  const doctors = useDoctorsList();

  const hideFront = () => {
    setIsSearch(true);
  };
  const showFront = () => {
    setIsSearch(false);
  };
  const handleSearch = () => {
    setSearchDoctor("");
  }

  const [maxSize, minSize, querySize] = [360, 200, 640];
  const [imageSize, setImageSize] = useState(maxSize);
  
  useEffect(() => {
      if(window_width < querySize && imageSize !== minSize) setImageSize(minSize);
      if(window_width >= querySize && imageSize !== maxSize) setImageSize(maxSize);
  }, [window_width]);

  return (
    <>
      <CollapseServiceFront hidden={isSearch} height="600px">
        <ServiceFront serviceTitle='Find a doctor and Consult instantly'>
          <ImgFromCloud filename="nursing-home" filetype="img" format="png" width={imageSize} height={imageSize} altText='nurse taking care of an elder man illustration' />
        </ServiceFront>
      </CollapseServiceFront>
      <SearchInput hideFront={hideFront} showFront={showFront} search={handleSearch}/>
      <CollapseServiceFront hidden={!isSearch} height="auto">
        <div style={{zIndex: "1", position:"relative", display:"grid"}}>
          <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap", flexDirection:"row"}}>
            {doctors.map((doctor) => <DoctorCard doctor={doctor} key={doctor._id}/>)}
          </div>
        </div>
      </CollapseServiceFront>
    </>
  )
}

export default InstantConsultation