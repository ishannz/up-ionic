import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { DashboardPage, PredictionsPage, SignupPage, StandingsPage } from '../';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: [ './home.scss' ]
})
export class HomePage {

  public formInputs = {
    email: '',
    password: '',
  };

  public login = HomePage;
  public signup = SignupPage;
  public dashboard = DashboardPage;
  public predictions = PredictionsPage;
  public standings = StandingsPage;

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private auth: AuthProvider,
    private storage: Storage
  ) {}

  ionViewCanEnter() {
    const loading = this.loadingCtrl.create({
      content: 'Loading'
    });

    loading.present();

    return this.auth.isAuthenticated()
      .then(authenticated => {
        if (authenticated) {
          this.navCtrl.push(DashboardPage);
        }

        loading.dismiss();
      });
  }

  ionViewCanLeave() {
    return true;
  }

  public doLogin() {
    const loading = this.loadingCtrl.create({
      content: 'Logging in'
    });
    loading.present();

    this.auth.login(this.formInputs.email, this.formInputs.password)
      .subscribe(
        response => {
          this.storage.set('authToken', response.headers.get('token'));
          this.navCtrl.push(DashboardPage);
          loading.dismiss();
        },
        error => {
          let msg = 'Unable to log in.';
          if(error.status === 422) {
            msg = 'There is something wrong with your credentials. Please correct '
              + 'them and try again.';
          } else if (error.status === 401) {
            msg = 'Invalid credentials. Please correct them and try again.';
          } else if (error.status >= 500) {
            msg = 'Ooops! Something went wrong. Please try again.';
          }

          const toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
          });

          toast.present();
          loading.dismiss();
        }
      );
  }
}
