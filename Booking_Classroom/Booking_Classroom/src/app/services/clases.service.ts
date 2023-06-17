import { Injectable, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Aula } from '../models/aula.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClasesService implements OnInit {
  aulas: Aula[] = [];
  constructor(private firestore: Firestore, private authService: AuthService) {}
  ngOnInit() {
    this.getAulas().subscribe((aulas) => (this.aulas = aulas));
  }

  addAula(aula: Aula) {
    const aulaRef = collection(this.firestore, 'aulas');
    return addDoc(aulaRef, aula);
  }

  deleteAula(aula: Aula) {
    const aulaRef = doc(this.firestore, 'aulas', aula.id);
    return deleteDoc(aulaRef)
  }

  getAulas(): Observable<Aula[]> {
    const aulaRef = collection(this.firestore, 'aulas');
    return collectionData(aulaRef, {idField: 'id'}) as Observable<Aula[]>;
  }

  addReserva(aula: Aula, fecha: { seconds: number; miliseconds: number }) {
    const aulaRef = doc(this.firestore, 'aulas', aula.id);
    const reserva = {
      reservada: true,
      email: this.authService.getEmailUsuario(),
      fecha: {
        seconds: fecha.seconds,
        miliseconds: fecha.miliseconds
      }
    };
    return updateDoc(aulaRef, { reserva });
  }

  deleteReserva(aula: Aula) {
    const aulaRef = doc(this.firestore, 'aulas', aula.id);
    const reserva = {
      reservada: false,
      email: null,
      fecha: null

    };
    return updateDoc(aulaRef, { reserva });
  }
}
