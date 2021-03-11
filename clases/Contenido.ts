class Contenido {
  duracion: number;
  fechaCreacion: Date;

  constructor(duracion: number) {
    this.duracion = duracion;
    this.fechaCreacion = new Date();
  }

  getDate(): Date {
    return this.fechaCreacion;
  }

  getDuracion(): number {
    return this.duracion;
  }
}