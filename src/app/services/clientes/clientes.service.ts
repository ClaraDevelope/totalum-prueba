import { Injectable } from '@angular/core';
import { TotalumApiSdk } from 'totalum-api-sdk';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private totalumSdk: TotalumApiSdk;

  constructor() {
    const options = {
      apiKey: environment.totalumApiKey,
    };
    this.totalumSdk = new TotalumApiSdk(options);
  }
  async getClientes(page: number = 0, searchText: string = ''): Promise<any[]> {
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
      const response = await this.totalumSdk.crud.getItems('clientes', query);
      return response.data.data;
    } catch (error: any) {
      console.error('❌ Error:', error?.toString());
      console.error(error?.response?.data);
      return [];
    }
  }
  async createCliente(nuevoCliente: any): Promise<any> {
    try {
      const response = await this.totalumSdk.crud.createItem(
        'clientes',
        nuevoCliente
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al crear producto:', error?.toString());
      console.error(error?.response?.data);
      throw error;
    }
  }

  async deleteClienteById(id: string): Promise<any> {
    try {
      const response = await this.totalumSdk.crud.deleteItemById(
        'clientes',
        id
      );
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al eliminar cliente:', error?.toString());
      console.error(error?.response?.data);
      throw error;
    }
  }
}
