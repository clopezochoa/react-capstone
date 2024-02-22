'use client'

import { SessionContext } from 'app/provider';
import React, { useContext, useEffect, useState } from 'react'
import 'styles/Profile.css'
import 'styles/AccessForms.css'
import Info from './info';
import Change from './form';
import Password from './password';

function Profile({toggle}: {toggle: () => void}) {
  const session = useContext(SessionContext);
  const nullContent = <></>;  
  const [content, setContent] = useState(nullContent);

  const setDefault = () => {
    if(session?.session.isSession) setContent(<Info change={change} password={password}/>);
  }

  const change = () => {
    if(session?.session.isSession) setContent(<Change hideForm={setDefault}/>);
  }
  
  const password = () => {
    if(session?.session.isSession) setContent(<Password hideForm={setDefault}/>);
  }

  const exit = () => {
    setContent(nullContent);
    toggle();
  }

  useEffect(() => {
    setDefault();
  }, [])
  
  return (<>
    <div className="overlay-background-white" onClick={exit}></div>
    {content}
  </>
  )
}

export default Profile