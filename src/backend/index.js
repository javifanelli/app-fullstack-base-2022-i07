//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');
var mysql = require ('mysql');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.get('/devices/', function(req, res, next) {
    /*devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 0, // Inicializa los dispositivos apagados
            'type': 1, // Tipo 1 son ON-OFF
        },
        { 
            'id': 2, 
            'name': 'Cortina 1', 
            'description': 'Cortina habitación', 
            'state': 0, // Inicializa los dispositivos apagados, los valores van de 0 a 100 con saltos de 20
            'type': 2, // Tipo 2 son 0%-100%
        },
    ]*/
    mysql.query('SELECT * FROM smart_home.Devices', function(err, devices, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        //res.send(rta);
    })
    setTimeout(()=>{
        res.send(JSON.stringify(devices)).status(200);
    },2000);

});

/*app.post('/devicesChange/', function (req, res, next) {
    devices.id[1].state=1;
})*/

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
