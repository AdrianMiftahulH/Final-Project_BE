const {supplier} = require('../models');

// Menambahkan supplier
exports.add_supp = async (req, res, next) => {
    try {
        // Mengambil data dari form
        const {
            nama_supp,
            alamat,
            noHp
        } = req.body
        //membuat data baru di db menggunakan method create
        const supp = await supplier.create({
            nama_supp,
            alamat,
            noHp
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status CREATED
        if (supp) {
            res.status(201).json({
            'status': '201 - CREATED',
            'messages': 'supplier berhasil ditambahkan',
            'data': supp
            });
        }
    } catch(err) {
        res.status(400).json({
            'status': '400 - ERROR',
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
                'status': '200 - OK',
                'messages': 'Data list supplier',
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
                'status': '500 - INTERNAL SERVER ERROR',
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
                'status': '200 - OK',
                'messages': 'Detail Supplier',
                'data': supps
            });
        } else {
            res.status(404).json({
                'status': '404 - NOT FOUND',
                'messages': 'Data not found',
                'data': null 
            });
        }
    } catch (err) {		
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
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
        
        // Mengupdate data yang di input sesuai id
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
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            'messages': 'Internal Server Error'
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
                'status': '201 - OK',
                'messages': 'Supplier berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            'messages': 'Internal Server Error'
        })
    }
}