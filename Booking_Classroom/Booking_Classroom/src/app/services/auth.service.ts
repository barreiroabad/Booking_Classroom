import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Administradores } from '../models/administradores.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  registro(usuario: Usuario) {
    return createUserWithEmailAndPassword(
      this.auth,
      usuario.email,
      usuario.password
    ).then((userCredential) => {
      const user = userCredential.user;

      return updateProfile(user, {
        displayName: usuario.nombre + ' ' + usuario.apellidos,
      });
    });
  }

  login({ email, password }: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  recuperarContraseña(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  cambiarContraseña(user: User, newPassword: string) {
    return updatePassword(user, newPassword);
  }

  getUsuario() {
    return this.auth.currentUser;
  }

  getEmailUsuario() {
    return this.getUsuario()?.email;
  }

  getEstadoConexion() {
    return authState(this.auth);
  }

  getAdministradores(): Observable<Administradores[]> {
    const adminRef = collection(this.firestore, 'administradores');
    return collectionData(adminRef, { idField: 'id' }) as Observable<
      Administradores[]
    >;
  }
}
