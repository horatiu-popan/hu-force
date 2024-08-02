import { Injectable } from "@angular/core";
import { Employee } from "../model/employee.model";
import { HttpClient } from "@angular/common/http";
import { Company } from "../../company/model/company.model";
import { Observable } from "rxjs";
import { Address } from "../employee-addresses/model/address.model";
import { BankAccount } from "../employee-bank-accounts/model/bank-account.model";
import { Contact } from "../employee-contacts/model/contact.model";
import { Child } from "../employee-children/model/child.model";
import { Id } from "../employee-id/model/id.model";

const EMPLOYEE_DATA: Employee[] = [
    {
        "id": 101,
        "firstName": "Alice",
        "lastName": "Johnson",
        "socialSecurityNumber": "789-12-3456",
        "birthDate": "1992-03-11T00:00:00Z",
        "birthPlace": "Chicago"
      }
];

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    public constructor(private httpClient : HttpClient) {}

    public getEmployees(company: Company) : Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(`https://smallhrapi.azurewebsites.net/api/Companies/${company.id}/employees?PageNumber=1&PageSize=10`);
    }
    public addEmployee(employee: Employee, company: Company) {
        return this.httpClient.post(`https://smallhrapi.azurewebsites.net/api/Companies/${company.id}/employees`, employee);
    }
    public getEmployeeById(id: number, company_id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${id}`);
    }
    public updateEmployee(id: number, company_id: number, updatedEmployee: Employee) {
        return this.httpClient.put<void>(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${id}`, updatedEmployee);
    }
    public deleteEmployee(id: number, company_id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${id}`);
    }
    public getAddresses(employee_id: number, company_id: number) : Observable<Address[]> {
        return this.httpClient.get<Address[]>(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/addresses`);
    }
    public addAddress(address: Address, employee_id: number, company_id: number) {
        return this.httpClient.post(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/addresses`, address);
    }
    public deleteAddress(address_id: number, employee_id: number, company_id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/addresses/${address_id}`);
    }
    public getBankAccounts(employee_id: number, company_id: number): Observable<BankAccount[]> {
        return this.httpClient.get<BankAccount[]>(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/bankaccounts`);
    }
    public addBankAccount(bankAccount: BankAccount, employee_id: number, company_id: number) {
        return this.httpClient.post(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/bankaccounts`, bankAccount);
    }
    public deleteBankAccount(bankAccount: BankAccount, employee_id: number, company_id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/bankaccounts/${bankAccount.id}`);
    }
    public addContact(contact: Contact, employee_id: number, company_id: number) {
        return this.httpClient.post(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/contacts`, contact);
    }
    public getContacts(employee_id: number, company_id: number): Observable<Contact[]> {
        return this.httpClient.get<Contact[]>(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/contacts`);
    }
    public deleteContact(contact: Contact, employee_id: number, company_id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/contacts/${contact.id}`);
    }
    public getChildren(employee_id: number, company_id: number): Observable<Child[]> {
        return this.httpClient.get<Child[]>(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/children`);
    }
    public deleteChild(child: Child, employee_id: number, company_id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/children/${child.id}`);
    }
    public addChild(child: Child, employee_id: number, company_id: number) {
        return this.httpClient.post(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/children`, child);
    }
    public getIds(employee_id: number, company_id: number): Observable<Id[]> {
        return this.httpClient.get<Id[]>(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/identitycards`);
    }
    public deleteId(id: Id, employee_id: number, company_id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/identitycards/${id.id}`);
    }
    public addId(id: Id, employee_id: number, company_id: number) {
        return this.httpClient.post(`https://smallhrapi.azurewebsites.net/api/Companies/${company_id}/employees/${employee_id}/identitycards`, id);
    }
}
