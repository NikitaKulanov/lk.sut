import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/StudentKanbanStudiesView.vue'

const routes = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', component: () => import('../views/user/AuthView.vue'),
    name: 'user.login'
  },
  {
    path: '/registration', component: () => import('../views/user/AuthView.vue'),
    name: 'user.registration'
  },
  {
    path: '/board/personal', redirect: '/login',
    name: 'user.board.personal'
  },
  {
    path: '/board/studies', component: () => import('../views/StudentKanbanStudiesView.vue'),
    name: 'user.board.studies' // для студента, задачи по дисциплинам
  },
  {
    path: '/board/groups/disciplines', component: () => import('../views/ProfessorBoardGroupsDisciplinesView.vue'),
    name: 'user.board.groups.disciplines' // группы преподавателя с дисциплинами
  },
  {
    path: '/board/discipline/students', component: () => import('../views/ProfessorKanbanDisciplineStudentsView.vue'),
    name: 'user.board.discipline.students', // kanban по группе, для преподавателя
    props: true
  },
  {
    path: '/unauthenticated', component: () => import('../views/NoAuthView.vue'),
    name: 'user.unauthenticated' // Роль = null
  },
  {
    path: '/404', component: () => import('../views/error/NotFoundView'),
    name: 'not.found'
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/404',
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  const token = localStorage.getItem('x_xsrf_token')
  const user = localStorage.getItem('user')
  const role = (user !== null ? JSON.parse(user).role : null)

  let auth = (to.name === 'user.login' || to.name === 'user.registration')

  if(!token){
    localStorage.removeItem('user')
    if(auth){
      return next()
    }else{
      return next({
        name: 'user.login'
      })
    }
  }

  if(auth && token){ // Если пользователь перешёл на 'user.login' и 'user.registration' но токен есть
    return defineHomePage(role)
  }

  if(to.name === 'user.board.studies' && role !== 'student') {
    return defineHomePage(role)
  }

  if(to.name === 'user.board.groups.disciplines' && role !== 'professor') {
    return defineHomePage(role)
  }

  if(to.name === 'user.board.discipline.students' && role !== 'professor') {
    return defineHomePage(role)
  }

  next()

  function defineHomePage (role) {
    if(role === 'student') {
      return next({
        name: 'user.board.studies'
      })
    } else if (role === 'professor') {
      return next({
        name: 'user.board.groups.disciplines'
      })
    } else if (role === null) {
      return next({
        name: 'user.unauthenticated'
      })
    }
  }

});

export default router
