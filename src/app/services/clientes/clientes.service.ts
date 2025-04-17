import { Injectable } from '@angular/core';
import { TotalumBaseService } from '../totalum-base.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService extends TotalumBaseService {
  getClientes(page = 0, searchText = ''): Promise<any[]> {
    return this.getItems('clientes', page, 'nombre', searchText);
  }

  createCliente(data: any): Promise<any> {
    return this.createItem('clientes', data);
  }

  editClienteById(id: string, data: any): Promise<any> {
    return this.editItemById('clientes', id, data);
  }

  deleteClienteById(id: string): Promise<any> {
    return this.deleteItemById('clientes', id);
  }

  getAllClientesSinPaginacion(): Promise<any[]> {
    return this.getAllItemsSinPaginacion('clientes');
  }
}
