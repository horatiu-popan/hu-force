import { Component } from '@angular/core';
import { Address } from './model/address.model';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-addresses',
  templateUrl: './employee-addresses.component.html',
  styleUrl: './employee-addresses.component.scss'
})
export class EmployeeAddressesComponent {
  addressList: Address[] = [];
  company_id: string = '';
  employee_id: string = '';

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
    this.employeeService.getAddresses(this.employee_id ? +this.employee_id : 1, this.company_id ? +this.company_id : 1).subscribe(addressList => {
      this.addressList = addressList;
    });
  }
  
  onDeleteAddress(address: Address) {
    this.employeeService.deleteAddress(address.id, this.employee_id ? +this.employee_id : 1, this.company_id ? +this.company_id : 1).subscribe(() => {
      window.location.reload();
    });
  }
}
