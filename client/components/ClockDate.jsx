import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import Clock from 'react-live-clock'

function ClockDate(props) {
  const { region, district } = props
  const [weatherInfo, setWeatherInfo] = useState({})

  useEffect(() => {
    if (district) {
      // console.log('district:', district)
      setWeatherInfo({
        name: district.weatherLocName,
        type: district.weatherLocType,
      })
    } else if (!district && region) {
      // console.log('region:', region)
      setWeatherInfo({
        name: region.weatherLocName,
        type: region.weatherLocType,
      })
    }
  }, [district, region])

  // useEffect(() => {
  //   if (weatherInfo) {
  //     console.log('weatherInfo:', weatherInfo)
  //   }
  // }, [weatherInfo])

  // useEffect(() => {
  //   switch (districtName) {
  //     case 'Auckland City':
  //     case 'Hauraki Gulf Island':
  //     case 'Waiheke Island':
  //     case 'Franklin':
  //       setLoc('auckland')
  //       setType('urban')
  //       break
  //     case 'Manukau City':
  //       setLoc('manukau')
  //       setType('urban')
  //       break
  //     case 'North Shore City':
  //       setLoc('north-shore')
  //       setType('urban')
  //       break
  //     case 'Papakura':
  //       setLoc('hunua')
  //       setType('urban')
  //       break
  //     case 'Rodney':
  //       setLoc('warkworth')
  //       setType('rural')
  //       break
  //     case 'Waitakere City':
  //       setLoc('waitakere')
  //       setType('urban')
  //       break
  //     case 'Hamilton':
  //     case 'Waikato':
  //       setLoc('hamilton')
  //       setType('urban')
  //       break
  //     case 'Hauraki':
  //       setLoc('paeroa')
  //       setType('rural')
  //       break
  //     case 'Matamata-Piako':
  //       setLoc('matamata')
  //       setType('rural')
  //       break
  //     case 'Otorohanga':
  //     case 'Waipa':
  //     case 'Waitomo':
  //       setLoc('te-awamutu')
  //       setType('rural')
  //       break
  //     case 'South Waikato':
  //       setLoc('tokoroa')
  //       setType('urban')
  //       break
  //     case 'Taupo':
  //       setLoc('taupo')
  //       setType('urban')
  //       break
  //     case 'Thames-Coromandel':
  //       setLoc('thames')
  //       setType('urban')
  //       break
  //     case 'Kawerau':
  //     case 'Opotiki':
  //     case 'Whakatane':
  //       setLoc('whakatane')
  //       setType('urban')
  //       break
  //     case 'Rotorua':
  //       setLoc('rotorua')
  //       setType('urban')
  //       break
  //     case 'Tauranga':
  //     case 'Western Bay Of Plenty':
  //       setLoc('tauranga')
  //       setType('urban')
  //       break
  //     case 'New Plymouth':
  //       setLoc('new-plymouth')
  //       setType('urban')
  //       break
  //     case 'South Taranaki':
  //     case 'Stratford':
  //     case 'Whanganui':
  //       setLoc('wanganui')
  //       setType('urban')
  //       break
  //     case 'Horowhenua':
  //     case 'Manawatu':
  //     case 'Palmerston North':
  //       setLoc('palmerston-north')
  //       setType('urban')
  //       break
  //     case 'Rangitikei':
  //     case 'Ruapehu':
  //       setLoc('waiouru')
  //       setType('rural')
  //       break
  //     case 'Carterton':c
  //       setLoc('masterton')
  //       setType('rural')
  //       break

  //     case 'Kapiti Coast':
  //       setLoc('te-horo')
  //       setType('rural')
  //       break
  //     case 'Lower Hutt':
  //       setLoc('lower-hutt')
  //       setType('urban')
  //   }
  // }, [])

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
        width="280px"
        height="113px"
        src={`https://services.metservice.com/weather-widget/widget?params=blue|small|landscape|days-1|modern&loc=${
          weatherInfo ? weatherInfo.name : 'auckland'
        }&type=${weatherInfo ? weatherInfo.type : 'urban'}`}
        allowtransparency="true"
        style={{ border: 'none' }}
        className="widget-weather"
      ></iframe>
    </div>
  )
}

export default ClockDate
