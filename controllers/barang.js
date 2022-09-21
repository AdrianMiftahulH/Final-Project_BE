const {barang, flow} = require('../models');

// === Barang ===
// Membuat data Barang
exports.create_bar = async (req, res, next) => {
    try {
        const {
            id_kat,
            id_supp,
            nama_barang,
            jumlah,
            foto,
            desc
        } = req.body
        //membuat data baru di db menggunakan method create
        const barangs = await barang.create({
            id_kat,
            id_supp,
            nama_barang,
            jumlah,
            foto,
            desc
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (barangs) {
            res.status(201).json({
            'status': '201 - CREATED',
            'messages': 'Barang berhasil ditambahkan',
            'data': barangs
            });
        }
        } catch(err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

// List semua Barang
exports.list_bar = async (req, res, next) => {
    try {
        //mengambil semua data
        const barangs = await barang.findAll(
            {
                include: [
                    'kategori',
                    'supplier'
                ]
            }
        ); 
        
        // Pengkondisian data atau tidak
        if (barangs.length !== 0) {
            res.json({
                'status': '200 - OK',
                'messages': 'List semua data Barang',
                'data': barangs
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

// Detail barang sesuai dengan id
exports.detail_bar = async (req, res, next) => {
    try {			
        //mengangkap param ID
        const id = req.parms.id;
        const bars = await barang.findByPk(id);		  
    
        if (bars) {
            res.json({
                'status': '200 - OK',
                'messages': 'Detail Supplier',
                'data': bars
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

// Mengubah/ mengedit barang
exports.update_bar = async (req, res, nex) =>{
    try {
        const id = 1
        const {
            id_kat,
            id_supp,
            nama_barang,
            jumlah,
            foto,
            desc
        } = req.body
        // mengupdate data sesuai id
        const barangs = barang.update({
            id_kat,
            id_supp,
            nama_barang,
            jumlah,
            foto,
            desc
        }, {
            where: {
                id: id
            }
        })
    
        if (barangs) {
            res.json({
            'status': '201 - CREATED',
            'messages': 'data barang berhasil diubah'
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
exports.hapus_bar = async (req, res, nex) =>{
    try {
        const id = 1
        const barangs = barang.destroy({
            where: {
                id: id
            }
        })
    
        if (barangs) {
            res.json({
                'status': '200 - OK',
                'messages': 'data barang berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}


// === Flow ===
