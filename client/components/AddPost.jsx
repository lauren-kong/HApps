import React from 'react'
import { useEffect, useState } from 'react'
import { get } from 'superagent'
import { getDistrictsByRegionCode } from '../apiClient'

function AddPost(props) {
  // useEffect(() => {},[])

  const { region } = props
  const [districtsList, setDistrictsList] = useState(null)
  console.log(region)
  useEffect(() => {
    getDistrictsByRegionCode(region.code).then((districts) => {
      setDistrictsList(districts)
    })
  }, [])

  const [newPostDistrict, setNewPostDistrict] = useState('')
  function handleDistrictChange(e) {
    // console.log(e.target.value)
    setNewPostDistrict(e.target.value)
  }

  const [newPostLocation, setNewPostLocation] = useState(null)
  function handleLocationChange(e) {
    setNewPostLocation(e.target.value)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    console.log('submitted')
  }

  useEffect(() => {}, [])

  return (
    <div className="below-header">
      <form onSubmit={handleFormSubmit}>
        <div>
          <select value={newPostDistrict} onChange={handleDistrictChange}>
            {districtsList
              ? districtsList.map((dist) => {
                  return (
                    <option key={dist.code} value={dist.name}>
                      {dist.name}
                    </option>
                  )
                })
              : null}
          </select>
          <div>
            <input type="text" value={newPostLocation} placeholder="Location" />
          </div>
          <button>Post</button>
        </div>
      </form>
    </div>
  )
}

export default AddPost
