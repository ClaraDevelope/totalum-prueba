import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BaseListadoComponent } from '../base/base-listado.component';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-productos',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class ProductosComponent extends BaseListadoComponent<any> {
  nuevoProducto = {
    nombre: '',
    precio: null,
    categoria: '',
    cantidad: null,
  };

  constructor(
    private productosService: ProductosService,
    cdr: ChangeDetectorRef
  ) {
    super(cdr);
  }
  ngOnInit(): void {
    this.cargarPagina(0);
  }

  override getItems(page: number, search: string): Promise<any[]> {
    return this.productosService.getProductos(page, search);
  }

  override createItem(item: any): Promise<any> {
    return this.productosService.createProducto(item);
  }

  override deleteItem(id: string): Promise<any> {
    return this.productosService.deleteProductoById(id);
  }

  override editItem(id: string, item: any): Promise<any> {
    return this.productosService.editProductoById(id, item);
  }

  override getAllSinPaginacion(): Promise<any[]> {
    return this.productosService.getAllProductosSinPaginacion();
  }
}
