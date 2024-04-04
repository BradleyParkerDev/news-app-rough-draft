const User = require('../../../models/Users');
const { generateUserTokens, verifyRefreshToken } = require('../../../auth')

const refreshAccessToken = async (req, res) => {
    const oldRefreshToken = req.cookie.refreshToken;
    const { decoded, userData } = verifyRefreshToken(oldRefreshToken);
    console.log(decoded)
    // try {
    //     // Find the user by their ID
    //     const user = await User.findOne({ id: userData.userId });

    //     if (!user) {
    //         return res.status(404).json({ success: false, message: 'User not found' });
    //     }

    //     // Check if the provided refresh token exists in the user's refreshTokens array
    //     const refreshTokenIndex = user.refreshTokens.findIndex(token => token === oldRefreshToken);

    //     if (refreshTokenIndex === -1) {
    //         return res.status(403).json({ success: false, message: 'Invalid refresh token' });
    //     }

    //     // Remove the old refresh token from the refreshTokens array
    //     user.refreshTokens.splice(refreshTokenIndex, 1);

    //     // Generate new access and refresh tokens
    //     const { accessToken, refreshToken: newRefreshToken } = generateUserTokens(userData, decoded.exp);

    //     // Add the new refresh token to the refreshTokens array
    //     user.refreshTokens.push(newRefreshToken);
    //     await user.save();






    //     const decodedAccessToken = jwtDecode(accessToken);
    //     const decodedRefreshToken = jwtDecode(refreshToken);

    //     // Calculate the expiration time in milliseconds
    //     const accessTokenExp = (decodedAccessToken.exp - decodedAccessToken.iat) * 1000;
    //     // Set the access token cookie with expiration time
    //     cookies.set('accessToken', accessToken, { expires: new Date(Date.now() + accessTokenExp) });

    //     // Calculate the expiration time in milliseconds
    //     const refreshTokenExp = (decodedRefreshToken.exp - decodedRefreshToken.iat) * 1000;
    //     // Set the refresh token cookie with expiration time
    //     cookies.set('refreshToken', refreshToken, { expires: new Date(Date.now() + refreshTokenExp) });












    //     res.cookie('refreshToken',newRefreshToken,{
    //         httpOnly: true
    //     });
    //     res.cookie('accessToken',accessToken);

    //     res.json({ 
    //         success: true, 
    //         message: 'New refresh and access tokens sent in cookies.'
    //         // accessToken, 
    //         // refreshToken: newRefreshToken 
    //     });


    // } catch (error) {
    //     console.error('Error refreshing access token:', error);
    //     res.status(500).json({ success: false, message: 'Internal server error' });
    // }
};

module.exports = refreshAccessToken;