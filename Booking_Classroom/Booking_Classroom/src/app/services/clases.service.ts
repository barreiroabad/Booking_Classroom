import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Aula } from '../models/aula.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Reservas } from '../models/reservas.model';

@Injectable({
  providedIn: 'root',
})
export class ClasesService implements OnInit {
  //aulas: Aula[] = [];
  constructor(private firestore: Firestore, private authService: AuthService) {}
  ngOnInit() {
    //this.getAulas().subscribe((aulas) => (this.aulas = aulas));
  }

  addAula(aula: Aula) {
    const aulaRef = collection(this.firestore, 'aulas');
    return addDoc(aulaRef, aula);
  }

  deleteAula(aula: Aula) {
    const aulaRef = doc(this.firestore, 'aulas', aula.id);
    return deleteDoc(aulaRef);
  }

  getAulas(): Observable<Aula[]> {
    const aulaRef = collection(this.firestore, 'aulas');
    return collectionData(aulaRef, { idField: 'id' }) as Observable<Aula[]>;
  }

  addReserva(reserva: Reservas) {
    const reservasRef = collection(this.firestore, 'reservas');
    return addDoc(reservasRef, reserva);
  }

  deleteReserva(reserva: Reservas) {
    const reservaRef = doc(this.firestore, 'reservas', reserva.id);
    return deleteDoc(reservaRef);
  }

  getReservas(): Observable<Reservas[]> {
    const reservaRef = collection(this.firestore, 'reservas');
    return collectionData(reservaRef, { idField: 'id' }) as Observable<Reservas[]>;
  }
}
