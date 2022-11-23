const {supplier} = require('../models');

// Menambahkan supplier
exports.add_supp = async (req, res) => {
    try {
        // validasi photo/image
        if(!req.file){
            return res.status(409).json({msgErr: "No image"});
        }
        // mengambil data image dari file path
        const photo = req.file.path;
        // Mengambil data dari form

        const {
            name_supp,
            address,
            mobile
        } = req.body

        // mencari nama supplier
        const supps = await supplier.findOne({
            where:{
                name_supp: name_supp
            }
        });		  	  
    
        if (supps) {
            return res.status(409).json({msgErr: "Name Supplier Already Taken"});
        } 
        //membuat data baru di db menggunakan method create
        const supp = await supplier.create({
            name_supp: name_supp,
            address: address,
            mobile: mobile,
            logo_supp: photo
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
            msgErr: err.message
        });
    }
};

// List semua supp
exports.list_supp = async (req, res) => {
    try {
        //mengambil semua data
        const supps = await supplier.findAll({
            
        });
        
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

// Detail supp sesuai dengan id
exports.detail_supp = async (req, res) => {
    try {			
        // mencari id di db
        const supps = await supplier.findOne({
            where:{
                id: req.params.id
            }
        });		  	  
    
        if (supps) {
            res.json({
                'status': '200 - OK',
                'messages': 'Detail Supplier',
                'data': supps
            });
        } else {
            res.status(404).json({
                'status': '404 - NOT FOUND',
                msgErr: 'Data not found',
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

// Mengubah/ mengedit supp
exports.update_supp = async (req, res) =>{
    // mencari id di db
    const supps = await supplier.findOne({
        where:{
            id: req.params.id
        }
    });	 
    if(!supps) return res.status(404).json({msgErr: "Supps tidak di temukan"});
	
    // mencari nama supplier
    const ListSupps = await supplier.findOne({
        where:{
            name_supp: req.body.name_supp
        }
    });		  	  

    if (ListSupps) {
        return res.status(409).json({msgErr: "Name Supplier Already Taken"});
    } 

    let photo;
    let name_supp;
    let address;
    let mobile;

     // validasi photo/image
    if(!req.file){
        photo = supps.logo_supp
    }else{
    // mengambil data image dari file path
        photo = req.file.path;
    }
    
    // validasi name_supp
    if(req.body.name_supp === "" || req.body.name_supp === null) {
        name_supp = supps.name_supp;
    }else{
        name_supp = req.body.name_supp
    }

    // validasi address
    if(req.body.address === "" || req.body.address === null) {
        address = supps.address;
    }else{
        address = req.body.address
    }

    // validasi mobile
    if(req.body.mobile === "" || req.body.mobile === null) {
        mobile = supps.mobile;
    }else{
        mobile = req.body.mobile
    }

    try {        
        // Mengupdate data yang di input sesuai id
        const supp = await supplier.update({
            name_supp: name_supp,
            address: address,
            mobile: mobile
        }, {
            where: {
                id: supps.id
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
            msgErr: err.message
        })
    }
}

// Menghapus supp
exports.hapus_supp = async (req, res) =>{
    // mencari id di db
    const supps = await supplier.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!supps) return res.status(404).json({msgErr: "Supps tidak di temukan"});
    try {
        const supp = supplier.destroy({
            where: {
                id: supps.id
            }
        })
    
        if (supp) {
            res.json({
                'status': '201 - OK',
                'messages': 'Supplier berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            msgErr: 'Internal Server Error'
        })
    }
}