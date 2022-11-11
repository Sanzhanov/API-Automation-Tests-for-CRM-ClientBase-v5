import 'dotenv/config'
import UserHelper from "../helpers/user.helper";

before( async () => {
    const userHelper = new UserHelper()
    let response

    response = await userHelper.logIn(process.env.EMAIL, process.env.PASSWORD)
    process.env['TOKEN'] = response.body.payload.token
})