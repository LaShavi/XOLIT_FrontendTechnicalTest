import { ChangeDetectionStrategy, ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
import { ReservasService } from '../../../services/reservas.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';
import { EditReservaDialogComponent } from '@shared/edit-reserva-dialog/edit-reserva-dialog.component';
//import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reservar-calendario',
  standalone: true,
  imports:
  [
    TitleComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    //HttpClientModule,
    //ReservasService
  ],
  templateUrl: './reservar-calendario.component.html',
  styleUrls: ['./reservar-calendario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReservarCalendarioComponent implements OnInit {
  reservas: any[] = [];
  displayedColumns: string[] = ['id', 'clienteNombre', 'espaciosCompartidosNombre', 'fechaIniReserva', 'fechaFinReserva', 'acciones'];
  verDetallesHabilitado = true;

  constructor(private reservasService: ReservasService,private cdr: ChangeDetectorRef, private dialog: MatDialog) {}

  filtrarReservas() {
    const filtro = {
      fechaIniReserva: null,
      fechaFinReserva: null,
      clienteId: null,
      espaciosCompartidosId: null
    };

    this.reservasService.getReservasFiltradas(filtro).subscribe(
      (data) => {
        this.reservas = [...data];
        this.cdr.markForCheck();
        console.log('Reservas filtradas:', this.reservas);
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  editarReserva(id: string) {
    // Obtén los detalles de la reserva que deseas editar
    const reserva = this.reservas.find((r) => r.id === id);

    if (!reserva) {
      console.error('Reserva no encontrada');
      return;
    }

    // Abre el modal y pasa los datos
    const dialogRef = this.dialog.open(EditReservaDialogComponent, {
      width: '400px',
      data: { ...reserva }, // Pasa la reserva como datos iniciales
    });

    // Maneja la respuesta del modal
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos actualizados:', result);
        this.actualizarReserva(result);
      } else {
        console.log('Edición cancelada');
      }
    });
  }

  actualizarReserva(updatedData: any) {
    this.reservasService
      .updateReservaDates(updatedData.id, updatedData)
      .subscribe(() => {
        console.log('Reserva actualizada con éxito');
        this.filtrarReservas(); // Refresca la tabla después de actualizar
      });
  }
  eliminarReserva(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirmar eliminación', message: '¿Está seguro de que desea eliminar esta reserva?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reservasService.deleteReserva(id).subscribe(() => {
          this.reservas = this.reservas.filter((reserva) => reserva.id !== id);
          this.cdr.markForCheck();
        });
      }
    });
  }

  ngOnInit(): void {
    this.filtrarReservas();
  }

}
