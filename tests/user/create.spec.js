import UserHelper from "../../helpers/user.helper";
import {expect} from 'chai'
import faker from 'faker'
import { getEndpoint } from "../../helpers/common.helper";

describe('User', function () {
    describe.only('User creation', function () {
        let userHelper = new UserHelper()
        let response

        before(async function () {
            response = await userHelper.create(faker.company.companyName(), faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.internet.password())
            //console.log(userHelper.response.body)
        })

        it('Successful POST request', function () {
            expect(response.status.toString()[0]).to.eq('2')
        })

        it('Response status code is 201', function () {
            expect(userHelper.response.status).to.eq(201)
        })
    })

    describe('User email verification', function () {
        let userHelper = new UserHelper()

        let companyName = faker.company.companyName()
        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        let email = faker.internet.email()
        let password = faker.internet.password()

        let response, endPoint

        before(async function () {
            await userHelper.create(companyName, firstName, lastName, email, password)                  //register new user
            await userHelper.sendEmail(email)                                                           //send user's email to .../email/search
            response = userHelper.response.body                                                         //receive response
            endPoint = getEndpoint(response)                                                            //get Endpoint by function from common helper
            await userHelper.sendEndpoint(endPoint)                                                     //send empty request to endpoint
            response = userHelper.response.body                                                         //overwrite response
            await userHelper.logIn(email, password)                                                     //log in with new user
            response = userHelper.response.body                                                         //overwrite response
            process.env['TOKEN'] = response.payload.token                                               //put the token in the environment
            //console.log(process.env.TOKEN)
        })

        it('response status code is 200', function () {
            expect(userHelper.response.status).to.eq(200)
        })
    })
})

