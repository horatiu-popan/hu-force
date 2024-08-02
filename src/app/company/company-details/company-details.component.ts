import { Component, inject, Input, OnInit } from '@angular/core';
import { Company } from '../model/company.model';
import { CompanyService } from '../service/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent implements OnInit {
  company: Company = {} as Company;
  editView: boolean = false;
  constructor(private companyService: CompanyService,     
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompanyById(id ? +id : 1).subscribe(company => {
      this.company = company;
    });
  }

  onDelete() {
    this.companyService.deleteCompany(this.company.id).subscribe(() => {
      this.router.navigate(['/company']);
    });
  }
  
  employeesURL() {
    return this.router.url + '/employees';
  }
}
