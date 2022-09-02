export interface RadioInfo {
  type: string;
  data: Datum[];
}

export interface Datum {
  title: string;
  song: string;
  track: Track;
  bitrate: string;
  server: string;
  autodj: string;
  source: string;
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

  constructor(private http: HttpClient) {}

  getRadioInfo() {
    return this.http.get<RadioInfo>(this.radioInfoUrl);
  }
}
