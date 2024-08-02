import { Component } from '@angular/core';
import { ContractVersion, Department, Position } from '../contract-version-view/model/contract-version.model';
import { ContractService } from '../service/contract.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrl: './add-version.component.scss'
})
export class AddVersionComponent {
  version: ContractVersion = {} as ContractVersion;
  contractId: string = '';
  companyId: string = '';
  employeeId: string = '';

  constructor(public contractService: ContractService, 
     private route: ActivatedRoute,
     private router: Router,
  ) { }

  addVersionForm = new FormGroup({
    uniqueNumber: new FormControl(''), 
    versionStartDate: new FormControl(''),
    terminationDate: new FormControl(''),
    expirationDate: new FormControl(''), 
    salary: new FormControl(''),
    fraction: new FormControl(''),
    workingDays: new FormControl(''), 
    vacationDays: new FormControl(''),
    expires: new FormControl(''),
    position: new FormControl(''), 
    department: new FormControl(''),
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractId = params['contract_id'];
    });
    this.route.parent?.parent?.params.subscribe(params => {
      this.companyId = params['id'];
    });
    this.route.parent?.parent?.params.subscribe(params => {
      this.employeeId = params['employee_id'];
    });
  }

  public onCreateVersion() {
    const uniqueNumber = this.addVersionForm.controls.uniqueNumber.value;
    const versionStartDate = this.addVersionForm.controls.versionStartDate.value;
    const terminationDate = this.addVersionForm.controls.terminationDate.value;
    const expirationDate = this.addVersionForm.controls.expirationDate.value;
    const salary = this.addVersionForm.controls.salary.value;
    const fraction = this.addVersionForm.controls.fraction.value;
    const workingDays = this.addVersionForm.controls.workingDays.value;
    const vacationDays = this.addVersionForm.controls.vacationDays.value;
    const expires = this.addVersionForm.controls.expires.value;
    const position = this.addVersionForm.controls.position.value;
    const department = this.addVersionForm.controls.department.value;
    this.contractService.addContractVersion(+this.contractId, {
      uniqueNumber: uniqueNumber,
      versionStartDate: versionStartDate,
      terminationDate: terminationDate,
      expirationDate: expirationDate,
      salary: salary,
      fraction: fraction,
      workingDays: workingDays,
      vacationDays: vacationDays,
      expires: true,
      position: { positionName: position } as Position,
      department: { departmentName: department } as Department,
    } as unknown as ContractVersion).subscribe(() => {
      this.router.navigate([`company/details/${this.companyId}/employees/profile/${this.employeeId}/contract`]);
    });
  }
}
