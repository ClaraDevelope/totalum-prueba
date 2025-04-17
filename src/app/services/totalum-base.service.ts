import { Injectable } from '@angular/core';
import { TotalumApiSdk } from 'totalum-api-sdk';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TotalumBaseService {
  protected sdk: TotalumApiSdk;

  constructor() {
    const options = {
      apiKey: environment.totalumApiKey,
    };
    this.sdk = new TotalumApiSdk(options);
  }

  async getItems(
    collection: string,
    page: number = 0,
    searchField = '',
    searchText = ''
  ): Promise<any[]> {
    try {
      const query: any = {
        sort: [{ field: 'createdAt', direction: 'asc' }],
        pagination: { page, limit: 5 },
      };

      if (searchText.trim()) {
        query.filter = [{ [searchField]: { regex: searchText, options: 'i' } }];
      }

      const response = await this.sdk.crud.getItems(collection, query);
      return response.data.data;
    } catch (error: any) {
      console.error(`❌ Error al obtener ${collection}:`, error?.toString());
      console.error(error?.response?.data);
      return [];
    }
  }

  async createItem(collection: string, data: any): Promise<any> {
    try {
      const response = await this.sdk.crud.createItem(collection, data);
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al crear en ${collection}:`, error?.toString());
      console.error(error?.response?.data);
      throw error;
    }
  }

  async editItemById(collection: string, id: string, data: any): Promise<any> {
    try {
      const response = await this.sdk.crud.editItemById(collection, id, data);
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al editar en ${collection}:`, error?.toString());
      console.error(error?.response?.data);
      throw error;
    }
  }

  async deleteItemById(collection: string, id: string): Promise<any> {
    try {
      const response = await this.sdk.crud.deleteItemById(collection, id);
      return response.data;
    } catch (error: any) {
      console.error(
        `❌ Error al eliminar en ${collection}:`,
        error?.toString()
      );
      console.error(error?.response?.data);
      throw error;
    }
  }

  async getAllItemsSinPaginacion(collection: string): Promise<any[]> {
    try {
      const query: any = {
        sort: [{ field: 'createdAt', direction: 'desc' }],
        pagination: { page: 0, limit: 1000 },
      };

      const response = await this.sdk.crud.getItems(collection, query);
      return response.data.data;
    } catch (error: any) {
      console.error(
        `❌ Error al obtener todos los items de ${collection}:`,
        error?.toString()
      );
      console.error(error?.response?.data);
      return [];
    }
  }
}
