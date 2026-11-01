import { Component, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

interface ApodData {
  date: string;
  title: string;
  media_type: string;
  hdurl?: string;
}

@Component({
  selector: 'app-apod-gallery',
  standalone: true,
  imports: [],
  templateUrl: './apod-gallery.html',
  styleUrl: './apod-gallery.css'
})
export class ApodGallery {
  private http = inject(HttpClient);

  imagenes = toSignal(
    this.http.get<ApodData[]>(
      'https://science.nasa.gov/wp-json/wp/v2/apod-basic/?count=6'
    ),
    { initialValue: [] }
  );

  imagenesFiltradas = computed(() =>
  this.imagenes()
    .filter(imagen => imagen.media_type === 'image' && !!imagen.hdurl)
    .slice(0, 6)
  );
}
