import React, { useState, useEffect } from 'react'

import Dropdown from 'react-bootstrap/Dropdown'

import { getRegions } from '../apiClient'

function RegionDropdown(props) {
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
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default RegionDropdown
