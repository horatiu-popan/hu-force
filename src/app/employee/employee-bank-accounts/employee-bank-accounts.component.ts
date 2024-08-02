import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BankAccount } from './model/bank-account.model';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-bank-accounts',
  templateUrl: './employee-bank-accounts.component.html',
  styleUrl: './employee-bank-accounts.component.scss'
})
export class EmployeeBankAccountsComponent {
  company_id: string = '';
  employee_id: string = '';
  displayedColumns: string[] = ['bank', 'iban', 'actions'];
  dataSource = new MatTableDataSource<BankAccount>();

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
    this.employeeService.getBankAccounts(+this.employee_id, +this.company_id).subscribe((data: BankAccount[]) => {
      this.dataSource.data = data;
    });
  }

  onDeleteAccount(bankAccount: BankAccount) {
    this.employeeService.deleteBankAccount(bankAccount, +this.employee_id, +this.company_id).subscribe(() => {
      window.location.reload();
    });
  }
}
