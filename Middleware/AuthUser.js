const {User} = require('../models');

// membuat apakah user/admin sudah login atau blum
exports.VerifyUser = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            refresh_token: refreshToken
        }
    })
    if(!user) return res.status(404).json({msg: "Mohon Untuk login"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

// login sesuai role
exports.adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang"});
    next();
}

exports.superAdminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    if(user.role !== "super admin") return res.status(403).json({msg: "Akses terlarang"});
    next();
}