import React from 'react'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function RegionDropdown(props) {
  const { regions } = props
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Other Regions
        </Dropdown.Toggle>

        <Dropdown.Menu id="dropdown-menu">
          {regions.map((region) => {
            return (
              <Dropdown.Item
                key={region.code}
                href={`/locations/${region.code}`}
              >
                {region.name}
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

export default RegionDropdown
