/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const DeveloperController = () => import('#controllers/developper_controller')
const ProjectController = () => import('#controllers/project_controller')
const SkillController = () => import('#controllers/skill_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    //Pojects routes
    router.get('projects', [ProjectController, 'index'])
    router.get('projects/recent', [ProjectController, 'recent'])
    router
      .get('projects/:id', [ProjectController, 'show'])
      .use(middleware.auth({ guards: ['api'] }))
    router
      .post('projects', [ProjectController, 'create'])
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router
      .put('projects/:id', [ProjectController, 'update'])
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router
      .delete('projects/:id', [ProjectController, 'delete'])
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router.post('projects/assign-developer', [ProjectController, 'assignDeveloper'])

    //Skills routes
    router.get('skills', [SkillController, 'index']).use(middleware.auth({ guards: ['api'] }))
    router.get('skills/:id', [SkillController, 'show']).use(middleware.auth({ guards: ['api'] }))
    router
      .post('skills', [SkillController, 'create'])
      .use(middleware.auth({ guards: ['api'] }))
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router
      .put('skills/:id', [SkillController, 'update'])
      .use(middleware.auth({ guards: ['api'] }))
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router
      .delete('skills/:id', [SkillController, 'delete'])
      .use(middleware.auth({ guards: ['api'] }))
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])

    //Developers routes
    router.get('developers', [DeveloperController, 'index'])
    router.post('developers/assign-skill', [DeveloperController, 'assignSkill'])
  })
  .prefix('api/v1/')

router.post('developers/register', [DeveloperController, 'create'])
router.post('developers/login', [DeveloperController, 'login'])
