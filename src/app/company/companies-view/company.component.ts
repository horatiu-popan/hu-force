import { Component, OnInit } from '@angular/core';
import { Company } from '../model/company.model';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit{
  public companyList: Company[] = [];
  public selectedCompany?: Company;
  
  constructor(private companyService: CompanyService) {}

  public ngOnInit(): void {
    this.getCompanyFromService();
  }

  private getCompanyFromService() {
    this.companyService.getCompanies().subscribe((companyList) => {this.companyList = companyList});
  }
}
