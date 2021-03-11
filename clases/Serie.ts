class Serie extends Titulo {
  capitulos: Array<Contenido>;

  constructor(titulo: string) {
    super(titulo);
    this.capitulos = new Array<Contenido>();
  }

  obtenerCapitulo(capitulo: number): Contenido {
    return this.capitulos[capitulo];
  }

  cantidadDeCapitulos(): number {
    return this.capitulos.length;
  }

  primerCapitulo(): Contenido {
    return this.capitulos[0];
  }

  duracionTotal(): number {
    let duracionTotal: number = 0;
    this.capitulos.forEach((capitulo) => {
      duracionTotal = +capitulo.getDuracion;
    });
    return duracionTotal;
  }
}
