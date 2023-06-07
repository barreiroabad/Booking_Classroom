import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css'],
})
export class CrearClaseComponent {
  form: FormGroup;
  hide = true;
  selected1 = '';
  selected2 = '';
  selected3 = '';
  selected4 = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      aula: [null, Validators.required],
      aforo: [null, Validators.required],
      hora_inicial: [{ value: null }, Validators.required],
      hora_final: [{ value: null }, Validators.required],
      fecha: [null, Validators.required],
      ordenadores: ['option2', Validators.required],
      cantidadOrdenadores: [{ value: '', disabled: true }, Validators.required],
      proyector: ['option2', Validators.required],
    });
  }

  ngOnInit() {
    this.form.get('ordenadores')?.valueChanges.subscribe((value) => {
      if (value === 'option1') {
        this.form.get('cantidadOrdenadores')?.enable();
      } else {
        this.form.get('cantidadOrdenadores')?.disable();
      }
    });
  }

  getErrorMessage() {
    return 'Campo obligatorio';
  }

  onEntrar() {
    console.log(this.form);
    this.router.navigate(['inicio']);
  }
}
