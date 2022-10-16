const {log} = require('../models');

// Membuat log
exports.create_log = async (req, res) =>{
    const tokens = req.token.path;

    try {
        //membuat data baru di db menggunakan method create
        const Tokens = await log.create({
            dateLog: tokens
        });
        res.status(201).json({
            'status': '201 - CREATED',
            'messages': 'Product Has Been Created',
            'token': Tokens
        });
    } catch (err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}