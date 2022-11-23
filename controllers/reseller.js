const { reseller } = require('../models');

// Menambahkan reseller
exports.add_reseller = async (req, res) => {
    try {
        // Mengambil data dari form
        const {
            name_resel,
            address,
            mobile
        } = req.body
        //membuat data baru di db menggunakan method create
        const dist = await reseller.create({
            name_resel: name_resel,
            address: address,
            mobile: mobile
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status CREATED
        if (dist) {
            res.status(201).json({
            'status': '201 - CREATED',
            msg : 'reseller berhasil ditambahkan',
            'data': dist
            });
        }
    } catch(err) {
        res.status(400).json({
            'status': '400 - ERROR',
            msgErr: err.message
        });
    }
};

// List semua reseller
exports.list_reseller = async (req, res) => {
    try {
        //mengambil semua data
        const dists = await reseller.findAll({});
        
        // Pengkondisian data ada atau tidak di database
        if (dists.length !== 0) {
            res.json({
                'status': '200 - OK',
                msg: 'Data list reseller',
                'data': dists
            });
        } else {
            res.json({
                'status': 'EMPTY',
                msgErr: 'Data is empty',
                 
            });
        }
    } catch (err) {
            res.status(500).json({
                'status': '500 - INTERNAL SERVER ERROR',
                msgErr: 'Internal Server Error'
        })
    }
}

// Detail reseller sesuai dengan id
exports.detail_reseller = async (req, res) => {
    try {			
        // mencari id di db
        const dist = await reseller.findOne({
            where:{
                id: req.params.id
            }
        });		  	  
    
        if (dist) {
            res.json({
                'status': '200 - OK',
                msg : 'Detail reseller',
                'data': dist
            });
        } else {
            res.status(404).json({
                'status': '404 - NOT FOUND',
                msgErr : 'Data not found',
                'data': null 
            });
        }
    } catch (err) {		
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            msgErr: 'Internal Server Error'
        })
    }
};

// Mengubah/ mengedit reseller
exports.update_reseller = async (req, res) =>{
    // mencari id di db
    const dists = await reseller.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!dists) return res.status(404).json({msgErr: "reseller tidak di temukan"});
    const {name_resel, address, mobile} = req.body;
    
    try {        
        // Mengupdate data yang di input sesuai id
        const dist = reseller.update({
            name_resel: name_resel,
            address: address,
            mobile: mobile
        }, {
            where: {
                id: dists.id
            }
        })
    
        if (dist) {
            res.json({
            'status': 'OK',
            msg: 'reseller berhasil diubah'
            })
        }
    } catch(err) {
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            msgErr: err.message
        })
    }
}

// Menghapus reseller
exports.hapus_reseller = async (req, res) =>{
    // mencari id di db
    const dists = await reseller.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!dists) return res.status(404).json({msgErr: "reseller tidak di temukan"});
    try {
        const dist = reseller.destroy({
            where: {
                id: dists.id
            }
        })
    
        if (dist) {
            res.json({
                'status': '201 - OK',
                msg: 'reseller berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            msgErr: 'Internal Server Error'
        })
    }
}