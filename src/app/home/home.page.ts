import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { RangeValue } from '@ionic/core';
import { RangeCustomEvent } from '@ionic/angular';
import { DataService, Datum, RadioInfo } from '../services/data.service';
import { interval } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('player') player: ElementRef;
  // this.dataService.isStreaming = false;
  isMuted = false;
  radioURL = environment.radioURL;
  telegramURL = environment.telegramURL;
  phoneNumber = environment.phoneNumber;
  lastEmittedValue: RangeValue;
  listeners: any;
  radioInfo: Datum;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getRadioInfo();
    // this.updateRadioInfo(2 * 60 * 1000);
    this.updateRadioInfo(5000);
  }

  playRadio() {
    if (this.dataService.isStreaming) {
      this.player.nativeElement.pause();
    } else {
      this.player.nativeElement.play();
    }
    this.dataService.isStreaming = !this.dataService.isStreaming;
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

  setIcon(isMuted) {
    if (isMuted) {
      return 'volume-mute-outline';
    } else {
      return 'volume-medium-outline';
    }
  }

  updateRadioInfo(milliseconds: number) {
    setInterval(() => {
      this.getRadioInfo();
      console.log('setInterval');
    }, milliseconds);
  }
  getRadioInfo() {
    // interval(1 * 60 * 1000)
    //   .pipe(mergeMap(() => this.dataService.getRadioInfo()))
    //   .subscribe(({ data }) => {
    //     this.listeners = data[0].listeners;
    //     console.log('listeners: ', this.listeners);
    //   });

    this.dataService.getRadioInfo().subscribe(({ data }) => {
      this.radioInfo = data[0];
      this.listeners = data[0].listeners;
      console.log('RadioInfo: ', this.radioInfo);
      if (
        //TODO: REVISAR LOGICA PARA CAMBIAR EL SRC DEL AUDIO PLAYER TENIENDO EN CUENTA LA DATA OBTENIDA DEL WEB SERVICE
        this.radioInfo.autodj &&
        this.radioInfo.autodj === 'Activo' &&
        this.radioInfo.source === 'No'
      ) {
        this.radioURL = environment.autoDjURL;
      } else {
        this.radioURL = environment.radioURL;
      }
    });
  }
}
