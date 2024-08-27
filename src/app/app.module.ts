import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './pages/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablesComponent } from './pages/tables/tables.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { HomeComponent } from './pages/home/home.component';
import { NavtopComponent } from './pages/navtop/navtop.component';
import { SignComponent } from './pages/sign/sign.component';
import { SignupComponent } from './pages/signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { MaterialModule } from './shared/material/material.module';
import { PopEmpresaComponent } from './pages/empresa/pop-empresa/pop-empresa.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { RolComponent } from './pages/rol/rol.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PopUsuarioComponent } from './pages/usuario/pop-usuario/pop-usuario.component';
import { PopRolComponent } from './pages/rol/pop-rol/pop-rol.component';
import { PopEmpleadoComponent } from './pages/empleado/pop-empleado/pop-empleado.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { PopProductoComponent } from './pages/producto/pop-producto/pop-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TablesComponent,
    NotificationsComponent,
    ProfileComponent,
    DashbordComponent,
    HomeComponent,
    NavtopComponent,
    SignComponent,
    SignupComponent,
    EmpresaComponent,
    PopEmpresaComponent,
    EmpleadoComponent,
    RolComponent,
    UsuarioComponent,
    PopUsuarioComponent,
    PopRolComponent,
    PopEmpleadoComponent,
    ProductoComponent,
    PopProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
