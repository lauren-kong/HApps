import React, { useState, useEffect } from 'react'
import { getRegions, getPostsByRegionCode, getDistricts } from '../apiClient'

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
  const [districts, setDistricts] = useState(null)

  useEffect(() => {
    getRegions().then((regionsData) => {
      setRegions(regionsData)
    })
    getDistricts().then((districtsData) => {
      setDistricts(districtsData)
    })
  }, [])

  //JSX
  return (
    <div className="app">
      <Routes>
        {regions && districts
          ? regions.map((region, index) => {
              districts.map((district, index2) => {
                return (
                  <Route
                    key={index2}
                    path={`/locations/${region.code}/${district.code}/`}
                    element={
                      <>
                        <ClockDate region={region} district={district} />
                        <div className="POST_MAINS">
                          <Header
                            regions={regions}
                            currentRegion={region}
                            color={'white'}
                            district={district}
                          />
                          <Posts
                            key={region.id}
                            region={region}
                            district={district}
                          />
                        </div>
                      </>
                    }
                  />
                )
              })
            })
          : null}

        {regions
          ? regions.map((region, index) => {
              return (
                <Route
                  key="add-post"
                  path={`/locations/${region.code}/addPost/`}
                  element={
                    <>
                      <ClockDate region={region} />
                      <div className="ADDPOST">
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
        {regions
          ? regions.map((region, index) => {
              return (
                <Route
                  key="posts"
                  path={`/locations/${region.code}/`}
                  element={
                    <>
                      <ClockDate region={region} />
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

        {regions ? (
          <Route
            path="/locations/"
            element={
              <div>
                <HeaderTop regions={regions} color={'main'} />
                <Locations regions={regions} />
              </div>
            }
          />
        ) : null}

        <Route key="home" path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
