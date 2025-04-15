import { Injectable } from '@angular/core';
import { TotalumApiSdk } from 'totalum-api-sdk';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private totalumSdk: TotalumApiSdk;

  constructor() {
    const options = {
      apiKey: environment.totalumApiKey,
    };
    this.totalumSdk = new TotalumApiSdk(options);
  }
  async getProductos(
    page: number = 0,
    searchText: string = ''
  ): Promise<any[]> {
    try {
      const query: any = {
        sort: { createdAt: 1 },
        pagination: {
          page,
          limit: 5,
        },
      };

      if (searchText.trim()) {
        query.filter = [{ nombre: { regex: searchText, options: 'i' } }];
      }
      const response = await this.totalumSdk.crud.getItems('productos', query);
      return response.data.data;
    } catch (error: any) {
      console.error('❌ Error:', error?.toString());
      console.error(error?.response?.data);
      return [];
    }
  }
  async createProducto(nuevoProducto: any): Promise<any> {
    try {
      const response = await this.totalumSdk.crud.createItem(
        'productos',
        nuevoProducto
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al crear producto:', error?.toString());
      console.error(error?.response?.data);
      throw error;
    }
  }
  async deleteProductoById(id: string): Promise<any> {
    try {
      const response = await this.totalumSdk.crud.deleteItemById(
        'productos',
        id
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al eliminar producto:', error?.toString());
      console.error(error?.response?.data);
      throw error;
    }
  }
}
