class Pelicula extends Titulo {
  contenido: Contenido;

  constructor(titulo: string) {
    super(titulo);
  }

  getContenido(): Contenido {
    return this.contenido;
  }

  setContenido(contenido: Contenido): void {
    this.contenido = contenido;
  }
}
