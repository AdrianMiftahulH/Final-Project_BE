const {kategori} = require('../models');

// Menambahkan kategori
exports.add_kat = async (req, res, next) => {
    try {
        const {nama_kat} = req.body
        //membuat data baru di db menggunakan method create
        const kat = await kategori.create({
            nama_kat
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (kat) {
            res.status(201).json({
            'status': '201 - CREATED',
            'messages': 'kategori berhasil ditambahkan',
            'data': kat
            });
        }
        } catch(err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

// List semua kat
exports.list_kat = async (req, res, next) => {
    try {
        //mengambil semua data
        const kats = await kategori.findAll({});
        
        // Pengkondisian data atau tidak
        if (kats.length !== 0) {
            res.json({
                'status': '200 - OK',
                'messages': 'List semua data Kategori',
                'data': kats
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


// Mengubah/ mengedit kat
exports.update_kat = async (req, res, nex) =>{
    try {
        const id = 1
        const nama = "celana"
        
        const kats = kategori.update({
            nama
        }, {
            where: {
                id: id
            }
        })
    
        if (kats) {
            res.json({
            'status': '201 - CREATED',
            'messages': 'Kategori berhasil diubah'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}

// Menghapus kat
exports.hapus_kat = async (req, res, nex) =>{
    try {
        const id = 1
        const kats = kategori.destroy({
            where: {
                id: id
            }
        })
    
        if (kats) {
            res.json({
                'status': '200 - OK',
                'messages': 'kats berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}
