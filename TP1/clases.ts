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
  private reproduccion: Map<Titulo, [number, number]>;

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
    if (this.reproduccion.has(titulo)) {
      let value = this.reproduccion.get(titulo);
      if (titulo instanceof Pelicula) {
        if (value[0] == titulo.getContenido().getDuracion()) {
          return true;
        }
        return false;
      } else if (titulo instanceof Serie) {
        if (value[1] >= titulo.cantidadDeCapitulos()) {
          return true;
        }
        return false;
      }
    }
    return false;
  }

  viendo(titulo: Titulo): boolean {
    let tiempoVisto: number = 0;
    if (this.reproduccion.has(titulo)) {
      let value = this.reproduccion.get(titulo);
      tiempoVisto = value[0];
    }
    if (titulo instanceof Pelicula) {
      if (
        tiempoVisto < titulo.getContenido().getDuracion() &&
        tiempoVisto > 0
      ) {
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
      if (this.reproduccion.has(serie)) {
        return this.reproduccion.get(serie)[1];
      }
      return 0;
    }
  }

  ver(titulo: Titulo, tiempo_visualizado: number): boolean {
    if (titulo.disponible(this.region)) {
      if (this.reproduccion.has(titulo)) {
        let value = this.reproduccion.get(titulo);
        this.reproduccion.set(titulo, [
          value[0] + tiempo_visualizado,
          value[1],
        ]);
        value[0] += tiempo_visualizado;
        if (titulo instanceof Serie) {
          while (
            titulo.cantidadDeCapitulos() > value[1] &&
            titulo.obtenerCapitulo(value[1]).getDuracion() <= value[0]
          ) {
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
