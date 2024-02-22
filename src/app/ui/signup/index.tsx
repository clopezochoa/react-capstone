'use client'

import React, { useContext, useEffect, useRef, useState } from "react";
import ImgFromCloud from "app/ui/utils/ImageFromCloud";
import 'styles/AccessForms.css'
import 'styles/buttons.css'
import 'styles/utils.css'
import {useStyle} from "app/hooks/useStyle";
import { InputStyle, InputType, Role, InputEvent, createUserData, Cookies, createSession } from "app/lib/types";
import { AnimationTime } from "app/lib/animationTime";
import {useForm} from "app/hooks/useForm";
import { handleInputEvent } from "app/lib/validation";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { useCookies } from "react-cookie";
import { SessionContext } from "app/provider";

const SignupForm = ({
  handleSignup,
  hideForm
}: {
  handleSignup: () => void;
  hideForm: () => void;
}) => {

  const sessionContext = useContext(SessionContext);
  const [cookie, setCookie] = useCookies([Cookies.userSession]);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const register = async (e: InputEvent) => {
    e.preventDefault();
    var email = form.getState(InputType.email)?.value ?? "";
    var role = form.getState(InputType.role)?.value ?? "";
    var name = form.getState(InputType.name)?.value ?? "";
    var phone = form.getState(InputType.phone)?.value ?? "";
    var password = form.getState(InputType.password)?.value ?? "";
    const formInputs = [email, role, name, phone, password];

    /// This piece of code fixes the error derived from using autofill plugins
    if(formInputs.some(formInput => formInput === "")) {
      inputs.forEach(input => {
        if(input.current) {
          const element = (input.current as HTMLInputElement);
          const value = element.value;
          const type = element.id as InputType;
          if (value !== "") {
            switch (type) {
              case InputType.email:
                email = value;
                break;          
              case InputType.password:
                password = value;
                break;
              case InputType.role:
                role = value;
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

    try {
      const salt = genSaltSync(10);
      password = hashSync(password, salt);  
      const body = createUserData(email, password, role, name, phone, salt);
      const token = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const jsonToken = await token.json();
            
      setCookie(Cookies.userSession, JSON.stringify(jsonToken), {
        path: "/",
        maxAge: 3600,
        sameSite: "strict",
      });

      if(jsonToken.user.state) {
        sessionContext?.updateSession(createSession(true, jsonToken.user));
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState("non-visible");

  useEffect(() => {
    if(isPasswordVisible) {
      setPasswordIcon("visible");
    } else {
      setPasswordIcon("non-visible");
    }
  }, [isPasswordVisible]);

  const [roleStyle, setRoleStyle] = useState("select-placeholder");

  const fadeInTime = new AnimationTime(1000);
  const fadeOutTime = new AnimationTime(300);
  
  const form = useForm();

  const phoneStyle = useStyle(form.getState(InputType.phone), fadeOutTime.milliseconds);
  const emailStyle = useStyle(form.getState(InputType.email), fadeOutTime.milliseconds);
  const passwordStyle = useStyle(form.getState(InputType.password), fadeOutTime.milliseconds);
    
  const resetFunction = new Map<InputType, Function> ([
    [InputType.phone, phoneStyle.resetStyle],
    [InputType.email, emailStyle.resetStyle],
    [InputType.password, passwordStyle.resetStyle],
  ]);

  const handleEvent = (e: InputEvent) => { 
    handleInputEvent(e, resetFunction, form);
  };

  return <>
    <div className="overlay-background-white"></div>
    <div className="form-container" onClick={hideForm}>
      <div className="form-shape" onClick={(e) => e.stopPropagation()}>
        <h1 className="custom-header">Sign up</h1>
        <div className="form-suggestion">
        Already a member? <a href="#" className="link" onClick={handleSignup}> Login</a>
        </div>
        <div className="custom-form">
          <form>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select ref={inputs[0]} required id={InputType.role} className={`input-field ${roleStyle}`} defaultValue={""} onChange={(e) => {
                setRoleStyle("input-field");
                handleEvent(e);
              }} aria-label="Default select example">
                <option value="" disabled>{Role.default}</option>
                <option className="text-dark">{Role.patient}</option>
                <option className="text-dark">{Role.doctor}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                ref={inputs[1]}
                type="text"
                name="name"
                id={InputType.name}
                required
                className="input-field"
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
                ref={inputs[2]}
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
                <label htmlFor="email">Email</label>
                <input
                  ref={inputs[3]}
                  type="email"
                  name="email"
                  id={InputType.email}
                  required
                  className= {`${InputStyle.default} ${emailStyle.style !== InputStyle.default ? emailStyle.style : ""}`}
                  style={{animationDuration: emailStyle.style.includes(InputStyle.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                  autoComplete="email"
                  onFocus={handleEvent}
                  onInput={handleEvent}
                  onChange={handleEvent}
                  onBlur={handleEvent}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <div
                  className={`flex justify-between ${`${InputStyle.default} ${passwordStyle.style !== InputStyle.default ? passwordStyle.style : ""}`}`}
                  style={{animationDuration: passwordStyle.style.includes(InputStyle.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                  id="password-wrapper"
                >
                  <input
                    ref={inputs[4]}
                    required
                    className="bg-transparent"
                    type= {isPasswordVisible ? "text" : "password"} 
                    name="password"
                    id={InputType.password}
                    placeholder="Enter your password"
                    aria-describedby="helpId"
                    onFocus={handleEvent}
                    onInput={handleEvent}
                    onChange={handleEvent}
                    onBlur={handleEvent}
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
              <button className="form-button form-button-main" onClick={register} >Signup</button>
              <button type="reset" className="form-button form-button-secondary" >Reset</button>
            </div>
          </form>
        </div>
        <div id="login-final-gap"></div>
      </div>
    </div>
  </>
}

export default SignupForm;