import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs/tabs.component';


@NgModule({
  declarations: [
    HeaderComponent,
    TabsComponent
  ],
  exports: [
    HeaderComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
