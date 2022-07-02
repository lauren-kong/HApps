import React from 'react'
import { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useParams } from 'react-router-dom'

import { getDistricts } from '../apiClient'

function DistrictsDropdown(props) {
  // const { districts } = props
  const { regionCode, districtCode } = useParams()
  const [districts, setDistricts] = useState(null)
  const [currentDistrict, setCurrentDistrict] = useState(null)

  useEffect(() => {
    getDistricts().then((districtsData) => {
      console.log(districtsData)
      setDistricts(
        districtsData.filter((distData) => distData.regionCode === regionCode)
      )
      if (districtCode) {
        setCurrentDistrict(
          districtsData.find((distData) => distData.code === districtCode)
        )
      }
    })
  }, [])

  useEffect(() => {
    console.log(districts)
  }, [districts])

  return (
    <>
      <Dropdown className="DISTRICTS_DROPDOWN">
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="districts-dropdown-toggle"
        >
          {currentDistrict ? currentDistrict.name : 'All districts'}
        </Dropdown.Toggle>
        {districts ? (
          <Dropdown.Menu id="dropdown-menu" className="districts-dropdown-menu">
            <Dropdown.Item
              href={`/locations/${
                districts && districts.length > 0
                  ? districts[0].regionCode
                  : null
              }`}
            >
              All districts
            </Dropdown.Item>
            {districts.map((district) => {
              return (
                <Dropdown.Item
                  key={district.id}
                  href={`/locations/${district.regionCode}/${district.code}`}
                >
                  {district.name}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        ) : null}
      </Dropdown>
    </>
  )
}
export default DistrictsDropdown
