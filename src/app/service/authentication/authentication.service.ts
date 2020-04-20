import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {Platform, ToastController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../config/config';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    authState = new BehaviorSubject(false);
    constructor(
        private router: Router,
        private storage: Storage,
        private platform: Platform,
        private network: Network,
        private toastCtrl: ToastController,
        public http: HttpClient
    ) {
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });

    }
    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    ifLoggedIn() {
        const token = localStorage.getItem('tokenKey');
            if (token) {
                this.authState.next(true);
            }
    }


    Backendmenucall() {
        return new Promise(resolve => {
            const  storageKey = 'backendmenucall';
            const token = localStorage.getItem('tokenKey');
            if (token) {
                this.storage.get(storageKey).then((val) => {
                    if (val == null) {
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                            this.presentToast();
                        } else {
                            this.http.get(ApiEndPoint + 'backendmenucall').subscribe((data: any) => {
                                this.storage.set(storageKey, data.data);
                                resolve(data.data);
                            }, err => {
                                console.log(err);
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

    getSiteInfo() {
        return new Promise(resolve => {
            const  storageKey = 'siteinfo';
            this.storage.get(storageKey).then((val) => {
                if (val == null) {
                    if (this.network.type === 'none' || this.network.type === 'unknown') {
                        this.presentToast();
                    } else {
                        this.http.get(ApiEndPoint + 'site/index').subscribe((data: any) => {
                            this.storage.set(storageKey, data.data);
                            resolve(data.data);
                        }, err => {
                            console.log(err);
                        });
                    }
                } else {
                    resolve(val);
                }

            }, err => {
                console.log(err);
            });
        });
    }


    login(user) {
        return new Promise((resolve, reject) => {
            if (this.network.type === 'none' || this.network.type === 'unknown') {
                this.presentToast();
            } else {
                this.http.post(ApiEndPoint + 'signin/index', user).subscribe((data: any) => {
                    alert(data);
                    localStorage.setItem('tokenKey', data.data.token);
                    this.authState.next(true);
                    this.storage.set('Profile', data.data.profile);
                    resolve(data.data);
                }, err => {
                    reject(err.error);
                });
            }
        });
    }

    logout() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            localStorage.removeItem('tokenKey');
            localStorage.clear();
            this.authState.next(false);
            this.router.navigate(['login']);
            this.storage.clear().then(() => {});
        }

    }

    isAuthenticated() {
        return this.authState.value;
    }

}
