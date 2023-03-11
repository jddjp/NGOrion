
import { CompanyModel } from '../models/company.model'; 
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, addDoc, deleteDoc, doc, updateDoc, DocumentData, CollectionReference, QuerySnapshot, getDocs, getFirestore, onSnapshot, } from 'firebase/firestore';

import { Subject } from 'rxjs';
import { ConstantsComponent } from '../constants/constants.component';
import { VariablesService } from './variablesGL.service';
@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  db: Firestore;
  companyCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();
  http: any;

  constructor(
    private firestore: Firestore,
    private afs: Firestore,
    private variablesGL: VariablesService,
  ) {
    this.db = getFirestore();
    this.companyCol = collection(this.db, ConstantsComponent.company_collection);
    // Get Realtime Data
    onSnapshot(this.companyCol, (snapshot) => {
      this.updatedSnapshot.next(snapshot);
    }, (err) => {
      console.log(err);
    })
  }

  async addCompany(company: CompanyModel) {
    await addDoc(collection(this.afs, ConstantsComponent.company_collection), company)
      .then(docRef => {
        console.log('La empresa se grabo con el ID: ', docRef.id);
        this.variablesGL.endProcessNominacion.next(docRef.id);
      })
      .catch(error => {
        console.log('La empresa no se grabo: ', error);
        this.variablesGL.endProcessNominacion.next('');
      });
  }

  async getCompaniesList() {
    const snapshot = await getDocs(this.companyCol);
    return snapshot;
  }
}