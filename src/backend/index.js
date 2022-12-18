//=======[ Settings, Imports & Data ]==========================================
var PORT    = 3000;
var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');
// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.get('/devices/', function(req, res, next) { // Leer los dispositivos del servidor
    utils.query('SELECT * FROM Devices', function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
    res.send(JSON.stringify(rta)).status(200);
    });
});

app.get('/devices/:id', function(req, res, next) { // Consultar de a 1 los dispositivos pasando el id
    utils.query('SELECT * FROM Devices WHERE id = ?',req.params.id,
        function(err, rta, field) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(JSON.stringify(rta)).status(200);
        }
    );
});

app.put('/devices/:id', function(req, res, next) { // Actualizar el dispositivo
    utils.query('UPDATE `Devices` SET `state` = ? WHERE `id` = ?', 
    [req.body.state, req.params.id], function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
    res.send({'changedRows': rta.changedRows}).status(200);
    });
});

app.put('/devices/:id', function(req, res, next) { // Actualizar el dispositivo
    utils.query('UPDATE `Devices` SET `name` = ?, `description` =? , WHERE `id` = ?', 
    [req.body.name, req.body.description, req.params.id], function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
    res.send({'changedRows': rta.changedRows}).status(200);
    });
});

app.delete('/devices/:id', function(req, res, next) { // Borar el dispositivo
    utils.query('DELETE FROM Devices WHERE id = ?',req.params.id,
        function(err, rta, field) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send("deleted").status(200);
        }
    );
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});
