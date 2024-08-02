import { Component } from '@angular/core';
import { BankAccount } from '../model/bank-account.model';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrl: './add-bank-account.component.scss'
})
export class AddBankAccountComponent {
  bankAccount: BankAccount = {} as BankAccount;
  company_id: string = '';
  employee_id: string = '';

  constructor(public employeeService: EmployeeService, 
     private route: ActivatedRoute,
     private router: Router,
  ) { }

  addBankAccountForm = new FormGroup({
    iban: new FormControl(''), 
    bank: new FormControl(''),
  });

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
  }

  public onCreateBankAccount() {
    const iban = this.addBankAccountForm.controls.iban.value;
    const bank = this.addBankAccountForm.controls.bank.value;
    this.employeeService.addBankAccount({
      iban: iban,
      bank: bank,
    } as BankAccount, +this.employee_id, +this.company_id).subscribe(() => {
      this.router.navigate([`/company/details/${this.company_id}/employees/profile/${this.employee_id}/bank-accounts`]);
    });
  }
}
