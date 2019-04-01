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

massive({
  host: server_config.HOST,
  port: 5432,
  database: server_config.DATABASE,
  user: server_config.USER,
  password: server_config.PASSWORD,
  ssl: false,
  poolSize: 10
}).then( dbInstance => {
  app.set('db', dbInstance)
}).catch( err => console.log(err) );

// CONTROLLERS //

const leadsCtrl = require('./controllers/leadsCtrl')
const salesLeadsCtrl = require('./controllers/salesLeadsCtrl')

// POST //

app.post('/api/leads', leadsCtrl.addLead)
app.post('/api/sales-leads', salesLeadsCtrl.addLeadForSales)

// GET //

app.get('/api/leads/:time_period_start/:time_period_end', leadsCtrl.getAllLeads)
app.get('/api/leads/:time_period_start/:time_period_end/:am_email', leadsCtrl.getLeadsByAm)
app.get('/api/sales-leads', salesLeadsCtrl.getLeadsForSales)
app.get('/api/sales-leads/:assigned_sales_rep', salesLeadsCtrl.getLeadsForSalesByRep)


// DELETE //
app.delete('/api/leads/:id', leadsCtrl.deleteLeadAmManagement)
app.delete('/api/sales-leads/:id', salesLeadsCtrl.deleteLead)

// LISTEN/PORT //

app.get('*', function (request, response){
    response.sendFile(path.join(__dirname, '.././build/', 'index.html'))
})

const port = 8080

app.listen(port, () => {
  console.log("Started server on port", port)
});