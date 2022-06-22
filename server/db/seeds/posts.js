exports.seed = (knex) => {
  return knex('posts')
    .del()
    .then(() => {
      return knex('posts').insert([
        {
          id: 1,
          password: 'firstPostPassword',
          regionCode: 'AUK',
          districtCode: 'Manukau City',
          postImages: JSON.stringify([
            './images/auckland.jpeg',
            './images/northland.jpeg',
          ]),
          eventName: 'Night Market',
          location: 'Manukau Shopping Centre',
          postedTime: new Date(Date.now()),
          description: 'Lots of food and some attractions are here!',
          reliability: 0,
        },
      ])
    })
}
