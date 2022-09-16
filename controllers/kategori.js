const {kategori} = require('../models');

// Menambahkan kategori
exports.add_kat = async (req, res, next) => {
    try {
        const nama = "topi"
        //membuat data baru di db menggunakan method create
        const kat = await kategori.create({
            nama
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (kat) {
            res.status(201).json({
            'status': 'OK',
            'messages': 'kategori berhasil ditambahkan',
            'data': kat
            });
        }
        } catch(err) {
        res.status(400).json({
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
        
        if (kats.length !== 0) {
            res.json({
                'status': 'OK',
                'messages': '',
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

// Detail kat sesuai dengan id
exports.detail_kat = async (req, res, next) => {
    try {			
        //mengangkap param ID
        const id = 1;
        const kats = await kategori.findByPk(id);		  
    
        if (kats) {
            res.json({
                'status': 'OK',
                'messages': '',
                'data': kats
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
            'status': 'OK',
            'messages': 'kat berhasil diubah'
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
                'status': 'OK',
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
