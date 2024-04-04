const User = require('../../../models/Users')
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
module.exports = getUser;