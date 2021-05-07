var express = require('express');
var mysql = require('mysql');
var app = express();
var port = 3000;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alumnoipm',
    database: 'e_commerce',
    port: "3306"
});

app.get('/usuarios/:id_usuario/fav', function (req, res) {
    connection.connect(function (err) {
        if (err) {
            throw err;
        }
        else {
            console.log('conected');
        }
    });
    console.log(req.params.id_usuario);
    connection.query("select nombre from productos join favoritos on favoritos.id_producto=productos.id where id_usuario=" + req.params.id_usuario, function (error, results, fields) {
        if (error)
            throw error;
        Object.keys(results).forEach(function (key) {
            console.log(results[key].nombre);
        });
    });
    connection.end();
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});