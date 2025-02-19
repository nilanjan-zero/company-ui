import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../services/company.service';
import { CompanyVM } from '../models/company-vm';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-grid',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
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
  companyForm!: FormGroup;

  constructor(private companyService: CompanyService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCompanies();
    this.initForm();
  }

  initForm(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      exchange: [''],
      ticker: [''],
      isin: ['', [Validators.required, Validators.pattern('^[A-Za-z]{2}[A-Za-z0-9]*$')]],
      website: ['']
    });
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedCompany = new CompanyVM(0, '', '', '', '', '');
    this.companyForm.reset();
    this.modalRef = this.modalService.open(this.companyModal);
  }

  openEditModal(company: CompanyVM): void {
    this.isEditMode = true;
    this.selectedCompany = company;
    this.companyForm.patchValue(company);
    this.modalRef = this.modalService.open(this.companyModal);
  }

  saveCompany(): void {
    if (this.companyForm.invalid) {
      return;
    }

    const companyData = this.companyForm.value;
    if (this.isEditMode) {
      this.companyService.updateCompany(this.selectedCompany.id, companyData).subscribe(() => this.getCompanies());
    } else {
      this.companyService.addCompany(companyData).subscribe(() => this.getCompanies());
    }
    this.modalRef.close();
  }
}

