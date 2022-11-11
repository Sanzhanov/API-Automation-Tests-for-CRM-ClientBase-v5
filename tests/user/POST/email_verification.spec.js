import UserHelper from '../../../helpers/user.helper';
import faker from 'faker';
import {getEndPoint} from '../../../helpers/common.helper';
import {expect} from 'chai';

describe('User email verification', () => {
    const userHelper = new UserHelper()
    let responseEmailSearch

    describe('All fields filled with valid data', () => {

        const companyName = faker.company.companyName()
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        let responseVerifyEmail, endPoint

        before(async () => {
            await userHelper.create(companyName, firstName, lastName, email, password)
            responseEmailSearch = await userHelper.sendEmail(email)
            endPoint = getEndPoint(responseEmailSearch.body)
            responseVerifyEmail = await userHelper.sendEndPoint(endPoint)
        })

        //---------------------------------Tests for Email Search:---------------------------------//

        it('Successful POST request', () => {
            expect(responseEmailSearch.status.toString()[0]).to.eq('2')
        })

        it('Response status code is 200', () => {
            expect(responseEmailSearch.status).to.eq(200)
        })

        it('Response has headers', () => {
            expect(responseEmailSearch.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(responseEmailSearch.body).not.to.be.undefined
        })

        it('Response body is object', () => {
            expect(responseEmailSearch.body).to.be.a('object')
        })

        it('Response body contains success message', () => {
            expect(responseEmailSearch.body.message).to.eq('EmailSearch ok')
        })

        it('Response body contains initial email', () => {
            expect(responseEmailSearch.body.payload.items[0].email).to.eq(email.toLowerCase())
        })

        //-------------------------------Tests for Email Verification:--------------------------------//

        it('Successful GET request', () => {
            expect(responseVerifyEmail.status.toString()[0]).to.eq('2')
        })

        it('Response status code is 200', () => {
            expect(responseVerifyEmail.status).to.eq(200)
        })

        it('Response has body', () => {
            expect(responseVerifyEmail.body).not.to.be.undefined
        })

        it('Response body contains success message', () => {
            expect(responseVerifyEmail.body.message).to.eq('Email confirmed. Success')
        })
    })

    describe('Request has empty body', () => {

        before(async () => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.internet.password())
            responseEmailSearch = await userHelper.sendEmailEmptyBody()
        })

        //---------------------------------Tests for Email Search:---------------------------------//

        it('Unsuccessful POST request', () => {
            expect(responseEmailSearch.status.toString()[0]).to.eq('4')
        })

        it('Response has body', () => {
            expect(responseEmailSearch.body).not.to.be.undefined
        })

        it('Response body contains unsuccess message', () => {
            expect(responseEmailSearch.body.message).to.eq('No email')
        })
    })

})