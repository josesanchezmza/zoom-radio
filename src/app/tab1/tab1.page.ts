import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../environments/environment';
import {NavController, RangeCustomEvent} from '@ionic/angular';
import {RangeValue} from '@ionic/core';
import { Howl } from 'howler';

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
  radioPlayer = new Howl({
    src: `${this.radioURL}.aac`,
    html5: true
  });

  constructor(private navCtrl: NavController) {
    // this.radioZoom.src = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3';

  }

  // ngOnInit(){
  //   console.log('ngOnInit');
  //   this.loadRadio();
  // }
  // ionViewDidLoad(){
  //
  // }
  // ionWillEnter(){
  //   console.log('ionWillEnter');
  //   // this.loadRadio();
  // }

  playRadio() {
    this.isStreaming = !this.isStreaming;
    if (this.isStreaming){
      this.radioPlayer.play();
    } else {
      this.radioPlayer.pause();
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    this.player.nativeElement.volume = this.lastEmittedValue;
    this.isMuted = this.lastEmittedValue === 0;
  }

  mute() {
    // this.isMuted = !this.isMuted;
    this.radioPlayer.muted = true;
  }

  setIcon(isMuted){
    if(isMuted){
      return 'volume-mute-outline';
    } else {
      return 'volume-medium-outline';
    }
  }
}
