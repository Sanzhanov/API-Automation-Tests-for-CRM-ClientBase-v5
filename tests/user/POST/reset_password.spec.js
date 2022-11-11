import UserHelper from "../../../helpers/user.helper";
import faker from "faker";
import {expect} from "chai";

describe('Reset user password', () => {
    const userHelper = new UserHelper()
    let response

    describe('All fields filled with valid data', () => {
        const email = faker.internet.email()

        before(async () => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, faker.internet.password())
            response = await userHelper.resetPassword(email)
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

        it('Response body contains success message', () => {
            expect(response.body.message).to.eq('Check mail for reset password link')
        })
    })

    describe('Request has empty body', () => {

        before(async () => {
            response = await userHelper.resetPasswordEmptyBody()
        })

        it('Unsuccessful POST request', () => {
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
            expect(response.body.message).to.eq('User not found')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })
})



