import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatCategoriaComponent } from './pages/cat-categoria/cat-categoria.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EntradaComponent } from './pages/entrada/entrada.component';
import { SalidaComponent } from './pages/salida/salida.component';

const routes: Routes = [
 {path: 'dashboard',data:{breadcrumb: 'DashBoard'}, component: DashboardComponent},
 {path: 'entrada',data:{breadcrumb: 'Entrada'}, component: EntradaComponent},
 {path: 'salida',data:{breadcrumb: 'Salida'},component: SalidaComponent},
 {path: 'categoria',data:{breadcrumb: 'Categoria'},component: CatCategoriaComponent},

 {path: '', redirectTo:'dashboard', pathMatch: 'full'},
 //{path: '**', component: }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
