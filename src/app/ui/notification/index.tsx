'use client'

import useAppointmentsList from 'app/hooks/useAppointment';
import { setEuropeanDateFormat, stringToMonth } from 'app/lib/helper';
import { SessionContext } from 'app/provider';
import React, { useContext, useEffect, useState } from 'react'
import 'styles/notification.css'

function Notification() {
  const session = useContext(SessionContext);
  const appointments = useAppointmentsList(session?.session.user!);
  const defaultStack = <></>;
  const [stack, setStack] = useState(defaultStack);
  useEffect(() => {
    if(session?.session.isSession && appointments && appointments.length > 0){
      setStack(<>
      {appointments.map((appointment, index) => {
      return(
        <div key={index} className='notification' >
          <h1>
            Appointment
          </h1>
          <h2>
            {appointment.doctor.name}
          </h2>
          <h3>
            {appointment.time}
          </h3>
          <h4>
            {setEuropeanDateFormat(appointment)}
          </h4>
        </div>
      )})}
      </>)
    } else {
      setStack(defaultStack)
    }
  }, [session, appointments])

  return (<>
    <div key={"root"} className='notification-stack'>
      {stack}
    </div>
  </>)
}

export default Notification