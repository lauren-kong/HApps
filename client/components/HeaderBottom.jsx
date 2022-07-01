import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import DistrictsDropdown from './DistrictsDropdown'

import { getDistrictsByRegionCode } from '../apiClient'

function HeaderBottom(props) {
  const { currentRegion, currentDistrict, district } = props
  const [districts, setDistricts] = useState(null)

  // console.log(currentDistrict)
  // console.log(currentRegion)

  useEffect(() => {
    getDistrictsByRegionCode(currentRegion.code).then((distArr) => {
      setDistricts(distArr)
    })
  }, [districts])

  return (
    <>
      <div className="header-bottom-left">
        {/* <div className="clock">
          <Clock
            format={'dddd DD MMMM YYYY'}
            ticking={true}
            timezone={'NZ'}
            className="clock-day"
          />

          <Clock
            format={'h:m a'}
            ticking={true}
            timezone={'NZ'}
            className="clock-time"
          />
        </div> */}
      </div>
      <div className="header-bottom-mid">
        <div className="header-bottom-current-region-name">
          {currentRegion.name}
        </div>
        <div className="header-bottom-districts-and-button">
          {districts ? (
            <DistrictsDropdown districts={districts} district={district} />
          ) : null}
          <div className="share-event-button-div">
            {currentDistrict ? (
              <Link
                to={`/locations/${currentRegion.code}/${currentDistrict.code}/addPost`}
              >
                <button>Share Event</button>
              </Link>
            ) : (
              <Link to={`/locations/${currentRegion.code}/addPost`}>
                <button>Share Event</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="header-bottom-right"></div>
    </>
  )
}

export default HeaderBottom
