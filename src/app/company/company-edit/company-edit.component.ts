import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Company } from '../model/company.model';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss'
})
export class CompanyEditComponent {
  @Input() company: Company = {} as Company;
  constructor(public companyService: CompanyService) { }

  editCompanyForm = new FormGroup({
    name: new FormControl(''),
    fiscalCode: new FormControl(''),
    registryNo: new FormControl(''),
    euid: new FormControl(''),
    dateOfEstablishment: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['company'] && changes['company'].currentValue) {
      this.editCompanyForm.patchValue(this.company);
    }
  }

  public onEditCompany() {
    const name = this.editCompanyForm.controls.name.value;
    const fiscalCode = this.editCompanyForm.controls.fiscalCode.value;
    const registryNo = this.editCompanyForm.controls.registryNo.value;
    const euid = this.editCompanyForm.controls.euid.value;
    const dateOfEstablishment = this.editCompanyForm.controls.dateOfEstablishment.value;
    this.companyService.updateCompany(this.company.id, {
      id: this.company.id,
      name: name,
      fiscalCode: fiscalCode,
      registryNo: registryNo,
      euid: euid,
      dateOfEstablishment: dateOfEstablishment,
    } as Company).subscribe(() => {
      window.location.reload();
    });
  }
}
