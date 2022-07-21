import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayButtonComponent} from "./play-button/play-button.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [
    PlayButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PlayButtonComponent
  ]
})
export class ComponentsModule { }
