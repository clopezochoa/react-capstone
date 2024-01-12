import React, { useEffect, useState } from "react";
import ImgFromCloud from "app/ui/ImageFromCloud";
import 'styles/AccessForms.css'
import fonts from "app/lib/fonts";


const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState("non-visible");

  const toggle_password = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
              <input type="email" name="email" id="email" required className="form-control w-full h-10 ps-2" style={{outline:'none'}} placeholder="Enter your email" aria-describedby="helpId" autoComplete="email" />
          </div>

          <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="flex justify-between w-full h-10 ps-2" id="password-wrapper">
                <input required type= {isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder="Enter your password" aria-describedby="helpId" />
                <button className="me-5" id="toggle-password" type="button" onClick= {toggle_password}>
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