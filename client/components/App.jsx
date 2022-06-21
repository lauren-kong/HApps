import React, { useState, useEffect } from 'react'

import Locations from './Locations'
import Home from './Home'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/locations" element={<Locations />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App