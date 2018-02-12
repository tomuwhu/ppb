var dbname="ppb", //database name (collections --> users, subjects, days)
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

var üzenet_a_szerverről = `Heló világ`
// router redirect
app.get( '/', (req, res) => res.sendFile('index.html', frontend) )
app.get( '/backend', (req, res) => res.sendFile('main.html', frontend) )
app.get( '/backend/:id', (req, res) => {
    res.send(`
        <br>
        <div class="w3-center">
          Kiválasztott menüpont:
          <b>{{menu[${req.params.id}]}}</b>
          <br><hr>
          <input ng-model='x' />
          <br><hr>{{x}} {{x}} {{x}}
          <i>${üzenet_a_szerverről}!</i>
          <br><hr><br>
        </div>
    `)
})

app.listen(3000)
