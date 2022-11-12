import supertest from 'supertest'

export default class UserHelper {
    response

    async create(companyName, firstName, lastName, email, password) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user')
            .send({ companyName, firstName, lastName, email, password })
        return this.response
    }

    async createNotAllFields(companyName, lastName, email, password) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user')
            .send({ companyName, lastName, email, password })
        return this.response
    }

    async createNotAllFields2(firstName, lastName, email, password) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user')
            .send({ firstName, lastName, email, password })
        return this.response
    }

    async createEmptyBody() {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user')
        return this.response
    }

    async sendEmail(email) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/email/search')
            .send({ email })
        return this.response
    }

    async sendEmailEmptyBody() {
        this.response = await supertest(process.env.BASE_URL)
            .post('/email/search')
            .send({})
        return this.response
    }

    async sendEndPoint(endPoint) {
        this.response = await supertest(process.env.BASE_URL)
            .get(endPoint)
        return this.response
    }

    async logIn(email, password) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user/login')
            .send({ email, password })
        return this.response
    }

    async logInNotAllFields(email) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user/login')
            .send({ email })
        return this.response
    }

    async logInEmptyBody() {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user/login')
            .send({})
        return this.response
    }

    async allUsers() {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user/search')
            .set('Authorization', `${process.env.TOKEN}`)
            .send()
        return this.response
    }

    async allUsersChangedLimit( limit ) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user/search')
            .set('Authorization', `${process.env.TOKEN}`)
            .send({ limit })
        return this.response
    }

    async companySales() {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/report/companySales')
            .set('Authorization', `${process.env.TOKEN}`)
        return this.response
    }

    async personalSales() {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/report/personalSales')
            .set('Authorization', `${process.env.TOKEN}`)
        return this.response
    }

    async resetPassword(email) {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user/password/reset/request')
            .set('Authorization', `${process.env.TOKEN}`)
            .send({ email })
        return this.response
    }

    async resetPasswordEmptyBody() {
        this.response = await supertest(process.env.BASE_URL)
            .post('/v5/user/password/reset/request')
            .set('Authorization', `${process.env.TOKEN}`)
            .send({})
        return this.response
    }

    async authByToken(token) {
        this.response = await supertest(process.env.BASE_URL)
            .get('/v5/user/auth')
            .set('Authorization', token)
        return this.response
    }

    async getProfile(userID) {
        this.response = await supertest(process.env.BASE_URL)
            .get(`/v5/user/${userID}`)
            .set('Authorization', `${process.env.TOKEN}`)
        return this.response
    }

    async getAccount(companyID) {
        this.response = await supertest(process.env.BASE_URL)
            .get(`/v5/company/${companyID}`)
            .set('Authorization', `${process.env.TOKEN}`)
        return this.response
    }

    async updateProfile(userID, companyName, firstName, lastName, email, password) {
        this.response = await supertest(process.env.BASE_URL)
            .patch(`/v5/user/${userID}`)
            .set('Authorization', `${process.env.TOKEN}`)
            .send(({ companyName, firstName, lastName, email, password }))
        return this.response
    }

    async updateProfilePart(userID, firstName, lastName, email) {
        this.response = await supertest(process.env.BASE_URL)
            .patch(`/v5/user/${userID}`)
            .set('Authorization', `${process.env.TOKEN}`)
            .send(({ firstName, lastName, email }))
        return this.response
    }

    async updateProfileToken(token, companyName, firstName, lastName, email, password) {
        this.response = await supertest(process.env.BASE_URL)
            .patch(`/v5/user`)
            .set('Authorization', token)
            .send(({ companyName, firstName, lastName, email, password }))
        return this.response
    }



}