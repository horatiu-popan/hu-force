export type Position = {
    id: number;
    positionName: string;
}

export type Department  = {
    id: number;
    departmentName: string;
}

export interface ContractVersion {
    id: number;
    uniqueNumber: string;
    versionStartDate: string;
    terminationDate: string;
    expirationDate: string;
    salary: number;
    fraction: number;
    workingDays: number;
    vacationDays: number;
    expires: boolean;
    position: Position;
    department: Department;
  }