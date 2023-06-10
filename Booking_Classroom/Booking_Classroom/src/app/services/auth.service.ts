import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  registro({
    nombre,
    apellidos,
    email,
    password,
  }: {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
  }) {
    const userData = {
      nombre,
      apellidos,
      email,
      password,
    };

    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}: {email: string, password: string}) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
