const {product, supplier, category} = require('../models');

// === Barang ===
// Membuat data Barang baru
exports.create_product = async (req, res) => {
    // validasi photo/image
    if(!req.file){
        return res.status(409).json({msgErr: "No image"});
    }
    // mengambil data image dari file path
    const photo = req.file.path;

    // mengambil data dari req body
    const {
        name_product,
        satuan
    } = req.body

    // Mencari nama produk di db bila sesuai dengan req body
    const nameProductCheck = await product.findOne({
        where:{
            name_product: req.body.name_product,
        }
    })

    // Mencari nama produk di db bila sesuai dengan req body
    const findSupp = await supplier.findOne({
        where:{
            name_supp: req.body.id_supp,
        }
    })

    // Mencari nama produk di db bila sesuai dengan req body
    const findCate = await category.findOne({
        where:{
            name_cat: req.body.id_cat,
        }
    })

    // jika nama produk req sama dengan nama produk db
    if(nameProductCheck){
        return res.status(409).json({msgErr: "Product name already exists"});
    }
    try {
        //membuat data baru di db menggunakan method create
        const products = await product.create({
            id_supp: findSupp.id,
            id_cat: findCate.id,
            name_product: name_product,
            satuan: satuan,
            total: 0,
            photo: photo
        });

        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (products) {
            res.status(201).json({
                'status': '201 - CREATED',
                'messages': 'Product Has Been Created',
                'data': products
            });
        }
    } catch(err) {
        res.status(500).json({
            'status': 'ERROR',
            msgErr: err.message
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
                    'supplier',
                    'category'
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
                msgErr: 'Data is empty',
                 
            });
        }
    } catch (err) {
            res.status(500).json({
                'status': 'ERROR',
                msgErr: 'Internal Server Error'
            })
    }
}

// Detail barang sesuai dengan id
exports.detail_product = async (req, res) => {
    try {	
        // mencari id di db
        const products = await product.findOne({
            include: [
                'supplier',
                'category'
            ],
            where:{
                id: req.params.id
            }
        });		  

        // jika data tidak di temukan
        if(!products) return res.status(404).json({msgErr: "Product Data Not Found"});

        if (products) {
            res.json({
                'status': '200 - OK',
                'messages': 'Detail Product Data',
                'data': products
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

// Detail barang sesuai dengan id Supplier
exports.detail_product_by_supplier = async (req, res) => {
    try {	
        // mencari id di db
        const products = await product.findAll({
            include: [
                'supplier',
                'category'
            ],
            where:{
                id_supp: req.params.id
            }
        });		  

        // jika data tidak di temukan
        if(!products) return res.status(404).json({msgErr: "Product Data Not Found"});

        if (products) {
            res.json({
                'status': '200 - OK',
                'messages': 'Detail Product Data',
                'data': products
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
// Mengubah/ mengedit barang
exports.update_product = async (req, res) =>{
     // mencari id di db
    const Products = await product.findOne({
        where:{
            id: req.params.id
        }
    });	
    // jika data tidak di temukan
    if(!Products) return res.status(404).json({msgErr: "Product Data Not Found"});
    
    // validasi photo/image
    if(!req.file){
        return res.status(409).json({msgErr: "Image Empaty"});
    }

    // mengambil data image dari file path
    const photo = req.file.path;
    // data reqb body
    const {
        id_cat,
        name_product,
        satuan
    } = req.body

    // Mencari nama produk di db bila sesuai dengan req body
    const nameProductCheck = await product.findOne({
        where:{
            name_product: req.body.name_product,
        }
    })

    // jika nama produk req sama dengan nama produk db
    // if(nameProductCheck){
    //     return res.status(409).json({msgErr: "Product name already exists"});
    // }

    try {
        const products = await product.update({
            id_cat: id_cat,
            name_product: name_product,
            photo: photo,
            satuan: satuan
        }, {
            where: {
                id: Products.id
            }
        })
    
        if (products) {
            res.json({
                'status': '201 - CREATED',
                'messages': 'Product Data Has Been Successfully Updated',
                'data': products
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            msgErr: err.message
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
    if(!Products) return res.status(404).json({msgErr: "Product Data Not Found"});

    try {
        const products = product.destroy({
            where: {
                id: Products.id
            }
        })
    
        if (products) {
            res.json({
                'status': '200 - OK',
                'messages': `Product Data Has Been Successfully Deleted`
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            msgErr: err.message
        })
    }
}