class Titulo {
  titulo: string;
  regionesDisponibles: Array<Region>;

  constructor(titulo: string) {
    this.titulo = titulo;
    this.regionesDisponibles = new Array<Region>();
  }

  getTitulo(): string {
    return this.titulo;
  }

  setTitulo(nuevo: string): void {
    this.titulo = nuevo;
  }

  disponible(region: Region): boolean {
    if (this.regionesDisponibles.includes(region)) return true;
    return false;
  }

  agregarRegion(region: Region): void {
    if (!this.regionesDisponibles.includes(region))
      this.regionesDisponibles.push;
  }

  quitarRegion(region: Region): void {
    if (this.regionesDisponibles.includes(region)) {
      this.regionesDisponibles = this.regionesDisponibles.splice(
        this.regionesDisponibles.indexOf(region),
        1
      );
    }
  }
}
