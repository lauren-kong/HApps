/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id')
    table.string('password')
    table.string('regionCode')
    table.string('districtCode')
    table.string('postImages')
    table.string('eventName')
    table.string('location')
    table.date('postedTime')
    table.text('description')
    table.integer('reliability')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
