import { Component } from '@angular/core';
import { Id } from '../model/id.model';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-id',
  templateUrl: './add-id.component.html',
  styleUrl: './add-id.component.scss'
})
export class AddIdComponent {
  id: Id = {} as Id;
  company_id: string = '';
  employee_id: string = '';
  types = [
    'Identity card',
    'Passport' ,
    'DrivingLicence'
  ];

  constructor(public employeeService: EmployeeService, 
     private route: ActivatedRoute,
     private router: Router,
  ) { }

  addIdForm = new FormGroup({
    issueDate: new FormControl(''), 
    expirationDate: new FormControl(''),
    issuer: new FormControl(''),
    series: new FormControl(''),
    number: new FormControl(''),
    type: new FormControl(''),
  });

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
  }

  public onCreateId() {
    const issueDate = this.addIdForm.controls.issueDate.value;
    const expirationDate = this.addIdForm.controls.expirationDate.value;
    const issuer = this.addIdForm.controls.issuer.value;
    const series = this.addIdForm.controls.series.value;
    const number = this.addIdForm.controls.number.value;
    const type = this.addIdForm.controls.type.value;
    this.employeeService.addId({
      issueDate: issueDate,
      expirationDate: expirationDate,
      issuer: issuer,
      series: series,
      number: number,
      type: type,
    } as Id, +this.employee_id, +this.company_id).subscribe(() => {
      this.router.navigate([`/company/details/${this.company_id}/employees/profile/${this.employee_id}/id`]);
    });
  }
}
