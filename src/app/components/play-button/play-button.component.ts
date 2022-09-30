import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
})
export class PlayButtonComponent implements OnDestroy {
  @Output() btnClick = new EventEmitter();
  isPlayingSubsctiption = this.dataService.isPlayingAudio$.subscribe(
    (playing) => {
      if (playing) {
      } else {
      }
    }
  );

  constructor(private dataService: DataService) {}

  onClick() {
    this.btnClick.emit();
  }

  ngOnDestroy() {
    this.isPlayingSubsctiption.unsubscribe();
  }
}
