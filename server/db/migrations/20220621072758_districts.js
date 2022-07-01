/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('districts', (table) => {
    table.increments('id')
    table.string('regionCode')
    table.string('code')
    table.string('name')
    table.string('weatherLocName')
    table.string('weatherLocType')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('districts')
}
