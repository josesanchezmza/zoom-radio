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
  isAlertCreated = false;
  isPlaying = false;
  isMuted = false;
  radioURL = environment.radioURL;
  telegramURL = environment.telegramURL;
  phoneNumber = environment.phoneNumber;
  lastEmittedValue: RangeValue;
  listenersTotal: number;
  isOffline = false;
  isServerActive = true;
  isSourceActive = true;
  isAutoDjActive = false;
  isNetworkOnline = true;
  canPlayRadio = true;
  isNetworkSubscription = this.dataService.networkStatus$.subscribe((value) => {
    if (value !== null) {
      this.isNetworkOnline = value;
      if (!this.isNetworkOnline) {
        this.presentNetworkAlert();
      } else if (this.isNetworkOnline && this.isAlertCreated) {
        this.alertController.dismiss(null, 'cancel');
      }
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
      this.isAutoDjActive = radioInfo.autodj === 'Activo';
      this.isSourceActive = radioInfo.source === 'Si';
      this.isOffline = radioInfo.offline;
      this.listenersTotal = radioInfo.listeners;

      if (!this.isServerActive && this.player) {
        this.player.nativeElement.pause();
      }

      this.canPlayRadio =
        this.isServerActive && (this.isAutoDjActive || this.isSourceActive);
    }
  });

  constructor(
    private dataService: DataService,
    private alertController: AlertController
  ) {}

  async presentNetworkAlert() {
    const alert = await this.alertController.create({
      header: 'Has perdido la conexión a internet.',
      message:
        'Si al recuperar la conexión no escuchas la radio, recarga la página.',
    });

    await alert.present();

    this.isAlertCreated = true;
  }

  async presentAlert() {
    if (this.audioSrcError) {
      return;
    }

    this.audioSrcError = true;

    const alert = await this.alertController.create({
      header: 'Reconectando',
      message: 'Si esto tarda demasiado, intenta recargar la página.',
      buttons: ['OK'],
    });

    await alert.present();

    setTimeout(() => {
      this.audioSrcError = false;
      alert.dismiss();
    }, 10000);
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
      if (
        !this.isServerActive ||
        !this.isNetworkOnline ||
        (!this.isSourceActive && !this.isAutoDjActive)
      ) {
        return;
      }

      this.presentAlert().then();

      this.switchAudioSrc();
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

  switchAudioSrc() {
    setTimeout(() => {
      this.radioURL =
        this.player.nativeElement.currentSrc === environment.autodjURL
          ? environment.radioURL
          : environment.autodjURL;
    }, 5000);
  }

  ngOnDestroy() {
    this.isPlayingSubscription.unsubscribe();
    this.radioInfoSubscription.unsubscribe();
    this.isNetworkSubscription.unsubscribe();
  }
}
