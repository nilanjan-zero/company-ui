import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyVM } from '../models/company-vm';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<CompanyVM[]> {
    const url = `${this.apiUrl}/all-companies`;
    return this.http.get<CompanyVM[]>(url);
  }

  getCompanyById(id: number): Observable<CompanyVM> {
    const url = `${this.apiUrl}/company/id:${id}`;
    return this.http.get<CompanyVM>(url);
  }

  addCompany(company: CompanyVM): Observable<CompanyVM> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/add-company`;
    return this.http.post<CompanyVM>(url, company, { headers });
  }

  updateCompany(id: number, company: CompanyVM): Observable<void> {
    const url = `${this.apiUrl}/update-company/id:${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch<void>(url, company, { headers });
  }

}
