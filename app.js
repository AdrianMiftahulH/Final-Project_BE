// Library yang di gunakan
const express = require('express')
const app = express();
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path')
const bodyParser = require('body-parser');
const flash = require('connect-flash');
var morgan = require('morgan');
const multer = require('multer');
const dotenv = require('dotenv');
var fs = require('fs') 
dotenv.config();

// Tempat menyimpan image
const fileStorage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

// filter type gambar yang di upload
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
// app.use(express.bodyParser({limit: '50mb'}));
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('photo'))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: 'Content-Type, Authorization'
}));

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb',extended: true }))
app.use(cookieParser());
app.use(flash())

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(morgan((tokens, req, res) => {
        return [
            tokens['date'](req, res),
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens['response-time'](req, res), 'ms'
        ].join(' ')
    },
    {
        stream: accessLogStream
    }
));


// Definisi lokasi route
const routerUser = require('./routes/user')
const routerCate = require('./routes/category')
const routerSupp = require('./routes/supplier')
const routerDist = require('./routes/distributor')
const routerAuth = require('./routes/auth')
const routerPro = require('./routes/product')
const routerTrans = require('./routes/transaction')

// === Untuk Halaman ===
// == Authentication ==
app.use('/v1/auth/', routerAuth)

// == CRUD user ==
app.use('/v1/user', routerUser)

// == CRUD kategori ==
app.use('/v1/category', routerCate)

// == CRUD supplier ==
app.use('/v1/supplier', routerSupp)

// == CRUD distributor
app.use('/v1/distributor', routerDist)

// == CRUD barang ==
app.use('/v1/product', routerPro)

// == CRUD Transaction ==
app.use('/v1/transaction', routerTrans)

// == Kondisi halaman tidak di temukan ==
app.use('/', (req, res) => {
    res.status(404)
    res.send(`page not found`)
})

app.listen(process.env.APP_PORT, () => console.log(`Api Running in Port ${process.env.APP_PORT}`))