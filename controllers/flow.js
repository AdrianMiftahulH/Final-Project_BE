const {flow} = require('../models');



// Menambahkan Barang
exports.add_bar = async (req, res, next) => {
    try {
        const {
            id_barang,
            nama_pemberi,
            nama_penerima,
            jumlah,
            status,
            tanggal
        } = req.body
        //membuat data baru di db menggunakan method create
        const flows = await flow.create({
            id_barang,
            nama_pemberi,
            nama_penerima,
            jumlah,
            status,
            tanggal
            });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (flows) {
            if (flows.status === "keluar") {
                res.status(201).json({
                    'status': '201 - CREATED',
                    'messages': 'Barang berhasil Keluar',
                    'data': flows
                });
            } else if (flows.status === "masuk"){
                res.status(201).json({
                    'status': '201 - CREATED',
                    'messages': 'Barang berhasil Masuk',
                    'data': flows
                    });
            }
            
        }
    } catch(err) {
        res.status(500).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

// List semua FLow
exports.list_flow = async (req, res, next) => {
    try {
        //mengambil semua data
        const flows = await flow.findAll(
            {
                include: [
                    'barang'
                ]
            }
        ); 
        
        // Pengkondisian data atau tidak
        if (flows.length !== 0) {
            res.json({
                'status': '200 - OK',
                'messages': 'List semua data Barang',
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