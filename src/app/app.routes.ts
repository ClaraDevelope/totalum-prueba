import { Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: '**', redirectTo: 'productos' },
];
