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

    if (match) {
        const id = user.id;
        let accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s',
        });

        let refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        });
        await User.update({refresh_token: refreshToken},{
            where:{
                id: id
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
        //send user data
        return res.status(201).send(user);
    } else {
        return res.status(401).send("Authentication failed");
    }
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

exports.logOut = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "tidak dapat logout"});
        res.status(200).json({msg:"anda telah logout"})
    })
}