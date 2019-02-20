// DEPENDENCIES //

const express = require('express')
      , bodyParser = require('body-parser')
      , massive = require('massive')
      , session = require('express-session')
      , cors = require('cors')
      , server_config = require('../server_config')
      , path = require('path')

// INITIALIZE //

const app = module.exports = express();
app.use(express.static('.././build'))
app.use(bodyParser.json())
app.use(session({
  secret: server_config.SECRET
}))
app.use(cors())

const massiveUri = server_config.MASSIVE_URI;

massive( massiveUri ).then( dbInstance => {
  app.set('db', dbInstance)
}).catch( err => console.log(err) );

// CONTROLLERS

const leadsCtrl = require('./controllers/leadsCtrl')

// POST //

app.post('/api/leads', leadsCtrl.addLead)

// GET //

app.get('/api/leads', leadsCtrl.getAllLeads)

// LISTEN/PORT //

app.get('*', function (request, response){
    response.sendFile(path.join(__dirname, '.././build/', 'index.html'))
})

const port = 80

app.listen(port, () => {
  console.log("Started server on port", port)
});