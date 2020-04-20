import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';
import {ApiEndPoint} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MaillsmsService {

    constructor(public http: HttpClient,
                private storage: Storage,
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
        return await this.loadingCtrl.dismiss({             'dismissed': true         });
    }

    getMaillSms(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'mailandsms';
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'mailandsms/index').subscribe((data: any) => {
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
                        } else {
                            this.presentLoading();
                            this.http.get(ApiEndPoint + 'mailandsms/index').subscribe((data: any) => {
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

    getMaillSmsView(boolean, maillsmsID ) {
        return new Promise(resolve => {
            const  storageKey = 'mailandsmsview' + maillsmsID;
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'mailandsms/view/' + maillsmsID).subscribe((data: any) => {
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
                        } else {
                            this.presentLoading();
                            this.http.get(ApiEndPoint + 'mailandsms/view/' + maillsmsID).subscribe((data: any) => {
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
