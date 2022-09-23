import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  player: Howl = null;
  radioUrl = environment.radioURL;
  isPlaying = false;

  constructor() {}

  ngOnInit() {
    this.start(this.radioUrl);
  }
  start(radioSource) {
    this.player = new Howl({
      src: [radioSource],
      html5: true,
      format: ['mp3'],
      // autoplay: true,
      volume: 0.01,
      onplay: () => {
        console.log('onplay');
        // this.isPlaying = true;
      },
      onend: () => {
        console.log('onend');
      },
      onstop: () => {
        console.log('onStop');
        // this.isPlaying = false;
      },
    });
  }

  togglePlayer() {
    if (!this.isPlaying) {
      this.player.play();
    } else {
      this.player.stop();
    }
    this.isPlaying = !this.isPlaying;
  }
}
