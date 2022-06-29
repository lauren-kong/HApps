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
        {regions
          ? regions.map((region) => {
              return (
                <>
                  {/* ADDPOST PAGE */}
                  <Route
                    key="add-post"
                    path={`/locations/${region.code}/addPost`}
                    element={
                      <>
                        <ClockDate region={region} />
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

                  {/* POSTS PAGE (RegionCode) */}
                  <Route
                    key="posts"
                    path={`/locations/${region.code}`}
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
                  {/* POSTS PAGE (DistrictCode)*/}
                  {districts
                    ? districts.map((district) => {
                        return (
                          <Route
                            key="postsByDistrict"
                            path={`/locations/${district.regionCode}/${district.code}`}
                            element={
                              <>
                                <ClockDate
                                  region={region}
                                  district={district}
                                />
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
                    : null}

                  {/* LOCATIONS PAGE */}
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

                  {/* HOME PAGE */}
                  <Route key="home" path="/" element={<Home />} />
                </>
              )
            })
          : null}
        {/* 
        POSTS PAGE
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

        LOCATIONS PAGE
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

        HOME PAGE
        <Route key="home" path="/" element={<Home />} /> */}
      </Routes>
    </div>
  )
}

export default App
