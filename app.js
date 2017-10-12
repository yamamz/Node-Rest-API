const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql=require('mysql')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

// connect to database
db.connect();
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello world' })
});


app.get('/api/employee', function (req, res) {
    db.query('SELECT * FROM employee', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"response": results}));
    });
});

//Search by Id
app.get('/api/employee/:id', function(req,res){
    let id=req.params.id

    db.query('SELECT * FROM employee WHERE id=?',id,function(error,result,field){

        if(error){
            throw error
        }
        res.send(JSON.stringify({"respond":result}))
    })

})

app.delete('/api/delete/employee/:id',function(req,res){
let id=req.params.id

    db.query('DELETE FROM employee WHERE id=?',id, function(error,results,fields){

if(error){
    throw error
}

res.send(JSON.stringify({ error: false, message: 'Employee has been deleted successfully.' }))
    })
})

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
