'use client'

import useWindow from 'app/hooks/useWindow'
import ImgFromCloud from 'app/ui/utils/ImageFromCloud'
import DoctorCard from 'app/ui/book/DoctorCard/DoctorCard'
import SearchInput from 'app/ui/book/SearchInput/SearchInput'
import CollapseServiceFront from 'app/ui/utils/CollapseServiceFront'
import ServiceFront from 'app/ui/utils/Service-front'
import React, { useContext, useEffect, useState } from 'react'
import useDoctorsList from 'app/hooks/useDoctorsList'
import { getStringFromEvent } from 'app/lib/validation'
import { Doctor, InputEvent } from 'app/lib/types'
import { filterDoctors } from 'app/lib/helper'
import AppointmentForm from 'app/ui/book/AppointmentForm/AppointmentForm'
import { SessionContext } from 'app/provider'
import LoginAlert from 'app/ui/login/alert'

function InstantConsultation() {
  const window_width = useWindow();
  const session = useContext(SessionContext);
  const [isSearch, setIsSearch] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [chosenDoctor, setChosenDoctor] = useState<Doctor>();
  const [matchDoctors, setMatchDoctors] = useState<Array<Doctor>>([]);
  const doctors = useDoctorsList();
  const [loginAlert, setLoginAlert] = useState(false);

  const hideFront = () => {
    setIsSearch(true);
  };
  const showFront = () => {
    resetSearch();
    dismissAlert();
    setIsSearch(false);
  };
  const handleSearch = (event: InputEvent) => {
    setSearchDoctor(getStringFromEvent(event));
  }
  const resetSearch = () => {
    setSearchDoctor("");
  }
  const handleBook = (doctor: Doctor) => {
    console.log("Trying to book -> ", doctor);
    if(session?.session.isSession) {
      setChosenDoctor(doctor);
      showBooking();
    } else {
      setLoginAlert(true);
    }
  }
  const dismissAlert = () => {
    setLoginAlert(false);
  }

  const [maxSize, minSize, querySize] = [360, 200, 640];
  const [imageSize, setImageSize] = useState(maxSize);
  
  useEffect(() => {
      if(window_width < querySize && imageSize !== minSize) setImageSize(minSize);
      if(window_width >= querySize && imageSize !== maxSize) setImageSize(maxSize);
  }, [window_width]);

  useEffect(() => {
    setMatchDoctors(doctors);
  }, [doctors])

  useEffect(() => {
    const filteredDoctors = filterDoctors(doctors, searchDoctor);
    setMatchDoctors(filteredDoctors);
  }, [searchDoctor]);

  const [bookHidden, setBookHidden] = useState(true);
  const hideBooking = () => {
    setSearchDoctor("");
    setBookHidden(true);
  }
  const showBooking = () => {
    if(session?.session.isSession) setBookHidden(false);
  }

  return (
    <>
      {!bookHidden ? <AppointmentForm hideForm={hideBooking} doctor={chosenDoctor!} /> : null}
      {loginAlert ? <LoginAlert dismiss={dismissAlert} /> : null}
      <CollapseServiceFront hidden={isSearch} height="600px">
        <ServiceFront serviceTitle='Find a doctor and Consult instantly'>
          <ImgFromCloud filename="Instant Consultation" filetype="img" format="png" width={imageSize} height={imageSize} altText='nurse taking care of an elder man illustration' />
        </ServiceFront>
      </CollapseServiceFront>
      {bookHidden ? <SearchInput hideFront={hideFront} showFront={showFront} search={handleSearch} resetSearch={resetSearch}/> : null}
      <CollapseServiceFront hidden={!isSearch || !bookHidden} height="auto">
        <div style={{zIndex: "1", position:"relative", display:"grid"}}>
          <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap", flexDirection:"row"}}>
            {matchDoctors.map((doctor) => <DoctorCard doctor={doctor} key={doctor._id} book={handleBook}/>)}
          </div>
        </div>
      </CollapseServiceFront>
    </>
  )
}

export default InstantConsultation