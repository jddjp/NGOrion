
import { CompanyModel } from '../models/company.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {  collection, addDoc,  deleteDoc, doc, updateDoc, DocumentData, CollectionReference,  QuerySnapshot, getDocs, getFirestore, onSnapshot,  } from 'firebase/firestore';

import { Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class CompaniesService {
    db: Firestore;
  contactoCol: CollectionReference<DocumentData>;
  private updatedSnapshot = new Subject<QuerySnapshot<DocumentData>>();
  obsr_UpdatedSnapshot = this.updatedSnapshot.asObservable();
    http: any;

  //listaNominaciones: ContactoModel[] = [];

  constructor(
    private firestore: Firestore,
    private afs: Firestore,
  ){
    this.db = getFirestore();
    this.contactoCol = collection(this.db, 'companies');
   // Get Realtime Data
   onSnapshot(this.contactoCol, (snapshot) => {
    this.updatedSnapshot.next(snapshot);
  }, (err) => {
    console.log(err);
  })
  }

    getCompanies() {
     //   return this.http.get<Array<CompanyModel>>('/assets/data/companies.json');
    }

    async getCompaniesList() {
        const snapshot = await getDocs(this.contactoCol);
        return snapshot;
      }
}