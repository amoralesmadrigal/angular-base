import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from './material-module/material-module.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CuestionarioIntegralComponent } from './pages/cuestionario-integral/cuestionario-integral.component';
import { ResultadoIntegralComponent } from './pages/resultado-integral/resultado-integral.component';
import { ServerStatusComponentComponent } from './pages/server-status-component/server-status-component.component';
@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModuleModule,
        ContactFormComponent,
        HeaderComponent,
        HomeComponent,
        CuestionarioIntegralComponent,
        ResultadoIntegralComponent,
        ServerStatusComponentComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
