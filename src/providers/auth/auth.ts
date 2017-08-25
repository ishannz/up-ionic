import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    console.log('Hello AuthProvider Provider');
  }

  login(email: string, password: string) {
    const payload = {
      email: email,
      password: password
    };

    return this.http.post('http://localhost:8000/login', payload);
  }

  logout() {

  }

  isAuthenticated () {
    return this.storage.get('authToken')
      .then((val) => {
        if(val) {
          return true;
        } else {
          return false;
        }
      });
  }

}
