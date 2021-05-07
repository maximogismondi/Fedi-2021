const express = require('express');

const mysql = require('mysql');
const app = express();
const port:number = 3000;
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'alumnoipm',
  database : 'e_commerce',
  port:"3306"
});
 
app.get('/usuarios/:id_usuario/fav', (req, res) => {
    
    connection.connect((err) =>{
      if(err){
        throw err;
      } else{
        console.log('conected');
      }
    });
    console.log(req.params.id_usuario);

    connection.query(`select nombre from productos join favoritos on favoritos.id_producto=productos.id where id_usuario=${req.params.id_usuario}`, function (error, results, fields) {
    if (error) throw error;
      Object.keys(results).forEach(function(key) {
        console.log(results[key].nombre);
      });
    });
    
    connection.end();

    res.send('Hello World!')
  })

app.post('/usuarios/:id_usuario/fav/:id_producto', (req, res) => {
  
  connection.connect((err) =>{
    if(err){
      throw err;
    } else{
      console.log('conected');
    }
  });
  
  connection.query(`insert into favoritos values(null,${req.params.id_usuario},${req.params.id_producto})`, function (error, results){
    if(error) throw error;
    results.send('Insertado con exito!');
  });

})

app.delete('/usuarios/:id_usuario/fav/:id_producto', (req,res) => {

  connection.connect((err) =>{
    if(err){
      throw err;
    } else{
      console.log('conected');
    }
  });

  connection.query(`delete from favoritos where id_usuario = ${req.params.id_usuario} and id_producto = ${req.params.id_producto}`,function (error, results){
    if(error) throw error;
    results.send('Eliminado con exito!');
  });

})

app.get('/usuarios/:id_usuario/compras', (req,res) =>{

    connection.connect((err) =>{
      if(err){
        throw err;
      } else{
        console.log('conected');
      }
    });

    connection.query(`select * from compras where id_usuario = ${req.params.id_usuario}`,function (error, results){
      if(error) throw error;
      if(results.lenght>0){
        res.json(results);  //en teoria pasa los resultados de la query a json
      }
      else{
        res.send('No hay compras para ese usuario.')
      }
      results.send('Eliminado con exito!');
    });
})
  
app.post('/usuarios/:id_usuario/compras/:id_producto/:cantidad', (req,res) =>{

  let fechaActual:Date = new Date();

  connection.connect((err) =>{
    if(err){
      throw err;
    } else{
      console.log('conected');
    }
  });

  connection.query(`insert into compras values(null,${req.params.id_usuario},${req.params.id_producto},${req.params.cantidad},${fechaActual},0,0)`,function (error, results){
    if(error) throw error;
    results.send('Eliminado con exito!');
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})