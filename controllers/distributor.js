const { distributor } = require('../models');

// Menambahkan distributor
exports.add_distributor = async (req, res) => {
    try {
        // validasi photo/image
        if(!req.file){
            return res.status(409).json({msgErr: "No image"});
        }
        // mengambil data image dari file path
        const photo = req.file.path;
        // Mengambil data dari form
        const {
            name_dist,
            address,
            mobile
        } = req.body
        //membuat data baru di db menggunakan method create
        const dist = await distributor.create({
            name_dist: name_dist,
            address: address,
            mobile: mobile,
            logo_dist: photo
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status CREATED
        if (dist) {
            res.status(201).json({
            'status': '201 - CREATED',
            msg : 'distributor berhasil ditambahkan',
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

// List semua distributor
exports.list_distributor = async (req, res) => {
    try {
        //mengambil semua data
        const dists = await distributor.findAll({});
        
        // Pengkondisian data ada atau tidak di database
        if (dists.length !== 0) {
            res.json({
                'status': '200 - OK',
                msg: 'Data list distributor',
                'data': dists
            });
        } else {
            res.json({
                'status': 'EMPTY',
                msgErr: 'Data is empty',
                'data': {} 
            });
        }
    } catch (err) {
            res.status(500).json({
                'status': '500 - INTERNAL SERVER ERROR',
                msgErr: 'Internal Server Error'
        })
    }
}

// Detail distributor sesuai dengan id
exports.detail_distributor = async (req, res) => {
    try {			
        // mencari id di db
        const dist = await distributor.findOne({
            where:{
                id: req.params.id
            }
        });		  	  
    
        if (dist) {
            res.json({
                'status': '200 - OK',
                msg : 'Detail distributor',
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

// Mengubah/ mengedit distributor
exports.update_distributor = async (req, res) =>{
    // mencari id di db
    const dists = await distributor.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!dists) return res.status(404).json({msgErr: "distributor tidak di temukan"});
    const {name_dist, address, mobile} = req.body;
    
    try {        
        // Mengupdate data yang di input sesuai id
        const dist = distributor.update({
            name_dist: name_dist,
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
            msg: 'distributor berhasil diubah'
            })
        }
    } catch(err) {
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            msgErr: err.message
        })
    }
}

// Menghapus distributor
exports.hapus_distributor = async (req, res) =>{
    // mencari id di db
    const dists = await distributor.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!dists) return res.status(404).json({msgErr: "distributor tidak di temukan"});
    try {
        const dist = distributor.destroy({
            where: {
                id: dists.id
            }
        })
    
        if (dist) {
            res.json({
                'status': '201 - OK',
                msg: 'distributor berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            msgErr: 'Internal Server Error'
        })
    }
}