const User = require('../../../models/Users');
const {checkUserRefreshTokens} = require('../../../auth')

const refreshAccessToken = async (req, res) => {
    const oldRefreshToken = req.cookies.refreshToken;
    try {
        const{
            newRefreshToken,
            refreshTokenExpiration,
            accessToken,
            accessTokenExpiration
        } = await checkUserRefreshTokens(oldRefreshToken,res)

        console.log(accessToken)
        res.cookie('refreshToken',newRefreshToken,{
            httpOnly: true,
            expires: refreshTokenExpiration
        });
        res.cookie('accessToken',accessToken,{
            expires: accessTokenExpiration
        });

        res.json({ 
            success: true, 
            message: 'New refresh and access tokens sent in cookies.' 
        });


    } catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = refreshAccessToken;