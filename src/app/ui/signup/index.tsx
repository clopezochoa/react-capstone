'use client'

import React, { useEffect, useState } from "react";
import ImgFromCloud from "app/ui/ImageFromCloud";
import 'styles/AccessForms.css'
import fonts from "app/lib/fonts";
import useValidation from "app/hooks/useValidation";
import useStyle from "app/hooks/useStyle";
import { InputState, InputStyleType, InputType } from "app/lib/enum";
import { AnimationTime } from "app/lib/animationTime";

const SignupForm = () => {
  const [emailStatus, setEmailStatus] = useState(InputState.idle);
  const [phoneStatus, setPhoneStatus] = useState(InputState.idle);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState("non-visible");
  const [roleStyle, setRoleStyle] = useState("role-placeholder");

  const fadeInTime = new AnimationTime(1000);
  const fadeOutTime = new AnimationTime(300);
  
  const emailValidation = useValidation(InputType.email, setEmailStatus, fadeInTime.milliseconds);
  const emailStyle = useStyle(emailStatus, fadeOutTime.milliseconds);

  const phoneValidation = useValidation(InputType.phone, setPhoneStatus, fadeInTime.milliseconds);
  const phoneStyle = useStyle(phoneStatus, fadeOutTime.milliseconds);


  useEffect(() => {
    if(isPasswordVisible) {
      setPasswordIcon("visible");
    } else {
      setPasswordIcon("non-visible");
    }
  }, [isPasswordVisible]);

  const swapStyle = () => {
    setRoleStyle("input-field");
  }

  return <>
    <div className={`${fonts[0].className} custom-container`}>
      <h1 className="custom-header">Login</h1>
      <div className="custom-suggestion">
        Are you a new member? <a href="#" className="link"> Login</a>
      </div>
      <div className="custom-form">
        <form>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select required id="role" className={`input-field ${roleStyle}`} defaultValue={""} onChange={swapStyle} aria-label="Default select example">
              <option value="" disabled>Select your role</option>
              <option className="text-dark">Patient</option>
              <option className="text-dark">Doctor</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name-input"
              required
              className="input-field"
              placeholder="Enter your name"
              aria-describedby="helpId"
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone</label>
            <input
              type="tel"
              name="tel"
              id="tel-input"
              required
              className= {`${InputStyleType.default} ${phoneStyle !== InputStyleType.default ? phoneStyle : ""}`}
              style={{animationDuration: phoneStyle.includes(InputStyleType.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
              placeholder="Enter your phone number"
              aria-describedby="helpId"
              autoComplete="tel"
              onFocus={e => {
                phoneValidation?.validate(e);
              }}
              onInput={e => {
                setPhoneStatus(InputState.idle)
                phoneValidation?.validate(e);
              }}
              onEmptied={()=> {
                phoneValidation?.validate();
              }}
              onBlur={e => {
                phoneValidation?.validate(e, 1);
              }}
            />
          </div>
          <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email-input"
                required
                className= {`${InputStyleType.default} ${emailStyle !== InputStyleType.default ? emailStyle : ""}`}
                style={{animationDuration: emailStyle.includes(InputStyleType.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                placeholder="Enter your email"
                aria-describedby="helpId"
                autoComplete="email"
                onFocus={e => {
                  emailValidation?.validate(e);
                }}
                onInput={e => {
                  setEmailStatus(InputState.idle)
                  emailValidation?.validate(e);
                }}
                onEmptied={()=> {
                  emailValidation?.validate();
                }}
                onBlur={e => {
                  emailValidation?.validate(e, 1);
                }}
              />
          </div>

          <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="flex justify-between input-field" id="password-wrapper">
                <input required className="input-field" type= {isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder="Enter your password" aria-describedby="helpId" />
                <button className="me-5" id="toggle-password" type="button" onClick= {() => {setIsPasswordVisible(!isPasswordVisible)}}>
                  <ImgFromCloud
                    filename={passwordIcon}
                    filetype="ico"
                    format="svg"
                    width="24"
                    height="24"
                    altText="The current status of the password's visibility, non-visible (default)"
                    className="password-toggle-button"
                  />
                </button>
              </div>
          </div>
          
          <div className="custom-button-group">
              <button type="submit" className="custom-buttons form-button-main">Login</button>
              <button type="reset" className="custom-buttons form-button-secondary">Reset</button>
          </div>
        </form>
      </div>
      <div className="custom-suggestion">
        Forgot password? <a href="#" className="link"> Request new password</a>
      </div>
      <div id="login-final-gap"></div>
    </div>
  </>
}

export default SignupForm;