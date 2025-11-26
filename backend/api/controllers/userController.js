import jwt from 'jsonwebtoken'

const genTokens = (payload) => {
    const access_token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1m' })
    const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '2m' })

    // console.log(`AT: ${access_token}\nRT: ${refresh_token}`)
    return {
        at: access_token,
        rt: refresh_token
    }
}

const loginUserController = (payload) => {
    const tokens = genTokens(payload)
    return {
        accTkn: tokens.at,
        refTkn: tokens.rt
    }
}
const signupUserController = () => {
    const tokens = genTokens(payload)
    return {
        accTkn: tokens.at,
        refTkn: tokens.rt
    }
}

export {
    signupUserController,
    loginUserController,
}