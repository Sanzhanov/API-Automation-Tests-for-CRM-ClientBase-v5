import UserHelper from "../../helpers/user.helper";
import faker from "faker";
import {expect} from "chai";

describe('User LogIn', () => {
    const userHelper = new UserHelper()
    let response

    describe.only('All fields filled with valid data', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        before(async () => {
            await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), email, password)
            response = await userHelper.logIn(email, password)
            process.env['TOKEN'] = response.body.payload.token
        })

        it('Successful POST request', function () {
            expect(response.status.toString()[0]).to.eq('2')
        })

        it('Response status code is 200', function () {
            expect(response.status).to.eq(200)
        })
    })

})