import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CompanyService } from '../service/company.service';
import { Company } from '../model/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrl: './company-add.component.scss'
})
export class CompanyAddComponent {
  constructor(public companyService: CompanyService, private router: Router) { }

  addCompanyForm = new FormGroup({
    name: new FormControl(''),
    fiscalCode: new FormControl(''),
    registryNo: new FormControl(''),
    euid: new FormControl(''),
    dateOfEstablishment: new FormControl(''),
  });

  public onCreateCompany() {
    const name = this.addCompanyForm.controls.name.value;
    const fiscalCode = this.addCompanyForm.controls.fiscalCode.value;
    const registryNo = this.addCompanyForm.controls.registryNo.value;
    const euid = this.addCompanyForm.controls.euid.value;
    const dateOfEstablishment = this.addCompanyForm.controls.dateOfEstablishment.value;
    this.companyService.addCompany({
      name: name,
      fiscalCode: fiscalCode,
      registryNo: registryNo,
      euid: euid,
      dateOfEstablishment: dateOfEstablishment,
    } as Company).subscribe(() => {
      this.router.navigate(['/company']);
    });
  }
}
