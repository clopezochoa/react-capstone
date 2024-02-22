'use client'

import { useForm } from 'app/hooks/useForm';
import { useStyle } from 'app/hooks/useStyle';
import { AnimationTime } from 'app/lib/animationTime';
import { Cookies, InputEvent, InputStyle, InputType, InputValidity, PasswordDTO, Session, SessionContextModel, createSession, createUserData } from 'app/lib/types'
import { handleInputEvent } from 'app/lib/validation';
import React, { useContext, useEffect, useRef, useState } from 'react'
import ImgFromCloud from '../utils/ImageFromCloud';
import { useCookies } from 'react-cookie';
import { SessionContext } from 'app/provider';
import 'styles/AccessForms.css'
import { genSaltSync, hashSync } from 'bcrypt-ts';

const Password = ({hideForm}:{hideForm: () => void}) => {
  const session = useContext(SessionContext);

  const fadeInTime = new AnimationTime(1000);
  const fadeOutTime = new AnimationTime(300);
  
  const form = useForm();

  const currentPasswordStyle = useStyle(form.getState(InputType.password), fadeOutTime.milliseconds);
  const newPasswordStyle = useStyle(form.getState(InputType.newPassword), fadeOutTime.milliseconds);
  const repeatPasswordStyle = useStyle(form.getState(InputType.repeatPassword), fadeOutTime.milliseconds);

  useEffect(() => {
    if(form.getState(InputType.password)?.validity === InputValidity.valid &&
    form.getState(InputType.newPassword)?.validity === InputValidity.valid &&
    form.getState(InputType.repeatPassword)?.validity === InputValidity.valid) {
      setSaveButton(true);
    } else {
      setSaveButton(false);
    }
  }, [form])
    
  const resetFunction = new Map<InputType, Function> ([
    [InputType.password, currentPasswordStyle.resetStyle],
    [InputType.password, newPasswordStyle.resetStyle],
    [InputType.password, repeatPasswordStyle.resetStyle],
  ]);

  const handleEvent = (e: InputEvent) => { 
    handleInputEvent(e, resetFunction, form);
  };

  const inputs = [useRef(null), useRef(null), useRef(null)];
  const [saveButton, setSaveButton] = useState(false);

  const save = async (e?: InputEvent) => {
    e?.preventDefault();

    var currentPassword = form.getState(InputType.password)?.value ?? "";
    var newPassword = form.getState(InputType.newPassword)?.value ?? "";

    /// This piece of code fixes the error derived from using autofill plugins
    if(!currentPassword || !newPassword || currentPassword === "" || newPassword === "") {
      inputs.forEach(input => {
        if(input.current) {
          const element = (input.current as HTMLInputElement);
          const value = element.value;
          const type = element.id as InputType;
          if (value !== "") {
            switch (type) {
              case InputType.password:
                currentPassword = value;
                break;
              case InputType.newPassword:
                newPassword = value;
                break;             
              default:
                break;
            }
          }
        }
      });
    }
    ///

    try {
      const salt = genSaltSync(10);
      newPassword = hashSync(newPassword, salt);  
      const body = {email: session?.session.user?.email!, current: currentPassword, new: newPassword} as PasswordDTO;
      const token = await fetch('/api/edit-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const jsonToken = await token.json();
      
      if(jsonToken) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error)
    }
  };

  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState("non-visible");

  useEffect(() => {
    if(isPasswordVisible) {
      setPasswordIcon("visible");
    } else {
      setPasswordIcon("non-visible");
    }
  }, [isPasswordVisible]);

  return (<>
    <div className="profile" onClick={(e) => e.stopPropagation()}>
      <div className="form-container" onClick={hideForm}>
        <div className="form-shape" onClick={(e) => e.stopPropagation()}>
          <div className="custom-form">
            <form>
              <div className="form-group">
                <label htmlFor="Current Password">Current Password</label>
                <div
                  className={`flex justify-between ${`${InputStyle.default} ${currentPasswordStyle.style !== InputStyle.default ? currentPasswordStyle.style : ""}`}`}
                  style={{animationDuration: currentPasswordStyle.style.includes(InputStyle.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                  id={InputType.password + "_wrapper"}
                >
                  <input
                    required
                    className="bg-transparent"
                    type= {isPasswordVisible ? "text" : "password"} 
                    name="Current Password"
                    id={InputType.password}
                    placeholder="Enter your current password"
                    aria-describedby="helpId"
                    onFocus={handleEvent}
                    onInput={handleEvent}
                    onChange={handleEvent}
                    onBlur={handleEvent}
                    ref={inputs[0]}
                  />
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
              <div className="form-group">
                <label htmlFor={InputType.newPassword}>New Password</label>
                <div
                  className={`flex justify-between ${`${InputStyle.default} ${newPasswordStyle.style !== InputStyle.default ? newPasswordStyle.style : ""}`}`}
                  style={{animationDuration: newPasswordStyle.style.includes(InputStyle.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                  id={InputType.newPassword + "_wrapper"}
                >
                  <input
                    required
                    className="bg-transparent"
                    type= {isPasswordVisible ? "text" : "password"} 
                    name={InputType.newPassword}
                    id={InputType.newPassword}
                    placeholder="Enter your new password"
                    aria-describedby="helpId"
                    onFocus={handleEvent}
                    onInput={handleEvent}
                    onChange={handleEvent}
                    onBlur={handleEvent}
                    ref={inputs[1]}
                  />
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
              <div className="form-group">
                <label htmlFor={InputType.repeatPassword}>Confirm Password</label>
                <div
                  className={`flex justify-between ${`${InputStyle.default} ${repeatPasswordStyle.style !== InputStyle.default ? repeatPasswordStyle.style : ""}`}`}
                  style={{animationDuration: repeatPasswordStyle.style.includes(InputStyle.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                  id={InputType.repeatPassword + "_wrapper"}
                >
                  <input
                    required
                    className="bg-transparent"
                    type= {isPasswordVisible ? "text" : "password"} 
                    name={InputType.repeatPassword}
                    id={InputType.repeatPassword}
                    placeholder="Repeat your new password"
                    aria-describedby="helpId"
                    onFocus={handleEvent}
                    onInput={handleEvent}
                    onChange={handleEvent}
                    onBlur={handleEvent}
                    ref={inputs[2]}
                  />
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
                <button className="form-button form-button-main" disabled={!saveButton} onClick={save} >Save</button>
                <button className="form-button form-button-secondary" onClick={hideForm} >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}



export default Password