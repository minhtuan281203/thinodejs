const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const bodyParser  = require('body-parser')
const app = express()
const handlers = require('./lib/handlers')
var mysql = require('mysql')

app.engine('handlebars', expressHandlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))
app.get('/', (req, res)=> res.render('home')
)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//
app.post('/process-contact', function(req, res){
    console.log(req.body)
    res.render('thank-you')
})
app.get('/add_new_users', handlers.addnewusers)

/////mysql
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });
connection.connect(function(err){
    if (err) throw err;
    console.log('Conected');
});

app.post('/process-contact', function(req, res){

    var sql = "insert into users values(null,'"+ req.body.fullName +"','"+ req.body.email +"', '"+ req.body.message +"' )"
    connection.query(sql, function (err) {
        if (err) throw err;
        res.render('thank-you', 'data saved successfully')
      });
      connection.end()
})




/////////////////////////////////////
const port  = process.env.PORT || 3000 
app.listen(port, ()=> console.log( `\nnavigate to http:\\localhost:${port}\n`))