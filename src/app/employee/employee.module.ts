import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employees-view.ts/employee.component';
import { SharedModule } from '../shared/modules/shared.module';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeePersonalDetailsComponent } from './employee-personal-details/employee-personal-details.component';
import { EmployeeAddressesComponent } from './employee-addresses/employee-addresses.component';
import { EmployeeContactsComponent } from './employee-contacts/employee-contacts.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { AddressAddComponent } from './employee-addresses/address-add/address-add.component';
import { AddressFormatterPipe } from '../shared/pipes/address-formatter.pipe';
import { EmployeeBankAccountsComponent } from './employee-bank-accounts/employee-bank-accounts.component';
import { AddBankAccountComponent } from './employee-bank-accounts/add-bank-account/add-bank-account.component';
import { AddContactComponent } from './employee-contacts/add-contact/add-contact.component';
import { EmployeeChildrenComponent } from './employee-children/employee-children.component';
import { AddChildComponent } from './employee-children/add-child/add-child.component';
import { EmployeeIdComponent } from './employee-id/employee-id.component';
import { AddIdComponent } from './employee-id/add-id/add-id.component';

const routesEmployee: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'add', component: EmployeeAddComponent },
  { path: 'profile/:employee_id', component: EmployeeProfileComponent, children: [
    { path: 'personal', component: EmployeePersonalDetailsComponent },
    { path: 'addresses', component: EmployeeAddressesComponent },
    { path: 'addresses/add', component: AddressAddComponent },
    { path: 'bank-accounts', component: EmployeeBankAccountsComponent },
    { path: 'bank-accounts/add', component: AddBankAccountComponent },
    { path: 'contacts', component: EmployeeContactsComponent },
    { path: 'children', component: EmployeeChildrenComponent },
    { path: 'children/add', component: AddChildComponent },
    { path: 'id', component: EmployeeIdComponent },
    { path: 'id/add', component: AddIdComponent },
    { path: 'contract', loadChildren: () => import('../contract/contract.module').then(m => m.ContractModule)},
    { path: '**', redirectTo: 'personal' },
  ]},
];

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeAddComponent,
    EmployeeProfileComponent,
    EmployeePersonalDetailsComponent,
    EmployeeAddressesComponent,
    EmployeeContactsComponent,
    EmployeeEditComponent,
    AddressAddComponent,
    AddressFormatterPipe,
    EmployeeBankAccountsComponent,
    AddBankAccountComponent,
    AddContactComponent,
    EmployeeChildrenComponent,
    AddChildComponent,
    EmployeeIdComponent,
    AddIdComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesEmployee),
    SharedModule,
  ],
  providers: [provideRouter(routesEmployee)],
})
export class EmployeeModule { }
