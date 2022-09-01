import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { RangeValue } from '@ionic/core';
import { RangeCustomEvent } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { interval } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('player') player: ElementRef;
  isStreaming = false;
  isMuted = false;
  radioURL = environment.radioURL;
  telegramURL = environment.telegramURL;
  phoneNumber = environment.phoneNumber;
  lastEmittedValue: RangeValue;
  listeners: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getRadioInfo();
    this.updateRadioInfo(2 * 60 * 1000);
  }

  playRadio() {
    this.isStreaming = !this.isStreaming;
    if (this.isStreaming) {
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
      this.listeners = data[0].listeners;
      console.log('getRadioInfo: ', this.listeners);
    });
  }
}
