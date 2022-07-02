import React, { useState, useEffect } from 'react'

import Dropdown from 'react-bootstrap/Dropdown'

import { getRegions } from '../apiClient'

function RegionDropdown(props) {
  // const { regions } = props
  const [regions, setRegions] = useState(null)
  useEffect(() => {
    getRegions().then((regionsData) => {
      setRegions(regionsData)
    })
  }, [])
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Other Regions
        </Dropdown.Toggle>

        <Dropdown.Menu id="dropdown-menu">
          {regions
            ? regions.map((region) => {
                return (
                  <Dropdown.Item
                    key={region.code}
                    href={`/locations/${region.code}`}
                  >
                    {region.name}
                  </Dropdown.Item>
                )
              })
            : null}
          {/* <Dropdown.Item href="/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default RegionDropdown
