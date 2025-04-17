import { Component } from '@angular/core';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BaseListadoComponent } from '../base/base-listado.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './pedidos.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class PedidosComponent extends BaseListadoComponent<any> {
  nuevoPedido = {
    numero_de_pedido: null,
    importe: null,
    importe_impuestos: null,
    cantidad_de_productos: null,
    fecha: null,
    nombre_cliente: '',
  };

  constructor(private pedidosService: PedidosService, cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngOnInit(): void {
    this.cargarPagina(0);
  }

  override getItems(page: number, search: string): Promise<any[]> {
    return this.pedidosService.getPedidos(page, search);
  }

  override createItem(item: any): Promise<any> {
    return this.pedidosService.createPedido(item);
  }

  override deleteItem(id: string): Promise<any> {
    return this.pedidosService.deletePedidoById(id);
  }

  override editItem(id: string, item: any): Promise<any> {
    return this.pedidosService.editPedidoById(id, item);
  }

  override getAllSinPaginacion(): Promise<any[]> {
    return this.pedidosService.getAllPedidosSinPaginacion();
  }
}
