import { Component, OnInit } from '@angular/core';
import { ContactoModel } from 'src/app/models/contacto.model';
import { CompaniesService } from 'src/app/services/companies.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css'],
  providers: [ConfirmationService]
})
export class ListCompaniesComponent implements OnInit {
  hiddeProgress = true;
  contacto = {
    id: '',
    nombre: ''
  }

  ContactoModelDialog: boolean;
  ContactoModels: any[] = [];

  ContactoModel: ContactoModel;
  selectedContactoModels: ContactoModel[];
  submitted: boolean;

  // contactoForm: FormGroup;
  // submitted: boolean;
  constructor(
    private firebaseService: CompaniesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {

  }

  ngOnInit(): void {

    this.get();
    this.firebaseService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateConvocatoriaCollection(snapshot);
    })


  }

  myUploader(event) {
    //event.files == files to upload
  }
  async get() {
    const snapshot = await this.firebaseService.getCompaniesList();
    this.updateConvocatoriaCollection(snapshot);
  }


  updateConvocatoriaCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.ContactoModels = [];
    snapshot.docs.forEach((mensaje) => {

      this.ContactoModels.push({ ...mensaje.data(), id: mensaje.id });
    })
  }




  openNew() {
    /*this.ContactoModel = { nombre: '', correo: '', telefono: '', mensaje: '' };
    this.submitted = false;
    this.ContactoModelDialog = true;*/
  }



  editContactoModel(ContactoModel: ContactoModel) {
    this.ContactoModel = { ...ContactoModel };
    this.ContactoModelDialog = true;
  }

  deleteContactoModel(ContactoModel: ContactoModel) {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar el mensaje de  ' + ContactoModel.nombre + '?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("id firebase" + ContactoModel.id)

        this.ContactoModels = this.ContactoModels.filter(val => val.id !== ContactoModel.id);
        this.ContactoModel;
        //this.firebaseService.deletecontacto(ContactoModel.id);
      }
    });
  }

  hideDialog() {
    this.ContactoModelDialog = false;
    this.submitted = false;
  }

  saveContactoModel() {
    this.submitted = true;

    if (this.ContactoModel.nombre.trim()) {
      if (this.ContactoModel.id) {
        //   this.firebaseService.updatecontacto(this.ContactoModel.id,this.ContactoModel.correo,this.ContactoModel.mensaje,this.ContactoModel.nombre);
      }
      else {


        // this.firebaseService.addcontacto(this.ContactoModel.correo,this.ContactoModel.mensaje,this.ContactoModel.nombre);
      }

      this.ContactoModels = [...this.ContactoModels];
      this.ContactoModelDialog = false;
      this.ContactoModel;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.ContactoModels.length; i++) {
      if (this.ContactoModels[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }


}