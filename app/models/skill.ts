import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Developer from '#models/developper'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Developer, {
    pivotTable: 'developer_skills',
  })
  declare developers: relations.ManyToMany<typeof Developer>
}
