import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
})
export class PlayButtonComponent {
  @Input() isStreaming: boolean;
  @Output() btnClick = new EventEmitter();

  constructor() { }

  onClick() {
    this.btnClick.emit();
  }

  setIcon(streaming){
    if(streaming){
      return 'radio';
    } else {
      return 'play';
    }
  }
}
