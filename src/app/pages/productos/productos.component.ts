import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos/productos.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

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
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  loading = true;
  paginaActual = 0;
  hayMasProductos = true;
  busqueda: string = '';

  constructor(
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.cargarPagina(0);
  }

  async cargarPagina(pagina: number): Promise<void> {
    this.loading = true;
    try {
      const productos = await this.productosService.getProductos(
        pagina,
        this.busqueda
      );

      if (productos.length === 0 && pagina > 0) {
        await this.cargarPagina(pagina - 1);
        return;
      }

      this.productos = Array.isArray(productos) ? productos : [];
      this.paginaActual = pagina;

      const siguientePagina = await this.productosService.getProductos(
        pagina + 1,
        this.busqueda
      );
      this.hayMasProductos = siguientePagina.length > 0;

      this.cdr.detectChanges();
    } catch (error) {
      console.error('❌ Error al obtener productos', error);
      this.productos = [];
      this.hayMasProductos = false;
    } finally {
      this.loading = false;
    }
  }

  anterior(): void {
    if (this.paginaActual > 0) {
      this.cargarPagina(this.paginaActual - 1);
    }
  }

  siguiente(): void {
    if (this.hayMasProductos) {
      this.cargarPagina(this.paginaActual + 1);
    }
  }

  filtrar(): void {
    this.cargarPagina(0);
  }

  mostrarFormulario = false;

  nuevoProducto = {
    nombre: '',
    precio: null,
    categoria: '',
    cantidad: null,
  };

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async crearProducto() {
    try {
      await this.productosService.createProducto(this.nuevoProducto);
      this.nuevoProducto = {
        nombre: '',
        precio: null,
        categoria: '',
        cantidad: null,
      };
      this.mostrarFormulario = false;
      await this.cargarPagina(0);
      this.mostrarToast('Producto creado correctamente', 'exito');
    } catch (err) {
      console.error('❌ No se pudo crear el producto');
      this.mostrarToast('Error al crear el producto', 'error');
    }
  }

  async eliminarProducto(id: string): Promise<void> {
    try {
      await this.productosService.deleteProductoById(id);
      this.mostrarToast('Producto eliminado correctamente', 'exito');

      const productos = await this.productosService.getProductos(
        this.paginaActual,
        this.busqueda
      );

      if (productos.length === 0 && this.paginaActual > 0) {
        await this.cargarPagina(this.paginaActual - 1);
      } else {
        this.productos = productos;
        this.hayMasProductos = productos.length === 5;
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('❌ No se pudo eliminar el producto');
      this.mostrarToast('Error al eliminar el producto', 'error');
    }
  }

  toastVisible = false;
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';

  mostrarToast(mensaje: string, tipo: 'exito' | 'error' = 'exito') {
    this.toastMensaje = mensaje;
    this.toastTipo = tipo;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }
}
