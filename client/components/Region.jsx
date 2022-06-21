import React from 'react'

function Region(props) {
  return (
    <div className="region">
      <img src={props.image} alt={props.name} />
    </div>
  )
}

export default Region
