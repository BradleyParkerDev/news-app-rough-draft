const { v4: uuidv4 } = require('uuid');
const User = require('../models/Users');
const cookieParser = require('cookie-parser');

const{
    generatePasswordHash,
    validatePassword,
    generateUserTokens,
    verifyRefreshToken
} = require('../auth')






//Register
const register = async (req,res) => {
    const saltRounds = 5;
    const password = req.body.password;
    const passwordHash = await generatePasswordHash(password, saltRounds)
    
    try {
        const newUser = new User({
            id: uuidv4(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            password: passwordHash
        });        
        const insertedUser = await newUser.save();
        res.json({success: true, newUser: insertedUser});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.toString()})

    }
};


//Login
const login = async (req, res) => {
    try {
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;
        const user = await User.findOne({ emailAddress });

        // User not found
        if (!user) {
            return res.status(404).json({ success: false, message: 'Could not find user.' });
        }

        // Check password validity
        const passwordValid = await validatePassword(password, user.password);

        if (!passwordValid) {
            return res.status(401).json({ success: false, message: 'Password was incorrect.' });
        }

        // Generate tokens
        const userData = {
            date: Date(),
            userId: user.id,
            emailAddress: user.emailAddress
        };

        const { accessToken, refreshToken } = generateUserTokens(userData);

        // Push refresh token to user's refreshTokens array
        user.refreshTokens.push(refreshToken);
        await user.save();

        res.json({
            success: true,
            accessToken,
            refreshToken,
            id: user.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



const refreshAccessToken = async (req, res) => {
    const oldRefreshToken = req.body.refreshToken;
    const { decoded, userData } = verifyRefreshToken(oldRefreshToken);

    try {
        // Find the user by their ID
        const user = await User.findOne({ id: userData.userId });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the provided refresh token exists in the user's refreshTokens array
        const refreshTokenIndex = user.refreshTokens.findIndex(token => token === oldRefreshToken);

        if (refreshTokenIndex === -1) {
            return res.status(403).json({ success: false, message: 'Invalid refresh token' });
        }

        // Remove the old refresh token from the refreshTokens array
        user.refreshTokens.splice(refreshTokenIndex, 1);

        // Generate new access and refresh tokens
        const { accessToken, refreshToken: newRefreshToken } = generateUserTokens(userData, decoded.exp);

        // Add the new refresh token to the refreshTokens array
        user.refreshTokens.push(newRefreshToken);

        // Save the updated user document in the database
        await user.save();

        res.json({ success: true, accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        console.error('Error refreshing access token:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};




//Read
const getUser = async (req,res) => {
    try {
        const id = req.decoded.userData.userId
        const user = await User.findOne({id:id})
        userData = {
            emailAddress: user.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            following: user.following,
            readLater: user.readLater
        }
        console.log(userData)
        res.json({success: true, userData})
    } catch (error) {
        res.json({success:false, messsage: error.toString()});
    }
}

//Update
const updateUser = async (req,res) => {



}

//Delete
const deleteUser = async (req,res) => {



}

module.exports = {
    register,
    login,
    refreshAccessToken,
    getUser,
    updateUser,
    deleteUser
}