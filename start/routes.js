'use strict'

const Route = use('Route')
const Course = use('App/Models/Course')

// Route.get('/test', async ({view}) => {
//   const course = await Course
//     .query()
//     .orderBy('id', 'desc')

//     console.log(course)
//   // return view.render('course.course', { courses: course.rows })
//   return course
// })

Route.get('apicourse', 'ApiCourseController.index')

Route.on('/').render('home').as('home').middleware(['auth'])

// Route.get('course', 'CourseController.index').middleware(['auth'])
Route.resource('course', 'CourseController').middleware(['auth'])
Route.delete('course/:id', 'CourseController.destroy').middleware(['auth'])
Route.put('course/:id', 'CourseController.update').middleware(['auth'])

Route.get('register', 'Auth/RegisterController.showRegisterForm').middleware([
  'authenticated'
])
Route.post('register', 'Auth/RegisterController.register').as('register')
Route.get('register/confirm/:token', 'Auth/RegisterController.confirmEmail')
Route.get('login', 'Auth/LoginController.showLoginForm').middleware([
  'authenticated'
])
Route.post('login', 'Auth/LoginController.login').as('login')
Route.get('logout', 'Auth/AuthenticatedController.logout')
Route.get('password/reset', 'Auth/PasswordResetController.showLinkRequestForm')
Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
Route.get('password/reset/:token', 'Auth/PasswordResetController.showResetForm')
Route.post('password/reset', 'Auth/PasswordResetController.reset')
