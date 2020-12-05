import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

// Módulo que nos permite hacer peticiones http
import { HttpClientModule } from '@angular/common/http';

// Ennvironment
import { environment } from '../environments/environment';

// Modulos de firebase
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    // // Conexión con un proyecto de firebase
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // // Módulo para trabajar con la base de datos
    // AngularFirestoreModule,
    // // Módulo para alamcenar archivos en firebase
    // AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
