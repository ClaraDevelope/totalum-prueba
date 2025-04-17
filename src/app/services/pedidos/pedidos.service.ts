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

  editPedidoById(id: string, data: any): Promise<any> {
    return this.editItemById('pedidos', id, data);
  }

  deletePedidoById(id: string): Promise<any> {
    return this.deleteItemById('pedidos', id);
  }

  getAllPedidosSinPaginacion(): Promise<any[]> {
    return this.getAllItemsSinPaginacion('pedidos');
  }
}
