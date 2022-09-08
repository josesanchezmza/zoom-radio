import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  logged = false;
  radioUrl = environment.radioURL;
  radioUrl2 = '//radio01.ferozo.com:9264/;stream/1;';
  radioUrl3 =
    '//shaincast.caster.fm:18470/listen.mp3?authn762313e0c3dd57eb5d95882c847cf8b4';

  constructor() {}

  ngOnInit() {}

  checkPass(password) {
    this.logged = password === '321987654';
  }
}
