import React from 'react'

import LocationsHeader from './Locations-Header'

function Header() {
  return (
    <div className="posts-header">
      <div className="post-header-logo">
        <LocationsHeader />
      </div>
      <div className="post-header-locations">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Header
