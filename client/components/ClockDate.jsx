import React, { useEffect, useState } from 'react'
import Clock from 'react-live-clock'

function ClockDate(props) {
  const { region, district } = props
  const regionName = region?.name
  const districtName = district?.name
  const [loc, setLoc] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    switch (districtName) {
      case 'Auckland City':
      case 'Hauraki Gulf Island':
      case 'Waiheke Island':
      case 'Franklin':
        setLoc('auckland')
        setType('urban')
        break
      case 'Manukau City':
        setLoc('manukau')
        setType('urban')
        break
      case 'North Shore City':
        setLoc('north-shore')
        setType('urban')
        break
      case 'Papakura':
        setLoc('hunua')
        setType('urban')
        break
      case 'Rodney':
        setLoc('warkworth')
        setType('rural')
        break
      case 'Waitakere City':
        setLoc('waitakere')
        setType('urban')
        break
      case 'Hamilton':
      case 'Waikato':
        setLoc('hamilton')
        setType('urban')
        break
      case 'Hauraki':
        setLoc('paeroa')
        setType('rural')
        break
      case 'Matamata-Piako':
        setLoc('matamata')
        setType('rural')
        break
      case 'Otorohanga':
      case 'Waipa':
      case 'Waitomo':
        setLoc('te-awamutu')
        setType('rural')
        break
      case 'South Waikato':
        setLoc('tokoroa')
        setType('urban')
        break
      case 'Taupo':
        setLoc('taupo')
        setType('urban')
        break
      case 'Thames-Coromandel':
        setLoc('thames')
        setType('urban')
        break
      case 'Kawerau':
      case 'Opotiki':
      case 'Whakatane':
        setLoc('whakatane')
        setType('urban')
        break
      case 'Rotorua':
        setLoc('rotorua')
        setType('urban')
        break
      case 'Tauranga':
      case 'Western Bay Of Plenty':
        setLoc('tauranga')
        setType('urban')
        break
      case 'New Plymouth':
        setLoc('new-plymouth')
        setType('urban')
        break
      case 'South Taranaki':
      case 'Stratford':
        setLoc('wanganui')
        setType('urban')
        break
      case 'Horowhenua':
      case 'Manawatu':
      case 'Palmerston North':
        setLoc('palmerston-north')
        setType('urban')
        break
    }
  }, [])

  // useEffect(() => {
  //   console.log(regionName)
  //   console.log(districtName)
  // }, [])

  function blockWeatherClick(e) {
    e.preventDefault()
  }
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
      <iframe
        id="widget-iframe"
        width="160px"
        height="231px"
        src="https://services.metservice.com/weather-widget/widget?params=blue|medium|portrait|days-1|classic&loc=wanganui&type=urban"
        allowtransparency="true"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  )
}

export default ClockDate
