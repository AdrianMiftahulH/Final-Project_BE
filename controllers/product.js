const {product, flow} = require('../models');

// === Barang ===
// Membuat data Barang baru
exports.create_product = async (req, res) => {
    // validasi photo/image
    if(!req.file){
        const err = new Error('no image')
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const photo = req.file.path;
    // mengambil data dari req body
    const {
        id_supp,
        name_product,
        color_product,
        series_product,
        fuel_type,
        body_type,
        total,
        name_giver,
        name_receiver,
        date
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
            // membuat flow barang deng status masuk setelah menambhakn data
            const flows = await flow.create({
                id_barang: products.id,
                name_giver: name_giver,
                name_receiver: name_receiver, 
                total: total,
                status: "Go In",
                date: date
            })

            res.status(201).json({
                'status': '201 - CREATED',
                'messages': 'Product Has Been Created',
                'data': products,
                'flow': flows
            });
        }
        } catch(err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

// Menambahkan barang sesuai id barang
exports.flow_product = async ( req, res ) => {

    // mencari id di db
    const Products = await product.findOne({
        where:{
            id: req.params.id
        }
    });	

    // jika data tidak di temukan
    if(!Products) return res.status(404).json({msg: "Product Data Not Found"});

    // mengambil data dari req body
    const {
        name_giver,
        name_receiver,
        total,
        status,
        date
    } = req.body

    try {
        //membuat data baru di db menggunakan method create
        const flows = await flow.create({
            id_barang: Products.id,
            name_giver: name_giver,
            name_receiver: name_receiver,
            total: total,
            status: status,
            date: date
        });

        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (flows) {
            // membuat flow barang deng status masuk setelah menambhakn data
            if (flows.status === "add") {
                const products = await product.update({
                    total: Products.total + total
                }, {
                    where: {
                        id: Products.id
                    }
                })
    
                if (products) {
                    res.json({
                    'status': '201 - ADDED',
                    'messages': 'Product Data Has Been Successfully Added'
                    })
                }
            } else if (flows.status === "drop"){
                if(Products.id > total){
                    const products = await product.update({
                        total: Products.total - total
                    }, {
                        where: {
                            id: Products.id
                        }
                    })
        
                    if (products) {
                        res.json({
                        'status': '201 - ADDED',
                        'messages': 'Product Data Has Been Successfully Droped'
                        })
                    }
                }else{
                    res.json({
                        'status': '400',
                        'messages': 'Data Flows Failed In Process !!!'
                    })
                }
            } else {
                res.json({
                    'status': '400',
                    'messages': 'Data Flows Failed In Process'
                })
            }

            
        }
        } catch(err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

// List semua Flow
exports.List_All_Flow = async ( req, res ) => {
    //mengambil semua data
    const flows = await flow.findAll(
        {}
    ); 
    try {
        // Pengkondisian data atau tidak
        if (flows.length !== 0) {
            res.json({
                'status': '200 - OK',
                'messages': 'List All Flow Product Data',
                'data': flows
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

// List flow sesuai data barang
exports.List_Flow_By_Product = async (req, res) => {
    try {	
        // mencari id di db
        const flows = await flow.findAll({
            where:{
                id_barang: req.params.id
            }
        });		  

        // jika data tidak di temukan
        if(!flows) return res.status(404).json({msg: "Product Data Not Found"});

        if (flows) {
            res.json({
                'status': '200 - OK',
                'messages': 'Detail Product Data',
                'data': flows
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

        // jika data tidak di temukan
        if(!products) return res.status(404).json({msg: "Product Data Not Found"});

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
                'messages': `Product Data Has Been Successfully Deleted`
            })
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        })
    }
}