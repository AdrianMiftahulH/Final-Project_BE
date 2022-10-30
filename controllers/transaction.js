const {product, User, flow, detailFlow} = require('../models');

// Memabuat transaksi masu sesuai id supplier
exports.flow_add_product = async ( req, res ) => {
    const {
        id_supp,
        name_giver,
        date_add
    } = req.body;

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401);
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if(!user) return res.status(401);
    try {  
        const trans = await flow.create({
            id_supp: id_supp,
            name_giver: name_giver,
            name_receiver: user[0].username,
            status: "add",
            date_add: date_add
        })
        if(trans){
            const upFlow = await detailFlow.update({
                id_flow: trans.id,
                status: "TransSuccess"
            }, {
                where: {
                    status: "preTrans"
                }
            })
            if(upFlow){
                res.status(201).json({
                    'status': 'OK',
                    'messages': 'User Data Has Been Successfully Updated',
                    'data': upFlow,
                    'trans': trans
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            'status': 'ERROR',
            msgErr: res.err
        })
    }
}

// Memabuat transaksi keluar sesuai id distributor
exports.flow_drop_product = async ( req, res ) => {
    const {
        id_dist,
        name_receiver,
        date_drop
    } = req.body;

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status(401);
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if(!user) return res.status(401);
    const detailTrans = await detailFlow.findAll({
        where: {
            status: "preTrans"
        }
    })
    if(!detailTrans){
        res.json({
            'status': 'EMPTY',
            msgErr: 'Data not Found'
        });
    }
    const findProductByDetail = await product.findAll({
        where: {
            id: detailTrans[0].id_product
        }}
    )
    try {
        const trans = await flow.create({
            id_dist: id_dist,
            name_giver: user[0].username,
            name_receiver: name_receiver,
            status: "drop",
            date_drop: date_drop
        })
        if(trans){
            const upFlow = await detailFlow.update({
                id_flow: trans.id,
                status: "TransSuccess"
            }, {
                where: {
                    status: "preTrans"
                }
            })
            if(upFlow){
                res.status(201).json({
                    'status': 'OK',
                    'messages': 'User Data Has Been Successfully Updated',
                    'data': upFlow,
                    'trans': trans
                    });
            }
        }
    } catch (err) {
        res.status(500).json({
            'status': 'ERROR',
            msgErr: res.err
        })
    }
}

// === Detail Transaksi === 

// Menambahkan barang di transaksi
exports.create_detail_flow = async ( req, res ) => {
    const {
        id_product,
        total
    } = req.body;
    // Mencari nama produk di db bila sesuai dengan req body
    const totalProductCheck = await product.findOne({
        where:{
            id: id_product,
        }
    })
    // jika nama produk req sama dengan nama produk db
    if(!totalProductCheck){
        return res.json({
            'status': 'EMPTY',
            msgErr: 'Data is empty',
            'data': {} 
        });
    }
    // Cek semua detail flow
    const cekdetailFlow = await detailFlow.findOne({
        where: {
            id_product: totalProductCheck.id,
        }
    })
    try {
        if(!cekdetailFlow){
            const detailTrans = await detailFlow.create({
                id_product: totalProductCheck.id,
                status: "preTrans",
                total: total
            })
            if(detailTrans){
                res.status(201).json({
                        'status': '201 - CREATED',
                        'messages': 'Product success selected',
                        'data': detailTrans,
                }); 
            }
        }
        else if(cekdetailFlow.id_product === id_product){
            const detailTrans = await detailFlow.update({
                total: total + cekdetailFlow.total
            }, {
                where: {
                    id: cekdetailFlow.id
                }
            })
            if(detailTrans){
                res.status(201).json({
                    'status': '201 - CREATED',
                    'messages': 'detail di update',
                    'data': detailTrans
                }); 
            }
        }
    } catch (err) {
        res.status(500).json({
            'status': 'ERROR',
            msgErr: res.err
        })
    }
}

// List Detail Transaction Pre transaction
exports.List_DetailPreTransaction = async (req, res) => {
    try {
        //mengambil semua data
        const detailTrans = await detailFlow.findAll(
            {
            where: {
                status: "preTrans"
            }}
        )
        
        // Pengkondisian data atau tidak
        if (detailTrans.length !== 0) {
            res.json({
                'status': '200 - OK',
                'messages': 'List All Product Data',
                'data': detailTrans
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
                'status': 'ERROR',
                msgErr: 'Internal Server Error'
            })
    }
}

// Edit Product Selected
exports.Edit_Product_Selected = async( req, res ) => {
    const {
        total
    } = req.body;
    // mencari id trans
    const FindDetailTransById = await detailFlow.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!FindDetailTransById) return res.status(404).json({msgErr: "Product Selected Data Not Found"});

    try {
        const EditDetailTrans = await detailFlow.update({
            total: total
        }, {
            where: {
                id: FindDetailTransById.id
            }
        })

        if (EditDetailTrans) {
            res.json({
                'status': '201 - CREATED',
                'messages': 'Product Data Has Been Successfully Updated',
                'data': EditDetailTrans
            })
        }
    } catch (err) {
        res.status(500).json({
            'status': 'ERROR',
            msgErr: res.err
        })
    }
}

// Delete Product Selected
exports.Delete_Product_Selected = async( req, res ) => {
    // mencari id trans
    const FindDetailTransById = await detailFlow.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!FindDetailTransById) return res.status(404).json({msgErr: "Product Selected Data Not Found"});

    try {
        const DeleteDetailTrans = await detailFlow.destroy({
            where: {
                id: FindDetailTransById.id
            }
        })

        if (DeleteDetailTrans) {
            res.json({
                'status': '201 - CREATED',
                'messages': 'Product Data Has Been Successfully Updated',
                'data': DeleteDetailTrans
            })
        }
    } catch (err) {
        res.status(500).json({
            'status': 'ERROR',
            msgErr: res.err
        })
    }
}