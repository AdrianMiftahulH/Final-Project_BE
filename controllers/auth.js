const {User} = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')

exports.Login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(user)
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
            expiresIn: '1d'
        })
    
        const UpAccessToken = await User.update(
            {
                refresh_token:refreshToken
            },{
                where:{
                    id:id
                }
            }
        )
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({id, username, email, role, accessToken});
    } catch (err) {
        console.log(err);
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

exports.RefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookie.refreshToken;
        if(!refreshToken) return res.status(401);
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if(!user) return res.status(401);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.status(403);
            const id = user.id;
            const username = user.username;
            const email = user.email;
            const accessToken = jwt.sign({id, username, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1h'
            })
            res.json({accessToken})
        });
    } catch (error) {
        
    }
}

exports.logOut = async (req, res) => {
    const refreshToken = req.cookie.refreshToken;
        if(!refreshToken) return res.status(204);
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if(!user) return res.status(204);
        const id = user.id;
        await User.update({
            refresh_token: null
        },{
            where:{
                id:id
            }
        })
        res.clearCookie('refreshToken');
        return res.status(200).json({msg: "User LogOut"});
}