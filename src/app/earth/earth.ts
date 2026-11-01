import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
  selector: 'app-earth',
  standalone: true,
  imports: [],
  templateUrl: './earth.html',
  styleUrl: './earth.css'
})
export class Earth {
  private http = inject(HttpClient);

  imagenes = toSignal(
    this.http.get<EarthData[]>(
      'https://epic.gsfc.nasa.gov/api/natural'
    ).pipe(
      map(lista => lista.map(imagen => {
        const [anio, mes, dia] = imagen.date
          .split(' ')[0]
          .split('-');

        return {
          ...imagen,
          url: `https://epic.gsfc.nasa.gov/archive/natural/${anio}/${mes}/${dia}/jpg/${imagen.image}.jpg`
        } as EarthImage;
      }))
    ),
    { initialValue: [] as EarthImage[] }
  );
}
