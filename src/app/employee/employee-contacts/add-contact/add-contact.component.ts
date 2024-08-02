import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';
import { Contact } from '../model/contact.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {
  
  company_id: string = '';
  employee_id: string = '';

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {
    this.addContactForm.get('fieldType')?.valueChanges.subscribe(value => {
      if (value) {
        this.fieldTypeSubject.next(value);
      }
    });
  }

  ngOnInit() {
    this.route.parent?.parent?.params.subscribe(params => {
      this.company_id = params['id'];
    });
    this.route.parent?.params.subscribe(params => {
      this.employee_id = params['employee_id'];
    });
  }

  addContactForm = new FormGroup({
    fieldType: new FormControl('workEmail'),
    value: new FormControl(''),
  });

  fieldTypes = [
    { value: 'workEmail', viewValue: 'Work Email' },
    { value: 'personalEmail', viewValue: 'Personal Email' },
    { value: 'phoneNumber', viewValue: 'Phone Number' }
  ];

  private fieldTypeSubject = new BehaviorSubject<string>('workEmail');
  fieldLabel$ = this.fieldTypeSubject.pipe(
    map(value => {
      return this.fieldTypes.find(type => type.value === value)?.viewValue;
    })
  );

  public onCreateContact() {
    const fieldType = this.addContactForm.controls.fieldType.value;
    const value = this.addContactForm.controls.value.value;
    if (fieldType == null) {
      return ;
    }
    const newContact: Partial<Contact> = { [fieldType]: value };
    this.employeeService.addContact( newContact as Contact, +this.employee_id, +this.company_id).subscribe(() => {
      window.location.reload();
    });
  }
}
