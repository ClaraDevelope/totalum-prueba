import { Injectable } from '@angular/core';
import { TotalumApiSdk } from 'totalum-api-sdk';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private totalumSdk: TotalumApiSdk;

  constructor() {
    const options = {
      apiKey: environment.totalumApiKey,
    };
    this.totalumSdk = new TotalumApiSdk(options);
  }
  async getPedidos(page: number = 0, searchText: string = ''): Promise<any[]> {
    try {
      const query: any = {
        sort: { createdAt: 1 },
        pagination: {
          page,
          limit: 5,
        },
      };

      if (searchText.trim()) {
        query.filter = [
          { nombre_cliente: { regex: searchText, options: 'i' } },
        ];
      }
      const response = await this.totalumSdk.crud.getItems('pedidos', query);
      return response.data.data;
    } catch (error: any) {
      console.error('❌ Error:', error?.toString());
      console.error(error?.response?.data);
      return [];
    }
  }

  async createPedido(nuevoPedido: any): Promise<any> {
    try {
      const response = await this.totalumSdk.crud.createItem(
        'pedidos',
        nuevoPedido
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al crear producto:', error?.toString());
      console.error(error?.response?.data);
      throw error;
    }
  }

  async deletePedidoById(id: string): Promise<any> {
    try {
      const response = await this.totalumSdk.crud.deleteItemById('pedidos', id);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al eliminar producto:', error?.toString());
      console.error(error?.response?.data);
      throw error;
    }
  }
}
