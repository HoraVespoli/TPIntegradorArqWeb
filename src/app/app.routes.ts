import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Apod } from './apod/apod';
import { ApodGallery } from './apod-gallery/apod-gallery';
import { Earth } from './earth/earth';
import { EarthHistory } from './earth-history/earth-history';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: '', redirectTo: 'apod', pathMatch: 'full' },
      { path: 'apod', component: Apod },
      { path: 'apod-gallery', component: ApodGallery },
      { path: 'earth', component: Earth },
      { path: 'earth-history', component: EarthHistory }
    ]
  }
];
