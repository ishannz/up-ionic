import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the PredictionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-predictions',
  templateUrl: 'predictions.html',
})
export class PredictionsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
  }

  public doSubmit() {
    const toast = this.toastCtrl.create({
      message: 'Predections were saved',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'OK',
    });

    toast.present();
  }

}
