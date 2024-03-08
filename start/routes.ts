/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
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
    router.post('project', [ProjectController, 'create'])
    router.get('project/:id', [ProjectController, 'show'])
    router.put('project/:id', [ProjectController, 'update'])
    router.delete('project/:id', [ProjectController, 'delete'])

    //Skills routes
    router.get('skill', [SkillController, 'index'])
    router.post('skill', [SkillController, 'create'])
    router.get('skill/:id', [SkillController, 'show'])
    router.put('skill/:id', [SkillController, 'update'])
    router.delete('skill/:id', [SkillController, 'delete'])

    //Developers routes
    router.get('developer', [DeveloperController, 'index'])
    router.post('developer/register', [DeveloperController, 'create'])
    router.post('developer/login', [DeveloperController, 'login'])
  })
  .prefix('api/v1/')
