'use strict'

const Course = use('App/Models/Course')

class ApiCourseController {

    async index({ params, request, response }) {
        const { currentPage = 1, perPage = 50 } = params
        try {
            return  response.json(await Course
                .query()
                .orderBy('id', 'desc')
                .paginate(currentPage, perPage))
        } catch (e) {
            response.status(401).send({ error: e.message })
        }
    }

    async show({ params, response }) {
        const { id } = params
        try {
            return  response.json(await Course
                .find(id))
        } catch (e) {
            response.status(401).send({ error: e.message })
        }
    }
}

module.exports = ApiCourseController
