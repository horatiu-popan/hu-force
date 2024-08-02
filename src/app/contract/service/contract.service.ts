import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Company } from "../../company/model/company.model";
import { Observable } from "rxjs";
import { Contract } from "../model/contract.model";
import { ContractVersion } from "../contract-version-view/model/contract-version.model";

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    public constructor(private httpClient : HttpClient) {}

    public getContractById(contractId: number) : Observable<Contract[]> {
        return this.httpClient.get<Contract[]>(`https://smallhrapi.azurewebsites.net/api/Contract/${contractId}`);
    }
    public getContractByEmployee(employeeId: number) : Observable<Contract[]> {
        return this.httpClient.get<Contract[]>(`https://smallhrapi.azurewebsites.net/api/Contract/all/${employeeId}`);
    }
    public deleteContract(id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/Contract/${id}`);
    }
    public addContract(contract: Contract, employee_id: number) {
        return this.httpClient.post(`https://smallhrapi.azurewebsites.net/api/Contract/${employee_id}`, contract);
    }
    public getContractVersions(contractId: number) : Observable<ContractVersion[]> {
        return this.httpClient.get<ContractVersion[]>(`https://smallhrapi.azurewebsites.net/api/ContractVersion/all/${contractId}`);
    }
    public addContractVersion(contractId: number, version: ContractVersion) {
        return this.httpClient.post(`https://smallhrapi.azurewebsites.net/api/ContractVersion/${contractId}`, version);
    }
    public deleteContractVersion(id: number) {
        return this.httpClient.delete(`https://smallhrapi.azurewebsites.net/api/ContractVersion/${id}`);
    }
}
