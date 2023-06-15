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
import { stateChanges } from '@angular/fire/database';

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

    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;

        return updateProfile(user, {
          displayName: nombre + ' ' + apellidos,
        });
      }
    );
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
}
