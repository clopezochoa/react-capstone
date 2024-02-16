'use client'

import React, { useContext, useEffect, useRef } from "react";
import ImgFromCloud from "app/ui/utils/ImageFromCloud";
import 'styles/AccessForms.css'
import 'styles/buttons.css'
import 'styles/utils.css'
import { InputStyle, InputType, InputEvent, Cookies, Doctor } from "app/lib/types";
import { AnimationTime } from "app/lib/animationTime";
import { useForm } from "app/hooks/useForm";
import { useStyle } from "app/hooks/useStyle";
import { handleInputEvent } from "app/lib/validation";
import { useCookies } from "react-cookie";
import { SessionContext } from "app/provider";
import { getTimeSimple, getToday } from "app/lib/helper";
import { useUserCookie } from "app/hooks/useUserCookie";
import { DoctorInfo } from "../DoctorCard/DoctorCard";
import 'styles/DoctorCard.css'

const AppointmentForm = ({
  hideForm,
  doctor
}: {
  hideForm: () => void;
  doctor: Doctor
}) => {

  const sessionContext = useContext(SessionContext);
  const form = useForm();
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (inputs[2]?.current) (inputs[2].current as HTMLInputElement).value = getToday();
    if (inputs[3]?.current) (inputs[3].current as HTMLInputElement).value = getTimeSimple();
  }, [])

  const handleBook = async () => {
    var name = form.getState(InputType.name)?.value ?? "";
    var phone = form.getState(InputType.phone)?.value ?? "";
    var date = form.getState(InputType.date)?.value ?? "";
    var time = form.getState(InputType.time)?.value ?? "";
    /// This piece of code fixes the error derived from using autofill plugins
    var formInputs = [name, phone, date, time];

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
              case InputType.name:
                name = value;
                break;
              case InputType.phone:
                phone = value;
                break;
              default:
                break;
            }
          }
        }
      });
    }
    ///
    formInputs = [name, phone, date, time];

    console.log(formInputs)
    debugger
  };

  const fadeInTime = new AnimationTime(1000);
  const fadeOutTime = new AnimationTime(300);

  const phoneStyle = useStyle(form.getState(InputType.phone), fadeOutTime.milliseconds);

  const resetFunction = new Map<InputType, Function> ([
    [InputType.phone, phoneStyle.resetStyle],
  ]);
 
  const handleEvent = (e: InputEvent) => {   
    handleInputEvent(e, resetFunction, form);
  };

  const appointmentForm =
    <>
      <div className="form-container" onClick={hideForm}>
        <div className="doctor-form-shape form-shape" onClick={(e) => e.stopPropagation()}>
          <div style={{marginBottom:"1rem", marginTop:"3rem", borderRadius:"100px", overflow:"hidden", width:"200px", height:"200px"}}>
            <ImgFromCloud
              filename={doctor?.name}
              filetype="doctors-min"
              format="jpg"
              width="200"
              height="200"
              altText='doctor profile picture'
              className='doctor-picture'
              key={doctor._id}
            />
          </div>
          <div style={{scale:"150%", paddingBlock:'1rem'}}>
            <DoctorInfo doctor={doctor}/> 
          </div>
          <div className="custom-form" style={{paddingTop:"0px"}}>
            <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  ref={inputs[0]}
                  type="text"
                  name="name"
                  id={InputType.name}
                  required
                  className= {InputStyle.default}
                  placeholder="Enter your name"
                  aria-describedby="helpId"
                  autoComplete="name"
                  onFocus={handleEvent}
                  onInput={handleEvent}
                  onChange={handleEvent}
                  onBlur={handleEvent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  ref={inputs[1]}
                  type="tel"
                  name="tel"
                  id={InputType.phone}
                  required
                  className= {`${InputStyle.default} ${phoneStyle.style !== InputStyle.default ? phoneStyle.style : ""}`}
                  style={{animationDuration: phoneStyle.style.includes(InputStyle.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                  placeholder="Enter your phone number"
                  aria-describedby="helpId"
                  autoComplete="tel"
                  onFocus={handleEvent}
                  onInput={handleEvent}
                  onChange={handleEvent}
                  onBlur={handleEvent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date of Appointment</label>
                <input
                  ref={inputs[2]}
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
                  ref={inputs[3]}
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
              <div className="form-button-group" style={{paddingTop:"0.5rem", paddingBottom:"1.5rem"}}>
                <button className="form-button form-button-main" onClick={handleBook} >Confirm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="overlay-background"></div>
    </>;

  return <>
    {sessionContext?.session.isSession ? appointmentForm : null}
  </>
}

export default AppointmentForm;