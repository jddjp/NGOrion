import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';

// RUTAS
import { AppRoutingModule } from 'src/app/app-routing.module';

//Configuracion Firebase
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.prod';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import {
  provideStorage,
  getStorage,
  StorageModule,
} from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { QRCodeModule } from 'angularx-qrcode';
import {ProgressBarModule} from 'primeng/progressbar';

//Prime Components
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';

// Idioma Español
import { DatePipe, TitleCasePipe } from '@angular/common';
import { CompaniesService } from './services/companies.service';
import { CompaniesComponent } from './modules/user/companies/companies.component';
import { CompanyDetailComponent } from './modules/user/company-detail/company-detail.component';


@NgModule({
  declarations: [
    AppComponent, 
    CompaniesComponent, 
    CompanyDetailComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    //Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    AngularFireModule,
    AngularFirestoreModule,
    StorageModule,
    AngularFireAuthModule,
    //QR
    QRCodeModule,
    DataViewModule,
    PanelModule,
    DynamicDialogModule,
    DialogModule,
    InputTextModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ProgressBarModule,
  ],
  providers: [
    DatePipe, 
    TitleCasePipe, 
    CompaniesService, 
    DialogService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
