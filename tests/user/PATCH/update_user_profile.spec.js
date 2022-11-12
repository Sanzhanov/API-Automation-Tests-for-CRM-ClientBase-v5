import UserHelper from "../../../helpers/user.helper";
import faker from "faker";
import {expect} from "chai";

describe('Update user profile', () => {
    const userHelper = new UserHelper()
    let response, userID

    describe('By valid user id (full update)', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async() => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, password)
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            response = await userHelper.updateProfile(userID, faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.internet.password())
        })

        it('Unsuccessful GET request', () => {
            expect(response.status.toString()[0]).to.eq('4')
        })

        it('Response status code is 400', () => {
            expect(response.status).to.eq(400)
        })

        it('Response has headers', () => {
            expect(response.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains unsuccess message', () => {
            expect(response.body.message).to.eq('Permission denied')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('By valid user id (partial update)', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async() => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, password)
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            response = await userHelper.updateProfilePart(userID, faker.name.firstName(), faker.name.lastName(), faker.internet.email())
        })

        it('Unsuccessful GET request', () => {
            expect(response.status.toString()[0]).to.eq('4')
        })

        it('Response status code is 400', () => {
            expect(response.status).to.eq(400)
        })

        it('Response has headers', () => {
            expect(response.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains unsuccess message', () => {
            expect(response.body.message).to.eq('Permission denied')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('By token (full update)', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, password)
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            response = await userHelper.updateProfilePart(userID, faker.name.firstName(), faker.name.lastName(), faker.internet.email())
        })

        it('Unsuccessful GET request', () => {
            expect(response.status.toString()[0]).to.eq('4')
        })

        it('Response status code is 400', () => {
            expect(response.status).to.eq(400)
        })

    })

})