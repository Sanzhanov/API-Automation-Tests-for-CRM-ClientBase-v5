import UserHelper from "../../../helpers/user.helper";
import faker from "faker";
import {expect} from "chai";

describe('User auth by token', () => {
    describe('Valid token', () => {
        const userHelper = new UserHelper()
        let response, token, userID, companyID

        const companyName = faker.company.companyName()
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(companyName, firstName, lastName, email, password)
            token = (await userHelper.logIn(email, password)).body.payload.token
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            companyID = (await userHelper.logIn(email, password)).body.payload.user.companyAccount
            response = await userHelper.authByToken(token)
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
            expect(response.body.message).to.eq('Auth ok')
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

        it('Response body contains company id', () => {
            expect(response.body.payload.companyAccount._id).to.eq(companyID)
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

    describe('Invalid token', () => {
        const userHelper = new UserHelper()
        let response

        before(async () => {
            response = await userHelper.authByToken('m897i6nby5v4w3')
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
            expect(response.body.message).to.eq('Auth failed')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })
})