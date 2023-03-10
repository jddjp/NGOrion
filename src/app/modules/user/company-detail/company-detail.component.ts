import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  name = '';
  area = '';
  logo = '';
  detail = '';

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.area = this.config.data.area;
    this.logo = this.config.data.logo;
    this.detail = this.config.data.detail;
  }
}
