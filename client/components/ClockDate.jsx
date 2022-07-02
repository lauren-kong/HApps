import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Clock from 'react-live-clock'

import { getRegions, getDistricts } from '../apiClient'

function ClockDate(props) {
  // const { region, district } = props
  const { regionCode, districtCode } = useParams()
  const [region, setRegion] = useState(null)
  const [district, setDistrict] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    getRegions().then((regionsData) => {
      setRegion(
        regionsData.find((regionData) => regionData.code === regionCode)
      )
    })
    if (districtCode) {
      getDistricts().then((districtsData) => {
        setDistrict(
          districtsData.find(
            (districtData) => districtData.code === districtCode
          )
        )
      })
    }
  }, [])

  useEffect(() => {
    if (district) {
      setWeatherInfo({
        name: district.weatherLocName,
        type: district.weatherLocType,
      })
    } else if (!district && region) {
      setWeatherInfo({
        name: region.weatherLocName,
        type: region.weatherLocType,
      })
    }
  }, [district, region])

  useEffect(() => {
    if (weatherInfo) {
      console.log('weatherInfo:', weatherInfo)
    }
  }, [weatherInfo])

  const [loc, setLoc] = useState(null)
  const [type, setType] = useState(null)

  function blockWeatherClick(e) {
    e.preventDefault()
  }
  return (
    <div className="clock">
      <Clock
        format={'dddd DD MMMM YYYY'}
        ticking={true}
        timezone={'NZ'}
        className="clock-day"
      />

      <Clock
        format={'h:mm a'}
        ticking={true}
        timezone={'NZ'}
        className="clock-time"
      />
      <iframe
        id="widget-iframe"
        width="280px"
        height="113px"
        src={`https://services.metservice.com/weather-widget/widget?params=blue|small|landscape|days-1|modern&loc=${
          weatherInfo ? weatherInfo.name : 'auckland'
        }&type=${weatherInfo ? weatherInfo.type : 'urban'}`}
        allowtransparency="true"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  )
}

export default ClockDate
