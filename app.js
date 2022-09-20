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

// Definisi lokasi route
const routerUser = require('./routes/user')
const routerKat = require('./routes/kategori')
const routerSupp = require('./routes/supplier')
const routerAuth = require('./routes/auth')
const routerBar = require('./routes/barang')

// === Untuk Halaman ===
// == Authentication ==
app.use('/v1/auth/', routerAuth)

// == CRUD user ==
app.use('/v1/user', routerUser)

// == CRUD kategori ==
app.use('/v1/kategori', routerKat)

// == CRUD supplier ==
app.use('/v1/supplier', routerSupp)

// == CRUD barang ==
app.use('/v1/barang', routerBar)

// == Flow ==

// == Kondisi halaman tidak di temukan ==
app.use('/', (req, res) => {
    res.status(404)
    res.send(`page not found`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})