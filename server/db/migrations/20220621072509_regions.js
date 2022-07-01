/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('regions', (table) => {
    table.increments('id')
    table.string('code')
    table.string('ns')
    table.string('name')
    table.string('image')
    table.string('weatherLocName')
    table.string('weatherLocType')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('regions')
}
