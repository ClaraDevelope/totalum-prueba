import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes/clientes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BaseListadoComponent } from '../base/base-listado.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clientes',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class ClientesComponent extends BaseListadoComponent<any> {
  nuevoCliente = {
    nombre: '',
    fecha_de_nacimiento: null,
    email: '',
    telefono: null,
  };

  constructor(
    private clientesService: ClientesService,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
  }

  ngOnInit(): void {
    this.cargarPagina(0);
  }
  override getItems(page: number, search: string): Promise<any[]> {
    return this.clientesService.getClientes(page, search);
  }

  override createItem(item: any): Promise<any> {
    return this.clientesService.createCliente(item);
  }

  override deleteItem(id: string): Promise<any> {
    return this.clientesService.deleteClienteById(id);
  }
}
