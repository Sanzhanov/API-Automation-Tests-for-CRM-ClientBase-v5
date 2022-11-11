import UserHelper from '../../../helpers/user.helper';
import {expect} from 'chai'
import faker from 'faker'

describe('Create new user', () => {
    const userHelper = new UserHelper()
    let response

    describe('All fields filled with valid data', () => {

        before(async () => {
            response = await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.internet.password())
        })

        it('Successful POST request', () => {
            expect(response.status.toString()[0]).to.eq('2')
        })

        it('Response status code is 201', () => {
            expect(response.status).to.eq(201)
        })

        it('Response has headers', () => {
            expect(response.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body is object', () => {
            expect(response.body).to.be.a('object')
        })

        it('Response body contains success message', () => {
            expect(response.body.message).to.eq('User created successfully. Please check your email and verify it')
        })
    })

    describe('User duplicate', () => {
        const companyName = faker.company.companyName()
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(companyName, firstName, lastName, email, password)
            response = await userHelper.create(companyName, firstName, lastName, email, password)
        })

        it('Unsuccessful POST request', () => {
            expect(response.status.toString()[0]).to.eq('4')
        })

        it('Response status code is 409', () => {
            expect(response.status).to.eq(409)
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains unsuccess message', () => {
            expect(response.body.message).to.eq('User with this e-mail exists')
        })
    })

    describe('Not all required fields are filled (any fields except first)', () => {

        before(async () => {
            response = await userHelper.createNotAllFields(faker.company.companyName(), faker.name.lastName(), faker.internet.email(), faker.internet.password())
        })

        it('Unsuccessful POST request', () => {
            expect(response.status.toString()[0]).to.eq('4')
        })

        it('Response status code is 404', () => {
            expect(response.status).to.eq(404)
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains unsuccess message', () => {
            expect(response.body.message).to.eq('User was not created')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('Not all required fields are filled (first field)', () => {

        before(async () => {
            response = await userHelper.createNotAllFields2(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.internet.password())
        })

        it('Unsuccessful POST request', () => {
            expect(response.status.toString()[0]).to.eq('4')
        })

        it('Response status code is 404', () => {
            expect(response.status).to.eq(404)
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains unsuccess message', () => {
            expect(response.body.message).to.eq('User was not created')
        })
    })

    describe('Request body is an empty', () => {

        before(async () => {
            response = await userHelper.createEmptyBody()
        })

        it('Unsuccessful POST request', () => {
            expect(response.status.toString()[0]).to.eq('4')
        })

        it('Response status code is 400', () => {
            expect(response.status).to.eq(400)
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains unsuccess message', () => {
            expect(response.body.message).to.eq('Wrong password format')
        })
    })
})

