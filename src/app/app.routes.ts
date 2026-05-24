import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  // Ruta vacia HomeComponent
  { path: '', component: Home },
  // Otra cosa ir al inicio
  { path: '**', redirectTo: '' }
];