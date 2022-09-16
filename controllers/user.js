const {user} = require('../models')

// List semua data user
exports.list_user = async (req, res, next) => {
    try {
        //mengambil semua data
        const users = await user.findAll({});
        
        // Pengkondisian data ada atau tidak
        if (users.length !== 0) {
            res.json({
                'status': 'OK',
                'messages': '',
                'data': users
            });
        } else {
            res.json({
                'status': 'EMPTY',
                'messages': 'Data is empty',
                'data': {} 
            });
        }
    } catch (err) {
            res.status(500).json({
                'status': 'ERROR',
                'messages': 'Internal Server Error'
        })
    }
}

// detail user sesuai id
exports.detail_user = async (req, res, next) => {
    try {			
        //mengangkap param ID
        const id = 1;
        // mencari id di db
        const users = await user.findByPk(id);		  
        
        // Pengkondisian user ditemukan atau tidak
        if (users) {
            res.json({
                'status': 'OK',
                'messages': '',
                'data': users
            });
        } else {
            res.status(404).json({
                'status': 'NOT_FOUND',
                'messages': 'Data not found',
                'data': null 
            });
        }
    } catch (err) {		
        res.status(500).json({
            'status': 'ERROR',
            'messages': 'Internal Server Error'
        })
    }
}

// Untuk menambahkan data user/register
exports.add_user = async (req, res, next) => {
    try {
        const username = "Adrian";
        const password = '123'
        const status = 'Karyawan'
        //membuat data baru di db menggunakan method create
        const post = await user.create({
            username,
            password,
            status
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (post) {
            res.status(201).json({
            'status': 'OK',
            'messages': 'Post berhasil ditambahkan',
            'data': post
            });
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

// Mengedit Data user
exports.update_user = async (req, res, nex) =>{
    try {
        const id = 1
        const username = "Adrianarrr";
        const password = '123'
        const status = 'karyawan'
        
        // Meng edit data sesuai id dan mengambil dari form
        const users = user.update({
            username,
            password,
            status
        }, {
            where: {
                id: id
            }
        })
        // Pengkodisian bila data berhasil di edit
        if (users) {
            res.json({
            'status': 'OK',
            'messages': 'user berhasil diubah'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}

// Mengahapus data user
exports.delete_user =  async (req, res, nex) =>{
    try {
        const id = 5
        // Menghapus sesuai id
        const users = user.destroy({
            where: {
                id: id
            }
        })
        // Pengkodisian bila data berhasil di hapus
        if (users) {
            res.json({
                'status': 'OK',
                'messages': 'users berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}