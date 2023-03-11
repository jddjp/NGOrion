import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CompaniesService } from 'src/app/services/companies.service';
import { StringsComponent } from '../../../../../constants/strings.component';
import { CompanyModel } from '../../../../../models/company.model';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { CargaImagenesService } from '../../../../../services/cargaImagenes.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  hiddeProgress = true;
  company: CompanyModel = {
    nombre: '',
    logo: '',
    descripcion: '',
    area: ''
  };

  constructor(
    private messageService: MessageService,
    private firebaseService: CompaniesService,
    private cargaImagenesService: CargaImagenesService,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
  }

  myUploader(event) {
    //event.files == files to upload
    this.cargaImagenesService.upload(event.files);
  }

  addCompany() {
    this.hiddeProgress = false;
    this.firebaseService.addCompany(this.company)
      .then(() => {
        this.company = {
          nombre: '',
          logo: '',
          descripcion: '',
          area: ''
        };
        this.hiddeProgress = true;
        this.showSuccessMsg();
      })
      .catch((error) => {
        this.hiddeProgress = true;
        this.showErrorMsg();
      });
  }

  showSuccessMsg() {
    this.messageService.add({ severity: 'success', summary: '', detail: StringsComponent.add_company_success });
  }

  showErrorMsg() {
    this.messageService.add({ severity: 'error', summary: '', detail: StringsComponent.general_error });
  }

  close() {
    this.ref.close();
  }
}
