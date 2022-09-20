const {user} = require('../models');

// Register
exports.saveRegister = async (req, res, next) => {
    try {
        // mengambil data dari inputan
        const {
            username,
            email,
            password,
            status
        } = req.body;
        //membuat data baru di db menggunakan method create
        const users = await user.create({
            username,
            email,
            password,
            status
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (users) {
            res.status(201).json({
            'status': 'CREATED',
            'messages': 'Register Berhasil',
            'data': users
            });
        }
        } catch(err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}