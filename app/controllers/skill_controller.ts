import { HttpContext } from '@adonisjs/core/http'
import Skill from '#models/skill'

export default class SkillController {
  async index({ response }: HttpContext) {
    const skills = await Skill.all()
    return response.ok(skills)
  }

  async create({ request, response }: HttpContext) {
    const data = request.only(['name'])
    data.name = data.name.toLowerCase()
    if (await Skill.findBy('name', data.name)) {
      return response.badRequest({ message: 'Skill already exists' })
    }
    const skill = await Skill.create(data)
    return response.created(skill)
  }

  async show({ params, response }: HttpContext) {
    const skill = await Skill.find(params.id)
    if (!skill) return response.notFound({ message: 'Skill not found' })
    return response.ok(skill)
  }

  async update({ params, request, response }: HttpContext) {
    const skill: any = await Skill.find(params.id)
    if (!skill) return response.notFound({ message: 'Skill not found' })
    const data = request.only(['name'])
    skill.merge(data)
    await skill.save()
    return response.ok(skill)
  }

  async delete({ params, response }: HttpContext) {
    const skill: any = await Skill.find(params.id)
    if (!skill) return response.notFound({ message: 'Skill not found' })
    await skill.delete()
    return response.ok({ message: 'Skill deleted' })
  }
}
