'use client'

import React, { useEffect, useState } from "react";
import ImgFromCloud from "app/ui/ImageFromCloud";
import 'styles/AccessForms.css'
import fonts from "app/lib/fonts";
import emailValidator from "app/lib/validator";

enum EmailStates {
  valid = "valid",
  invalid = "invalid",
  idle = "idle",
}

const emailValidationTimeout = 1000;

const LoginForm = () => {
  const [validationTimeout, setValidationTimeout] = useState<NodeJS.Timeout>();
  const [emailStatus, setEmailStatus] = useState(EmailStates.idle);
  const [emailInputStyle, setEmailInputStyle] = useState("input-field");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState("non-visible");
  
  useEffect(() => {
    switch (emailStatus) {
      case EmailStates.valid:
        setEmailInputStyle("input-field-valid");
        break;
      case EmailStates.invalid:
        setEmailInputStyle("input-field-invalid");
        break;
      default:
        setEmailInputStyle("input-field");
        break;
    }
  }, [emailStatus])

  const validate = (value: string) => {
    if (value) {
      setEmailStatus(emailValidator(value) ? EmailStates.valid : EmailStates.invalid)
    } else {
      setEmailStatus(EmailStates.idle);
    }
  }

  const resetTimeout = (e?: React.FormEvent<HTMLInputElement>, time?: number) => {
    if(e) {
      const value = (e.target as HTMLInputElement).value;
      
      if (validationTimeout) {
        clearTimeout(validationTimeout);
      }
      const timeout = setTimeout(() => {
        validate(value);
      }, time)
      setValidationTimeout(timeout);
    } else {
      clearTimeout(validationTimeout);
    }
  }

  useEffect(() => {
    if(isPasswordVisible) {
      setPasswordIcon("visible");
    } else {
      setPasswordIcon("non-visible");
    }
  }, [isPasswordVisible]);

  return <>
    <div className={`${fonts[0].className} custom-container`}>
      <h1 className="custom-header">Login</h1>
      <div className="custom-suggestion">
        Are you a new member? <a href="#" className="link"> Login</a>
      </div>
      <div className="custom-form">
        <form>
          <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id={emailInputStyle}
                required
                className="input-field"
                placeholder="Enter your email"
                aria-describedby="helpId"
                autoComplete="email"
                onFocus={e => {
                  setEmailStatus(EmailStates.idle)
                  resetTimeout(e, emailValidationTimeout);
                }}
                onInput={e => {
                  setEmailStatus(EmailStates.idle)
                  resetTimeout(e, emailValidationTimeout);
                }}
                onEmptied={()=> {
                  setEmailStatus(EmailStates.idle);
                  resetTimeout();
                }}
                onBlur={e => {
                  resetTimeout(e, 1);
                }}
              />
          </div>

          <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="flex justify-between input-field" id="password-wrapper">
                <input required type= {isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder="Enter your password" aria-describedby="helpId" />
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

export default LoginForm;