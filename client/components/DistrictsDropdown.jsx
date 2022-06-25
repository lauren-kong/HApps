import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function DistrictsDropdown(props) {
  const { districts } = props
  return (
    <>
      <Dropdown className="DISTRICTS_DROPDOWN">
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="districts-dropdown-toggle"
        >
          All districts
        </Dropdown.Toggle>

        <Dropdown.Menu id="dropdown-menu" className="districts-dropdown-menu">
          <Dropdown.Item href={`/locations/${districts.regionCode}`}>
            {districts.name}
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
