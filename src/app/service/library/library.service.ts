import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

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



    getLmember(boolean, classID, loginuserID, usertypeID) {
        return new Promise(resolve => {
            const  storageKey = 'lmember' + classID;
            if (boolean) {
                if (classID) {
                   if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                       this.presentLoading();
                       this.http.get(ApiEndPoint + 'lmember/index/' + classID).subscribe((data: any) => {
                           this.storage.set(storageKey, data.data);
                           resolve(data.data);
                           this.dismiss();
                       }, err => {
                           console.log(err);
                           this.dismiss();
                       });
                   }
                } else if (classID == null && usertypeID == 3) {
                    const storeProfileKey = 'lmember' + loginuserID + usertypeID;
                   if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                       this.presentLoading();
                       this.http.get(ApiEndPoint + 'lmember/index/' + classID).subscribe((data: any) => {
                           this.storage.set(storeProfileKey, data.data);
                           resolve(data.data);
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
                               this.http.get(ApiEndPoint + 'lmember/index/' + classID).subscribe((data: any) => {
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
                               this.http.get(ApiEndPoint + 'lmember/index/' + classID).subscribe((data: any) => {
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
                    const storeProfileKey = 'lmember' + loginuserID + usertypeID;
                    this.storage.get(storeProfileKey).then((val) => {
                        if (val == null) {
                           if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                               this.presentLoading();
                               this.http.get(ApiEndPoint + 'lmember/index/' + classID).subscribe((data: any) => {
                                   this.storage.set(storeProfileKey, data.data);
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

    getLmemberView(boolean, studentID, classID) {
        return new Promise(resolve => {
            const  storageKey = 'lmemberview' + studentID + classID;
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'lmember/view/' + studentID + '/' + classID).subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'lmember/view/' + studentID + '/' + classID).subscribe((data: any) => {
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



    getBooks(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'book';
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'book/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'book/index').subscribe((data: any) => {
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

    getEBooks() {
        return new Promise(resolve => {
            this.http.get(ApiEndPoint + 'ebooks/index').subscribe((data: any) => {
                resolve(data.data);
            }, err => {
                console.log(err);
            });
        });
    }
}
