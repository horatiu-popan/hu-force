import { Component } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-personal-details',
  templateUrl: './employee-personal-details.component.html',
  styleUrl: './employee-personal-details.component.scss'
})
export class EmployeePersonalDetailsComponent {
  employee: Employee = {} as Employee;
  company_id: string = '';
  employee_id: string = '';
  editView: boolean = false;

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
    this.employeeService.getEmployeeById(this.employee_id ? +this.employee_id : 1, this.company_id ? +this.company_id : 1).subscribe(employee => {
      this.employee = employee;
    });
  }

  onDelete() {
    this.employeeService.deleteEmployee(this.employee.id, +this.company_id).subscribe(() => {
      this.router.navigate(['/company/details', this.company_id, 'employees']);
    });
  }
}
