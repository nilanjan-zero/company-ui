import { Routes } from '@angular/router';
import { CompanyGridComponent } from './company-grid/company-grid.component';

export const routes: Routes = [
  { path: '', redirectTo: '/company-grid', pathMatch: 'full' },
  { path: 'company-grid', component: CompanyGridComponent }
];
