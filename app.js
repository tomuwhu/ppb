var dbname="ma_febr13", //database name (collections --> ?)
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
app.get( '/backend/:id', (req, res) => {
    switch(req.params.id) {
    case '0':
        res.sendFile('ujkonyv.html', frontend)
        break
    case '1':
        res.send('Szevasz tavasz')
        break
    case '7':
        res.sendFile('file7.html', frontend)
        break
    default:
        res.send('Hiba: nincs ilyen tartalom!')
    }
})
var Konyv = mongoose.model('konyv', {
  cim:    {type: String, trim:true},
  szerzo: {type: String, trim:true},
  kiado:  {type: String, trim:true},
  mufaj:  {type: String, trim:true},
  holvan: {type: String, trim:true},
  evszam: {type: Number}
})
app.post( '/ujkonyv', (req,res) => {
    var ujkonyv = new Konyv( req.body )
    ujkonyv.save()
    res.send({ok: 1})
} )
app.post( '/keres', (req,res) => {
    Konyv
        .find({
            $or: [
                { cim: new RegExp('^.*'+req.body.mitkeres+'.*$', "i") },
                { szerzo: new RegExp('^.*'+req.body.mitkeres+'.*$', "i") },
                { mufaj: new RegExp('^.*'+req.body.mitkeres+'.*$', "i") }
            ]
        })
        .sort({cim: -1})
        .limit(15)
        .exec((err,arr) => {
            res.send({konyvek: arr})
        } )
} )
app.listen(3001)
