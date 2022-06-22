import React from 'react'
import { Link } from 'react-router-dom'

function Region(props) {
  const { image, name, code } = props
  return (
    <Link to={`/v1/locations/${code}`}>
      <div className="region">
        <div className="region-title">{name}</div>
        <img src={image} alt={name} />
      </div>
    </Link>
  )
}

export default Region
