"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Compra = exports.TablaSQL = void 0;
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alumnoipm",
    database: "e_commerce",
    port: "3306"
});
connection.connect();
var TablaSQL = /** @class */ (function () {
    function TablaSQL() {
        this.query = "";
    }
    TablaSQL.find = function (id) { };
    return TablaSQL;
}());
exports.TablaSQL = TablaSQL;
var Compra = /** @class */ (function (_super) {
    __extends(Compra, _super);
    function Compra(id, id_usuario, id_producto, cantidad, fecha, comprador_calificado, vendedor_calificado) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.id_usuario = id_usuario;
        _this.id_producto = id_producto;
        _this.cantidad = cantidad;
        _this.fecha = fecha;
        _this.comprador_calificado = comprador_calificado;
        _this.vendedor_calificado = vendedor_calificado;
        return _this;
    }
    Compra.find = function (id) {
        connection.query("select * from compras where id=" + id, function (error, results) {
            var compraJson = results[0];
            var compra = new Compra(compraJson.id, compraJson.id_usuario, compraJson.id_producto, compraJson.cantidad, "a", compraJson.comprador_calificado, compraJson.vendedor_calificado);
            console.log(compra);
        });
        setTimeout(function () { return compra; }, 1000);
    };
    return Compra;
}(TablaSQL));
exports.Compra = Compra;
var compra = Compra.find(1);
setTimeout(function () {
    console.log(compra);
    console.log(compra.id);
}, 2000);
/*
export class Favorito extends TablaSQL {
  public id: number;
  public id_usuario: number;
  public id_producto: number;

  constructor(id: number, id_usuario: number, id_producto: number) {
    super();
    this.id = id;
    this.id_usuario = id_usuario;
    this.id_producto = id_producto;
  }
}

export class Producto extends TablaSQL {
  public id: number;
  public vendedor: number;
  public nombre: string;
  public precio: number;
  public stock: number;
  public usado: boolean;

  constructor(
    id: number,
    vendedor: number,
    nombre: string,
    precio: number,
    stock: number,
    usado: boolean
  ) {
    super();
    this.id = id;
    this.vendedor = vendedor;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.usado = usado;
  }
}

export class Usuario extends TablaSQL {
  public id: number;
  public username: string;
  public saldo: number;
  public calificacion_vendedor: number;
  public calificacion_comprador: number;

  constructor(
    id: number,
    username: string,
    saldo: number,
    calificacion_vendedor: number,
    calificacion_comprador: number
  ) {
    super();
    this.id = id;
    this.username = username;
    this.saldo = saldo;
    this.calificacion_vendedor = calificacion_vendedor;
    this.calificacion_comprador = calificacion_comprador;
  }
}

export class CalificacionesVendedor extends TablaSQL {
  public id: number;
  public id_vendedor: number;
  public id_comprador: number;
  public calificacion: number;
  public fecha: Date;

  constructor(
    id: number,
    id_vendedor: number,
    id_comprador: number,
    calificacion: number,
    fecha: Date
  ) {
    super();
    this.id = id;
    this.id_vendedor = id_vendedor;
    this.id_comprador = id_comprador;
    this.calificacion = calificacion;
    this.fecha = fecha;
  }
}

export class CalificacionesComprador extends TablaSQL {
  public id: number;
  public id_comprador: number;
  public id_vendedor: number;
  public calificacion: number;
  public fecha: string;

  constructor(
    id: number,
    id_comprador: number,
    id_vendedor: number,
    calificacion: number,
    fecha: string
  ) {
    super();
    this.id = id;
    this.id_comprador = id_comprador;
    this.id_vendedor = id_vendedor;
    this.calificacion = calificacion;
    this.fecha = fecha;
  }

    public static find(id: number): any {
    connection.query(
        `select * from usuarios where id=${id}`,
        function (error, results) {
            console.log(results[0].username);
            return new Compra(compraJson.id, compraJson.id, compraJson.id, compraJson.id, compraJson.id, compraJson.id, compraJson.id);
        }
      );
  }
    }
}
*/ 
