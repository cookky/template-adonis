'use strict'

const Database = use('Database')
const Course = use('App/Models/Course')
const { validate } = use('Validator');
const Helpers = use('Helpers')

class CourseController {

    async index({ params, view }) {
        const { currentPage = 1, perPage = 50 } = params

        const course = await Course
                .query()
                .orderBy('id', 'desc')
                .paginate(currentPage, perPage)

        return view.render('course.course', { course: course.rows })
    }

    async store({ request, response, view }) {
        const { title, date, detail } = request.post()
        const image = request.file('image')
        const rules = {
            title: 'required',
            date: 'required',
            detail: 'required'
        }
        const validation = await validate({
            title,
            date,
            detail
        }, rules)

        await image.move(Helpers.publicPath('images'), {
            name: `${new Date().getTime()}.${image.subtype}`
        })

        if (!image.moved()) {
            return image.errors()
        }


        if (!validation.fails()) {
            try {
                const course = new Course()
                course.title = title
                course.date = date
                course.detail = detail
                course.image = image.fileName
                await course.save()
                // const { id } = course

                return response.redirect('/course')
            } catch (e) {
                response.status(401).send({ error: e.message })
            }
        } else {
            response.status(401).send(validation.messages())
        }
    }

    async update({ request, params, response, view }) {
        const { title, date, detail } = request.post()
        const { id } = params
        const image = request.file('image')
        const rules = {
            title: 'required',
            date: 'required',
            detail: 'required'
        }
        const validation = await validate({
            title,
            date,
            detail
        }, rules)


        if (!validation.fails()) {
            try {
                const course = await Course.find(id)
                course.title = title
                course.date = date
                course.detail = detail

                if (image) {
                    await image.move(Helpers.publicPath('images'), {
                        name: `${new Date().getTime()}.${image.subtype}`
                    })
                    course.image = image.fileName

                    if (!image.moved()) {
                        return image.errors()
                    }
                }


                await course.save()
                // const { id } = course

                return response.redirect('/course')
            } catch (e) {
                response.status(401).send({ error: e.message })
            }
        } else {
            response.status(401).send(validation.messages())
        }
    }

    async destroy({ params, view, response }) {
        const { id } = params
        try {
            const course = await Course.find(id)
            await course.delete()

            return response.redirect('/course')
        } catch (e) {
            response.status(401).send({ error: e.message })
        }
    }
}

module.exports = CourseController
