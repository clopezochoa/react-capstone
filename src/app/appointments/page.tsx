
'use client'

import {useWindowWidth} from 'app/hooks/useWindow'
import React, { useContext, useEffect, useState } from 'react'
import { AppointmentData } from 'app/lib/types'
import { SessionContext } from 'app/provider'
import useAppointmentsList from 'app/hooks/useAppointment'
import 'styles/headings.css'
import AppointmentCard from 'app/ui/book/DoctorCard/AppointmentCard'
import EditAppointmentForm from 'app/ui/book/AppointmentForm/EditAppointmentForm'
import { compareDate, getToday } from 'app/lib/helper'

function Appointments() {
  const window_width = useWindowWidth(1920);
  const session = useContext(SessionContext);
  const appointments = useAppointmentsList(session?.session.user!);

  const [maxSize, minSize, querySize] = [360, 200, 640];
  const [imageSize, setImageSize] = useState(maxSize);
  
  useEffect(() => {
      if(window_width < querySize && imageSize !== minSize) setImageSize(minSize);
      if(window_width >= querySize && imageSize !== maxSize) setImageSize(maxSize);
  }, [window_width]);

  const [bookHidden, setBookHidden] = useState(true);
  const [chosenAppointment, setChosenAppointment] = useState<AppointmentData>();

  const handleEdit = (appointment: AppointmentData) => {
    if(session?.session.isSession) {
      setChosenAppointment(appointment)
      showBooking();
    }
  };

  const hideBooking = () => {
    setBookHidden(true);
  }

  const showBooking = () => {
    if(session?.session.isSession) setBookHidden(false);
  }

  return (
    <>
      {!bookHidden ? <EditAppointmentForm hideForm={hideBooking} appointment={chosenAppointment!} /> : null}
      <center>
        <h1 id='review' className='head-big'>
          Appointments
        </h1>
        <h2 className='head-gradient'>
          Organize your visits with ease.
        </h2>
      </center>

      {appointments && appointments.length > 0 ? 
      <div style={{marginTop: "4rem",zIndex: "1", position:"relative", display:"grid"}}>
        <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap", flexDirection:"row"}}>
          {appointments
            .filter(appointment => !compareDate(appointment.date, getToday(), true))
            .map((appointment) => <AppointmentCard appointment={appointment} key={appointment.id} edit={handleEdit}/>)}
        </div>
      </div>
      : null}
    </>
  )
}

export default Appointments