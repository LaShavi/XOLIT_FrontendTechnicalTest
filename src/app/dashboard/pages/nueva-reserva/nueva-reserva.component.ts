import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { TitleComponent } from '@shared/title/title.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Necesario para Angular Material
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReservasService } from '../../../services/reservas.service';

@Component({
  selector: 'app-nueva-reserva',
  standalone: true,
  imports:
  [
    TitleComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NuevaReservaComponent implements OnInit {

  reservaForm: FormGroup;

  usuarios: any[] = [];
  espaciosCompartidos: any[] = [];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private reservasService: ReservasService) {
    this.reservaForm = this.fb.group({
      usuario: ['', Validators.required],
      espacio: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el listado de clientes
    this.reservasService.getClientes().subscribe(
      (data) => (this.usuarios = data),
      (error) => console.error('Error al obtener clientes:', error)
    );

    // Obtener el listado de espacios compartidos
    this.reservasService.getEspaciosCompartidos().subscribe(
      (data) => (this.espaciosCompartidos = data),
      (error) => console.error('Error al obtener espacios compartidos:', error)
    );
  }

  // onSubmit(): void {
  //   if (this.reservaForm.valid) {
  //     const formValue = this.reservaForm.value;
  //     const reserva = {
  //       ...formValue,
  //       fechaInicio: new Date(formValue.fechaInicio).toISOString(),
  //       fechaFin: new Date(formValue.fechaFin).toISOString(),
  //     };
  //     console.log('Reserva creada:', reserva);
  //     // Aquí llamas al servicio para crear la reserva
  //   } else {
  //     this.snackBar.open('Por favor, complete todos los campos.', 'Cerrar', {
  //       duration: 3000,
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      const formValue = this.reservaForm.value;
      const reserva = {
        fechaRegistro: new Date().toISOString(),
        fechaIniReserva: new Date(formValue.fechaInicio).toISOString(),
        fechaFinReserva: new Date(formValue.fechaFin).toISOString(),
        estado: 1,
        clienteId: formValue.usuario, // Asumiendo que el id del cliente es el valor seleccionado
        espaciosCompartidosId: formValue.espacio, // Asumiendo que el id del espacio es el valor seleccionado
      };

      this.reservasService.crearReserva(reserva).subscribe(
        (response) => {
          console.log('Reserva creada:', response);
          this.snackBar.open('Reserva creada exitosamente.', 'Cerrar', {
            duration: 3000,
          });
          this.reservaForm.reset(); // Resetear el formulario después de crear la reserva
        },
        (error) => {
          console.error('Error al crear la reserva:', error);
          this.snackBar.open('Hubo un error al crear la reserva.', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Por favor, complete todos los campos.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
