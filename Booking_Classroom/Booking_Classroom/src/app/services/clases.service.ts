import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Aula } from '../models/aula.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  addAula(aula: Aula) {
    const aulaRef = collection(this.firestore, 'aulas');
    return addDoc(aulaRef, aula);
  }

  getAulas(): Observable<Aula[]> {
    const aulaRef = collection(this.firestore, 'aulas');
    return collectionData(aulaRef, {idField: 'id'}) as Observable<Aula[]>;
  }

  addReserva(aula: Aula) {
    const aulaRef = doc(this.firestore, 'aulas', aula.id);
    const reserva = {
      reservada: true,
      email: this.authService.getEmailUsuario()
    };
    return updateDoc(aulaRef, { reserva });
  }
}
