import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    if (environment.production) {
      console.log = function(){} ;
      console.error = function(){};
      console.warn = function(){};
    }
    SplashScreen['show']({
      showDuration: 2000,
      autoHide: true
    });
  }
}
