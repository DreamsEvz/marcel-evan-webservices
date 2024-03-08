import { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

export default class ProjectController {
  async index({ request, response }: HttpContext) {
    let query = Project.query()

    if (request.input('limit')) {
      query = query.limit(request.input('limit'))
    }

    if (request.input('order')) {
      if (request.input('order') === 'desc') {
        query = query.orderBy('created_at', 'desc')
      } else if (request.input('order') === 'asc') {
        query = query.orderBy('created_at', 'asc')
      }
    }

    const projects = await query.exec()
    return response.ok(projects)
  }

  async recent({ response }: HttpContext) {
    const projects = await Project.query().limit(3).orderBy('created_at', 'desc').exec()
    return response.ok(projects)
  }

  async show({ params, response }: HttpContext) {
    const project = await Project.find(params.id)
    return response.ok(project)
  }

  async create({ request, response }: HttpContext) {
    const data = request.only(['title', 'description'])
    const project = await Project.create(data)
    return response.created(project)
  }

  async update({ params, request, response }: HttpContext) {
    const project: any = await Project.find(params.id)
    if (!project) return response.notFound({ message: 'Project not found' })
    const data = request.only(['title', 'description'])
    project.merge(data)
    await project.save()
    return response.ok(project)
  }

  async delete({ params, response }: HttpContext) {
    const project: any = await Project.find(params.id)
    if (!project) return response.notFound({ message: 'Project not found' })
    await project.delete()
    return response.ok({ message: 'Project deleted' })
  }

  async assignDeveloper({ request, response }: HttpContext) {
    const { developerId, projectId } = request.only(['developerId', 'projectId'])
    const project: any = await Project.find(projectId)
    await project.related('developers').attach([developerId])
    return response.ok({ message: 'Developer assigned to project' })
  }
}
