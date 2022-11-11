import UserHelper from "../../../helpers/user.helper";
import {expect} from "chai";

describe('Sales', () => {
    const userHelper = new UserHelper()
    let response

    describe('Company sales', () => {

        before(async () => {
            response = await userHelper.companySales()
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
            expect(response.body.message).to.eq('Report')
        })
    })

    describe('Personal sales', () => {

        before(async () => {
            response = await userHelper.personalSales()
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
            expect(response.body.message).to.eq('Report')
        })
    })
})