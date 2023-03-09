import { Component, OnInit } from '@angular/core';
import { ContactoModel } from 'src/app/models/contacto.model';
import { CompaniesService } from 'src/app/services/companies.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { DocumentData, QuerySnapshot } from '@firebase/firestore';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [DialogService]
})
export class CompaniesComponent implements OnInit {
  companiesModels: any[] = [];

  constructor(
    private firebaseService: CompaniesService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.get();
    this.firebaseService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateConvocatoriaCollection(snapshot);
    })
  }

  async get() {
    const snapshot = await this.firebaseService.getCompaniesList();
    this.updateConvocatoriaCollection(snapshot);
  }

  updateConvocatoriaCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.companiesModels = [];
    snapshot.docs.forEach((mensaje) => {
      this.companiesModels.push({ ...mensaje.data(), id: mensaje.id });
    })
  }

  show(companyModel) {
    const ref = this.dialogService.open(CompanyDetailComponent, {
      data: {
        detail: companyModel.descripcion,
        area: companyModel.area,
        logo: companyModel.logo,
      },
      header: companyModel.nombre,
      width: '70%'
    });
  }

}
