import { Injectable } from '@angular/core';
import { TotalumBaseService } from '../totalum-base.service';
@Injectable({
  providedIn: 'root',
})
export class PedidosService extends TotalumBaseService {
  getPedidos(page = 0, searchText = ''): Promise<any[]> {
    return this.getItems('pedidos', page, 'nombre_cliente', searchText);
  }

  createPedido(data: any): Promise<any> {
    return this.createItem('pedidos', data);
  }

  deletePedidoById(id: string): Promise<any> {
    return this.deleteItemById('pedidos', id);
  }
}
