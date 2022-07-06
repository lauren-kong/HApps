import React from 'react'
import { Link } from 'react-router-dom'

import ClockDate from './ClockDate'

import RegionDropdown from './RegionDropdown'

function HeaderLogo(props) {
  return (
    <div className={`header-top-inner`}>
      <div className="header-top-left"></div>
      <div className="header-top-mid">
        <Link to="/locations">
          <img
            src="/images/happs-logo-dark.png"
            alt="logo"
            className="logo-img"
          />
        </Link>
      </div>
      <div className="header-top-right">
        <RegionDropdown />
      </div>
    </div>
  )
}

export default HeaderLogo
