// Library yang di gunakan
const { name } = require('ejs');
const { urlencoded } = require('express');
const { dirname } = require('path');
const { body, validationResult, check } = require('express-validator');
const express = require('express')
const app = express();
var expressLayouts = require('express-ejs-layouts');
const port = 3000;
const fs = require('fs');
const path = require('path')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
var morgan = require('morgan');
const multer = require('multer');

// Memanggil db (buat latihan)
const {user} = require('./models');

// Definisi lokasi route
const routerUser = require('./routes/user')
const routerKat = require('./routes/kategori')
const routerSupp = require('./routes/supplier.js')

// == Konfigurasi==
// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')
// app.use(expressLayouts);
// app.set('layout', 'layouts/layout');    
// app.use(express.urlencoded());
app.use(cookieParser('secret'));
//konfigurasi library session
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'secret',
        name: 'secretName',
        cookie: {
            sameSite: true,
            maxAge: 60000
        },
        secret: 'secret',
    })
);
app.use(flash())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));

// == Untuk Halaman ==
// ==Halaman Login(Belum pakai session) ==
app.use('/login', async (req, res) => {
    
});

// == CRUD user ==
// Menambahkan user/register
app.post('/register', routerUser)
// List semua user
app.get('/list-user', routerUser)
// Detail user sesuai dengan id
app.get('/list-user/detail', routerUser)
// Mengubah/ mengedit user
app.put('/update', routerUser)
// Menghapus user
app.delete('/list-user/delete', routerUser)

// == CRUD kategori ==
// Menambahkan kategori
app.post('/add-kat', routerKat)
// List semua kat
app.get('/list-kat', routerKat)
// Detail kat sesuai dengan id
app.get('/list-kat/detail', routerKat)
// Mengubah/ mengedit kat
app.put('/kategori/update', routerKat)
// Menghapus kat
app.delete('/list-kat/delete', routerKat)

// == CRUD supplier ==
// Menambahkan supplier
app.post('/add-supp', routerSupp)
// List semua supp
app.get('/list-supp', routerSupp)
// Detail supp sesuai dengan id
app.get('/list-supp/detail', routerSupp)
// Mengubah/ mengedit supp
app.put('/supplier/update', routerSupp)
// Menghapus supp
app.delete('/list-supp/delete', routerSupp)

// == CRUD barang ==
// menambahkan barang
app.post(
    "/barang/add",
    // multer({ storage: diskStorage }).single("photo"),
    (req, res) => {
        var file = {name:req.body.name,jumlah:req.body.jumlah,foto:req.file.filename};
        // var data = JSON.parse(JSON.stringify(file))
        // var target_path = 'uploads/' + req.files.recfile.name;
        console.log(file);
    }
);

app.use('/', (req, res) => {
    res.status(404)
    res.send(`page not found`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})