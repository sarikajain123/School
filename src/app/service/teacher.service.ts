import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ApiEndPoint } from  '../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';



@Injectable({
  providedIn: 'root'
})
export class TeacherService {

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


    getTeachers(boolean, loginuserID, usertypeID) {
        return new Promise(resolve => {
            const  storageKey = 'Teachers';
            const  storageProfileKey = 'TeachersProfile' + loginuserID + usertypeID;
            if (boolean) {
                if (loginuserID && usertypeID ) {
                 if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                       this.presentLoading();
                       this.http.get(ApiEndPoint + 'teacher/index').subscribe((data: any) => {
                           this.storage.set(storageProfileKey, data.data);
                           resolve(data.data);
                           this.dismiss();
                       }, err => {
                           console.log(err);
                           this.dismiss();
                       });
                   }
                } else {
                 if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                       this.presentLoading();
                       this.http.get(ApiEndPoint + 'teacher/index').subscribe((data: any) => {
                           this.storage.set(storageKey, data.data);
                           resolve(data.data);
                           this.dismiss();
                       }, err => {
                           console.log(err);
                           this.dismiss();
                       });
                   }
                }

            } else {
                if (loginuserID && usertypeID ) {
                    this.storage.get(storageProfileKey).then((val) => {
                        if (val == null) {
                         if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                               this.presentLoading();
                               this.http.get(ApiEndPoint + 'teacher/index').subscribe((data: any) => {
                                   this.storage.set(storageProfileKey, data.data);
                                   this.dismiss();
                                   resolve(data.data);
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
                } else {
                    this.storage.get(storageKey).then((val) => {
                        if (val == null) {
                         if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                               this.presentLoading();
                               this.http.get(ApiEndPoint + 'teacher/index').subscribe((data: any) => {
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

            }
        });
    }

    getTeacherView(boolean , teacherID) {
        return new Promise(resolve => {
            const storageviewKey = 'teacherview' + teacherID;
            if (boolean) {
                this.presentLoading();
                this.http.get(ApiEndPoint + 'teacher/view/' + teacherID).subscribe((data: any) => {
                    this.storage.set(storageviewKey, data.data);
                    resolve(data.data);
                    this.dismiss();
                }, err => {
                    console.log(err);
                    this.dismiss();
                });
            } else {
                this.storage.get(storageviewKey).then((val) => {
                    if (val == null) {
                     if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                           this.presentLoading();
                           this.http.get(ApiEndPoint + 'teacher/view/' + teacherID).subscribe((data: any) => {
                               this.storage.set(storageviewKey, data.data);
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
