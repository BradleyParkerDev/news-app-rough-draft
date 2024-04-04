const User = require('../../../models/Users');
const {checkUserRefreshTokens} = require('../../../auth')

const refreshAccessToken = async (req, res) => {
    const oldRefreshToken = req.body.refreshToken;
    try {
        console.log(oldRefreshToken)
        const tokens = await checkUserRefreshTokens(oldRefreshToken,res)


        
        res.json({ 
            success: true, 
            message: 'New refresh and access tokens sent in cookies.', 
            tokens
        });


    } catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = refreshAccessToken;