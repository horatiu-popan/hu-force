import { Component } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';
import { CompanyService } from '../../company/service/company.service';
import { Company } from '../../company/model/company.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  public employeeList: Employee[] = [];
  public company: Company = {} as Company;
  public companyId: string = '';
  public routeString: string ='';

  constructor(private employeeService: EmployeeService, 
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) { }


  public ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.companyService.getCompanyById(id ? +id : 1).subscribe(company => {
      this.company = company;
      this.employeeService.getEmployees(this.company).subscribe((employeeList) => {this.employeeList = employeeList});
    });
    this.routeString = this.route.url;
  }

  public addEmployeeURL() {
    return this.routeString + '/add';
  }
  public employeeProfileURL(employeeId: number) {
    return this.routeString + '/profile/' + employeeId;
  }
}
