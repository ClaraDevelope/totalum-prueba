import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pedidos',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './pedidos.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];
  loading = true;
  paginaActual = 0;
  hayMasPedidos = true;
  busqueda: string = '';

  constructor(
    private pedidosService: PedidosService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.cargarPagina(0);
  }

  async cargarPagina(pagina: number): Promise<void> {
    this.loading = true;
    try {
      const pedidos = await this.pedidosService.getPedidos(
        pagina,
        this.busqueda
      );

      if (pedidos.length === 0 && pagina > 0) {
        await this.cargarPagina(pagina - 1);
        return;
      }

      this.pedidos = Array.isArray(pedidos) ? pedidos : [];
      this.paginaActual = pagina;

      const siguientePagina = await this.pedidosService.getPedidos(
        pagina + 1,
        this.busqueda
      );
      this.hayMasPedidos = siguientePagina.length > 0;

      this.cdr.detectChanges();
    } catch (error) {
      console.error('❌ Error al obtener productos', error);
      this.pedidos = [];
      this.hayMasPedidos = false;
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
    if (this.hayMasPedidos) {
      this.cargarPagina(this.paginaActual + 1);
    }
  }

  filtrar(): void {
    this.cargarPagina(0);
  }

  mostrarFormulario = false;

  nuevoPedido = {
    numero_de_pedido: null,
    importe: null,
    importe_impuestos: null,
    cantidad_de_productos: null,
    fecha: null,
    nombre_cliente: '',
  };

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async crearPedido() {
    try {
      await this.pedidosService.createPedido(this.nuevoPedido);
      this.nuevoPedido = {
        numero_de_pedido: null,
        importe: null,
        importe_impuestos: null,
        cantidad_de_productos: null,
        fecha: null,
        nombre_cliente: '',
      };
      this.mostrarFormulario = false;
      await this.cargarPagina(0);
      this.mostrarToast('Pedido creado correctamente', 'exito');
    } catch (err) {
      console.error('❌ No se pudo crear el pedido');
      this.mostrarToast('Error al crear el pedido', 'error');
    }
  }

  async eliminarPedido(id: string): Promise<void> {
    try {
      await this.pedidosService.deletePedidoById(id);
      this.mostrarToast('Pedido eliminado correctamente', 'exito');

      const pedidos = await this.pedidosService.getPedidos(
        this.paginaActual,
        this.busqueda
      );

      if (pedidos.length === 0 && this.paginaActual > 0) {
        await this.cargarPagina(this.paginaActual - 1);
      } else {
        this.pedidos = pedidos;
        this.hayMasPedidos = pedidos.length === 5;
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
