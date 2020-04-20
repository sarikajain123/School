import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../config/config';
import { markData } from '../../../markconfig/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
    providedIn: 'root'
})
export class MarkService {

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
        return await this.loadingCtrl.dismiss({
            'dismissed': true
        });
    }
    getMarkPercentage(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'markpercentage';
            if (boolean) {
            if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'markpercentage').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'markpercentage').subscribe((data: any) => {
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



    getMarkList(classID, boolean, loginuserID, usertypeID) {
        return new Promise(resolve => {
            const  storageKey = 'mark' + classID;
            if (boolean) {
                if (classID) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                       this.presentLoading();
                       this.http.get(ApiEndPoint + 'mark/index/' + classID).subscribe((data: any) => {
                           this.storage.set(storageKey, data.data);
                           resolve(data.data);
                           this.dismiss();
                       }, err => {
                           console.log(err);
                           this.dismiss();
                       });
                   }
                } else if (classID == null && usertypeID == 3) {
                    const storeProfileKey = 'markstudent_profile' + loginuserID;
                    if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                       this.presentLoading();
                       this.http.get(ApiEndPoint + 'mark/index/' + classID).subscribe((data: any) => {
                           const response = markData(data.data);
                           this.storage.set(storeProfileKey, response);
                           resolve(response);
                           this.dismiss();
                       }, err => {
                           console.log(err);
                           this.dismiss();
                       });
                   }
                }
            } else {

                if (classID == null && usertypeID == null) {
                    this.storage.get(storageKey).then((val) => {
                        if (val == null) {
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                               this.presentLoading();
                               this.http.get(ApiEndPoint + 'mark/index/' + classID).subscribe((data: any) => {
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
                } else if (classID) {
                    this.storage.get(storageKey).then((val) => {
                        if (val == null) {
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                               this.presentLoading();
                               this.http.get(ApiEndPoint + 'mark/index/' + classID).subscribe((data: any) => {
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
                } else if (classID == null && usertypeID == 3) {
                    const storeProfileKey = 'markstudent_profile' + loginuserID;
                    this.storage.get(storeProfileKey).then((markvalue) => {
                        if (markvalue == null) {
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                               this.presentLoading();
                               this.http.get(ApiEndPoint + 'mark/index/' + classID).subscribe((data: any) => {
                                   const response = markData(data.data);
                                   this.storage.set(storeProfileKey, response);
                                   resolve(response);
                                   this.dismiss();
                               }, err => {
                                   console.log(err);
                                   this.dismiss();
                               });
                           }
                        } else {
                            resolve(markvalue);
                        }

                    }, err => {
                        console.log(err);
                    });
                }
            }

        });
    }

    getMarkListView(studentID, classID, boolean) {
        return new Promise(resolve => {
            const storeProfileKey = 'markstudent_profile' + studentID + classID;
            if (boolean) {
            if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'mark/view/' + studentID + '/' + classID).subscribe((data: any) => {
                       const response = markData(data.data);
                       this.storage.set(storeProfileKey, response);
                       resolve(response);
                       this.dismiss();
                   }, err => {
                       console.log(err);
                       this.dismiss();
                   });
               }
            } else {
                this.storage.get(storeProfileKey).then((markval) => {
                    if (markval == null) {
                    if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                           this.presentLoading();
                           this.http.get(ApiEndPoint + 'mark/view/' + studentID + '/' + classID).subscribe((data: any) => {
                               const response = markData(data.data);
                               this.storage.set(storeProfileKey, response);
                               resolve(response);
                               this.dismiss();
                           }, err => {
                               console.log(err);
                               this.dismiss();
                           });
                       }
                    } else {
                        resolve(markval);
                    }

                }, err => {
                    console.log(err);
                });
            }

        });
    }
}
