let express = require('express');
let bodyparser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3001;

let pool = new pg.Pool({
    port: 5432,
    password: '',
    database: 'postgres',
    max: 10,
    host: 'localhost',
    user: 'alis'
});

let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded( { extended: true} ));

app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/api/adduser', function(request, response) {
    console.log(request.body);
    const userid = request.body.userid;
    const password = request.body.password;
    const email = request.body.email;

    pool.connect((err, db, done) => {
        if(err) {
            return console.log(err);
        }
        else {
            db.query('INSERT INTO users (userid, password, email) VALUES($1, $2, $3)', [userid, password, email], (err, table) => {
                done();
                if(err) {
                    response.status(400).send({message: 'Error'})
                }
                else {
                    console.log('DATA INSERTED');
                    response.status(201).send({message: 'Inserted'})
                }
            })
        }
    }) 
})

app.post('/api/userverify', function(request, response) {
    console.log(request.body);
    const userid = request.body.userid;
    const password = request.body.password;

    pool.connect((err, db, done) => {
        if(err) {
            return console.log(err);
        }
        else {
            db.query('SELECT userid from users where userid=$1 and password=$2', [userid, password], (err, table) => {
                done();
                if(err) {
                    response.status(400).send({message: 'Error'})
                }
                else {
                    if(table.rows.length == 0)
                        response.status(201).send({message: 'Can not find user'})
                    else    
                        response.status(201).send({message: table.rows[0]['userid']})
                }
            })
        }
    }) 
})

app.listen(PORT, () => console.log('Listen on port ' + PORT));

