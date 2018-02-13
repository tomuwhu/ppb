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

var üzenet_a_szerverről = `Heló világ`

app.get( '/', (req, res) => res.sendFile('index.html', frontend) )
app.get( '/backend', (req, res) => res.sendFile('main.html', frontend) )
app.get( '/backend/:id', (req, res) => {
    if (req.params.id == 2) res.sendFile('main.html', frontend)
    else res.send(`
        <div class="w3-center">
          <br><i>Péda back-end templating:</i> <b>${req.params.id}</b><br>
          <i>${üzenet_a_szerverről}!</i><br>
          <br><hr>
          Front-end templating:<br><br>
          <input type='range' min=1 max=20 ng-model='x' />
          <br><hr>{{x-1}} - {{x}} - {{x-1+2}}<br><hr>
          <div ng-include="'/incl'"></div>
          Kiválasztott menüpont (vegyes templating):
          <b>{{menu[${req.params.id}]}}</b>
          <br><hr><br>
        </div>
    `)
})
app.get( '/incl', (req, res) => {
    szerverről = "Ez"
    res.send(`
        <b>${szerverről} megy.</b>
    `)
})
app.listen(3001)
