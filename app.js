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


var Csapat = mongoose.model('csapat', {
  nev:        {type: String, trim:true},
  jatekosok:   [{
      mezszam: Number,
      nev: {type: String, trim:true}
  }]
})

app.post( '/backend/csapatment', (req, res) => {
    console.log(req.body)
    //var ujjcsapat = new 
    res.send({ok: 1})
} )

/*
app.post( '/ujkonyv', (req,res) => {
    if (!req.body._id) {
      var ujkonyv = new Konyv( req.body )
      ujkonyv.save()
      res.send({ok: 1})
    } else {
      Konyv .findById(req.body._id)
            .update({
              cim: req.body.cim,
              szerzo: req.body.szerzo,
              kiado: req.body.kiado,
              mufaj: req.body.mufaj,
              holvan: req.body.holvan,
              evszam: req.body.evszam,
              mikojonvissza: req.body.mikojonvissza,
              evittek: req.body.evittek
            })
            .exec((err,cucc) => {
              res.send({ok: 2})
            } )
    }
} )
app.post( '/keres', (req,res) => {
    Konyv
        .find({
            $or: [
                { cim: new RegExp('^.*'+req.body.mitkeres+'.*$', "i") },
                { szerzo: new RegExp('^.*'+req.body.mitkeres+'.*$', "i") },
                { mufaj: new RegExp('^.*'+req.body.mitkeres+'.*$', "i") },
                { holvan: new RegExp('^.*'+req.body.mitkeres+'.*$', "i") }
            ]
        })
        .sort({cim: -1})
        .limit(15)
        .exec((err,arr) => {
            res.send({konyvek: arr})
        } )
} )
*/

app.listen(3001)
