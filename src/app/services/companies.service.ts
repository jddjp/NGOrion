import { Injectable } from '@angular/core';
import { CompanyModel } from '../models/company.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class CompaniesService {
    constructor(private http: HttpClient) {}

    getCompanies() {
        return this.http.get<Array<CompanyModel>>('/assets/data/companies.json');
    }
}