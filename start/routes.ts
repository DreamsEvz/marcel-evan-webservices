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
    router.get('project', [ProjectController, 'index'])
    router.get('projet/recent', [ProjectController, 'recent'])
    router.get('project/:id', [ProjectController, 'show']).use(middleware.auth({ guards: ['api'] }))
    router
      .post('project', [ProjectController, 'create'])
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router
      .put('project/:id', [ProjectController, 'update'])
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router
      .delete('project/:id', [ProjectController, 'delete'])
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router.post('project/assign-developer', [ProjectController, 'assignDeveloper'])

    //Skills routes
    router.get('skill', [SkillController, 'index']).use(middleware.auth({ guards: ['api'] }))
    router.get('skill/:id', [SkillController, 'show']).use(middleware.auth({ guards: ['api'] }))
    router
      .post('skill', [SkillController, 'create'])
      .use(middleware.auth({ guards: ['api'] }))
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router
      .put('skill/:id', [SkillController, 'update'])
      .use(middleware.auth({ guards: ['api'] }))
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])
    router
      .delete('skill/:id', [SkillController, 'delete'])
      .use(middleware.auth({ guards: ['api'] }))
      .use([middleware.auth({ guards: ['api'] }), middleware.isAdmin()])

    //Developers routes
    router.get('developer', [DeveloperController, 'index'])
    router.post('developer/assign-skill', [DeveloperController, 'assignSkill'])
  })
  .prefix('api/v1/')

router.post('developer/register', [DeveloperController, 'create'])
router.post('developer/login', [DeveloperController, 'login'])
