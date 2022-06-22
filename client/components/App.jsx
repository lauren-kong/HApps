import React, { useState, useEffect } from 'react'

import Locations from './Locations'
import Home from './Home'
import LocationsHeader from './Locations-Header'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/locations"
          element={
            <div>
              <LocationsHeader />
              <Locations />
            </div>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
