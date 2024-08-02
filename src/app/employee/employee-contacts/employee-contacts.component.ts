import { Component } from '@angular/core';
import { Contact } from './model/contact.model';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-contacts',
  templateUrl: './employee-contacts.component.html',
  styleUrl: './employee-contacts.component.scss'
})
export class EmployeeContactsComponent {
  contacts: Contact[] = [];
  company_id: string = '';
  employee_id: string = '';

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
    this.employeeService.getContacts(+this.employee_id, +this.company_id).subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }
  onDeleteContact(contact: Contact) {
    this.employeeService.deleteContact(contact, this.employee_id ? +this.employee_id : 1, this.company_id ? +this.company_id : 1).subscribe(() => {
      window.location.reload();
    });
  }
}
