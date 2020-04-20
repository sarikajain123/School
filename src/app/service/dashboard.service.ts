import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


    constructor(
                public http: HttpClient, private storage: Storage,
                public  loadingCtrl: LoadingController,
                public network: Network,
                public  alertCtrl: AlertController,
                public toastCtrl: ToastController) {}

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    async presentLoading() {

        const loading = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: 'crescent',
        });
        await loading.present();

    }

    async dismiss() {
        return await this.loadingCtrl.dismiss({
            'dismissed': true
        });
    }

    getDashboard(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'dashboard';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                  this.presentToast();
                  } else {
                  this.presentLoading();
                  this.http.get(ApiEndPoint + 'dashboard/index/').subscribe((data: any) => {
                      this.storage.set(storageKey, data.data);
                      resolve(data.data);
                      this.dismiss();
                  }, err => {
                      console.log(err);
                      this.dismiss();
                  });
              }
            } else {
                this.storage.get(storageKey).then((val) => {
                    if (val == null) {
                      if (this.network.type === 'none' || this.network.type === 'unknown') {
                          this.presentToast();
                        } else {
                          this.presentLoading();
                          this.http.get(ApiEndPoint + 'dashboard/index/').subscribe((data: any) => {
                              this.storage.set(storageKey, data.data);
                              resolve(data.data);
                              this.dismiss();
                          }, err => {
                              console.log(err);
                              this.dismiss();
                          });
                      }
                    } else {
                        resolve(val);
                    }

                }, err => {
                    console.log(err);
                });
            }

        });
    }

}
