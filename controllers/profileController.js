const _ = require('lodash')
const {Profile} = require('../models/profile')

module.exports.getProfile = async (req, res) => {
    const userId =await req.user._id;
    const profile = await Profile.findOne({ user: userId }).populate('user', 'name')
    // find - [] asbe
    // findOne - {} asbe
    if(profile)return res.status(200).send(profile)
}

module.exports.setProfile = async (req, res) => {
    // we will create or update
    const userId = req.user._id;
    const userProfile=_.pick(req.body,['phone','address1','address2','city','state','postCode','country'])
    userProfile['user']=userId;
    let profile = await Profile.findOne({user:userId})
    if(profile){
        // update
        await Profile.updateOne({user:userId},userProfile)

    }else{
        // create
        profile= new Profile(userProfile)
        await profile.save()
    }
    return res.status(200).send(userProfile)
    
}