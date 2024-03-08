import { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

export default class ProjectController {
  async index({ response }: HttpContext) {
    const projects = await Project.all()
    return response.ok(projects)
  }

  async create({ request, response }: HttpContext) {
    const data = request.only(['name', 'description'])
    const project = await Project.create(data)
    return response.created(project)
  }

  async show({ params, response }: HttpContext) {
    const project = await Project.find(params.id)
    return response.ok(project)
  }

  async update({ params, request, response }: HttpContext) {
    const project: any = await Project.find(params.id)
    const data = request.only(['name', 'description'])
    project.merge(data)
    await project.save()
    return response.ok(project)
  }

  async delete({ params, response }: HttpContext) {
    const project: any = await Project.find(params.id)
    await project.delete()
    return response.noContent()
  }
}
