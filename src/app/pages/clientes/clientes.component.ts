import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientesService } from '../../services/clientes/clientes.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clientes',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  loading = true;
  paginaActual = 0;
  hayMasClientes = true;
  busqueda: string = '';

  constructor(
    private clientesService: ClientesService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.cargarPagina(0);
  }

  async cargarPagina(pagina: number): Promise<void> {
    this.loading = true;
    try {
      const clientes = await this.clientesService.getClientes(
        pagina,
        this.busqueda
      );

      if (clientes.length === 0 && pagina > 0) {
        await this.cargarPagina(pagina - 1);
        return;
      }

      this.clientes = Array.isArray(clientes) ? clientes : [];
      this.paginaActual = pagina;

      const siguientePagina = await this.clientesService.getClientes(
        pagina + 1,
        this.busqueda
      );
      this.hayMasClientes = siguientePagina.length > 0;

      this.cdr.detectChanges();
    } catch (error) {
      console.error('❌ Error al obtener productos', error);
      this.clientes = [];
      this.hayMasClientes = false;
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
    if (this.hayMasClientes) {
      this.cargarPagina(this.paginaActual + 1);
    }
  }

  filtrar(): void {
    this.cargarPagina(0);
  }

  mostrarFormulario = false;

  nuevoCliente = {
    nombre: '',
    fecha_de_nacimiento: null,
    email: '',
    telefono: null,
  };

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async crearCliente() {
    try {
      await this.clientesService.createCliente(this.nuevoCliente);
      this.nuevoCliente = {
        nombre: '',
        fecha_de_nacimiento: null,
        email: '',
        telefono: null,
      };
      this.mostrarFormulario = false;
      await this.cargarPagina(0);
      this.mostrarToast('Cliente creado correctamente', 'exito');
    } catch (err) {
      console.error('❌ No se pudo crear el cliente');
      this.mostrarToast('Error al crear el cliente', 'error');
    }
  }

  async eliminarCliente(id: string): Promise<void> {
    try {
      await this.clientesService.deleteClienteById(id);
      this.mostrarToast('Cliente eliminado correctamente', 'exito');

      const clientes = await this.clientesService.getClientes(
        this.paginaActual,
        this.busqueda
      );

      if (clientes.length === 0 && this.paginaActual > 0) {
        await this.cargarPagina(this.paginaActual - 1);
      } else {
        this.clientes = clientes;
        this.hayMasClientes = clientes.length === 5;
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('❌ No se pudo eliminar el cliente');
      this.mostrarToast('Error al eliminar el cliente', 'error');
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
