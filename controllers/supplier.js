const {supplier} = require('../models');

// Menambahkan supplier
exports.add_supp = async (req, res, next) => {
    try {
        // Mengambil data dari form
        const nama = "PT.gada";
        const alamat = 'jl.gada';
        const noHp = 0899999;
        //membuat data baru di db menggunakan method create
        const supp = await supplier.create({
            nama,
            alamat,
            noHp
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (supp) {
            res.status(201).json({
            'status': 'OK',
            'messages': 'supplier berhasil ditambahkan',
            'data': supp
            });
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
};

// List semua supp
exports.list_supp = async (req, res, next) => {
    try {
        //mengambil semua data
        const supps = await supplier.findAll({});
        
        // Pengkondisian data ada atau tidak di database
        if (supps.length !== 0) {
            res.json({
                'status': 'OK',
                'messages': '',
                'data': supps
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

// Detail supp sesuai dengan id
exports.detail_supp = async (req, res, next) => {
    try {			
        //mengangkap param ID
        const id = 1;
        const supps = await supplier.findByPk(id);		  
    
        if (supps) {
            res.json({
                'status': 'OK',
                'messages': '',
                'data': supps
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
};

// Mengubah/ mengedit supp
exports.update_supp = async (req, res, nex) =>{
    try {
        const id = 1
        const nama = "PT.gtau";
        const alamat = 'jl.gtau';
        const noHp = 0899999;
        
        const supp = supplier.update({
            nama,
            alamat,
            noHp
        }, {
            where: {
                id: id
            }
        })
    
        if (supp) {
            res.json({
            'status': 'OK',
            'messages': 'Supplier berhasil diubah'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}

// Menghapus supp
exports.hapus_supp = async (req, res, nex) =>{
    try {
        const id = 1
        const supps = supplier.destroy({
            where: {
                id: id
            }
        })
    
        if (supps) {
            res.json({
                'status': 'OK',
                'messages': 'supps berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}