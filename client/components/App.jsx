import React, { useState, useEffect } from 'react'
import { getRegions, getPostsByRegionCode, getDistricts } from '../apiClient'
import ScrollToTop from 'react-scroll-up'

import AddPost from './AddPost'
import HeaderTop from './HeaderTop'
import Header from './Header'
import Locations from './Locations'
import Home from './Home'
import Posts from './Posts'
import ClockDate from './ClockDate'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          key="add-post-region"
          path="locations/:regionCode/addPost"
          element={
            <>
              {/* <ClockDate /> */}
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
              {/* <ClockDate /> */}
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
              {/* <ClockDate /> */}
              <div className="POST_MAINS">
                <Header />
                <Posts />
              </div>
            </>
          }
        />

        <Route
          path="/locations"
          element={
            <>
              <HeaderTop />
              <Locations />
            </>
          }
        />

        <Route key="home" path="/" element={<Home />} />
      </Routes>
      <ScrollToTop showUnder={160} topPosition={0} duration={1}>
        <div className="scroll-button">
          <i className="fa-solid fa-angles-up"></i>
        </div>
      </ScrollToTop>
    </div>
  )
}

export default App
