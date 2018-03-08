var dbname="ppb", //database name (collections --> ?)
    express = require('express'), bodyParser = require('body-parser'),
    frontend={ root: __dirname+'/frontend' },
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'), app = express()
app .use(bodyParser.json()).use(cookieParser())
    .use(express.static('public')).use(session({
        resave: true, saveUninitialized: true,
        secret: 'ABC123', cookie: { maxAge: 600000 }
    }))
mongoose.connect('mongodb://localhost/'+dbname, { useMongoClient: true })
mongoose.Promise = global.Promise

app.get( '/', (req, res) => res.sendFile('index.html', frontend) )

app.get( '/backend', (req, res) => res.sendFile('main.html', frontend) )

app.get( '/backend/ujcsapat', (req, res) => res.sendFile('csapat.html', frontend) )



app.post( '/backend/csapatment', (req, res) => {
    console.log(req.body)
    res.send({ok: 1})
} )

app.listen(3001)
