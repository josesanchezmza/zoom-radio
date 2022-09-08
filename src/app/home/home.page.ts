import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { environment } from '../../environments/environment';
import { RangeValue } from '@ionic/core';
import { AlertController, RangeCustomEvent } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit, OnDestroy {
  @ViewChild('player') player: ElementRef;
  audioSrcError = false;
  isPlaying = false;
  isMuted = false;
  radioURL = environment.radioURL;
  telegramURL = environment.telegramURL;
  phoneNumber = environment.phoneNumber;
  lastEmittedValue: RangeValue;
  listeners: number;
  offline = false;
  isServerActive = false;
  isSourceActive = false;
  isNetworkOnline = false;
  alertNetwork = this.alertController.create({
    header: 'No tenés conexión de internet.',
    message:
      'Si al recuperar la conexión no escuchas la radio, recargá la página.',
  });
  isNetworkSubscription = this.dataService.networkStatus$.subscribe((value) => {
    this.isNetworkOnline = value;
    if (!this.isNetworkOnline) {
      this.alertNetwork.then((alert) => alert.present());
    } else {
      this.alertNetwork.then((alert) => alert.dismiss());
    }
  });
  isPlayingSubscription = this.dataService.isPlayingAudio$.subscribe(
    (isPlaying) => {
      this.isPlaying = isPlaying;
    }
  );
  radioInfoSubscription = this.dataService.radioInfo$.subscribe((radioInfo) => {
    if (radioInfo) {
      this.isServerActive = radioInfo.server === 'Activo';
      this.isSourceActive = radioInfo.source === 'Si';
      this.offline = radioInfo.offline;
      this.listeners = radioInfo.listeners;

      if (!this.isServerActive && this.player) {
        this.player.nativeElement.pause();
      }
    }
  });

  constructor(
    private dataService: DataService,
    private alertController: AlertController
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Reconectando',
      message:
        'Se está intentando reconectar la fuente de sonido.<hr>Si esto tarda demasiado, intenta recargar la página.',
      buttons: ['OK'],
    });

    await alert.present();

    setTimeout(() => {
      this.audioSrcError = false;
      alert.dismiss();
    }, 10000);
  }

  ngOnDestroy() {
    this.isPlayingSubscription.unsubscribe();
    this.radioInfoSubscription.unsubscribe();
  }

  playRadio() {
    if (this.isPlaying) {
      this.player.nativeElement.pause();
    } else {
      try {
        this.player.nativeElement.play();
      } catch (e) {
        console.log(e);
      }
    }
  }

  ngAfterViewInit() {
    this.player.nativeElement.addEventListener('error', () => {
      if (!this.isServerActive) {
        return;
      }

      if (!this.audioSrcError) {
        this.presentAlert().then();
        this.audioSrcError = true;
      }

      setTimeout(() => {
        this.radioURL =
          this.player.nativeElement.currentSrc === environment.autodjURL
            ? environment.radioURL
            : environment.autodjURL;
      }, 5000);
    });

    this.player.nativeElement.addEventListener('play', () => {
      this.dataService.setPlayingValue(true);
    });

    this.player.nativeElement.addEventListener('pause', () => {
      this.dataService.setPlayingValue(false);
    });
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

  // updateRadioInfo(milliSeconds: number) {
  //   let milliseconds = 0;
  //   setInterval(() => {
  //     this.dataService.getRadioInfo().subscribe(({ data }) => {
  //       const { listeners, offline, server } = data[0];
  //       this.listeners = listeners;
  //       this.offline = offline;
  //       // this.isServerActive = server === 'Activo';
  //       this.isServerActive = false;
  //       milliseconds = milliSeconds;
  //     });
  //   }, milliseconds);
  // }
}
