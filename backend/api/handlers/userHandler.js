import { loginUserController, signupUserController } from "../controllers/userController.js"

/** @param {Request} req @param {Response} res */
const signupUserHandler = (req, res) => {
    const reqBody = req.body
    if (!reqBody.username) {
        return res.status(400).json({ error: 'Invalid username' })
    }
    if (!reqBody.password) {
        return res.status(400).json({ error: 'Invalid password' })
    }
    // signupUserController()
    return res.status(200).json({ message: 'User signed up successfully' })
}


/** @param {Request} req @param {Response} res */
const loginUserHandler = async (req, res) => {
    const reqBody = req.body
    // if (!reqBody.username || reqBody.username !== 'mynameis') {
    //     return res.status(400).json({ error: 'Invalid username' })
    // }
    // if (!reqBody.password || reqBody.password !== '123456') {
    //     return res.status(400).json({ error: 'Invalid password' })
    // }
    const tokens = loginUserController({ username: reqBody.username, role: 'admin' })
    if (!tokens.accTkn || !tokens.refTkn) {
        return res.status(400).json({ error: 'Could not generate access or/and refresh token' })
    }
    accAndRefTknSetup(res, tokens.accTkn, tokens.refTkn)
    return res.status(200).json({ message: 'User logged in successfully' })
}

const accAndRefTknSetup = (res, accTkn, refTkn) => {
    res.cookie('access_token', accTkn, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60
    })
    res.cookie('refresh_token', refTkn, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 2
    })
}

/** @param {Request} req @param {Response} res */
const logoutUserHandler = (req, res) => {
    try {
        res.clearCookie('access_token', {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        res.json({ message: 'user logged out' })
    } catch (e) {
        res.status(500).json({ message: 'failed to logout user', error: e.message })
    }
}

export {
    signupUserHandler,
    loginUserHandler,
    logoutUserHandler
}