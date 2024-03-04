'use client'

import React, { useContext, useEffect, useRef, useState } from "react";
import ImgFromCloud from "app/ui/utils/ImageFromCloud";
import 'styles/AccessForms.css'
import 'styles/buttons.css'
import 'styles/utils.css'
import { InputStyle, InputType, InputEvent, DoctorData, createAppointment, createAppointmentDTO } from "app/lib/types";
import { useForm } from "app/hooks/useForm";
import { handleInputEvent } from "app/lib/validation";
import { SessionContext } from "app/provider";
import { compareDate, getNow, getToday } from "app/lib/helper";
import { DoctorInfo } from "../DoctorCard/DoctorCard";
import 'styles/DoctorCard.css'
import CloseButton from "app/ui/utils/closeButton";

const AppointmentForm = ({
  hideForm,
  doctor
}: {
  hideForm: () => void;
  doctor: DoctorData
}) => {
  const sessionContext = useContext(SessionContext);
  const form = useForm();
  const inputs = [useRef(null), useRef(null)];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (inputs[0]?.current) (inputs[0].current as HTMLInputElement).value = getToday();
    if (inputs[1]?.current) (inputs[1].current as HTMLInputElement).value = getNow();  
  }, [])

  const resetBook = (e?: InputEvent) => {
    e?.preventDefault();
    if (inputs[0]?.current) (inputs[0].current as HTMLInputElement).value = getToday();
    if (inputs[1]?.current) (inputs[1].current as HTMLInputElement).value = getNow();  
  }
  
  useEffect(() => {
  }, [inputs])

  const handleBook = async (e: InputEvent) => {
    e.preventDefault();
    var date = form.getState(InputType.date)?.value ?? "";
    var time = form.getState(InputType.time)?.value ?? "";
    /// This piece of code fixes the error derived from using autofill plugins
    var formInputs = [date, time];

    if(formInputs.some(formInput => formInput === "")) {
      inputs.forEach(input => {
        if(input.current) {
          const element = (input.current as HTMLInputElement);
          const value = element.value;
          const type = element.id as InputType;
          if (value !== "") {
            switch (type) {
              case InputType.date:
                date = value;
                break;          
              case InputType.time:
                time = value;
                break;
              default:
                break;
            }
          }
        }
      });
    }
    ///

    if(compareDate(date, time)) {
      alert("Date and Time of the Appointment cannot be earlier than today and now.");
      return;
    }

    setDate(date);
    setTime(time);

    try {
      const body = createAppointment(time, date, sessionContext?.session.user!, doctor);
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if(response) displayAppointment();
    } catch (error) {
      console.error(error)
    }
  };

  const [hasBooked, setHasBooked] = useState(false);

  const handleEdit = () => {

  }

  const handleCancel = async (e?: InputEvent) => {
    e?.preventDefault();
    try {
      const body = createAppointmentDTO(time, date, sessionContext?.session.user?.name!, doctor?.name);
      const response = await fetch('/api/appointment', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if(response) hideAppointment();
    } catch (error) {
      console.error(error)
    }
  }

  const hideAppointment =  () => {
    resetBook();
    setHasBooked(false);
  }

  const displayAppointment = () => {
    setHasBooked(true);
  }

  const handleEvent = (e: InputEvent) => {   
    handleInputEvent(e, null, form);
  };

  const appointmentForm =
    <>
      <div className="overlay-background-white"></div>
      <div className="form-container" onClick={hideForm}>
        <div className="doctor-form-shape form-shape" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn-mobile" onClick={hideForm}>
            <CloseButton size={24} />
          </button>
          <div style={{marginBottom:"1rem", marginTop:"3rem", borderRadius:"100px", overflow:"hidden", width:"200px", height:"200px"}}>
            <ImgFromCloud
              filename={doctor?.name}
              filetype="doctors-min"
              format="jpg"
              width="200"
              height="200"
              altText='doctor profile picture'
              className='doctor-picture'
              key={doctor.id}
            />
          </div>
          <div style={{paddingBlock:'1rem'}}>
            <DoctorInfo doctor={doctor}/> 
          </div>
          <div className="custom-form" style={{paddingTop:"0px"}}>
            <form>
              {hasBooked ?
                <div style={{fontWeight:"700", marginBottom: "1rem"}}>
                  <p>
                  {time}
                  </p>
                  <p>
                  {date}
                  </p>
                </div>
              :
              <>
                <div className="form-group">
                  <label htmlFor="date">Date of Appointment</label>
                  <input
                    ref={inputs[0]}
                    type="date"
                    name="date"
                    id={InputType.date}
                    required
                    className= {InputStyle.default}
                    aria-describedby="helpId"
                    onFocus={handleEvent}
                    onInput={handleEvent}
                    onChange={handleEvent}
                    onBlur={handleEvent}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Book Time Slot</label>
                  <input
                    ref={inputs[1]}
                    type="time"
                    name="time"
                    id={InputType.time}
                    required
                    className= {InputStyle.default}
                    aria-describedby="helpId"
                    onFocus={handleEvent}
                    onInput={handleEvent}
                    onChange={handleEvent}
                    onBlur={handleEvent}
                  />
                </div>
              </>
              }
              {hasBooked ?
                <div className="form-button-group" style={{paddingTop:"0.5rem", paddingBottom:"1.5rem"}}>
                  <button className="form-button form-button-main" onClick={handleEdit} >Change</button>
                  <button className="form-button form-button-cancel" onClick={handleCancel} >Cancel</button>
                </div>  
              :
                <div className="form-button-group" style={{paddingTop:"0.5rem", paddingBottom:"1.5rem"}}>
                  <button className="form-button form-button-main" onClick={handleBook} >Confirm</button>
                  <button className="form-button form-button-secondary" onClick={resetBook} >Reset</button>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </>;

  return <>
    {sessionContext?.session.isSession ? appointmentForm : null}
  </>
}

export default AppointmentForm;