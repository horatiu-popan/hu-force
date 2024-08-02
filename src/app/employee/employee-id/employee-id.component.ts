import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Id } from './model/id.model';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-id',
  templateUrl: './employee-id.component.html',
  styleUrl: './employee-id.component.scss'
})
export class EmployeeIdComponent {
  company_id: string = '';
  employee_id: string = '';
  displayedColumns: string[] = ['type', 'issueDate', 'expirationDate', 'issuer', 'series', 'number', 'actions'];
  dataSource = new MatTableDataSource<Id>();

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
    this.employeeService.getIds(+this.employee_id, +this.company_id).subscribe((data: Id[]) => {
      this.dataSource.data = data;
    });
  }

  onDeleteId(id: Id) {
    this.employeeService.deleteId(id, +this.employee_id, +this.company_id).subscribe(() => {
      window.location.reload();
    });
  }
}
