'use client'

import React, { useContext, useEffect, useState } from "react";
import ImgFromCloud from "app/ui/utils/ImageFromCloud";
import 'styles/AccessForms.css'
import 'styles/buttons.css'
import 'styles/utils.css'
import { InputStyle, InputType, InputEvent, AppointmentData, createReview, createAppointment } from "app/lib/types";
import { SessionContext } from "app/provider";
import 'styles/DoctorCard.css'
import { DoctorInfo } from "app/ui/book/DoctorCard/DoctorCard";

const ReviewForm = ({
  hideForm,
  appointment
}: {
  hideForm: () => void;
  appointment: AppointmentData
}) => {
  const sessionContext = useContext(SessionContext);
  const [currentRating, setCurrentRating] = useState(-1);
  const [chosenRating, setChosenRating] = useState(-1);
  const [displayRating, setDisplayRating] = useState(-1);
  const [message, setMessage] = useState("");
  
  const handleReview = async (e: InputEvent) => {
    e.preventDefault();
    try {
      const review = createReview(message, chosenRating + 1);
      const body = createAppointment(appointment.time, appointment.date, appointment.patient, appointment.doctor, appointment.id ?? null, review);
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if(response) location.reload();
      // if response then display a confirmation message and close review form.
    } catch (error) {
      console.error(error)
    }
  };

  const handleMessage = (e: any) => {   
    const element = e.target.value;
    if(element) setMessage(element as string);
  }

  const fillStars = (e: any) => {
    const element = e.target.parentElement;
    if(element?.id) {
      const id_attribute = element.id as string;
      const id = parseInt(id_attribute[id_attribute.length -1]);
      setCurrentRating(id);
    }
  }

  const emptyStars = () => {
    if(chosenRating < 0) {
      setCurrentRating(-1);
    }
  }

  const handleRating = (e: any) => {
    const element = e.target.parentElement;
    if(element?.id) {
      const id_attribute = element.id as string;
      const id = parseInt(id_attribute[id_attribute.length -1]);
      setChosenRating(id);
      setDisplayRating(id);
    }    
  }

  const resetRating = (e: any) => {
    setCurrentRating(-1);
    setChosenRating(-1);
    setDisplayRating(-1);
  }

  useEffect(() => {
    if(chosenRating === -1) {
      setDisplayRating(currentRating)
    }
  }, [chosenRating, currentRating])

  const appointmentForm =
    <>
      <div className="overlay-background-white"></div>
      <div className="form-container" onClick={hideForm}>
        <div className="doctor-form-shape form-shape" onClick={(e) => e.stopPropagation()}>
          <div style={{marginBottom:"1rem", marginTop:"3rem", borderRadius:"100px", overflow:"hidden", width:"200px", height:"200px"}}>
            <ImgFromCloud
              filename={appointment?.doctor.name}
              filetype="doctors-min"
              format="jpg"
              width="200"
              height="200"
              altText='doctor profile picture'
              className='doctor-picture'
              key={appointment?.doctor.id}
            />
          </div>
          <div style={{scale:"110%", paddingBlock:'1rem'}}>
          <DoctorInfo doctor={appointment.doctor}/>
          </div>
          <div className="custom-form" style={{paddingTop:"0px"}}>
            <form>
              <div className='rating-wrap-review'>
                <div
                  style={{display: 'flex', justifyContent:'center'}}
                >
                  {
                    Array.from(Array(5).keys()).map((index) =>
                      <div
                        key={"star_" + index.toString()}
                        id={"star_" + index.toString()}
                        className="star-input"
                        onMouseOver={fillStars}
                        onMouseOut={emptyStars}
                        onClick={handleRating}
                      >
                        <ImgFromCloud
                        filename={displayRating >= index ? "star-fill" : "star-outline"}
                        filetype="ico"
                        format="svg"
                        width="25"
                        height="25"
                        altText='star icon'
                        key={appointment?.id + "_" + index.toString()}
                        />
                      </div>
                    )
                  }
                </div>
              </div>

              <div style={{marginTop:"1rem"}} className="form-group">
                <label htmlFor="name">Leave a comment</label>
                <textarea
                  name="name"
                  id={InputType.name}
                  required
                  className= {InputStyle.default}
                  style={{height:"auto", padding:"0.5rem"}}
                  aria-describedby="helpId"
                  onInput={handleMessage}
                />
              </div>
              <div className="form-button-group" style={{paddingTop:"0.5rem", paddingBottom:"1.5rem"}}>
                <button className="form-button form-button-main" onClick={handleReview} >Submit</button>
                <button className="form-button form-button-secondary" onClick={resetRating} >Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>;

  return <>
    {sessionContext?.session.isSession ? appointmentForm : null}
  </>
}

export default ReviewForm;