const { User } = require('../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')

exports.Login = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        if(!user) return res.status(401).json({msgErr:"Wrong Email or Password"});
        
        const match = await argon2.verify(user[0].password, req.body.password);
        if(!match) return res.status(402).json({msgErr:"Wrong Email or Password"});
        
        const id = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const role = user[0].role;
        const accessToken = jwt.sign({id, username, email, role}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        const refreshToken = jwt.sign({id, username, email, role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })    
        await User.update(
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
        res.json({ 
            accessToken,
        });
    } catch (err) {
        res.status(400).json({
            'status': 'ERROR',
            msgErr: err.message
        });
    }
}

exports.RefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
    
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken,
            },
        });
    
        if (!user[0]) return res.status(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const id = user[0].id;
            const username = user[0].username;
            const email = user[0].email;
            const role = user[0].role;
            const accessToken = jwt.sign({ id, username, email, role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d',
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}

exports.logOut = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401);
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if(!user) return res.status(404).json({msgErr:"User Not Found"});
    await User.update({
        refresh_token: null
    },{
        where:{
            refresh_token: refreshToken
        }
    })
    res.clearCookie('refreshToken');
    return res.status(200).json({msg: "User LogOut"});
}