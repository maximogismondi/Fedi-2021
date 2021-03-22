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
exports.Sistema = exports.Usuario = exports.Serie = exports.Pelicula = exports.Titulo = exports.Contenido = exports.Region = void 0;
var Region;
(function (Region) {
    Region[Region["AR"] = 0] = "AR";
    Region[Region["BR"] = 1] = "BR";
    Region[Region["CH"] = 2] = "CH";
})(Region = exports.Region || (exports.Region = {}));
var Contenido = /** @class */ (function () {
    function Contenido(duracion) {
        this.duracion = duracion;
        this.fechaCreacion = new Date();
    }
    Contenido.prototype.getDate = function () {
        return this.fechaCreacion;
    };
    Contenido.prototype.getDuracion = function () {
        return this.duracion;
    };
    return Contenido;
}());
exports.Contenido = Contenido;
var Titulo = /** @class */ (function () {
    function Titulo(titulo) {
        this.titulo = titulo;
        this.regionesDisponibles = new Array();
    }
    Titulo.prototype.getTitulo = function () {
        return this.titulo;
    };
    Titulo.prototype.setTitulo = function (nuevo) {
        this.titulo = nuevo;
    };
    Titulo.prototype.disponible = function (region) {
        for (var _i = 0, _a = this.regionesDisponibles; _i < _a.length; _i++) {
            var regionDisponible = _a[_i];
            if (regionDisponible == region) {
                return true;
            }
        }
        return false;
    };
    Titulo.prototype.agregarRegion = function (region) {
        for (var _i = 0, _a = this.regionesDisponibles; _i < _a.length; _i++) {
            var regionDisponible = _a[_i];
            if (regionDisponible == region)
                return;
        }
        this.regionesDisponibles.push(region);
    };
    Titulo.prototype.quitarRegion = function (region) {
        var _this = this;
        this.regionesDisponibles.forEach(function (regionesDisponible) {
            if (regionesDisponible == region) {
                _this.regionesDisponibles = _this.regionesDisponibles.splice(_this.regionesDisponibles.indexOf(region), 1);
            }
        });
    };
    return Titulo;
}());
exports.Titulo = Titulo;
var Pelicula = /** @class */ (function (_super) {
    __extends(Pelicula, _super);
    function Pelicula(titulo) {
        return _super.call(this, titulo) || this;
    }
    Pelicula.prototype.getContenido = function () {
        return this.contenido;
    };
    Pelicula.prototype.setContenido = function (contenido) {
        this.contenido = contenido;
    };
    return Pelicula;
}(Titulo));
exports.Pelicula = Pelicula;
var Serie = /** @class */ (function (_super) {
    __extends(Serie, _super);
    function Serie(titulo) {
        var _this = _super.call(this, titulo) || this;
        _this.capitulos = new Array();
        return _this;
    }
    Serie.prototype.agregarCapitulo = function (capitulo) {
        this.capitulos.push(capitulo);
    };
    Serie.prototype.obtenerCapitulo = function (capitulo) {
        return this.capitulos[capitulo];
    };
    Serie.prototype.cantidadDeCapitulos = function () {
        return this.capitulos.length;
    };
    Serie.prototype.primerCapitulo = function () {
        return this.capitulos[0];
    };
    Serie.prototype.duracionTotal = function () {
        var duracionTotal = 0;
        this.capitulos.forEach(function (capitulo) {
            duracionTotal += capitulo.getDuracion();
        });
        return duracionTotal;
    };
    return Serie;
}(Titulo));
exports.Serie = Serie;
var Usuario = /** @class */ (function () {
    function Usuario(username, region) {
        this.reproduccion = new Map();
        this.username = username;
        this.region = region;
    }
    Usuario.prototype.getUsername = function () {
        return this.username;
    };
    Usuario.prototype.getRegion = function () {
        return this.region;
    };
    Usuario.prototype.visto = function (titulo) {
        if (this.reproduccion.has(titulo)) {
            var value = this.reproduccion.get(titulo);
            if (titulo instanceof Pelicula) {
                if (value[0] == titulo.getContenido().getDuracion()) {
                    return true;
                }
                return false;
            }
            else if (titulo instanceof Serie) {
                if (value[1] >= titulo.cantidadDeCapitulos()) {
                    return true;
                }
                return false;
            }
        }
        return false;
    };
    Usuario.prototype.viendo = function (titulo) {
        var tiempoVisto = 0;
        if (this.reproduccion.has(titulo)) {
            var value = this.reproduccion.get(titulo);
            tiempoVisto = value[0];
        }
        if (titulo instanceof Pelicula) {
            if (tiempoVisto < titulo.getContenido().getDuracion() &&
                tiempoVisto > 0) {
                return true;
            }
        }
        else if (titulo instanceof Serie) {
            if (tiempoVisto < titulo.duracionTotal() && tiempoVisto > 0) {
                return true;
            }
        }
        return false;
    };
    Usuario.prototype.capituloActual = function (serie) {
        if (serie instanceof Serie) {
            if (this.visto(serie)) {
                return serie.cantidadDeCapitulos() - 1;
            }
            if (this.reproduccion.has(serie)) {
                return this.reproduccion.get(serie)[1];
            }
            return 0;
        }
    };
    Usuario.prototype.ver = function (titulo, tiempo_visualizado) {
        if (titulo.disponible(this.region)) {
            if (this.reproduccion.has(titulo)) {
                var value = this.reproduccion.get(titulo);
                this.reproduccion.set(titulo, [
                    value[0] + tiempo_visualizado,
                    value[1],
                ]);
                value[0] += tiempo_visualizado;
                if (titulo instanceof Serie) {
                    while (titulo.cantidadDeCapitulos() > value[1] &&
                        titulo.obtenerCapitulo(value[1]).getDuracion() <= value[0]) {
                        this.reproduccion.set(titulo, [
                            value[0] - titulo.obtenerCapitulo(value[1]).getDuracion(),
                            value[1] + 1,
                        ]);
                        value[0] -= titulo.obtenerCapitulo(value[1]).getDuracion();
                        value[1] += 1;
                    }
                }
                return true;
            }
            this.reproduccion.set(titulo, [tiempo_visualizado, 0]);
            return true;
        }
        return false;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
var Sistema = /** @class */ (function () {
    function Sistema() {
        this.usuarios = new Array();
        this.titulos = new Array();
    }
    Sistema.prototype.agregarUsuario = function (usuario) {
        for (var _i = 0, _a = this.usuarios; _i < _a.length; _i++) {
            var usuarioI = _a[_i];
            if (usuarioI.getUsername == usuario.getUsername) {
                return false;
            }
        }
        this.usuarios.push(usuario);
        return true;
    };
    Sistema.prototype.agregarTitulo = function (titulo) {
        this.titulos.push(titulo);
    };
    Sistema.prototype.buscarUsuario = function (nombre) {
        for (var _i = 0, _a = this.usuarios; _i < _a.length; _i++) {
            var usuario = _a[_i];
            if (usuario.getUsername() == nombre) {
                return usuario;
            }
        }
        return new Usuario("null", Region.AR);
    };
    Sistema.prototype.buscarTitulo = function (nombre) {
        var titulosResultantes = new Array();
        this.titulos.forEach(function (titulo) {
            if (nombre == titulo.getTitulo()) {
                titulosResultantes.push(titulo);
            }
        });
        return titulosResultantes;
    };
    return Sistema;
}());
exports.Sistema = Sistema;
