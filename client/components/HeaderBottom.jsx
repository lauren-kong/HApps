import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import DistrictsDropdown from './DistrictsDropdown'

import { getDistricts, getRegions } from '../apiClient'

function HeaderBottom(props) {
  const { regionCode, districtCode } = useParams()
  const [districts, setDistricts] = useState(null)
  const [currentDistrict, setCurrentDistrict] = useState(null)
  const [currentRegion, setCurrentRegion] = useState(null)

  useEffect(() => {
    if (regionCode && !districtCode) {
      getRegions().then((regionsData) => {
        setCurrentRegion(
          regionsData.find((regionData) => regionData.code === regionCode)
        )
      })
    }

    getDistricts().then((districtsData) => {
      setDistricts(districtsData)
      if (districtCode) {
        setCurrentDistrict(
          districtsData.find(
            (districtData) => districtData.code === districtCode
          )
        )
      }
    })
  }, [])

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
        <div
          className="header-bottom-current-region-name"
          id={
            currentRegion && currentRegion.name === 'Manawatu Whanganui'
              ? 'long'
              : ''
          }
        >
          {currentRegion ? currentRegion.name : null}
        </div>
        <div className="header-bottom-districts-and-button">
          <DistrictsDropdown />

          {currentRegion && (
            <div className="share-event-button-div">
              <Link to={`/locations/${currentRegion.code}/addPost`}>
                <button className="add-button">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="header-bottom-right"></div>
    </>
  )
}

export default HeaderBottom
