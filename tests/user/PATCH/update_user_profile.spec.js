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

        it('Successful PATCH request', () => {
            expect(response.status.toString()[0]).to.eq('2')
        })

        it('Response has headers', () => {
            expect(response.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains some success message', () => {
            expect(response.body.message).not.to.be.undefined
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

        it('Successful PATCH request', () => {
            expect(response.status.toString()[0]).to.eq('2')
        })

        it('Response has headers', () => {
            expect(response.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains some success message', () => {
            expect(response.body.message).not.to.be.undefined
        })
    })

    describe('By token (full update)', () => {
        const companyNameBefore = faker.company.companyName()
        const firstNameBefore = faker.name.firstName()
        const lastNameBefore = faker.name.lastName()
        const emailBefore = faker.internet.email()
        const passwordBefore = faker.internet.password()
        let token, companyNameAfter, firstNameAfter, lastNameAfter, emailAfter

        before(async () => {
            await userHelper.create(companyNameBefore, firstNameBefore, lastNameBefore, emailBefore, passwordBefore)
            token = (await userHelper.logIn(emailBefore, passwordBefore)).body.payload.token
            response = await userHelper.updateProfileToken(token, faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.internet.password())
            companyNameAfter = (await userHelper.authByToken(token)).body.payload.companyAccount.companyName
            firstNameAfter = (await userHelper.authByToken(token)).body.payload.firstName
            lastNameAfter = (await userHelper.authByToken(token)).body.payload.lastName
            emailAfter = (await userHelper.authByToken(token)).body.payload.email
        })

        it('Successful PATCH request', () => {
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
            expect(response.body.message).to.eq('User updated')
        })

        it('Company name updated successfully', () => {
            expect(companyNameBefore).not.to.eq(companyNameAfter)
        })

        it('User first name updated successfully', () => {
            expect(firstNameBefore).not.to.eq(firstNameAfter)
        })

        it('User last name updated successfully', () => {
            expect(lastNameBefore).not.to.eq(lastNameAfter)
        })

        it('User email updated successfully', () => {
            expect(emailBefore).not.to.eq(emailAfter)
        })
    })

    describe('By token (partial update)', () => {
        const firstNameBefore = faker.name.firstName()
        const lastNameBefore = faker.name.lastName()
        const emailBefore = faker.internet.email()
        const passwordBefore = faker.internet.password()
        let token, firstNameAfter, lastNameAfter, emailAfter

        before(async () => {
            await userHelper.create(faker.company.companyName(), firstNameBefore, lastNameBefore, emailBefore, passwordBefore)
            token = (await userHelper.logIn(emailBefore, passwordBefore)).body.payload.token
            response = await userHelper.updateProfileTokenPart(token, faker.name.firstName(), faker.name.lastName(), faker.internet.email())
            firstNameAfter = (await userHelper.authByToken(token)).body.payload.firstName
            lastNameAfter = (await userHelper.authByToken(token)).body.payload.lastName
            emailAfter = (await userHelper.authByToken(token)).body.payload.email
        })

        it('Successful PATCH request', () => {
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
            expect(response.body.message).to.eq('User updated')
        })

        it('User first name updated successfully', () => {
            expect(firstNameBefore).not.to.eq(firstNameAfter)
        })

        it('User last name updated successfully', () => {
            expect(lastNameBefore).not.to.eq(lastNameAfter)
        })

        it('User email updated successfully', () => {
            expect(emailBefore).not.to.eq(emailAfter)
        })
    })
})