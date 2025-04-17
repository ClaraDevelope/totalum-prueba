import { ChangeDetectorRef, Directive } from '@angular/core';

@Directive()
export abstract class BaseListadoComponent<T extends { _id: string }> {
  items: T[] = [];
  loading = true;
  paginaActual = 0;
  hayMas = true;
  busqueda = '';
  mostrarFormulario = false;
  toastVisible = false;
  toastMensaje = '';
  toastTipo: 'exito' | 'error' = 'exito';

  editando: Set<string> = new Set();
  copias: Record<string, T> = {};

  constructor(private cdr: ChangeDetectorRef) {}

  abstract getItems(page: number, searchText: string): Promise<T[]>;
  abstract createItem(item: T): Promise<void>;
  abstract deleteItem(id: string): Promise<void>;
  abstract editItem(id: string, item: T): Promise<void>;

  /** Método para exportación sin paginación */
  abstract getAllSinPaginacion(): Promise<T[]>;

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

  async editar(id: string, actualizado: T): Promise<void> {
    try {
      await this.editItem(id, actualizado);
      await this.cargarPagina(this.paginaActual);
      this.mostrarToast('Elemento actualizado correctamente', 'exito');
    } catch (error) {
      console.error('❌ No se pudo editar', error);
      this.mostrarToast('Error al actualizar', 'error');
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

  async toggleEditar(item: T): Promise<void> {
    const id = item._id;
    if (this.editando.has(id)) {
      try {
        await this.editar(id, this.copias[id]);
        this.editando.delete(id);
        delete this.copias[id];
      } catch (error) {
        console.error('❌ Error al guardar edición', error);
        this.mostrarToast('Error al guardar cambios', 'error');
      }
    } else {
      this.editando.add(id);
      this.copias[id] = { ...item };
    }
  }

  cancelarEdicion(id: string): void {
    this.editando.delete(id);
    delete this.copias[id];
  }

  exportarCSV(): void {
    this.getAllSinPaginacion().then((data: T[]) => {
      if (!data || data.length === 0) return;

      const columnas = Object.keys(data[0]);
      const encabezado = columnas.join(',');
      const filas = data.map((row) => {
        return columnas
          .map((campo) => {
            const valor = row[campo as keyof T] ?? '';
            return `"${String(valor).replace(/"/g, '""')}"`;
          })
          .join(',');
      });

      const csv = [encabezado, ...filas].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'export.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
