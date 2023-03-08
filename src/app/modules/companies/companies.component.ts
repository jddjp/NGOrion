import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompaniesService } from 'src/app/services/companies.service';
import {DialogService} from 'primeng/dynamicdialog';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: CompanyModel[];

  constructor(
    private companiesService: CompaniesService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    // this.companiesService.getCompanies().subscribe(
    //   companies => {
    //     this.companies = companies;
    //   },
    // )
  }

  show() {
    const ref = this.dialogService.open(CompanyDetailComponent, {
        header: 'Company Details',
        width: '70%'
    });
}

}
