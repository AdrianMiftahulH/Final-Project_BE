// Library yang di gunakan
const express = require('express')
const app = express();
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
var morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

// == Konfigurasi==
// Configurasi dan gunakan library
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json())

// const sessionStore = SequelizeStore(session.Store);

// const store = new sessionStore({
//     db: db
// })

//konfigurasi library session
app.use(
    session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
        // store: store,
        cookie: {
            secure: 'auto',
        },
        secret: 'secret',
    })
);

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(cookieParser('secret'));
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
const routerFlow = require('./routes/flow')

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
app.use('/v1/flow', routerFlow)

// == Kondisi halaman tidak di temukan ==
app.use('/', (req, res) => {
    res.status(404)
    res.send(`page not found`)
})

app.listen(process.env.APP_PORT, () => console.log(`Api Running in Port ${process.env.APP_PORT}`))