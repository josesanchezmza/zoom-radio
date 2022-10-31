import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { RangeValue } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
  isNetworkOnline = true;
  whatsAppURL = environment.whatsAppURL;
  phoneNumber = environment.phoneNumber;
  facebookURL = environment.facebookURL;
  lastEmittedValue: RangeValue;
  listenersTotal: number;
  isRadioOffline = false;
  isServerActive = true;
  isSourceActive = true;
  isAutoDjActive = false;
  canPlayRadio = true;
  // radioInfoSubscription = this.dataService.radioInfo$.subscribe((radioInfo) => {
  //   if (radioInfo) {
  //     this.isServerActive = radioInfo.server === 'Activo';
  //     this.isAutoDjActive = radioInfo.autodj === 'Activo';
  //     this.isSourceActive = radioInfo.source === 'Si';
  //     this.isRadioOffline = radioInfo.offline;
  //     this.listenersTotal = radioInfo.listeners;
  //
  //     if (!this.isServerActive) {
  //       this.dataService.setPlayingValue(false);
  //     }
  //
  //     this.canPlayRadio = this.isServerActive && this.isSourceActive;
  //   }
  // });

  constructor(
    private dataService: DataService,
    private alertController: AlertController
  ) {}

  ngOnDestroy() {
    // this.radioInfoSubscription.unsubscribe();
  }
}
