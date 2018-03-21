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

app.get( '/be', (req, res) => res.sendFile('login.html', frontend) )

app.get( '/regform', (req, res) => res.sendFile('regform.html', frontend) )

app.get( '/pr', (req, res) => res.send('Próba') )

app.post( '/be', (req, res) => {
    console.log(req.body)
    res.send({})
})

app.listen(3001)
