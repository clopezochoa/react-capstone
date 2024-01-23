'use client'

import React, { useEffect, useState } from "react";
import ImgFromCloud from "app/ui/ImageFromCloud";
import 'styles/AccessForms.css'
import 'styles/buttons.css'
import useValidation from "app/hooks/useValidation";
import useStyle from "app/hooks/useStyle";
import { InputState, InputStyleType, InputType } from "app/lib/enum";
import { AnimationTime } from "app/lib/animationTime";

const LoginForm = ({
  handleLogin,
  hideForm
}: {
  handleLogin: () => void;
  hideForm: () => void;
}) => {
  const [emailStatus, setEmailStatus] = useState(InputState.idle);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState("non-visible");

  const fadeInTime = new AnimationTime(1000);
  const fadeOutTime = new AnimationTime(300);
  
  const emailValidation = useValidation(InputType.email, setEmailStatus, fadeInTime.milliseconds);
  const emailStyle = useStyle(emailStatus, fadeOutTime.milliseconds);

  useEffect(() => {
    if(isPasswordVisible) {
      setPasswordIcon("visible");
    } else {
      setPasswordIcon("non-visible");
    }
  }, [isPasswordVisible]);

  return <>
    <div className="form-container" onClick={hideForm}>
      <div className="form-shape" onClick={(e) => e.stopPropagation()}>
        <h1 className="custom-header">Login</h1>
        <div className="form-suggestion">
          Are you a new member? <a href="#" className="link" onClick={handleLogin}> Sign up</a>
        </div>
        <div className="custom-form">
          <form>
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
            
            <div className="form-button-group">
                <button type="submit" className="form-button form-button-main">Login</button>
                <button type="reset" className="form-button form-button-secondary">Reset</button>
            </div>
          </form>
        </div>
        <div className="form-suggestion form-suggestion-end">
          Forgot password? <a href="#" className="link"> Request new password</a>
        </div>
        <div id="login-final-gap"></div>
      </div>
    </div>
  </>
}

export default LoginForm;