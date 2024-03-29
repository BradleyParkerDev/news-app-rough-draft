const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//Password Encryption Functions
const generatePasswordHash = async (password, saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};


const validatePassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}



//Token Functions
const generateUserTokens = (userData) => {
    // const accessTokenExp = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes
    const accessTokenExp = Math.floor(Date.now() / 1000) + 60; // 1 minute
    // const accessTokenExp = Math.floor(Date.now() / 1000) + 15; // 15 seconds


    const refreshTokenExp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

    const accessTokenPayload = {
        userData,
        exp: accessTokenExp,
        type: 'access'
    }

    const refreshTokenPayload = {
        userData,
        exp: refreshTokenExp,
        type: 'refresh'
    }
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

    const accessToken = jwt.sign(accessTokenPayload, accessTokenSecretKey);
    const refreshToken = jwt.sign(refreshTokenPayload, refreshTokenSecretKey);
    return {accessToken, refreshToken};

};


const verifyUserToken = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (bearerToken) {
            const token = bearerToken.split(' ')[1];
    
            // Attempt to verify token with ACCESS_TOKEN_SECRET_KEY
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
                req.decoded = decoded;
                console.log('Token verified with ACCESS_TOKEN_SECRET_KEY');
                next();
                return; // Exit function if verification successful
            } catch (accessTokenError) {
                console.error('Token verification failed with ACCESS_TOKEN_SECRET_KEY:', accessTokenError.message);
            }
    
            // Attempt to verify token with REFRESH_TOKEN_SECRET_KEY
            try {
                const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
                req.decoded = decoded;
                console.log('Token verified with REFRESH_TOKEN_SECRET_KEY');
                next();
                return; // Exit function if verification successful
            } catch (refreshTokenError) {
                console.error('Token verification failed with REFRESH_TOKEN_SECRET_KEY:', refreshTokenError.message);
            }
    
            // If both verification attempts fail, return an error
            throw {
                status: 401,
                message: 'Invalid Token'
            };
        } else {
            throw {
                status: 401,
                message: 'Missing Token'
            };
        }
    } catch (error) {
        res.status(error.status || 401).json({ message: error.message });
    }
};

const verifyRefreshToken = (refreshToken) => {

    try {

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
        const userData = {
            date: Date(),
            userId : decoded.userData.userId,
            emailAddress: decoded.userData.emailAddress
        }
        
        return userData

    } catch (error) {
        
    }

   


}



module.exports = {
    generatePasswordHash,
    validatePassword,
    generateUserTokens,
    verifyUserToken,
    verifyRefreshToken
}