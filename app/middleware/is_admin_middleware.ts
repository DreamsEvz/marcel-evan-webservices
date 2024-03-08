import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class IsAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.auth.user?.isAdmin) {
      return next()
    }

    return ctx.response.forbidden({ error: 'You are not authorized to access this resource' })
  }
}
