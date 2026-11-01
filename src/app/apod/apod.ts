import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

interface ApodData {
  date: string;
  title: string;
  explanation: string;
  media_type: string;
  hdurl: string;
}

@Component({
  selector: 'app-apod',
  standalone: true,
  imports: [],
  templateUrl: './apod.html',
  styleUrl: './apod.css'
})
export class Apod {
  private http = inject(HttpClient);

  apod = toSignal(
    this.http.get<ApodData[]>(
      'https://science.nasa.gov/wp-json/wp/v2/apod-basic'
    ),
    { initialValue: [] }
  );
}
