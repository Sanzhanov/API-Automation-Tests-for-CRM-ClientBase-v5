import UserHelper from '../../../helpers/user.helper';
import {expect} from "chai";
import faker from "faker";

describe('List of all users', () => {
    const userHelper = new UserHelper()
    let response, userID

    describe('Request body is empty', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, password)
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            response = await userHelper.allUsers()
        })

        it('Successful POST request', () => {
            expect(response.status.toString()[0]).to.eq('2')
        })

        it('Response status code is 200', () => {
            expect(response.status).to.eq(200)
        })

        it('Response has headers', () => {
            expect(response.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains the list of users which is an array', () => {
            expect(response.body.items).to.be.an('array')
        })

        it ('The list of users contains current user as the first item', () => {
            expect(response.body.items[0]._id).to.eq(userID)
            expect(response.body.items[0].email).to.eq(email.toLowerCase())
        })

        it ('The list of users contains correct number of items on the page', () => {
            expect(response.body.items.length).to.eq(response.body.pagination.limit)
        })
    })

    describe('Pagination in the list (changed limit)', () => {
        const limit = 100

        before(async () => {
            response = await userHelper.allUsersChangedLimit(limit)
        })

        it('Successful POST request', () => {
            expect(response.status.toString()[0]).to.eq('2')
        })

        it('Response status code is 200', () => {
            expect(response.status).to.eq(200)
        })

        it('Response has headers', () => {
            expect(response.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains the list of users which is an array', () => {
            expect(response.body.items).to.be.an('array')
        })

        it ('The list of users contains changed number of items on the page', () => {
            expect(response.body.items.length).to.eq(response.body.pagination.limit).to.eq(100)
        })
    })
})