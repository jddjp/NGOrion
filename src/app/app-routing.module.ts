import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../config/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginAdminComponent } from './auth/admin/login-admin/login-admin.component';
import { ConstantsComponent } from './constants/constants.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { AddCompanyComponent } from './modules/admin/companies/add-company/add-company/add-company.component';

const routes: Routes = [
  {
    path: ConstantsComponent.companies_endpoint,
    component: CompaniesComponent,
  },
  {
    path: ConstantsComponent.add_company_endpoint,
    component: AddCompanyComponent,
  },
  {
    path: 'portal',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    //canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    //canLoad: [AuthGuard]
  },
  {
    path: 'reedevento',
    loadChildren: () => import('./modules/reedevento/reedevento.module').then(m => m.ReedEventoModule),
    //canLoad: [AuthGuard]
  },
  {
    path: 'reedeventoadmin',
    loadChildren: () => import('./modules/reedeventoadmin/reedeventoadmin.module').then(m => m.ReedEventoAdminModule),
    //canLoad: [AuthGuard]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'portal' }
];

@NgModule({

  declarations: [
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    NotFoundComponent
  ]
})
export class AppRoutingModule { }
