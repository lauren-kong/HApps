import React, { useEffect } from 'react'
import Clock from 'react-live-clock'

function ClockDate(props) {
  // useEffect(() => {
  //   console.log('Im here!')
  // }, [])

  return (
    <div className="clock">
      <Clock
        format={'dddd DD MMMM YYYY'}
        ticking={true}
        timezone={'NZ'}
        className="clock-day"
      />

      <Clock
        format={'h:mm a'}
        ticking={true}
        timezone={'NZ'}
        className="clock-time"
      />
    </div>
  )
}

export default ClockDate
