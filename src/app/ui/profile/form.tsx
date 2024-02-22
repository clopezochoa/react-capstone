import { useForm } from 'app/hooks/useForm';
import { useStyle } from 'app/hooks/useStyle';
import { AnimationTime } from 'app/lib/animationTime';
import { Cookies, InputEvent, InputStyle, InputType, Session, UserData, createUserData } from 'app/lib/types'
import { handleInputEvent } from 'app/lib/validation';
import { SessionContext } from 'app/provider';
import React, { useContext, useRef } from 'react'
import { useCookies } from 'react-cookie';

const Change = ({hideForm}:{hideForm: () => void}) => {
  const session = useContext(SessionContext);
  const [cookie, setCookie, deleteCookie] = useCookies([Cookies.userSession])
  const fadeInTime = new AnimationTime(1000);
  const fadeOutTime = new AnimationTime(300);
  
  const form = useForm();

  const phoneStyle = useStyle(form.getState(InputType.phone), fadeOutTime.milliseconds);
  const emailStyle = useStyle(form.getState(InputType.email), fadeOutTime.milliseconds);
    
  const resetFunction = new Map<InputType, Function> ([
    [InputType.phone, phoneStyle.resetStyle],
    [InputType.email, emailStyle.resetStyle],
  ]);

  const handleEvent = (e: InputEvent) => { 
    handleInputEvent(e, resetFunction, form);
  };

  const inputs = [useRef(null), useRef(null), useRef(null)];

  const save = async (e?: any) => {
    e?.preventDefault();

    var email = form.getState(InputType.email)?.value ?? "";
    var name = form.getState(InputType.name)?.value ?? "";
    var phone = form.getState(InputType.phone)?.value ?? "";
    const formInputs = [email, name, phone];

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
      const newData = createUserData(
        email !== "" ? email : session?.session.user?.email!,
        null,
        session?.session.user?.role,
        name !== "" ? name : session?.session.user?.name!,
        phone !== "" ? phone : session?.session.user?.phone!
      );
      const body = { newUser: newData, user: session?.session.user};

      const token = await fetch('/api/edit-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const jsonToken = await token.json();
      console.log("🚀 ~ save ~ jsonToken:", jsonToken)
      if(jsonToken) {
        if(cookie) {
          deleteCookie(Cookies.userSession);
        }
        setCookie(Cookies.userSession, JSON.stringify({state: true, user: newData}), {
          path: "/",
          maxAge: 3600,
          sameSite: "strict",
        });
  
  
        window.location.reload();
      }
    } catch (error) {
      console.error(error)
    }

  };


  return (<>
    <div className="profile" onClick={(e) => e.stopPropagation()}>
      <div className="form-container" onClick={hideForm}>
        <div className="form-shape" onClick={(e) => e.stopPropagation()}>
          <div className="custom-form">
            <form>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  name="name"
                  id={InputType.name}
                  required
                  className= {`${InputStyle.default} ${emailStyle.style !== InputStyle.default ? emailStyle.style : ""}`}
                  style={{animationDuration: emailStyle.style.includes(InputStyle.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                  placeholder="Enter your name"
                  aria-describedby="helpId"
                  autoComplete="name"
                  onFocus={handleEvent}
                  onInput={handleEvent}
                  onChange={handleEvent}
                  onBlur={handleEvent}
                  ref={inputs[0]}
                />
              </div>          
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
                  ref={inputs[1]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  name="phone"
                  id={InputType.phone}
                  required
                  className= {`${InputStyle.default} ${emailStyle.style !== InputStyle.default ? emailStyle.style : ""}`}
                  style={{animationDuration: emailStyle.style.includes(InputStyle.fadeIn as string) ? fadeInTime.css : fadeOutTime.css}}
                  placeholder="Enter your phone"
                  aria-describedby="helpId"
                  autoComplete="phone"
                  data-form-type="username,phone"
                  onFocus={handleEvent}
                  onInput={handleEvent}
                  onChange={handleEvent}
                  onBlur={handleEvent}
                  ref={inputs[2]}
                />
              </div>          
              <div className="form-button-group">
                <button className="form-button form-button-main" onClick={save} >Save</button>
                <button type="reset" className="form-button form-button-secondary" onClick={hideForm} >Cancel</button>
              </div>
            </form>
            <div id="login-final-gap"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}



export default Change