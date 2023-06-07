import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MostrarNavbarService {

  private mostrarNavBarSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  setMostrarNavBar(valor: boolean) {
    this.mostrarNavBarSubject.next(valor);
  }

  getMostrarNavBar(): Observable<boolean> {
    return this.mostrarNavBarSubject.asObservable();
  }
}
