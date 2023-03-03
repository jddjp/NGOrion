import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: CompanyModel[];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit(): void {
    this.companiesService.getCompanies().subscribe(
      companies => {
        console.log(companies);
        this.companies = companies;
      },
    )
  }

  show() {
    console.log("================= ======= ==== CLICK");
  }

}
