class Usuario {
  private username: string;
  private region: Region;
  private reproduccion: Map<Titulo, number>;

  constructor(username: string, region: Region) {
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
    for (let [key, value] of this.reproduccion) {
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
    for (let [key, value] of this.reproduccion) {
      if (titulo.getTitulo == key.getTitulo) {
        if (key instanceof Pelicula) {
          if (value < key.getContenido().getDuracion() && value > 0) {
            return true;
          }
          return false;
        } else if (key instanceof Serie) {
          if (value < key.duracionTotal() && value > 0) {
            return true;
          }
          return false;
        }
      }
    }
    return false;
  }

  capituloActual(serie: Titulo): number {
    if (serie instanceof Serie) {
      for (let [key, value] of this.reproduccion) {
        if (key.getTitulo == serie.getTitulo) {
          if (this.visto(serie)) {
            return serie.cantidadDeCapitulos();
          }

          let tiempoTranscurrido: number = 0;
          for (let i = 0; tiempoTranscurrido < value; i++) {
            if (
              serie.obtenerCapitulo(i).getDuracion() >
              value - tiempoTranscurrido
            ) {
              return i;
            }
            tiempoTranscurrido += serie.obtenerCapitulo(i).getDuracion();
          }
        }
      }
    }
  }

  ver(titulo: Titulo, tiempo_visualizado: number): boolean {
    if (titulo.disponible(this.getRegion())) {
      for (let [key, value] of this.reproduccion) {
        if (key.getTitulo == titulo.getTitulo) {
          value += tiempo_visualizado;
          return true;
        }
      }
    }
    return false;
  }
}
