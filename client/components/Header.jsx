import React from 'react'

import HeaderTop from './HeaderTop'

function Header(props) {
  const { regions } = props
  // console.log(regions)

  return (
    <div className="outer-header">
      <div className="header-top">
        <HeaderTop regions={regions} />
      </div>
      <div className="header-bottom">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Header
