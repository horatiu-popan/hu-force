import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContractVersion } from './model/contract-version.model';
import { ContractService } from '../service/contract.service';

@Component({
  selector: 'app-contract-version-view',
  templateUrl: './contract-version-view.component.html',
  styleUrl: './contract-version-view.component.scss'
})
export class ContractVersionViewComponent {
  versions: ContractVersion[] = [];
  @Input() contractId: number = 0;
  
  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.contractService.getContractVersions(this.contractId).subscribe((data: ContractVersion[]) => {
      this.versions = data;
    });
  }

  onDeleteVersion(id: number) {
    this.contractService.deleteContractVersion(id).subscribe(() => {
      window.location.reload();
    });
  }
}
