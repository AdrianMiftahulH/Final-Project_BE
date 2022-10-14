const {product} = require('../models');

// === Barang ===
// Membuat data Barang
exports.create_product = async (req, res) => {
    const {
        id_supp,
        name_product,
        color_product,
        series_product,
        fuel_type,
        body_type,
        total,
        photo
    } = req.body

    // Mencari nama produk di db bila sesuai dengan req body
    const nameProductCheck = await product.findOne({
        where:{
            name_product: req.body.name_product,
        }
    })

    // jika nama produk req sama dengan nama produk db
    if(nameProductCheck){
        return res.status(409).json({msg: "Product name already exists"});
    }
    try {
        //membuat data baru di db menggunakan method create
        const products = await product.create({
            id_supp: id_supp,
            name_product: name_product,
            color_product: color_product,
            series_product: series_product,
            fuel_type: fuel_type,
            body_type: body_type,
            total: total,
            photo: photo
        });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (products) {
            res.status(201).json({
            'status': '201 - CREATED',
            'messages': 'Product Has Been Added',
            'data': products
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
exports.list_product = async (req, res) => {
    try {
        //mengambil semua data
        const products = await product.findAll(
            {
                include: [
                    'supplier'
                ]
            }
        ); 
        
        // Pengkondisian data atau tidak
        if (products.length !== 0) {
            res.json({
                'status': '200 - OK',
                'messages': 'List All Product Data',
                'data': products
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
exports.detail_product = async (req, res) => {
    try {	
        // mencari id di db
        const products = await product.findOne({
            where:{
                id: req.params.id
            }
        });		  

        if (products) {
            res.json({
                'status': '200 - OK',
                'messages': 'Detail Product Data',
                'data': products
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
exports.update_product = async (req, res) =>{
     // mencari id di db
    const Products = await product.findOne({
        where:{
            id: req.params.id
        }
    });	
    // jika data tidak di temukan
    if(!Products) return res.status(404).json({msg: "Product Data Not Found"});

    // data reqb body
    const {
        id_supp,
        name_product,
        color_product,
        series_prooduct,
        fuel_type,
        body_type,
        photo
    } = req.body

    // Mencari nama produk di db bila sesuai dengan req body
    const nameProductCheck = await product.findOne({
        where:{
            name_product: req.body.name_product,
        }
    })

    // jika nama produk req sama dengan nama produk db
    if(nameProductCheck){
        return res.status(409).json({msg: "Product name already exists"});
    }

    try {
        const products = await product.update({
            id_supp: id_supp,
            name_product: name_product,
            color_product: color_product,
            series_prooduct: series_prooduct,
            fuel_type: fuel_type,
            body_type: body_type,
            photo: photo
        }, {
            where: {
                id: Products.id
            }
        })
    
        if (products) {
            res.json({
            'status': '201 - CREATED',
            'messages': 'Product Data Has Been Successfully Updated'
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
exports.delete_product = async (req, res) =>{
    // mencari id di db
    const Products = await product.findOne({
        where:{
            id: req.params.id
        }
    });	
    // jika data tidak di temukan
    if(!Products) return res.status(404).json({msg: "Product Data Not Found"});

    try {
        const products = product.destroy({
            where: {
                id: Products.id
            }
        })
    
        if (products) {
            res.json({
                'status': '200 - OK',
                'messages': `Product ${Products.name_product} Data Has Been Successfully Deleted`
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}