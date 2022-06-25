import React from 'react'

import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'

function Header(props) {
  const { regions, currentRegion, color } = props

  return (
    <div className="outer-header">
      <div className="header-top">
        <HeaderTop regions={regions} color={color} />
      </div>
      <div className="header-bottom">
        <HeaderBottom currentRegion={currentRegion} />
      </div>
    </div>
  )
}

export default Header
