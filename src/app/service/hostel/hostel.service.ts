import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class HostelService {

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

    getHostel(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'hostel';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'hostel/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'hostel/index').subscribe((data: any) => {
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

    gethostelCategory(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'hcategory';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'category/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'category/index').subscribe((data: any) => {
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


    getHmember(boolean, classID, loginuserID, usertypeID) {
        return new Promise(resolve => {
            const  storageKey = 'hmember' + classID;
            if (boolean) {
                if (classID) {
                  if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                        this.presentLoading();
                        this.http.get(ApiEndPoint + 'hmember/index/' + classID).subscribe((data: any) => {
                            this.storage.set(storageKey, data.data);
                            resolve(data.data);
                            this.dismiss();
                        }, err => {
                            console.log(err);
                            this.dismiss();
                        });
                    }
                } else if (classID == null && usertypeID == 3) {
                    const storeProfileKey = 'hmember' + loginuserID + usertypeID;
                  if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                        this.presentLoading();
                        this.http.get(ApiEndPoint + 'hmember/index/' + classID).subscribe((data: any) => {
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
                                this.http.get(ApiEndPoint + 'hmember/index/' + classID).subscribe((data: any) => {
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
                                this.http.get(ApiEndPoint + 'hmember/index/' + classID).subscribe((data: any) => {
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
                    const storeProfileKey = 'hmember' + loginuserID + usertypeID;
                    this.storage.get(storeProfileKey).then((val) => {
                        if (val == null) {
                          if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                                this.presentLoading();
                                this.http.get(ApiEndPoint + 'hmember/index/' + classID).subscribe((data: any) => {
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

    getHmemberView(boolean, studentID, classID) {
        return new Promise(resolve => {
            const  storageKey = 'hmemberview' + studentID + classID;
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'hmember/view/' + studentID + '/' + classID).subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'hmember/view/' + studentID + '/' + classID).subscribe((data: any) => {
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
