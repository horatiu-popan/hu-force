import { provideRouter, RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.module';
import { CompanyComponent } from './companies-view/company.component';
import { NgModule } from '@angular/core';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';

const routesCompany: Routes = [
    { path: '', component: CompanyComponent },
    { path: 'add', component: CompanyAddComponent },
    { path: 'details/:id', component: CompanyDetailsComponent },
    { path: 'details/:id/employees', loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule) },
    { path: '**', redirectTo: '' } 
];

@NgModule({
    declarations: [
      CompanyComponent,
      HighlightDirective,
      CompanyAddComponent,
      CompanyDetailsComponent,
      CompanyEditComponent,
    ],
    imports: [RouterModule, SharedModule],
    providers: [provideRouter(routesCompany)],
})
export class CompanyModule {}
  