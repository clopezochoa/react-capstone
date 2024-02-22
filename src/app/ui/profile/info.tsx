import { capitalizeFirstLetter } from 'app/lib/helper'
import { SessionContext } from 'app/provider'
import React, { useContext } from 'react'


const Info = ({change, password}:{change: () => void, password: () => void}) => {
  const session = useContext(SessionContext);
  return (
    <>
      <div className="profile" onClick={(e) => e.stopPropagation()}>
        <h1>Welcome, {capitalizeFirstLetter(session?.session.user?.name.split(" ")[0])}</h1>
        <div className='data-span'>
          <label>
            Email
          </label>
          <span>
            {session?.session.user?.email}
          </span>
        </div>
        <div className='data-span'>
          <label>
            Phone
          </label>
          <span>
            {session?.session.user?.phone}
          </span>
        </div>
        <div className="profile-button-group">
          <button className="form-button form-button-main" onClick={change}>Change</button>
          <button className="form-button form-button-secondary" onClick={password}>Change Password</button>
        </div>
      </div>
    </>
  )
}

export default Info