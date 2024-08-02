import { Component } from '@angular/core';
import { Contract } from '../model/contract.model';
import { ContractService } from '../service/contract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrl: './contract-add.component.scss'
})
export class ContractAddComponent {
  contract: Contract = {} as Contract;
  employee_id: string = '';
  company_id: string = '';

  constructor(public contractService: ContractService, 
     private route: ActivatedRoute,
     private router: Router,
  ) { }

  addContractForm = new FormGroup({
    contractNumber: new FormControl(''), 
    uniqueRegistrationCode: new FormControl(''),
    dayOfEmployment: new FormControl(''),
  });

  ngOnInit() {
    this.route.parent?.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
  }

  public onCreateContract() {
    const contractNumber = this.addContractForm.controls.contractNumber.value;
    const uniqueRegistrationCode = this.addContractForm.controls.uniqueRegistrationCode.value;
    const dayOfEmployment = this.addContractForm.controls.dayOfEmployment.value;
    this.contractService.addContract({
      contractNumber: contractNumber,
      uniqueRegistrationCode: uniqueRegistrationCode,
      dayOfEmployment: dayOfEmployment,
    } as unknown as Contract, +this.employee_id).subscribe(() => {
      this.router.navigate([`company/details/${this.company_id}/employees/profile/${this.employee_id}/contract`]);
    });
  }
}
