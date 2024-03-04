'use client'

import React, { useContext, useEffect, useRef, useState } from "react";
import ImgFromCloud from "app/ui/utils/ImageFromCloud";
import 'styles/AccessForms.css'
import 'styles/buttons.css'
import { InputStyle, InputType, InputEvent, Cookies, createUserData, createSession } from "app/lib/types";
import { AnimationTime } from "app/lib/animationTime";
import { useForm } from "app/hooks/useForm";
import { useStyle } from "app/hooks/useStyle";
import { handleInputEvent } from "app/lib/validation";
import { useCookies } from "react-cookie";
import { SessionContext } from "app/provider";
import CloseButton from "../utils/closeButton";

const LoginForm = ({
  handleLogin,
  hideForm,
  showProfile
}: {
  handleLogin: () => void;
  hideForm: () => void;
  showProfile: () => void;
}) => {

  const sessionContext = useContext(SessionContext);
  const [cookie, setCookie] = useCookies([Cookies.userSession]);
  const form = useForm();
  const inputs = [useRef(null), useRef(null)]
  
  const authenticate = async (e: InputEvent) => {
    e.preventDefault();
    const userSessionCookie = cookie[Cookies.userSession];
    if(userSessionCookie) {
      if(userSessionCookie.message !== "Error") {
        sessionContext?.updateSession(createSession(true, userSessionCookie));
        return;
      }
    }

    var email = form.getState(InputType.email)?.value ?? "";
    var password = form.getState(InputType.password)?.value ?? "";

    /// This piece of code fixes the error derived from using autofill plugins
    if(!email || !password || email === "" || password === "") {
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
              default:
                break;
            }
          }
        }
      });
    }
    ///

    try {
      const body = createUserData(email, password);
      const token = await fetch('/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const jsonToken = await token.json();

      setCookie(Cookies.userSession, JSON.stringify(jsonToken), {
        path: "/",
        maxAge: 3600,
        sameSite: "strict",
      })
      
      if(jsonToken?.state) {
        sessionContext?.updateSession(createSession(true, jsonToken?.user));
        showProfile();
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fadeInTime = new AnimationTime(1000);
  const fadeOutTime = new AnimationTime(300);

  const emailStyle = useStyle(form.getState(InputType.email), fadeOutTime.milliseconds);
  const passwordStyle = useStyle(form.getState(InputType.password), fadeOutTime.milliseconds);
    
  const resetFunction = new Map<InputType, Function> ([
    [InputType.email, emailStyle.resetStyle],
    [InputType.password, passwordStyle.resetStyle],
  ]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState("non-visible");

  useEffect(() => {
    if(isPasswordVisible) {
      setPasswordIcon("visible");
    } else {
      setPasswordIcon("non-visible");
    }
  }, [isPasswordVisible]);

  const handleEvent = (e: InputEvent) => {   
    handleInputEvent(e, resetFunction, form);
  };

  return <>
    <div className="overlay-background-white"></div>
    <div className="form-container" onClick={hideForm}>
      <div className="form-shape" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn-mobile" onClick={hideForm}>
          <CloseButton size={24} />
        </button>
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
                ref={inputs[0]}
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


            
            <div className="form-button-group">
              <button className="form-button form-button-main" onClick={authenticate} >Login</button>
              <button type="reset" className="form-button form-button-secondary" >Reset</button>
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