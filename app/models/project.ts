import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Developer from '#models/developper'
import * as relations from '@adonisjs/lucid/types/relations'
export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @manyToMany(() => Developer, {
    pivotTable: 'project_developers',
  })
  declare developers: relations.ManyToMany<typeof Developer>
}
