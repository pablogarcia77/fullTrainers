import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/layout/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './modules/material/material.module';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EntrenadorModule } from './components/entrenador/entrenador.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/layout/login/login.component';
import { PanelComponent } from './components/layout/panel/panel.component';
import { NotfoundComponent } from './components/layout/notfound/notfound.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    RegistroComponent,
    LoginComponent,
    PanelComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    EntrenadorModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
