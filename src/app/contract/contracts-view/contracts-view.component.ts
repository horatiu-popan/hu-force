import { Component } from '@angular/core';
import { Contract } from '../model/contract.model';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from '../service/contract.service';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-contracts-view',
  templateUrl: './contracts-view.component.html',
  styleUrl: './contracts-view.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContractsViewComponent {
  dataSource = new MatTableDataSource<Contract>();
  columnsToDisplay = ['contractNumber', 'uniqueRegistrationCode', 'dayOfEmployment'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'actions'];
  expandedElement: Contract = {} as Contract;
  employee_id: string = '';

  constructor(private contractService: ContractService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
    this.contractService.getContractByEmployee(+this.employee_id).subscribe((data: Contract[]) => {
      this.dataSource.data = data;
    });
  }
  onDeleteContract(contract: Contract) {
    this.contractService.deleteContract(contract.id).subscribe(() => {
      window.location.reload();
    });
  }
}

