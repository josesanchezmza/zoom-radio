import { BehaviorSubject, Observable } from 'rxjs';

export interface RadioResponse {
  type: string;
  data: RadioInfo[];
}

export interface RadioInfo {
  title?: string;
  song?: string;
  track?: Track;
  bitrate?: string;
  server?: 'Activo' | 'Inactivo';
  autodj?: 'Activo' | 'Inactivo';
  source?: 'Si' | 'No';
  offline?: boolean;
  summary?: string;
  listeners?: number;
  maxlisteners?: number;
  reseller?: number;
  serverstate?: boolean;
  sourcestate?: boolean;
  sourceconn?: number;
  date?: string;
  time?: string;
  rawmeta?: string;
  mountpoint?: string;
  tuneinurl?: string;
  directtuneinurl?: string;
  proxytuneinurl?: string;
  tuneinformat?: string;
  webplayer?: string;
  servertype?: string;
  listenertotal?: number;
  url?: string;
}

export interface Track {
  title: string;
  artist: string;
  album: string;
  imageurl: string;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  radioInfoUrl = environment.radioInfo;
  isStreaming = false;
  private netWorkStatus$ = new BehaviorSubject<boolean>(null);
  private isPlaying$ = new BehaviorSubject<boolean>(null);
  private radioInfoOb$ = new BehaviorSubject<RadioInfo>(null);

  constructor(private http: HttpClient) {
    this.getRadioInfo();
    this.updateRadioInfo();
    this.checkNetworkStatus();
  }

  get networkStatus$(): Observable<boolean> {
    return this.netWorkStatus$.asObservable();
  }
  get isPlayingAudio$(): Observable<boolean> {
    return this.isPlaying$.asObservable();
  }
  get radioInfo$(): Observable<RadioInfo> {
    return this.radioInfoOb$.asObservable();
  }

  setNetworkStatus(value: boolean) {
    this.netWorkStatus$.next(value);
  }

  setPlayingValue(value: boolean) {
    this.isPlaying$.next(value);
  }

  setRadioInfo(data: RadioInfo) {
    this.radioInfoOb$.next(data);
  }

  getRadioInfo() {
    this.getRadioData().subscribe(({ data }) => {
      const { listeners, offline, server, source } = data[0];
      const radioData = {
        listeners,
        offline,
        server,
        source,
      };
      this.setRadioInfo(radioData);
    });
  }
  updateRadioInfo() {
    setInterval(() => {
      this.getRadioInfo();
    }, 5 * 60 * 1000);
  }

  getRadioData() {
    return this.http.get<RadioResponse>(this.radioInfoUrl);
  }

  checkNetworkStatus() {
    window.addEventListener('load', () => {
      this.setNetworkStatus(navigator.onLine);

      window.addEventListener('online', () => {
        this.setNetworkStatus(true);
        this.getRadioInfo();
      });

      window.addEventListener('offline', () => {
        this.setNetworkStatus(false);
      });
    });
  }
}
