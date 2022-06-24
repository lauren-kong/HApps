/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id')
    table.string('password')
    table.string('regionCode').references('regions.code').onDelete('CASCADE')
    table
      .string('districtCode')
      .references('districts.code')
      .onDelete('CASCADE')
    table.string('postImages')
    table.string('eventName')
    table.string('location')
    table.date('postedTime')
    table.text('description')
    table.integer('reliability')
    table.boolean('clicked')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
