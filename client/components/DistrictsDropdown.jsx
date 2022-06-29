import React from 'react'
import { useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function DistrictsDropdown(props) {
  const { districts, district } = props
  useEffect(() => {
    console.log(district)
  }, [])
  return (
    <>
      <Dropdown className="DISTRICTS_DROPDOWN">
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="districts-dropdown-toggle"
        >
          {district ? district.name : 'All districts'}
        </Dropdown.Toggle>

        <Dropdown.Menu id="dropdown-menu" className="districts-dropdown-menu">
          <Dropdown.Item href={`/locations/${districts[0].regionCode}`}>
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
          {/* <Dropdown.Item href="/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
export default DistrictsDropdown
