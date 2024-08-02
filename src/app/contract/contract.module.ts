import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsViewComponent } from './contracts-view/contracts-view.component';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/modules/shared.module';
import { ContractAddComponent } from './contract-add/contract-add.component';
import { ContractVersionViewComponent } from './contract-version-view/contract-version-view.component';
import { AddVersionComponent } from './add-version/add-version.component';

const routesContract: Routes = [
  { path: '', component: ContractsViewComponent },
  { path: 'add', component: ContractAddComponent },
  { path: 'version-add/:contract_id', component: AddVersionComponent },
];

@NgModule({
  declarations: [
    ContractsViewComponent,
    ContractAddComponent,
    ContractVersionViewComponent,
    AddVersionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesContract),
    SharedModule,
  ],
  providers: [provideRouter(routesContract)],
})
export class ContractModule { }
