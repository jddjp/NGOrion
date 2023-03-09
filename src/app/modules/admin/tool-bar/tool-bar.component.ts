import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddCompanyComponent } from '../companies/add-company/add-company/add-company.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
  providers: [DialogService]
})
export class ToolBarComponent implements OnInit {

  constructor(
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  openNew() {
    const ref = this.dialogService.open(AddCompanyComponent, {
      width: '70%'
    });
  }
}
