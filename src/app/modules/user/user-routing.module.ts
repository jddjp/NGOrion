import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { userRoutes } from './user.routes';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { ConstantsComponent } from 'src/app/constants/constants.component';
import { CompaniesComponent } from './companies/companies.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: userRoutes,
    }
];

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class UserRoutingModule { }
