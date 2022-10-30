const {User} = require('../models');
const jwt = require('jsonwebtoken')

exports.VerifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    });
};

// login sesuai role
exports.adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            role: req.cookies.role
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang"}).redirect('/dashboard');
    next();
}

exports.superAdminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            refresh_token: req.cookies.refreshToken
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    if(user.role !== "super admin") return res.status(403).json({msg: "Akses terlarang"}).redirect('/dashboard');
    next();
}