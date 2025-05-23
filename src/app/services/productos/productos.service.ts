import { Injectable } from '@angular/core';
import { TotalumBaseService } from '../totalum-base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService extends TotalumBaseService {
  getProductos(page = 0, searchText = ''): Promise<any[]> {
    return this.getItems('productos', page, 'nombre', searchText);
  }

  createProducto(data: any): Promise<any> {
    return this.createItem('productos', data);
  }

  editProductoById(id: string, data: any): Promise<any> {
    return this.editItemById('productos', id, data);
  }

  deleteProductoById(id: string): Promise<any> {
    return this.deleteItemById('productos', id);
  }

  getAllProductosSinPaginacion(): Promise<any[]> {
    return this.getAllItemsSinPaginacion('productos');
  }
}
