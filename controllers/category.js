const { category } = require('../models');

// Menambahkan category
exports.add_category = async (req, res) => {
    try {
        // Mengambil data dari form
        const {
            name_cat
        } = req.body
        //membuat data baru di db menggunakan method create
        const cate = await category.create({
            name_cat: name_cat
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status CREATED
        if (cate) {
            res.status(201).json({
                'status': '201 - CREATED',
                msg: 'Category berhasil ditambahkan',
                'data': cate
            });
        }
    } catch(err) {
        res.status(400).json({
            'status': '400 - ERROR',
            msgErr: err.message
        });
    }
};

// List semua category
exports.list_category = async (req, res) => {
    try {
        //mengambil semua data
        const cates = await category.findAll({});
        
        // Pengkondisian data ada atau tidak di database
        if (cates.length !== 0) {
            res.json({
                'status': '200 - OK',
                msg: 'Data list category',
                'data': cates
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

// Detail category sesuai dengan id
exports.detail_category = async (req, res) => {
    try {			
        // mencari id di db
        const cate = await category.findOne({
            where:{
                id: req.params.id
            }
        });		  	  
    
        if (cate) {
            res.json({
                'status': '200 - OK',
                msg : 'Detail category',
                'data': cate
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

// Mengubah/ mengedit category
exports.update_category = async (req, res) =>{
    // mencari id di db
    const cates = await category.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!cates) return res.status(404).json({msgErr: "category tidak di temukan"});
    const {name_cat} = req.body;
    
    try {        
        // Mengupdate data yang di input sesuai id
        const dist = category.update({
            name_cat: name_cat
        }, {
            where: {
                id: cates.id
            }
        })
    
        if (dist) {
            res.json({
                'status': 'OK',
                msg: 'category berhasil diubah'
            })
        }
    } catch(err) {
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            msgErr : err.message
        })
    }
}

// Menghapus category
exports.hapus_category = async (req, res) =>{
    // mencari id di db
    const cates = await category.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!cates) return res.status(404).json({msgErr: "category tidak di temukan"});
    try {
        const cate = category.destroy({
            where: {
                id: cates.id
            }
        })
    
        if (cate) {
            res.json({
                'status': '201 - OK',
                msg: 'category berhasil dihapus'
            })
        }
    } catch(err) {
        res.status(500).json({
            'status': '500 - INTERNAL SERVER ERROR',
            msgErr: 'Internal Server Error'
        })
    }
}