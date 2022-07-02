exports.seed = (knex) => {
  return knex('posts')
    .del()
    .then(() => {
      const today = new Date()
      return knex('posts').insert([
        {
          id: 4,
          password: 'firstPostPassword',
          regionCode: 'AUK',
          districtCode: 'MKC',
          postImages: JSON.stringify([
            '/images/auckland.jpeg',
            '/images/northland.jpeg',
          ]),
          eventName: 'Night Market',
          location: 'Manukau Shopping Centre',
          postedTime: today.getTime(),
          description: 'Lots of food and some attractions are here!',
          reliability: 0,
          clicked: false,
        },
        {
          id: 5,
          password: 'secondPostPassword',
          regionCode: 'BOP',
          districtCode: 'RTR',
          postImages: JSON.stringify([
            '/images/hangi.jpeg',
            '/images/hangi-meal.jpeg',
          ]),
          eventName: 'Hangi Festival',
          location: 'Mitai Maoiri Village',
          postedTime: today.getTime(),
          description:
            'We are having so much fun with Maori culture experience. We are also getting provided free hangi for our lunch!',
          reliability: 0,
          clicked: false,
        },
        {
          id: 6,
          password: 'thirdPostPassword',
          regionCode: 'AUK',
          districtCode: 'NSC',
          postImages: JSON.stringify([
            '/images/k-bbq.jpeg',
            '/images/k-bbq-2.jpeg',
            '/images/k-bbq-people.jpeg',
          ]),
          eventName: 'Discount only today',
          location: 'Wellbeing BBQ & Buffet',
          postedTime: today.getTime(),
          description:
            'All you can eat korean barbeque only for $25 per person. Normal price is $40!',
          reliability: 0,
          clicked: false,
        },
      ])
    })
}
