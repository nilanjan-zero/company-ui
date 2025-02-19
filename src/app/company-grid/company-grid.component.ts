import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../services/company.service';
import { CompanyVM } from '../models/company-vm';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-grid',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [CompanyService, HttpClient], // Provide your service if needed
  templateUrl: './company-grid.component.html',
  styleUrls: ['./company-grid.component.css']
})
export class CompanyGridComponent implements OnInit {

  @ViewChild('companyModal') companyModal!: TemplateRef<any>;

  companies: CompanyVM[] = [];
  selectedCompany!: CompanyVM;
  isEditMode: boolean = false;
  modalRef!: NgbModalRef;

  constructor(private companyService: CompanyService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedCompany = new CompanyVM(0, '', '', '', '', '');
    this.modalRef = this.modalService.open(this.companyModal);
  }

  openEditModal(company: CompanyVM): void {
    this.isEditMode = true;
    this.selectedCompany = company;
    this.modalRef = this.modalService.open(this.companyModal);
  }

  saveCompany(): void {
    if (this.isEditMode) {
      this.companyService.updateCompany(this.selectedCompany.id, this.selectedCompany).subscribe(() => this.getCompanies());
    } else {
      this.companyService.addCompany(this.selectedCompany).subscribe(() => this.getCompanies());
    }
    this.modalRef.close();
  }
}
