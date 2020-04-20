import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

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

    getNotice(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'notice';
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'notice/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'notice/index').subscribe((data: any) => {
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

    getNoticeview(boolean , noticeID) {
        return new Promise(resolve => {
            const  storageKey = 'noticeview' + noticeID;
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'notice/view/' + noticeID).subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'notice/view/' + noticeID).subscribe((data: any) => {
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


    getEvent(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'event';
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'event/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'event/index').subscribe((data: any) => {
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

    getEventview(boolean , eventID) {
        return new Promise(resolve => {
            const  storageKey = 'eventview' + eventID;
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'event/view/' + eventID).subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'event/view/' + eventID).subscribe((data: any) => {
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


    getHoliday(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'holiday';
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'holiday/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'holiday/index').subscribe((data: any) => {
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

    getHolidayview(boolean , holidayID) {
        return new Promise(resolve => {
            const  storageKey = 'holidayview' + holidayID;
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'holiday/view/' + holidayID).subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'holiday/view/' + holidayID).subscribe((data: any) => {
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
