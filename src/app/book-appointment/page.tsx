'use client'


import {useWindowWidth} from 'app/hooks/useWindow'
import ImgFromCloud from 'app/ui/utils/ImageFromCloud'
import SearchInput from 'app/ui/book/SearchInput/SearchInput'
import CollapseServiceFront from 'app/ui/utils/CollapseServiceFront'
import ServiceFront from 'app/ui/utils/Service-front'
import React, { useContext, useEffect, useState } from 'react'
import useDoctorsList from 'app/hooks/useDoctorsList'
import { getStringFromEvent } from 'app/lib/validation'
import { DoctorData, InputEvent } from 'app/lib/types'
import { filterDoctors } from 'app/lib/helper'
import AppointmentForm from 'app/ui/book/AppointmentForm/AppointmentForm'
import { SessionContext } from 'app/provider'
import { AlertContext } from 'app/ui/utils/FullScreenAlert'

function BookAppointment() {
  const window_width = useWindowWidth(1920);
  const session = useContext(SessionContext);
  const alert = useContext(AlertContext)
  const [isSearch, setIsSearch] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [chosenDoctor, setChosenDoctor] = useState<DoctorData>();
  const [matchDoctors, setMatchDoctors] = useState<Array<DoctorData>>([]);
  const doctors = useDoctorsList();

  const hideFront = () => {
    setIsSearch(true);
  };
  const showFront = () => {
    resetSearch();
    alert?.updateAlert(false);
    setIsSearch(false);
  };
  const handleSearch = (event: InputEvent) => {
    setSearchDoctor(getStringFromEvent(event));
  }
  const resetSearch = () => {
    setSearchDoctor("");
  }
  const handleBook = (doctor: DoctorData) => {
    if(session?.session.isSession) {
      setChosenDoctor(doctor);
      showBooking();
    } else {
      alert?.updateAlert(true);
    }
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
    {bookHidden ? <SearchInput
      hideFront={hideFront}
      showFront={showFront}
      search={handleSearch}
      resetSearch={resetSearch}
      marginBlock='s'
      placeholder='Search doctors by specialty'
      /> : null}
    <CollapseServiceFront hidden={!isSearch} height="600px" reverse={true}>
      <div style={{zIndex: "1", position:"relative", display:"grid"}}>
        <div className='suggestion-box'>
          {matchDoctors.map((doctor, index) => {
            if(index > 15) return;
            return <div
              key={"div-" + index}
              style={{display:"flex", opacity:`${(1/(index + 1))*400}%`}}
              className='suggestion-span'
              onClick={() => handleBook(doctor)}  
            >
              <span className='suggestion-doctor' key={doctor.id}>
                {doctor.name}
              </span>
              <span className='suggestion-speciality' key={doctor.id}>
                {doctor.speciality}
              </span>
            </div>
          })}
        </div>
      </div>      
    </CollapseServiceFront>
    <CollapseServiceFront hidden={isSearch} height="600px" reverse={false}>
      <ServiceFront serviceTitle='Find a doctor at your own ease' classNameHeading='head-big head-big-s'>
        <ImgFromCloud filename="Book an Appointment" filetype="img" format="png" width={imageSize} height={imageSize} altText='nurse taking care of an elder man illustration' />
      </ServiceFront>
    </CollapseServiceFront>
  </>
  )
}

export default BookAppointment