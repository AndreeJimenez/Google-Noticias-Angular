import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    CardComponent,
    SidebarComponent,
    ModalComponent,
    HeaderComponent,
    LoginComponent
  ],
  exports: [
    CardComponent,
    SidebarComponent,
    ModalComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ComponentsModule { }