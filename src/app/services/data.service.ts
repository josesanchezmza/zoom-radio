import { BehaviorSubject, Observable } from 'rxjs';

export interface RadioInfo {
  type: string;
  data: Datum[];
}

export interface Datum {
  title: string;
  song: string;
  track: Track;
  bitrate: string;
  server: 'Activo' | 'Inactivo';
  autodj: 'Activo' | 'Inactivo';
  source: 'Si' | 'No';
  offline: boolean;
  summary: string;
  listeners: number;
  maxlisteners: number;
  reseller: number;
  serverstate: boolean;
  sourcestate: boolean;
  sourceconn: number;
  date: string;
  time: string;
  rawmeta: string;
  mountpoint: string;
  tuneinurl: string;
  directtuneinurl: string;
  proxytuneinurl: string;
  tuneinformat: string;
  webplayer: string;
  servertype: string;
  listenertotal: number;
  url: string;
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
  radioData: RadioInfo;
  isStreaming = false;
  private isPlaying$ = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) {}

  get isPlayingAudio$(): Observable<boolean> {
    return this.isPlaying$.asObservable();
  }
  setPlayingValue(value: boolean) {
    this.isPlaying$.next(value);
  }

  getRadioInfo() {
    return this.http.get<RadioInfo>(this.radioInfoUrl);
  }
}
