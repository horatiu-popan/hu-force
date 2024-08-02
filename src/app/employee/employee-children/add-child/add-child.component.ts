import { Component } from '@angular/core';
import { Child } from '../model/child.model';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BankAccount } from '../../employee-bank-accounts/model/bank-account.model';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrl: './add-child.component.scss'
})
export class AddChildComponent {
  child: Child = {} as Child;
  company_id: string = '';
  employee_id: string = '';

  constructor(public employeeService: EmployeeService, 
     private route: ActivatedRoute,
     private router: Router,
  ) { }

  addChildForm = new FormGroup({
    firstName: new FormControl(''), 
    lastName: new FormControl(''),
    birthDate: new FormControl(''),
  });

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
  }

  public onCreateChild() {
    const firstName = this.addChildForm.controls.firstName.value;
    const lastName = this.addChildForm.controls.lastName.value;
    const birthDate = this.addChildForm.controls.birthDate.value;
    this.employeeService.addChild({
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
    } as Child, +this.employee_id, +this.company_id).subscribe(() => {
      this.router.navigate([`/company/details/${this.company_id}/employees/profile/${this.employee_id}/children`]);
    });
  }
}
