import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ApiEndPoint} from  '../../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';
@Injectable({
  providedIn: 'root'
})
export class ClassService {

    constructor(public http: HttpClient, private storage: Storage,
                public  loadingCtrl: LoadingController,
                public network: Network,
                public  alertCtrl: AlertController) {}


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

    getClasses(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'classes';
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                 } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'classes').subscribe((data: any) => {
                        this.storage.set(storageKey, data.data);
                        resolve(data.data);
                        this.dismiss();
                    }, err => {
                        this.dismiss();
                        console.log(err);
                    });
                }
            } else {
                this.storage.get(storageKey).then((val) => {
                    if (val == null) {
                       if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                            this.presentLoading();
                            this.http.get(ApiEndPoint + 'classes').subscribe((data: any) => {
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
