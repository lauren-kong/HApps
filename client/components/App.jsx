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
  // const [regions, setRegions] = useState(null)
  // const [districts, setDistricts] = useState(null)

  // useEffect(() => {
  //   getRegions().then((regionsData) => {
  //     setRegions(regionsData)
  //   })
  //   getDistricts().then((districtsData) => {
  //     setDistricts(districtsData)
  //   })
  // }, [])

  //JSX
  return (
    <div className="app">
      <Routes>
        <Route
          key="add-post-region"
          path="locations/:regionCode/addPost"
          element={
            <>
              <ClockDate />
              <div className="ADDPOST-MAINS">
                <Header />
                <AddPost />
              </div>
            </>
          }
        />

        <Route
          key="postsByDistrict"
          path="/locations/:regionCode/:districtCode"
          element={
            <>
              <ClockDate />
              <div className="POST_MAINS">
                <Header />
                <Posts />
              </div>
            </>
          }
        />

        <Route
          key="posts"
          path="/locations/:regionCode"
          element={
            <>
              <ClockDate />
              <div className="POST_MAINS">
                <Header />
                <Posts />
              </div>
            </>
          }
        />

        {/* LOCATIONS PAGE */}
        <Route
          path="/locations"
          element={
            <>
              <HeaderTop color="main" />
              <Locations />
            </>
          }
        />

        {/* HOME PAGE */}
        <Route key="home" path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
