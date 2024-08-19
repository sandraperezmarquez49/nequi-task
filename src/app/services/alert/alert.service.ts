import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  actualAlert: any;
  constructor( public toastController: ToastController) { }

  async presentAlert(message:string) {
    this.actualAlert = await this.toastController.create({
      message,
      position: "top",
      duration: 3000,
    });
    this.actualAlert.present();
  }

}
