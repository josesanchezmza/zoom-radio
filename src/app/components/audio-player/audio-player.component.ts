import { Component, OnDestroy, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { environment } from '../../../environments/environment';
import { DataService } from '../../services/data.service';
import { LoadingController, RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnDestroy {
  player: Howl = null;
  radioUrl = environment.radioURL;
  isPlaying = false;
  isMuted = false;
  lastEmittedValue: RangeValue;
  isButtonLocked = false;
  isNetworkOnline = true;
  isPlayingSubscription = this.dataService.isPlayingAudio$.subscribe(
    (isPlaying) => {
      this.isPlaying = isPlaying;
    }
  );

  constructor(
    private dataService: DataService,
    public loadingController: LoadingController
  ) {}

  ngOnDestroy() {
    this.isPlayingSubscription.unsubscribe();
  }

  start(radioSource) {
    this.player = new Howl({
      src: [radioSource],
      html5: true,
      format: ['mp3', 'aac'],
      volume: 1,
      preload: true,
      onplay: () => {
        this.dataService.setPlayingValue(true);
        this.isButtonLocked = false;
        this.dismissLoading();
      },
      onstop: () => {
        this.dataService.setPlayingValue(false);
      },
    });

    this.player.play();
  }

  togglePlayer() {
    if (this.isButtonLocked) {
      return;
    }
    if (!this.isPlaying) {
      this.presentLoading();
      this.start(this.radioUrl);
      this.isButtonLocked = true;
    } else {
      this.player.stop();
    }
  }

  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
    this.player.volume(this.lastEmittedValue);
    this.isMuted = this.lastEmittedValue === 0;
  }

  mute() {
    this.isMuted = !this.isMuted;
    this.player.mute(this.isMuted);
  }

  setIcon(isMuted) {
    if (isMuted) {
      return 'volume-mute-outline';
    } else {
      return 'volume-medium-outline';
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'cargando...',
    });
    await loading.present();
  }

  async dismissLoading() {
    return await this.loadingController
      .dismiss()
      .then(() => console.log('dismissed'));
  }
}
