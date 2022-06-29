exports.seed = (knex) => {
  return knex('regions')
    .del()
    .then(() => {
      return knex('regions').insert([
        {
          code: 'AUK',
          ns: 'North',
          name: 'Auckland',
          image: '/images/auckland.jpeg',
        },
        {
          code: 'BOP',
          ns: 'North',
          name: 'Bay of Plenty',
          image: '/images/bay-of-island.jpeg',
        },
        {
          code: 'NTL',
          ns: 'North',
          name: 'Northland',
          image: '/images/northland.jpeg',
        },
        {
          code: 'HKB',
          ns: 'North',
          name: "Hawke's Bay",
          image: '/images/hawkes-bay.jpeg',
        },
        {
          code: 'GIS',
          ns: 'North',
          name: 'Gisborne',
          image: '/images/gisborne.jpeg',
        },
        {
          code: 'WGN',
          ns: 'North',
          name: 'Wellington',
          image: '/images/wellington.jpeg',
        },
        {
          code: 'MWT',
          ns: 'North',
          name: 'Manawatu Whanganui',
          image: '/images/manawatu-whanganui.jpeg',
        },
        {
          code: 'WKO',
          ns: 'North',
          name: 'Waikato',
          image: '/images/waikato.jpeg',
        },
        {
          code: 'TKI',
          ns: 'North',
          name: 'Taranaki',
          image: '/images/taranaki.jpeg',
        },
        {
          code: 'OTA',
          ns: 'South',
          name: 'Otago',
          image: '/images/otago.jpeg',
        },
        {
          code: 'NSN',
          ns: 'South',
          name: 'Nelson',
          image: '/images/nelson.jpeg',
        },
        {
          code: 'MBH',
          ns: 'South',
          name: 'Marlborough',
          image: '/images/marlborough.jpeg',
        },
        {
          code: 'CAN',
          ns: 'South',
          name: 'Canterbury',
          image: '/images/canterbury.jpeg',
        },
        {
          code: 'WTC',
          ns: 'South',
          name: 'West Coast',
          image: '/images/westcoast.jpeg',
        },
        {
          code: 'STL',
          ns: 'South',
          name: 'Southland',
          image: '/images/southland.jpeg',
        },
        {
          code: 'TAS',
          ns: 'South',
          name: 'Tasman',
          image: '/images/tasman.jpeg',
        },
      ])
    })
}
