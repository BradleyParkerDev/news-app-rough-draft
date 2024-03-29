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
const login = async (req,res) => {
    try {
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;
        const user = await User.findOne({
            emailAddress: emailAddress
        });


        //User not found
        if(!user){
            return res.status(404).json({ success: false, message: 'Could not find user.' });            return;
        }

        //Checks password validity
        const passwordValid = await validatePassword(password,user.password);

        if(!passwordValid){
            return res.status(401).json({ success: false, message: 'Password was incorrect.' });
        }

        const userData = {
            date: Date(),
            userId: user.id,
            emailAddress: user.emailAddress
        }


        // Generate tokens
        const { accessToken, refreshToken } = generateUserTokens(userData);

        res.json({
            success: true,
            accessToken,
            refreshToken,
            id: user.id
        })


    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.toString()});
    }


};

//refreshAccessToken
const refreshAccessToken = async (req,res) => {

    const refreshToken = req.body.refreshToken;
    const userData = verifyRefreshToken(refreshToken)
    



    const {accessToken} = generateUserTokens(userData);

    res.json({success:true, accessToken: accessToken})




}

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