import React, { useState, useEffect } from 'react'
import { getRegions, getPostsByRegionCode } from '../apiClient'

import LocationsHeader from './Locations-Header'
import Locations from './Locations'
import Home from './Home'
import Posts from './Posts'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  //JAVASCRIPT
  const [regions, setRegions] = useState(null)

  useEffect(() => {
    getRegions().then((regionsData) => {
      setRegions(regionsData)
    })
  }, [])

  //JSX
  return (
    <div className="app">
      <Routes>
        {/* POSTS PAGE */}
        {regions
          ? regions.map((region) => {
              return (
                <Route
                  key="posts"
                  path={`/locations/${region.code}`}
                  element={<Posts key={region.id} region={region} />}
                />
              )
            })
          : null}
        {/* LOCATIONS PAGE */}
        <Route
          key="locations"
          path="/locations"
          element={
            <div>
              <LocationsHeader />
              <Locations />
            </div>
          }
        />
        {/* HOME PAGE */}
        <Route key="home" path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
