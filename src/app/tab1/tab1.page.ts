import {Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from '../../environments/environment';
import {RangeCustomEvent} from '@ionic/angular';
import {RangeValue} from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('player') player: ElementRef;
  isStreaming = false;
  isMuted = false;
  radioURL = environment.radioURL;
  telegramURL = environment.telegramURL;
  phoneNumber = environment.phoneNumber;
  lastEmittedValue: RangeValue;

  constructor() {
  }

  playRadio() {
    this.isStreaming = !this.isStreaming;
    if (this.isStreaming){
      this.player.nativeElement.play();
    } else {
      this.player.nativeElement.pause();
    }
  }

  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    this.player.nativeElement.volume = this.lastEmittedValue;
    this.isMuted = this.lastEmittedValue === 0;
  }

  mute() {
    this.isMuted = !this.isMuted;
    this.player.nativeElement.muted = this.isMuted;
  }

  setIcon(isMuted){
    if(isMuted){
      return 'volume-mute-outline';
    } else {
      return 'volume-medium-outline';
    }
  }
}
