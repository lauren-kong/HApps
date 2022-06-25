import React, { useState, useEffect } from 'react'

import Region from './Region'

// import regionsData from '../../data/regions'

// import { getRegions } from '../apiClient'

function Locations(props) {
  //JAVASCRIPT
  // const [regions, setRegions] = useState(null)

  // useEffect(() => {
  //   getRegions().then((regionsData) => {
  //     setRegions(regionsData)
  //   })
  // }, [])

  const { regions } = props

  //JSX
  return (
    <div className="locations">
      <h2 className="north-island-title">North Island</h2>
      <div className="north-island">
        {regions.map((region) => {
          return (
            region.ns === 'North' && (
              <Region
                key={region.code}
                name={region.name}
                code={region.code}
                image={region.image}
              />
            )
          )
        })}
      </div>
      <h2 className="south-island-title">South Island</h2>
      <div className="south-island">
        {regions.map((region) => {
          return (
            region.ns === 'South' && (
              <Region
                key={region.code}
                name={region.name}
                code={region.code}
                image={region.image}
              />
            )
          )
        })}
      </div>
    </div>
  )
}

export default Locations
