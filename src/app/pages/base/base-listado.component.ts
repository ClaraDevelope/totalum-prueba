import { ChangeDetectorRef, Directive } from '@angular/core';

@Directive()
export abstract class BaseListadoComponent<T> {
  items: T[] = [];
  loading = true;
  paginaActual = 0;
  hayMas = true;
  busqueda = '';
  mostrarFormulario = false;
  toastVisible = false;
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';

  constructor(private cdr: ChangeDetectorRef) {}

  abstract getItems(page: number, searchText: string): Promise<T[]>;
  abstract createItem(item: T): Promise<void>;
  abstract deleteItem(id: string): Promise<void>;

  async cargarPagina(pagina: number): Promise<void> {
    this.loading = true;
    try {
      const items = await this.getItems(pagina, this.busqueda);

      if (items.length === 0 && pagina > 0) {
        await this.cargarPagina(pagina - 1);
        return;
      }

      this.items = items;
      this.paginaActual = pagina;

      const siguientePagina = await this.getItems(pagina + 1, this.busqueda);
      this.hayMas = siguientePagina.length > 0;

      this.cdr.detectChanges();
    } catch (error) {
      console.error('❌ Error al obtener datos', error);
      this.items = [];
      this.hayMas = false;
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
    if (this.hayMas) {
      this.cargarPagina(this.paginaActual + 1);
    }
  }

  filtrar(): void {
    this.cargarPagina(0);
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  async crear(nuevo: T): Promise<void> {
    try {
      await this.createItem(nuevo);
      this.mostrarFormulario = false;
      await this.cargarPagina(0);
      this.mostrarToast('Elemento creado correctamente', 'exito');
    } catch (err) {
      console.error('❌ No se pudo crear', err);
      this.mostrarToast('Error al crear', 'error');
    }
  }

  async eliminar(id: string): Promise<void> {
    try {
      await this.deleteItem(id);
      this.mostrarToast('Elemento eliminado correctamente', 'exito');
      const items = await this.getItems(this.paginaActual, this.busqueda);

      if (items.length === 0 && this.paginaActual > 0) {
        await this.cargarPagina(this.paginaActual - 1);
      } else {
        this.items = items;
        this.hayMas = items.length === 5;
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('❌ No se pudo eliminar', error);
      this.mostrarToast('Error al eliminar', 'error');
    }
  }

  mostrarToast(mensaje: string, tipo: 'exito' | 'error' = 'exito'): void {
    this.toastMensaje = mensaje;
    this.toastTipo = tipo;
    this.toastVisible = true;
    setTimeout(() => (this.toastVisible = false), 3000);
  }
}
