import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminPageRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin.page';
import { AudioPlayerComponent } from '../components/audio-player/audio-player.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdminPageRoutingModule],
  declarations: [AdminPage, AudioPlayerComponent],
  exports: [AudioPlayerComponent],
})
export class AdminPageModule {}
