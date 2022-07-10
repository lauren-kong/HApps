import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Region from './Region'

import { getAllRegions } from '../actions'

function Locations() {
  const dispatch = useDispatch()

  const regions = useSelector((state) => state.regions)
  const loading = useSelector((state) => state.loading)

  useEffect(() => {
    dispatch(getAllRegions())
  }, [])

  //JSX
  return (
    <div className="locations">
      <h2 className="north-island-title">North Island</h2>
      {loading ? (
        <img src="/images/loading.gif"></img>
      ) : (
        <div className="north-island">
          {regions?.map((region) => {
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
      )}

      <h2 className="south-island-title">South Island</h2>
      {loading ? (
        <img src="/images/loading.gif"></img>
      ) : (
        <div className="south-island">
          {regions?.map((region) => {
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
      )}
    </div>
  )
}

export default Locations
