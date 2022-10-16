const {User} = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')

exports.Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg:"Wrong Password"});

    const id = user.id;
    const username = user.username;
    const email = user.email;
    const role = user.role;
    const accessToken = jwt.sign({id, username, email, role}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s'
    })
    const refreshToken = jwt.sign({id, username, email, role}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '20d'
    })

    await User.update({refresh_token:refreshToken},{
        where:{
            id:id
        }
    })
    res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).json({id, username, email, role, accessToken});
}

exports.Me = async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon untuk login"});
    }
    const user = await User.findOne({
        attributes:['id', 'username', 'email', 'role'],
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    res.status(200).json(user)
}

exports.logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "tidak dapat logout"});
        res.status(200).json({msg:"anda telah logout"})
    })
}