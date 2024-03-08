import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'developer_skills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('developer_id')
        .unsigned()
        .references('id')
        .inTable('developers')
        .onDelete('CASCADE')
      table.integer('skill_id').unsigned().references('id').inTable('skills').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
