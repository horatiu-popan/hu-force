import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/service/company.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss'
})
export class EmployeeAddComponent {

  company: Company = {} as Company;

  constructor(public employeeService: EmployeeService, 
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
  ) { }

  addEmployeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    socialSecurityNumber: new FormControl(''),
    birthDate: new FormControl(''),
    birthPlace: new FormControl(''),
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompanyById(id ? +id : 1).subscribe(company => {
      this.company = company;
    });
  }

  public onCreateEmployee() {
    const firstName = this.addEmployeeForm.controls.firstName.value;
    const lastName = this.addEmployeeForm.controls.lastName.value;
    const socialSecurityNumber = this.addEmployeeForm.controls.socialSecurityNumber.value;
    const birthDate = this.addEmployeeForm.controls.birthDate.value;
    const birthPlace = this.addEmployeeForm.controls.birthPlace.value;
    this.employeeService.addEmployee({
      firstName: firstName,
      lastName: lastName,
      socialSecurityNumber: socialSecurityNumber,
      birthDate: birthDate,
      birthPlace: birthPlace,
    } as Employee, this.company).subscribe(() => {
      this.router.navigate([`/company/details/${this.company.id}/employees`]);
    });
  }
}
