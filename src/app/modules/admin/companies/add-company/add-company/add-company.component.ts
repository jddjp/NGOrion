import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { StringsComponent } from '../../../../../constants/strings.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  hiddeProgress = true;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  myUploader(event) {
    //event.files == files to upload
  }

  addCompany() {
    this.hiddeProgress = false;
    this.showSuccessMsg();
  }

  showSuccessMsg() {
    this.messageService.add({severity:'success', summary:'', detail: StringsComponent.add_company_success});
  }
  
  showErrorMsg() {
    this.messageService.add({severity:'error', summary:'', detail: StringsComponent.general_error});
  } 
}
