"use strict";
exports.__esModule = true;
var clases_1 = require("./clases");
var IPMStreaming = new clases_1.Sistema();
// Usuario de Argentina
var mi_usuario = new clases_1.Usuario("Pepe", clases_1.Region.AR);
IPMStreaming.agregarUsuario(mi_usuario);
// Usuario de Chile
var otro_usuario = new clases_1.Usuario("Juan", clases_1.Region.CH);
IPMStreaming.agregarUsuario(otro_usuario);
// Pelicula de 140 minutos disponible para Chile
var una_peli = new clases_1.Pelicula("Lord of the computers");
una_peli.setContenido(new clases_1.Contenido(140));
una_peli.agregarRegion(clases_1.Region.CH);
IPMStreaming.agregarTitulo(una_peli);
// Serie de 3 capitulos disponible para Argentina
var una_serie = new clases_1.Serie("The Programmer");
una_serie.agregarCapitulo(new clases_1.Contenido(54)); // Capitulo 0 de 54 minutos.
una_serie.agregarCapitulo(new clases_1.Contenido(47)); // Capitulo 1 de 47 minutos.
una_serie.agregarCapitulo(new clases_1.Contenido(50)); // Capitulo 2 de 50 minutos.
una_serie.agregarRegion(clases_1.Region.AR);
IPMStreaming.agregarTitulo(una_serie);
// Pruebas para la pelicula
if (mi_usuario.ver(una_peli, 140))
    console.log("Pepe no debería poder ver esa pelicula");
if (!otro_usuario.ver(una_peli, 100))
    console.log("Juan debería poder ver esa pelicula");
if (!otro_usuario.viendo(una_peli))
    console.log("Juan todavía está viendo la peli");
if (!otro_usuario.ver(una_peli, 40))
    console.log("Juan debería poder retomar la pelicula");
if (otro_usuario.viendo(una_peli))
    console.log("Juan ya terminó la peli");
if (!otro_usuario.visto(una_peli))
    console.log("Juan vió la peli");
// Pruebas para la serie
if (!mi_usuario.ver(una_serie, 20))
    console.log("Pepe debería poder ver esa serie");
if (mi_usuario.capituloActual(una_serie) != 0)
    console.log("Pepe está en el capitulo 0");
if (!mi_usuario.ver(una_serie, 40))
    console.log("Pepe debería poder ver esa serie");
if (mi_usuario.capituloActual(una_serie) != 1)
    console.log("Pepe está en el capitulo 1");
if (!mi_usuario.ver(una_serie, 40))
    console.log("Pepe debería poder ver esa serie");
if (mi_usuario.capituloActual(una_serie) != 1)
    console.log("a Pepe le queda un minuto del capitulo 1");
if (!mi_usuario.ver(una_serie, 1))
    console.log("Pepe debería poder ver esa serie");
if (mi_usuario.capituloActual(una_serie) != 2)
    console.log("Pepe está en el capitulo 2");
if (!mi_usuario.ver(una_serie, 45))
    console.log("Pepe debería poder ver esa serie");
if (!mi_usuario.viendo(una_serie))
    console.log("Pepe todavía está viendo la serie");
if (mi_usuario.visto(una_serie))
    console.log("Pepe todavía no terminó la serie");
if (!mi_usuario.ver(una_serie, 5))
    console.log("Pepe debería poder ver esa serie");
if (mi_usuario.viendo(una_serie))
    console.log("Pepe ya dejó de ver la serie");
if (!mi_usuario.visto(una_serie))
    console.log("Pepe vió la serie");
