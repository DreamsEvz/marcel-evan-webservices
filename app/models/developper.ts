import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Project from '#models/project'
import Skill from '#models/skill'
import * as relations from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { compose } from '@adonisjs/core/helpers'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Developer extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Project, {
    pivotTable: 'project_developers',
  })
  declare projects: relations.ManyToMany<typeof Project>

  @manyToMany(() => Skill, {
    pivotTable: 'developer_skills',
  })
  declare skills: relations.ManyToMany<typeof Skill>

  static accessTokens = DbAccessTokensProvider.forModel(Developer)
}
