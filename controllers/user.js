const {User} = require('../models')
const argon2 = require('argon2');

// List semua data user
exports.list_user = async (req, res) => {
    try {
        //mengambil semua data
        const users = await User.findAll({});
        // Pengkondisian data ada atau tidak
        if (users.length !== 0) {
            res.status(200).json({
                'status': 'OK - 200',
                'messages': 'List semua data pengguna',
                'data': users
            });
        } else {
            res.json({
                'status': 'EMPTY',
                'messages': 'Data pengguna tidak ada',
                'data': {}
            })
        }
    } catch (err) {
        console.log(err)
            res.status(500).json({
                'status': 'ERROR',
                'messages': 'Internal Server Error'
        })
    }
}

// detail user sesuai id
exports.detail_user = async (req, res, next) => {
    try {			
        // mencari id di db
        const users = await User.findOne({
            where:{
                id: req.params.id
            }
        });		  
        
        // Pengkondisian user ditemukan atau tidak
        if (users) {
            res.json({
                'status': 'OK - 200',
                'messages': 'Detail data pengguna',
                'data': users
            });
        } else {
            res.status(404).json({
                'status': 'NOT_FOUND',
                'messages': 'Data not found',
                'data': null 
            });
        }
    } catch (err) {		
        res.status(500).json({
            'status': 'ERROR',
            'messages': 'Internal Server Error'
        })
    }
}

// Menambahkan User
exports.add_user = async (req, res) => {
    const {username, email, password, confPassword, role} = req.body;
    const usernameCheck = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
      //if username exist in the database respond with a status of 409
    if (usernameCheck) {
        return res.status(409).json({ msg : "username already taken"});
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

      //if email exist in the database respond with a status of 409
    if (emailcheck) {
        return res.status(409).json({msg :"Authentication failed"});
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm password tidak valid"})
    const hashPassword = await argon2.hash(password)
    try {
        //membuat data baru di db menggunakan method create
        const users = await User.create({
            username: username,
            email: email,
            password: hashPassword,
            role: role
        });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (users) {
            res.status(201).json({
            'status': 'OK',
            'messages': 'users berhasil ditambahkan',
            'data': users
            });
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

// Mengedit Data user
exports.update_user = async (req, res, nex) =>{
    // mencari id di db
    const user = await User.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    const {username, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm password tidak valid"})

    try {
        //membuat data baru di db menggunakan method create
        const users = await User.update({
            username: username,
            email: email,
            password: hashPassword,
            role: role
        },{
            where: {
                id: user.id
            }
        });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (users) {
            res.status(201).json({
            'status': 'OK',
            'messages': 'users berhasil di update',
            'data': users
            });
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}

// Mengahapus data user
exports.delete_user =  async (req, res) =>{
    // mencari id di db
    const user = await User.findOne({
        where:{
            id: req.params.id
        }
    });		
    if(!user) return res.status(404).json({msg: "User tidak di temukan"});
    try {
        //membuat data baru di db menggunakan method create
        const users = await User.destroy({
            where: {
                id: user.id
            }
        });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (users) {
            res.status(201).json({
            'status': 'OK',
            'messages': 'users berhasil di dihapus',
            'data': users
            });
        }
    } catch(err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message
        });
    }
}