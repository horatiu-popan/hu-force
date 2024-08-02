import { Component, Input, SimpleChanges } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss'
})
export class EmployeeEditComponent {
  @Input() employee: Employee = {} as Employee;
  company_id: string = '';
  constructor(public employeeService: EmployeeService, 
    private route: ActivatedRoute
  ) { }

  editEmployeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    socialSecurityNumber: new FormControl(''),
    birthDate: new FormControl(''),
    birthPlace: new FormControl(''),
  });

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.editEmployeeForm.patchValue(this.employee);
    }
  }

  public onEditEmployee() {
    const firstName = this.editEmployeeForm.controls.firstName.value;
    const lastName = this.editEmployeeForm.controls.lastName.value;
    const socialSecurityNumber = this.editEmployeeForm.controls.socialSecurityNumber.value;
    const birthDate = this.editEmployeeForm.controls.birthDate.value;
    const birthPlace = this.editEmployeeForm.controls.birthPlace.value;
    this.employeeService.updateEmployee(this.employee.id, +this.company_id, {
      id: this.employee.id,
      firstName: firstName,
      lastName: lastName,
      socialSecurityNumber: socialSecurityNumber,
      birthDate: birthDate,
      birthPlace: birthPlace,
    } as Employee).subscribe(() => {
      window.location.reload();
    });
  }
}
