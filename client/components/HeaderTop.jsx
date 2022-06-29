import React from 'react'
import { Link } from 'react-router-dom'
import Clock from 'react-live-clock'

import RegionDropdown from './RegionDropdown'

function HeaderLogo(props) {
  const { regions, color } = props

  // console.log(color)

  return (
    <div className={`header-top-inner ${color}`}>
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
      {/* 
      <div className="header-bottom-left">
        <div className="clock">
          <Clock
            format={'dddd DD MMMM YYYY'}
            ticking={true}
            timezone={'NZ'}
            className="clock-day"
          />
          <Clock
            format={'DD MMMM YYYY'}
            ticking={true}
            timezone={'NZ'}
            className="clock-date"
          />
          <Clock
            format={'h:mm a'}
            ticking={true}
            timezone={'NZ'}
            className="clock-time"
          />
        </div>
      </div> */}

      <div className="header-top-right">
        <RegionDropdown regions={regions} />
      </div>

      {/* <div class="custom-shape-divider-top-1655722479">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div> */}
    </div>
  )
}

export default HeaderLogo
