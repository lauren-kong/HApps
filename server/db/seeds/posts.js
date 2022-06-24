exports.seed = (knex) => {
  return knex('posts')
    .del()
    .then(() => {
      const today = new Date()
      return knex('posts').insert([
        {
          id: 1,
          password: 'firstPostPassword',
          regionCode: 'AUK',
          districtCode: 'Manukau City',
          postImages: JSON.stringify([
            '/images/auckland.jpeg',
            '/images/northland.jpeg',
          ]),
          eventName: 'Night Market',
          location: 'Manukau Shopping Centre',
          postedTime: today.toLocaleTimeString('en-US'),
          description: 'Lots of food and some attractions are here!',
          reliability: 0,
          clicked: false,
        },
        {
          id: 2,
          password: 'secondPostPassword',
          regionCode: 'BOP',
          districtCode: 'Rotorua',
          postImages: JSON.stringify([
            '/images/hangi.jpeg',
            '/images/hangi-meal.jpeg',
          ]),
          eventName: 'Hangi Festival',
          location: 'Mitai Maoiri Village',
          postedTime: today.toLocaleTimeString('en-US'),
          description:
            'We are having so much fun with Maori culture experience. We are also getting provided free hangi for our lunch!',
          reliability: 0,
          clicked: false,
        },
        {
          id: 3,
          password: 'thirdPostPassword',
          regionCode: 'AUK',
          districtCode: 'North Shore City',
          postImages: JSON.stringify([
            '/images/k-bbq.jpeg',
            '/images/k-bbq-2.jpeg',
            '/images/k-bbq-people.jpeg',
          ]),
          eventName: 'Discount only today',
          location: 'Wellbeing BBQ & Buffet',
          postedTime: today.toLocaleTimeString('en-US'),
          description:
            'All you can eat korean barbeque only for $25 per person. Normal price is $40!',
          reliability: 0,
          clicked: false,
        },
      ])
    })
}
