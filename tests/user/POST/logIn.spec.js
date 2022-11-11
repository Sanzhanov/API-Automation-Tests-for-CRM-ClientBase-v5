import UserHelper from "../../../helpers/user.helper";
import faker from "faker";
import {expect} from "chai";

describe('User LogIn', () => {
    const userHelper = new UserHelper()
    let response

    describe('All fields filled with valid data', () => {
        const companyName = faker.company.companyName()
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(companyName, firstName, lastName, email, password)
            response = await userHelper.logIn(email, password)
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
            expect(response.body.message).to.eq('Auth success')
        })

        it('Response body contains payload which is an object', () => {
            expect(response.body.payload).to.be.an('object')
        })

        it('User has role new or verified', () => {
            expect(response.body.payload.user.roles[0]).to.be.oneOf(['new', 'verified'])
        })

        it('User has role new if user\'s email isn\'t confirmed and role verified - otherwise', () => {
            if(response.body.payload.user.emailConfirmation.confirmed===true) expect(response.body.payload.user.roles[0]).to.eq('verified')
            else expect(response.body.payload.user.roles[0]).to.eq('new')
        });

        it('Response body contains token', () => {
            expect(response.body.payload.token).not.to.be.undefined
        });

        it('Response body contains user id', () => {
            expect(response.body.payload.userId).not.to.be.undefined
        });

        it('Response body contains company id', () => {
            expect(response.body.payload.user.companyAccount).not.to.be.undefined
        });

        it('Response body contains initial user email', () => {
            expect(response.body.payload.user.email).to.eq(email.toLowerCase());
        });

        it('Response body doesn\'t contain user password', () => {
            expect(response.body.payload.user.password).to.eq(null)
        });

        it('Response body contains initial user name', () => {
            expect(response.body.payload.user.name).to.eq(`${firstName} ${lastName}`)
        });
    })

    describe('Not all required fields are filled', () => {
        const email = faker.internet.email()

        before(async () => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, faker.internet.password())
            response = await userHelper.logInNotAllFields(email)
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
            expect(response.body.message).to.eq('Auth failed')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('Request has empty body', () => {

        before(async () => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.internet.password())
            response = await userHelper.logInEmptyBody()
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
            expect(response.body.message).to.eq('Auth failed')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })
})