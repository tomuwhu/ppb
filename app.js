var dbname="spny", //database name spny (collections --> csapats)
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

app.get( '/backend/esrogzurlap', (req, res) => res.sendFile('esrogz.html', frontend) )

var Csapat = mongoose.model('csapat', {
    nev:         {type: String, trim:true},
    jatekosok:   [{
        mezszam: Number,
        nev: {type: String, trim:true}
    }]
})
app.post( '/backend/csapatment', (req, res) => {
    if (req.body._id) {
      Csapat.findById(req.body._id)
            .update({
              nev:  req.body.nev,
              jatekosok: req.body.jatekosok
            })
            .exec((err,cucc) => {
              res.send({ok: 2})
            } )
    } else {
      var ujcsapat = new Csapat(req.body)
      ujcsapat.save()
      res.send({ok: 1})
    }
} )

app.post( '/backend/csapatok', (req, res) => {
    Csapat
        .find({ nev: new RegExp('^.*'+req.body.csnsz+'.*$', "i") } )
        .sort({ nev: -1})
        .limit(10)
        .exec((err,arr) => {
            res.send({csapatok: arr})
        } )
} )

app.listen(3001)
