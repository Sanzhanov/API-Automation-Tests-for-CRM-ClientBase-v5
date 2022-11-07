import supertest from 'supertest'

export default class UserHelper {
    response

    async create(companyName, firstName, lastName, email, password) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user')
            .send({ companyName, firstName, lastName, email, password })
        return this.response
    }

    async sendEmail(email) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/email/search')
            .send({ email })
        return this.response
    }

    async sendEndpoint(link) {
        this.response = await supertest(process.env.BASE_URL)
            .get(link)
        return this.response
    }

    async logIn(email, password) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user/login')
            .send({ email, password })
        return this.response
    }

}