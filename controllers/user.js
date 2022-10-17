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
                'messages': 'List All User Data',
                'data': users
            });
        } else {
            res.json({
                'status': 'EMPTY',
                'messages': 'User Data Not Found',
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
exports.detail_user = async (req, res) => {
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
                'messages': 'Detail User Data',
                'data': users
            });
        } else {
            res.status(404).json({
                'status': 'NOT_FOUND',
                'messages': 'User Data Not Found',
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

    // mencari username di db sesuai dengan req username
    const usernameCheck = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    //jika username req sama dengan username di db
    if (usernameCheck) {
        return res.status(409).json({ msg : "Username Already Taken"});
    }

    // mencari email di db sesuai dengan req email
    const emailcheck = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    //jika email req sama dengan email di db
    if (emailcheck) {
        return res.status(409).json({msg :"Authentication Failed"});
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm password invalid"})
    const hashPassword = await argon2.hash(password)
    try {
        //membuat data baru di db menggunakan method create
        const users = await User.create({
            username: username,
            email: email,
            password: hashPassword,
            role: role,
        });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (users) {
            res.status(201).json({
                'status': 'OK',
                'messages': 'User Has Been Added',
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
    if(!user) return res.status(404).json({msg: "User Data Not Found"});
    const {username, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm password Not Valid"})

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
            'messages': 'User Data Has Been Successfully Updated',
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
    if(!user) return res.status(404).json({msg: "User Data Not Found  "});
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
            'messages': 'User Data Has Been Successfully Deleted',
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