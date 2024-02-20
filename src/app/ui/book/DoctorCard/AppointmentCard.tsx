import { stringToMonth } from 'app/lib/helper';
import { AppointmentData, DoctorData } from 'app/lib/types';
import ImgFromCloud from 'app/ui/utils/ImageFromCloud';
import React from 'react'
import 'styles/DoctorCard.css'

export function DoctorInfo({doctor, appointment}: {doctor: DoctorData, appointment: AppointmentData}) {
  console.log("🚀 ~ DoctorInfo ~ appointment.date:", appointment.date)
  const dateArray = appointment.date.split("-");
  const date = dateArray[2] + " - " + stringToMonth(dateArray[1]) + " - " + dateArray[0];
  return (
    <div className='card-info'>
      <h1>
        {doctor?.name}
      </h1>
      <h2>
        {doctor?.speciality}
      </h2>
      <div style={{fontWeight:"700", marginTop: "1rem"}}>
       <p>
        {appointment?.time}
       </p>
       <p>
        {date}
       </p>
      </div>
    </div>
  )
}

export function DoctorProfile({doctor, appointment} : {doctor: DoctorData, appointment: AppointmentData}) {
  return (<>
    <ImgFromCloud
      filename={doctor?.name}
      filetype="doctors-min"
      format="jpg"
      width="250"
      height="250"
      altText='doctor profile picture'
      className='doctor-picture'
      key={doctor.id}
    />
    <DoctorInfo doctor = {doctor} appointment={appointment}/>
  </>

  );
}

function AppointmentCard({appointment, edit} : {appointment: AppointmentData, edit: (appointment: AppointmentData) => void}) {
  return (
    <div className='card-container'>
      <DoctorProfile doctor={appointment.doctor} appointment={appointment}/>
      <div
        className='card-button'
        onClick={() => edit(appointment)}>
        <h1>
          Change Appointment
        </h1>
        <h2>
          Pick another date
        </h2>
      </div>
    </div>
  )
}

export default AppointmentCard