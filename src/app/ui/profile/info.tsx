import { capitalizeFirstLetter } from 'app/lib/helper'
import { SessionContext } from 'app/provider'
import React, { useContext } from 'react'
import 'styles/buttons.css'
import CloseButton from '../utils/closeButton'

const Info = ({hideForm, change, password}:{hideForm: () => void, change: () => void, password: () => void}) => {
  const session = useContext(SessionContext);
  return (
    <>
      <div className="profile" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn-mobile" onClick={hideForm}>
          <CloseButton size={24} />
        </button>
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