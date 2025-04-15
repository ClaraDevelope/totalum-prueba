import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
];

export const appConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};
