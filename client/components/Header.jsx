import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getRegions, getDistricts } from '../apiClient'

import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'
import ClockDate from './ClockDate'

function Header(props) {
  const { color } = props
  // const { regions, currentRegion, color, district } = props
  const { regionCode, districtCode } = useParams()
  const [regions, setRegions] = useState(null)
  const [currentRegion, setCurrentRegion] = useState(null)
  const [district, setDistrict] = useState(null)
  useEffect(() => {
    getRegions().then((regionsData) => {
      setRegions(regionsData)
      setCurrentRegion(regionsData.find((region) => region.code === regionCode))
    })
    getDistricts((districtsData) => {
      setDistrict(
        districtsData.find((districtData) => districtData.code === districtCode)
      )
    })
  }, [])

  return (
    <div className="outer-header">
      <div className="header-top">
        <HeaderTop regions={regions} color={color} />
      </div>
      <ClockDate />
      <div className="header-bottom">
        <HeaderBottom currentRegion={currentRegion} district={district} />
      </div>
    </div>
  )
}

export default Header
