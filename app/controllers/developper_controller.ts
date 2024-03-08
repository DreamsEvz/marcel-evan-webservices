import { HttpContext } from '@adonisjs/core/http'
import Developer from '#models/developper'
import hash from '@adonisjs/core/services/hash'

export default class DeveloperController {
  async index({ response }: HttpContext) {
    const developpers = await Developer.all()
    return response.ok(developpers)
  }

  async create({ request, response }: HttpContext) {
    const data = request.only(['firstName', 'lastName', 'email', 'password'])
    const developper = await Developer.create(data)
    return response.created(developper)
  }

  async show({ params, response }: HttpContext) {
    const developer = await Developer.find(params.id)
    return response.ok(developer)
  }

  async update({ params, request, response }: HttpContext) {
    const developer: any = await Developer.find(params.id)
    const data = request.only(['name', 'email', 'password'])
    developer.merge(data)
    await developer.save()
    return response.ok(developer)
  }

  async delete({ params, response }: HttpContext) {
    const developer: any = await Developer.find(params.id)
    await developer.delete()
    return response.noContent()
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const developper = await Developer.findBy('email', email)
    if (!developper) {
      return response.badRequest('Invalid credentials')
    }
    const passwordValid = await hash.verify(developper.password, password)

    if (!passwordValid) {
      return response.badRequest('Invalid credentials')
    }
    const token = await Developer.accessTokens.create(developper)

    return {
      token,
      200: 'OK',
    }
  }
}
