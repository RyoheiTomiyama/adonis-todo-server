'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodoSchema extends Schema {
  up () {
    this.create('todos', (table) => {
      table.increments()
      table.timestamps()
      table.string('title').notNullable()
      table.text('content')
      table.boolean('done')
    })
  }

  down () {
    this.drop('todos')
  }
}

module.exports = TodoSchema
