import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
})
export class PlayButtonComponent {
  @Output() btnClick = new EventEmitter();
  options: AnimationOptions = {
    path: 'https://assets3.lottiefiles.com/packages/lf20_rsbtxwqu.json',
  };

  constructor(private dataService: DataService) {}

  onClick() {
    this.btnClick.emit();
    if (this.dataService.isStreaming) {
      this.options = {
        path: 'https://assets4.lottiefiles.com/packages/lf20_egfrW9.json',
      };
    } else {
      this.options = {
        path: 'https://assets3.lottiefiles.com/packages/lf20_rsbtxwqu.json',
        // style: "width: 300px; height: 300px",
      };
    }
  }
}
