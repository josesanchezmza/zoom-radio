import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayButtonComponent } from './play-button/play-button.component';
import { IonicModule } from '@ionic/angular';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export const playerFactory = () => player;

@NgModule({
  declarations: [PlayButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [PlayButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
