import jwt from 'jsonwebtoken'

/** @param {Request} req @param {Response} res @param {NextFunction} next*/
const verifyTokenMiddleware = async (req, res, next) => {
    // const authHeader = req.headers.authorization;
    // const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    // get tokens from cookies
    const accessToken = req.cookies?.access_token
    const refreshToken = req.cookies?.refresh_token

    if (!accessToken) {
        if (!refreshToken) {
            return res.status(401).json({ error: 'No tokens provided' })
        }
        return handleRefresh(req, res, next, refreshToken)
    }
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, function (err, decoded) {
        if (!err) {
            // custom new req property in endpoint handlers
            req.user = decoded
            return next()
        }
        if (err && err.name !== 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Invalid access token',
                errorType: err.name,
                error: err.message,
                tknExp: err.expiredAt
            })
        }
        // access token expired => try refresh
        if (!refreshToken) {
            return res.status(401).json({ error: 'No tokens provided (access token expired)' })
        }
        handleRefresh(req, res, next, refreshToken)
    })
}

export { verifyTokenMiddleware }

const handleRefresh = (req, res, next, refreshToken) => {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: "Invalid refresh token",
                details: err.message
            });
        }

        const payload = {
            username: decoded.username,
            role: decoded.role
        }
        const newAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "1m" });

        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60,
        });
        req.user = payload;

        next();
    });
}
