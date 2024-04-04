//Update
const updateUser = async (req,res) => {
    const id = req.decoded.userData.userId
    let updates = req.body.updates
    const response = await User.findOneAndUpdate({id:id},updates)


}

module.exports = updateUser;

