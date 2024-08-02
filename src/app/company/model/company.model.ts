import { Employee } from "../../employee/model/employee.model";

export type Company = {
    id: number;
    name: string;
    fiscalCode: string;
    registryNo: string;
    euid: string;
    dateOfEstablishment: string;
    employees: Employee[];
}