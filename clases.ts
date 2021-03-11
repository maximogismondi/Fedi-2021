export enum Region {
  AR,
  BR,
  CH,
}

export class Contenido {
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

export class Titulo {
  titulo: string;
  regionesDisponibles: Array<Region>;

  constructor(titulo: string) {
    this.titulo = titulo;
    this.regionesDisponibles = new Array();
  }

  getTitulo(): string {
    return this.titulo;
  }

  setTitulo(nuevo: string): void {
    this.titulo = nuevo;
  }

  disponible(region: Region): boolean {
    for (let regionDisponible of this.regionesDisponibles) {
      if (regionDisponible == region) {
        return true;
      }
    }
    return false;
  }

  agregarRegion(region: Region): void {
    for (let regionDisponible of this.regionesDisponibles) {
      if (regionDisponible == region) return;
    }
    this.regionesDisponibles.push(region);
  }

  quitarRegion(region: Region): void {
    this.regionesDisponibles.forEach((regionesDisponible) => {
      if (regionesDisponible == region) {
        this.regionesDisponibles = this.regionesDisponibles.splice(
          this.regionesDisponibles.indexOf(region),
          1
        );
      }
    });
  }
}

export class Pelicula extends Titulo {
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

export class Serie extends Titulo {
  capitulos: Array<Contenido>;

  constructor(titulo: string) {
    super(titulo);
    this.capitulos = new Array();
  }

  agregarCapitulo(capitulo: Contenido): void {
    this.capitulos.push(capitulo);
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
      duracionTotal += capitulo.getDuracion();
    });
    return duracionTotal;
  }
}

export class Usuario {
  private username: string;
  private region: Region;
  private reproduccion: Map<Titulo, number>;

  constructor(username: string, region: Region) {
    this.reproduccion = new Map();
    this.username = username;
    this.region = region;
  }

  public getUsername(): string {
    return this.username;
  }

  public getRegion(): Region {
    return this.region;
  }

  visto(titulo: Titulo): boolean {
    for (let entry of Array.from(this.reproduccion.entries())) {
      let key = entry[0];
      let value = entry[1];
      if (titulo.getTitulo == key.getTitulo) {
        if (key instanceof Pelicula) {
          if (value == key.getContenido().getDuracion()) {
            return true;
          }
          return false;
        } else if (key instanceof Serie) {
          if (value == key.duracionTotal()) {
            return true;
          }
          return false;
        }
      }
    }
    return false;
  }

  viendo(titulo: Titulo): boolean {
    let tiempoVisto: number = 0;
    for (let entry of Array.from(this.reproduccion.entries())) {
      let key = entry[0];
      let value = entry[1];
      if (titulo.getTitulo() == key.getTitulo()) {
        tiempoVisto += value;
      }
    }
    if (titulo instanceof Pelicula) {
      if (tiempoVisto < titulo.getContenido().getDuracion() && tiempoVisto > 0) {
        return true;
      }
    } else if (titulo instanceof Serie) {
      if (tiempoVisto < titulo.duracionTotal() && tiempoVisto > 0) {
        return true;
      }
    }
    return false;
  }

  capituloActual(serie: Titulo): number {
    if (serie instanceof Serie) {
      if (this.visto(serie)) {
        return serie.cantidadDeCapitulos() - 1;
      }
      let tiempoVisto: number = 0;
      for (let entry of Array.from(this.reproduccion.entries())) {
        let key = entry[0];
        let value = entry[1];
        if (key.getTitulo == serie.getTitulo) {
          tiempoVisto += value;
        }
      }
      let tiempoAcumulado: number = 0;
      for (let i = 0; tiempoVisto >= tiempoAcumulado; i++) {
        tiempoAcumulado += serie.obtenerCapitulo(i).duracion;
        if (tiempoVisto < tiempoAcumulado) {
          return i;
        }
      }
    }
  }

  ver(titulo: Titulo, tiempo_visualizado: number): boolean {
    if (titulo.disponible(this.region)) {
      for (let entry of Array.from(this.reproduccion.entries())) {
        let key = entry[0];
        let value = entry[1];
        if (key.getTitulo == titulo.getTitulo) {
          this.reproduccion.delete(titulo);
          this.reproduccion.set(titulo, value + tiempo_visualizado);
          return true;
        }
      }
      this.reproduccion.set(titulo, tiempo_visualizado);
      return true;
    }
    return false;
  }
}

export class Sistema {
  private usuarios: Array<Usuario>;
  private titulos: Array<Titulo>;

  constructor() {
    this.usuarios = new Array();
    this.titulos = new Array();
  }

  agregarUsuario(usuario: Usuario): boolean {
    for (let usuarioI of this.usuarios) {
      if (usuarioI.getUsername == usuario.getUsername) {
        return false;
      }
    }
    this.usuarios.push(usuario);
    return true;
  }

  agregarTitulo(titulo: Titulo): void {
    this.titulos.push(titulo);
  }

  buscarUsuario(nombre: string): Usuario {
    for (let usuario of this.usuarios) {
      if (usuario.getUsername() == nombre) {
        return usuario;
      }
    }
    return new Usuario("null", Region.AR);
  }

  buscarTitulo(nombre: string): Array<Titulo> {
    let titulosResultantes: Array<Titulo> = new Array();
    this.titulos.forEach((titulo) => {
      if (nombre == titulo.getTitulo()) {
        titulosResultantes.push(titulo);
      }
    });
    return titulosResultantes;
  }
}