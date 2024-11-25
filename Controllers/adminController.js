const User = require("../models/userModel")

const getAllUser = async(req,res) => {
    const {_id} = req.body
    if(!_id ){
        return res.status(400).json({success: false, message: "All fields are required"})
    }
    try{
    const admin = await User.findOne({_id})
    if(admin.role !== "admin")
    {
        return res.status(400).json({success: false, message: "Unauthorized admin"})

    }
    const user = await User.find()
    if(!user){
        return res.status(400).json({success: false, message: "No user found"})
    }



    res.status(200).json({success: true, user})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: "Server error"})
    }
}

module.exports = {getAllUser}