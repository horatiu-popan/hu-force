import { Injectable } from "@angular/core";
import { Company } from "../model/company.model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private companySubject$: Subject<Company> = new Subject();
    currentCompany = this.companySubject$.asObservable();

    public constructor(private httpClient : HttpClient) {}

    public getCompanies() : Observable<Company[]> {
        return this.httpClient.get<Company[]>('https://smallhrapi.azurewebsites.net/api/Companies?PageNumber=1&PageSize=10');
    }

    public addCompany(company: Company) {
        return this.httpClient.post('https://smallhrapi.azurewebsites.net/api/Companies', company);
    }

    public getCompanyById(id: number): Observable<Company> {
        return this.httpClient.get<Company>(`https://smallhrapi.azurewebsites.net/api/Companies/${id}`);
    }

    public updateCompany(id: number, updatedCompany: Company) {
        return this.httpClient.put<void>(`https://smallhrapi.azurewebsites.net/api/Companies/${id}`, updatedCompany);
    }

    public deleteCompany(id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/Companies/${id}`);
    }

}