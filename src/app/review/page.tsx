'use client'

import useAppointmentsList from "app/hooks/useAppointment";
import useDoctorsList from "app/hooks/useDoctorsList";
import { compareDate } from "app/lib/helper";
import { AppointmentData, createAppointment, createReview } from "app/lib/types";
import { SessionContext } from "app/provider";
import ReviewCard from "app/ui/book/DoctorCard/ReviewCard";
import ReviewForm from "app/ui/review/ReviewForm/ReviewForm";
import React, { useContext, useState } from "react";
import 'styles/headings.css'

const Page = () => {
  const session = useContext(SessionContext);
  const appointments = useAppointmentsList(session?.session.user!);
  const doctors = useDoctorsList();
  const [reviewForm, setReviewForm] = useState<React.JSX.Element | null>(null);

  const hideReview = () => {
    setReviewForm(null);
  };

  const handleReview = (appointment: AppointmentData) => {
    console.log("Trying to review -> ", appointment);
    setReviewForm(
      <ReviewForm hideForm={hideReview} appointment={appointment} />
    );
  }
  
  var withReview = Array<AppointmentData>();
  var withoutReview = Array<AppointmentData>();
  var otherDoctors = Array<AppointmentData>();
  
  if(appointments.length > 0) appointments.forEach(appointment => {
    if(compareDate(appointment.date, appointment.time)){
      if(appointment.review) {
        withReview.push(appointment);
      } else {
        withoutReview.push(appointment);
      }
    }
  });

  doctors.forEach(doctor => {
    if(appointments.length > 0){
      if(!appointments.some(appointment => appointment.doctor.name === doctor.name)){
        otherDoctors.push(createAppointment(undefined, undefined, undefined, doctor, undefined, createReview("", doctor.ratings)))
      }
    }
  });
  
  if(withReview.length > 0) {
    withReview.sort(appointment => appointment.review.rating);
  }

  return <>
    {reviewForm}
    <center>
      <h1 id='review' className='head-big'>
        Review
      </h1>
      <h2 className='head-gradient'>
        Share your own experience and help others.
      </h2>
    </center>
    <div style={{zIndex: "1", position:"relative", display:"grid"}}>
      <div style={{marginBlock:"4rem", display:"flex", justifyContent:"center", flexWrap:"wrap", flexDirection:"row"}}>
        {withoutReview.map((appointment) => <ReviewCard appointment={appointment} key={appointment.id} review={handleReview}/>)}
        {withReview.map((appointment) => <ReviewCard appointment={appointment} key={appointment.id}/>)}
        {otherDoctors.map((appointment) => <ReviewCard appointment={appointment} key={appointment.id} otherUsers={true}/>)}
      </div>
    </div>
  </>;
};

export default Page;