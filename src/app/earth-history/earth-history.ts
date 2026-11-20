import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface EarthData {
  image: string;
  date: string;
  caption: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
}

interface EarthImage extends EarthData {
  url: string;
}

@Component({
  selector: 'app-earth-history',
  standalone: true,
  imports: [],
  templateUrl: './earth-history.html',
  styleUrl: './earth-history.css'
})
export class EarthHistory {
  private http = inject(HttpClient);

readonly fechaMaxima = this.obtenerFechaDeHoy();
fecha = signal(this.fechaMaxima);

private obtenerFechaDeHoy(): string {
  const hoy = new Date();

  return [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, '0'),
    String(hoy.getDate()).padStart(2, '0')
  ].join('-');
}
  imagenes = signal<EarthImage[]>([]);
  cargando = signal(false);
  busquedaRealizada = signal(false);
  error = signal('');

  ngOnInit(): void {
  this.http.get<EarthData[]>('https://epic.gsfc.nasa.gov/api/natural')
    .subscribe({
      next: (imagenes) => {
        const ultimaFecha = imagenes[0]?.date.split(' ')[0];

        if (ultimaFecha && this.fecha() === this.fechaMaxima) {
          this.fecha.set(ultimaFecha);
        }
      },
      error: () => {
        // Si falla la consulta, se mantiene la fecha local de hoy.
      }
    });
}
  buscarImagenes() {
    const fechaSeleccionada = this.fecha();

    if (!fechaSeleccionada) {
      return;
    }

    this.cargando.set(true);
    this.error.set('');
    this.imagenes.set([]);
    this.busquedaRealizada.set(true);

    const url = `https://epic.gsfc.nasa.gov/api/natural/date/${fechaSeleccionada}`;

    this.http.get<EarthData[]>(url).subscribe({
      next: (lista) => {
        const resultado = lista.map(imagen => {
          const [anio, mes, dia] = imagen.date
            .split(' ')[0]
            .split('-');

          return {
            ...imagen,
            url: `https://epic.gsfc.nasa.gov/archive/natural/${anio}/${mes}/${dia}/jpg/${imagen.image}.jpg`
          };
        });

        this.imagenes.set(resultado);
        this.cargando.set(false);
      },
     error: (err) => {
      if (err.status === 429) {
        this.error.set(
          'Se alcanzó el límite de consultas de NASA. Intentá nuevamente más tarde.'
        );
      } else {
        this.error.set(
          'No se pudieron obtener las imágenes de NASA.'
        );
      }

      this.cargando.set(false);
    }
    });
  }

  cambiarFecha(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fecha.set(input.value);
  }
}
