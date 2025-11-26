const signupUser = async (username, password) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/user/signup`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok) {
            const body = await res.json()
            return {
                message: 'Signup Failed',
                error: body.error
            }
        } else {
            const body = await res.json()
            return {
                message: body.message,
                error: null
            }
        }
    }
    catch (e) {
        return {
            message: 'Signup Failed',
            error: e.message
        }
    }
}

const loginUser = async (username, password) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/user/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok) {
            const body = await res.json()
            return {
                message: 'Login Failed',
                error: body.error
            }
        } else {
            const body = await res.json()
            return {
                message: body.message,
                error: null
            }
        }
    }
    catch (e) {
        return {
            message: 'Login Failed',
            error: e.message
        }
    }
}

export {
    signupUser,
    loginUser
}