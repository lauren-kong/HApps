import React, { useState, useEffect } from 'react'
import { getRegions, getPostsByRegionCode } from '../apiClient'

import AddPost from './AddPost'
import HeaderTop from './HeaderTop'
import Header from './Header'
import Locations from './Locations'
import Home from './Home'
import Posts from './Posts'
import ClockDate from './ClockDate'
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
        {/* ADDPOST PAGE */}
        {regions
          ? regions.map((region) => {
              return (
                <Route
                  key="add-post"
                  path={`/locations/${region.code}/addPost`}
                  element={
                    <>
                      <ClockDate />
                      <div className="ADDPOST-MAINS">
                        <Header
                          regions={regions}
                          currentRegion={region}
                          color={'white'}
                        />
                        <AddPost key={region.id} region={region} />
                      </div>
                    </>
                  }
                />
              )
            })
          : null}

        {/* POSTS PAGE */}
        {regions
          ? regions.map((region) => {
              return (
                <Route
                  key="posts"
                  path={`/locations/${region.code}`}
                  element={
                    <>
                      <ClockDate />
                      <div className="POST_MAINS">
                        <Header
                          regions={regions}
                          currentRegion={region}
                          color={'white'}
                        />
                        <Posts key={region.id} region={region} />
                      </div>
                    </>
                  }
                />
              )
            })
          : null}
        {/* LOCATIONS PAGE */}
        {regions ? (
          <Route
            key="locations"
            path="/locations"
            element={
              <div>
                <HeaderTop regions={regions} color={'main'} />
                <Locations regions={regions} />
              </div>
            }
          />
        ) : null}

        {/* HOME PAGE */}
        <Route key="home" path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
