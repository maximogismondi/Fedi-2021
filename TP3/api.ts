const mysql = require('mysql');
const bodyParser = require('body-parser');
var CronJob = require('cron').CronJob;
import * as http from 'http';
import * as bodyparser from 'body-parser';    

const cluster = require('cluster');

const pool = mysql.createPool({    //si van a haber procesos paralelos hay q usar pool
    connectionLimit: 10,   //max de hilos  
    host: "localhost",
    user: "root",
    password: "password",
    database: "Cine",
});

//const verificacionVigente = new CronJob('0 */5 * * * *', function(){
//      pool.query(`update funciones set vigente=0 where fecha BETWEEN now() and (date_add(now(),interval 5 minute)) && vigente=1`)
//});
//verificacionVigente.start();

if(cluster.isWorker){
    
    process.on('message', (bodyReserva) => {

        pool.query // pool.getConnection conn.query conn.release()
        
        pool.getConnection(function(error1, conn) {
            if (error1) {
                throw error1;
            }
            conn.beginTransaction((error2) => {
                if (error2) {throw error2}
                //Supongo que aparte me dan el id de la funcion
                //Disponibilidad de butacas
                //Generar reserva
                //Si se llena la funcion, marcar como no diponible

                let idUsuario:number = bodyReserva.user_id;
                let idFuncion:number = bodyReserva.funcion_id;

                let butacas:string = bodyReserva.butacas.replace(/"/g,"").replace("]","").replace("[","").replace(/ /g,"");
                let arrayButacas:Array <String> = butacas.split(",");                                
                console.log(arrayButacas);
                
                if (arrayButacas.length >= 6){
                    process.kill(process.pid);    
                }
                
                conn.query(`select butacas_disponibles from funciones where id=1`, (error,results) => {
                    if(error){
                        throw error;
                    }
                    console.log(results);
                });

                conn.commit();
                conn.release();
                process.kill(process.pid);
                /*conn.query(`select vigente from funciones where id=${idFuncion}`, (error,results) =>{
                    if (results) {
                        conn.query(`select count(id) from reservas where usuario=${idUsuario} and funcion=${idFuncion}`, (error,results) =>{
                            if(results==0) {
                                    
                            }
                        })
                    }
                })*/
                /*conn.query("", (error3, results) =>{
                    if (error3) {
                        return conn.rollback(() => {throw error3})
                    }
                    conn.commit((error4) =>{
                        if (error4){
                            return conn.rollback(()=>{
                                throw error4
                            })
                        }
                    })
                    res.send("Insertado con exito");
                })*/
            });            
        });
    });
}
else{

    const port:number = 3305; 
    const cluster = require('cluster');
    const bodyParser = require('body-parser');

    var express = require('express');
    var app = express();
    const server: http.Server = http.createServer(app);
  
    app.use(express.json());
    
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/funciones',(req,res) =>{
        pool.query(`select * from funciones where vigente = 1`, async (error,results) =>{
            if(error) throw error;
            res.send(results);
        });
    })
    
    
    app.post('/reservar', (req,res) =>{
        const worker = cluster.fork();
        
        worker.send(req.body);
        worker.on('message', (result) => {
            res.status(200).send(result);
        });
        
    });    
    
    
    app.listen(port, () =>{
        console.log(`App listening at http://localhost:${port}`)
    });

    /*
    app.post('/cancelar_reserva', (req,res) =>{
        let user_id:number=req.query.user_id; 
        let id_reserva:number=req.query.id_reserva
        pool.query(`select butacas_reservadas from reservas inner join funciones on reservas.funcion=funciones.id where reservas.id=${id_reserva} && (date_add(now(),interval 1 hour))<funciones.fecha`, async (error,results) =>{
        if(error) throw error;
        else if (results.length > 0){
            String butacasReservaCancelada = results;

            pool.query(`SELECT butacas_disponibles FROM funciones inner join reservas on funciones.id=reservas.funcion WHERE reservas.id=${id_reserva}`, async (error2,results2) =>{
                
                if(error2) throw error;
                
                else{
                    String butacasDisponiblesFuncion = results2;
                    int largoCadena = butacasReservaCancelada.length()-1; //cant butacas que se habian reservado
                    int largoCadena2 = butacasDisponiblesFuncion.length()-1; //cant butacas todavia disponibles
                    butacasReservaCancelada = butacasReservaCancelada.slice(1,largoCadena);
                    if(butacasDisponiblesFuncion>1){
                        butacasReservaCancelada = , + butacasReservaCancelada;
                    }

                    
                    butacasDisponiblesFuncion = butacasDisponiblesFuncion.slice(0,largoCadena2-1);
                    
                }
            
            });
            
        }
        else{res.send("El lapso para cancelar la reserva termino o la reserva no exite.")}
        });

    })
*/
}