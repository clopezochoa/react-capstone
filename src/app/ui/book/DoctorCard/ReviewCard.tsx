import { AppointmentData, DoctorData } from 'app/lib/types';
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

export function DoctorInfoNoRating({doctor}: {doctor: DoctorData}) {
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

export function DoctorProfileNoRating({doctor} : {doctor: DoctorData}) {
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
    <DoctorInfoNoRating doctor = {doctor} />
  </>
  );
}

function ReviewCard({appointment, review, otherUsers} : {appointment: AppointmentData, review?: (appointment: AppointmentData) => void, otherUsers?: boolean}) {
  return (<>
    {!appointment.review ?
    <div className='give-review-card-container'>
      <DoctorProfile doctor={appointment.doctor} />
        <div
          className='card-button'
          onClick={() => 
          {
            if(review) {
              review(appointment)}
            }
          }>
          <div className='give-review-button' style={{display: "grid", justifyContent:"center"}}>
            <h1 className='text-clear'>Give Review</h1> 
          </div>
        </div>
      </div>
    :
    (otherUsers ? 
      <div className='others-card-container'>
        <DoctorProfileNoRating doctor={appointment.doctor} />
        <div
          className='card-button'>
          <div style={{display: "grid", justifyContent:"center"}}>
            <h1>Other Reviews</h1> 
          </div>
          <div className='rating-wrap-review'>
            <div style={{display: 'flex', justifyContent:'center'}}>
              {Array.from(Array(appointment?.review?.rating).keys()).map((index) =>
                <ImgFromCloud
                filename="star"
                filetype="ico"
                format="svg"
                width="10"
                height="10"
                altText='star icon'
                key={appointment?.id + "_" + index.toString()}
                />)}
            </div>
          </div>
        </div>
      </div>
      : 
      <div className='card-container'>
        <DoctorProfile doctor={appointment.doctor} />
        <div
          className='card-button'>
          <div style={{display: "grid", justifyContent:"center"}}>
            <h1>Review Given</h1> 
          </div>
          <div className='rating-wrap-review'>
            <div style={{display: 'flex', justifyContent:'center'}}>
              {Array.from(Array(appointment?.review?.rating).keys()).map((index) =>
                <ImgFromCloud
                filename="star"
                filetype="ico"
                format="svg"
                width="10"
                height="10"
                altText='star icon'
                key={appointment?.id + "_" + index.toString()}
                />)}
            </div>
          </div>
        </div>
      </div>)
    }
  </>
  )
}

export default ReviewCard