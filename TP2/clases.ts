var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "alumnoipm",
  database: "e_commerce",
  port: "3306",
});
connection.connect();

export abstract class TablaSQL {
  public query: string;

  constructor() {
    this.query = "";
  }

  
  public static find(id: number) {}

  //save - update id = id
  //where - agrega una sentencia where al query
  //orderby - agrega una sentencia orderby al query
  //get - ejecuta el query
}

export class Compra extends TablaSQL {
  public id: number;
  public id_usuario: number;
  public id_producto: number;
  public cantidad: number;
  public fecha: string;
  public comprador_calificado: boolean;
  public vendedor_calificado: boolean;

  constructor(
    id: number, 
    id_usuario: number, 
    id_producto: number, 
    cantidad: number, 
    fecha: string, 
    comprador_calificado: boolean, 
    vendedor_calificado: boolean
) {
    super()
    this.id = id
    this.id_usuario = id_usuario
    this.id_producto = id_producto
    this.cantidad = cantidad
    this.fecha = fecha
    this.comprador_calificado = comprador_calificado
    this.vendedor_calificado = vendedor_calificado
  }

  public static find(id: number): any {
    connection.query(
      `select * from compras where id=${id}`,
      function (error, results) {
        let compraJson = results[0];
        var compra: Compra = new Compra(compraJson.id, compraJson.id_usuario, compraJson.id_producto, compraJson.cantidad, "a", compraJson.comprador_calificado, compraJson.vendedor_calificado);
        console.log(compra);
      }      
    );
    setTimeout(function(){return compra},1000);
  }
}

var compra: Compra = Compra.find(1);

setTimeout(function(){console.log(compra);
console.log(compra.id);},2000);

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