import UserHelper from "../../../helpers/user.helper";
import faker from "faker";
import {expect} from "chai";
import {changeUserID} from "../../../helpers/common.helper";

describe('Get user profile', () => {
    const userHelper = new UserHelper()
    let response, userID

    describe('By valid user id', () => {

        const companyName = faker.company.companyName()
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(companyName, firstName, lastName, email, password)
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            response = await userHelper.getProfile(userID)
        })

        it('Successful GET request', () => {
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
            expect(response.body.message).to.eq('User found')
        })

        it('Response body contains payload which is an object', () => {
            expect(response.body.payload).to.be.an('object')
        })

        it('Response body contains user ID', () => {
            expect(response.body.payload._id).to.eq(userID)
        })

        it('User has role new or verified', () => {
            expect(response.body.payload.roles[0]).to.be.oneOf(['new', 'verified'])
        })

        it('User has role new if user\'s email isn\'t confirmed and role verified - otherwise', () => {
            if (response.body.payload.emailConfirmation.confirmed === true) expect(response.body.payload.roles[0]).to.eq('verified')
            else expect(response.body.payload.roles[0]).to.eq('new')
        });

        it('Response body contains company name', () => {
            expect(response.body.payload.companyAccount.companyName).to.eq(companyName)
        });

        it('Response body contains initial user email', () => {
            expect(response.body.payload.email).to.eq(email.toLowerCase());
        });

        it('Response body contains initial user name', () => {
            expect(response.body.payload.name).to.eq(`${firstName} ${lastName}`)
        });
    })

    describe('By non-existent company ID, but in a valid format', () => {

        const email = faker.internet.email()
        const password = faker.internet.password()
        let nonExistentUserID

        before(async() => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, password)
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            nonExistentUserID = changeUserID(userID)
            response = await userHelper.getProfile(nonExistentUserID)
        })

        it('Unsuccessful GET request', () => {
            expect(response.status.toString()[0]).to.eq('4')
        })

        it('Response status code is 404', () => {
            expect(response.status).to.eq(404)
        })

        it('Response has headers', () => {
            expect(response.headers).not.to.be.undefined
        })

        it('Response has body', () => {
            expect(response.body).not.to.be.undefined
        })

        it('Response body contains unsuccess message', () => {
            expect(response.body.message).to.eq('No User for provided id')
        })
    })

    describe('By invalid user id', () => {

        before(async() => {
            const invalidID = faker.datatype.uuid()

            response = await userHelper.getProfile(invalidID)
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
            expect(response.body.message).to.eq('User get by ID. Error')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })
})