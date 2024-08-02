import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Child } from './model/child.model';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-children',
  templateUrl: './employee-children.component.html',
  styleUrl: './employee-children.component.scss'
})
export class EmployeeChildrenComponent {
  company_id: string = '';
  employee_id: string = '';
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate', 'actions'];
  dataSource = new MatTableDataSource<Child>();

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
    this.employeeService.getChildren(+this.employee_id, +this.company_id).subscribe((data: Child[]) => {
      this.dataSource.data = data;
    });
  }

  onDeleteChild(child: Child) {
    this.employeeService.deleteChild(child, +this.employee_id, +this.company_id).subscribe(() => {
      window.location.reload();
    });
  }
}
