import { Component } from '@angular/core';
import { Address } from '../model/address.model';
import { EmployeeService } from '../../service/employee.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrl: './address-add.component.scss'
})
export class AddressAddComponent {
  address: Address = {} as Address;
  company_id: string = '';
  employee_id: string = '';

  constructor(public employeeService: EmployeeService, 
     private route: ActivatedRoute,
     private router: Router,
    // private companyService: CompanyService
  ) { }

  addAddressForm = new FormGroup({
    country: new FormControl(''), 
    county: new FormControl(''),
    city: new FormControl(''), 
    street: new FormControl(''),
    number: new FormControl(''),
  });

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
  }

  public onCreateAddress() {
    const country = this.addAddressForm.controls.country.value;
    const county = this.addAddressForm.controls.county.value;
    const city = this.addAddressForm.controls.city.value;
    const street = this.addAddressForm.controls.street.value;
    const number = this.addAddressForm.controls.number.value;
    this.employeeService.addAddress({
      country: country,
      county: county,
      city: city,
      street: street,
      number: number,
    } as Address, +this.employee_id, +this.company_id).subscribe(() => {
      this.router.navigate([`/company/details/${this.company_id}/employees/profile/${this.employee_id}/addresses`]);
    });
  }
}
