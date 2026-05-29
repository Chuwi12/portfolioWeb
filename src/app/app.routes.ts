import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  // Empty route goes to HomeComponent
  { path: '', component: Home },
  // Any other route redirects to home
  { path: '**', redirectTo: '' }
];