import UserHelper from "../../../helpers/user.helper";
import faker from "faker";
import {expect} from "chai";

describe('Delete user by valid user id', () => {

    const userHelper = new UserHelper()
    let response, userID

    describe('By valid company id', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, password)
            userID = (await userHelper.logIn(email, password)).body.payload.userId
            response = await userHelper.deleteUser(userID)
        })

        it('Successful DELETE request', () => {
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
})