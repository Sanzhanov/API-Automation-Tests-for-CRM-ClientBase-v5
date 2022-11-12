import UserHelper from "../../../helpers/user.helper";
import faker from "faker";
import {expect} from "chai";
import {changeID} from "../../../helpers/common.helper";

describe('Get company account', () => {
    const userHelper = new UserHelper()
    let response, userID, companyID

    describe('By valid company id', () => {

        const companyName = faker.company.companyName()
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(companyName, firstName, lastName, email, password)
            companyID = (await userHelper.logIn(email, password)).body.payload.user.companyAccount
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            response = await userHelper.getAccount(companyID)
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
            expect(response.body.message).to.eq('Company Account get by id OK')
        })

        it('Response body contains payload which is an object', () => {
            expect(response.body.payload).to.be.an('object')
        })

        it('Response body contains initial company id', () => {
            expect(response.body.payload._id).to.eq(companyID)
        });

        it('Response body contains initial company name', () => {
            expect(response.body.payload.companyName).to.eq(companyName)
        });

        it('Response contains correct owner id', () => {
            expect(response.body.payload.owner._id).to.eq(userID)
        });

        it('Response contains correct owner name',  () => {
            expect(response.body.payload.owner.name).to.eq(`${firstName} ${lastName}`)
        });

        it('User email and company email are the same',  () => {
            expect(response.body.payload.email).to.eq(email.toLowerCase())
        });
    })

    describe('By non-existent company ID, but in a valid format', () => {

        const email = faker.internet.email()
        const password = faker.internet.password()
        let nonExistentCompanyID

        before(async() => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, password)
            companyID = (await userHelper.logIn(email, password)).body.payload.user.companyAccount
            nonExistentCompanyID = changeID(companyID)
            response = await userHelper.getAccount(nonExistentCompanyID)
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
            expect(response.body.message).to.eq('Company Account get error')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })

    describe('By invalid company id', () => {

        before(async() => {
            const invalidID = faker.datatype.uuid()

            response = await userHelper.getAccount(invalidID)
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
            expect(response.body.message).to.eq('Company Account get error')
        })

        it('Response body contains payload which is a string', () => {
            expect(response.body.payload).to.be.a('string')
        })
    })
})