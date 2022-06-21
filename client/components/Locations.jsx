import React from 'react'

import Region from './Region'

import regionsData from '../../data/regions'

function Locations() {
  return (
    <div className="locations">
      <h2 className="north-island-title">North Island</h2>
      <div className="north-island">
        {regionsData.map((region) => {
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
        {regionsData.map((region) => {
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
