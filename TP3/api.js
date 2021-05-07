"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mysql = require('mysql');
var bodyParser = require('body-parser');
var CronJob = require('cron').CronJob;
var http = require("http");
var cluster = require('cluster');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "password",
    database: "Cine"
});
//const verificacionVigente = new CronJob('0 */5 * * * *', function(){
//      pool.query(`update funciones set vigente=0 where fecha BETWEEN now() and (date_add(now(),interval 5 minute)) && vigente=1`)
//});
//verificacionVigente.start();
if (cluster.isWorker) {
    process.on('message', function (bodyReserva) {
        pool.query("select butacas_disponibles from funciones where id=1", function (error, results) {
            if (error) {
                throw error;
            }
            console.log(results);
            console.log("a");
        });
        pool.getConnection(function (error1, conn) {
            if (error1) {
                throw error1;
            }
            conn.beginTransaction(function (error2) {
                if (error2) {
                    throw error2;
                }
                //Supongo que aparte me dan el id de la funcion
                //Disponibilidad de butacas
                //Generar reserva
                //Si se llena la funcion, marcar como no diponible
                var idUsuario = bodyReserva.user_id;
                var idFuncion = bodyReserva.funcion_id;
                var butacas = bodyReserva.butacas.replace(/"/g, "").replace("]", "").replace("[", "").replace(/ /g, "");
                var arrayButacas = butacas.split(",");
                console.log(arrayButacas);
                if (arrayButacas.length >= 6) {
                    process.kill(process.pid);
                }
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
else {
    var port_1 = 3305;
    var cluster_1 = require('cluster');
    var bodyParser_1 = require('body-parser');
    var express = require('express');
    var app = express();
    var server = http.createServer(app);
    app.use(express.json());
    app.use(bodyParser_1.urlencoded({ extended: true }));
    app.get('/funciones', function (req, res) {
        pool.query("select * from funciones where vigente = 1", function (error, results) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (error)
                    throw error;
                res.send(results);
                return [2 /*return*/];
            });
        }); });
    });
    app.post('/reservar', function (req, res) {
        var worker = cluster_1.fork();
        worker.send(req.body);
        worker.on('message', function (result) {
            res.status(200).send(result);
        });
    });
    app.listen(port_1, function () {
        console.log("App listening at http://localhost:" + port_1);
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
