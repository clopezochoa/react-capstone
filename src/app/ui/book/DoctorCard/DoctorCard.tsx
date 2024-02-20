import { DoctorData } from 'app/lib/types';
import ImgFromCloud from 'app/ui/utils/ImageFromCloud';
import React from 'react'
import 'styles/DoctorCard.css'

export function DoctorInfo({doctor}: {doctor: DoctorData}) {
  return (
    <div className='card-info'>
      <h1>
        {doctor?.name}
      </h1>
      <h2>
        {doctor?.speciality}
      </h2>
      <h3>
        {doctor?.experience} years of experience
      </h3>
      <div className='rating-wrap'>
        <h4>
          Ratings:
        </h4>
        <div style={{display: 'flex', justifyContent:'center'}}>
          {Array.from(Array(doctor?.ratings).keys()).map((index) =>
            <ImgFromCloud
            filename="star"
            filetype="ico"
            format="svg"
            width="10"
            height="10"
            altText='star icon'
            key={doctor.id + "_" + index.toString()}
            />)}
        </div>
      </div>
    </div>
  )
}

export function DoctorProfile({doctor} : {doctor: DoctorData}) {
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
    <DoctorInfo doctor = {doctor} />
  </>

  );
}

function DoctorCard({doctor, book} : {doctor: DoctorData, book: (doctor: DoctorData) => void}) {
  return (
    <div className='card-container'>
      <DoctorProfile doctor={doctor} />
      <div
        className='card-button'
        onClick={() => book(doctor)}>
        <h1>
          Book Appointment
        </h1>
        <h2>
          No booking fee
        </h2>
      </div>
    </div>
  )
}

export default DoctorCard