import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PredictionsPage, SignupPage, StandingsPage } from '../';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  public predictions = PredictionsPage;
  public standings = StandingsPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public auth: AuthProvider
  ) {
  }

  ionViewCanEnter() {
    return this.auth.isAuthenticated();
  }

}
