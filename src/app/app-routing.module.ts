import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TablesComponent } from './pages/tables/tables.component';
import { HomeComponent } from './pages/home/home.component';
import { BillingComponent } from './pages/billing/billing.component';
import { RtlComponent } from './pages/rtl/rtl.component';
import { VirtualComponent } from './pages/virtual/virtual.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignComponent } from './pages/sign/sign.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { RolComponent } from './pages/rol/rol.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { ProductoComponent } from './pages/producto/producto.component';


const routes: Routes = [
  {path:'', component:SignComponent},
  {path:'home', component:HomeComponent},
  {path:'tables', component:TablesComponent},
  {path:'empresa', component:EmpresaComponent},
  {path:'rol', component:RolComponent},
  {path:'usuario', component:UsuarioComponent},
  {path:'empleado', component:EmpleadoComponent},
  {path: 'billing', component:BillingComponent},
  {path: 'rtl', component:RtlComponent},
  {path: 'virtual', component:VirtualComponent},
  {path: 'notifications', component:NotificationsComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'sign', component:SignComponent},
  {path: 'producto', component:ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
