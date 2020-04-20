import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';



@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

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

    getSattendance(classID, boolean, loginuserID, usertypeID) {
            return new Promise(resolve => {
                const  storageKey = 'sattendance' + classID;
                if (boolean) {
                    if (classID) {
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                            this.presentLoading();
                            this.http.get(ApiEndPoint + 'sattendance/index/' + classID).subscribe((data: any) => {
                                this.storage.set(storageKey, data.data);
                                resolve(data.data);
                                this.dismiss();
                            }, err => {
                                console.log(err);
                                this.dismiss();
                            });
                        }
                    } else if  (classID == null && usertypeID == 3) {
                        const storeProfileKey = 'sattendance_profile' + loginuserID;
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                            this.presentLoading();
                            this.http.get(ApiEndPoint + 'sattendance/index/' + classID).subscribe((data: any) => {
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
                                    this.http.get(ApiEndPoint + 'sattendance/index/' + classID).subscribe((data: any) => {
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
                                    this.http.get(ApiEndPoint + 'sattendance/index/' + classID).subscribe((data: any) => {
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
                        const storeProfileKey = 'sattendance_profile' + loginuserID;
                        this.storage.get(storeProfileKey).then((val) => {
                            if (val == null) {
                                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                                    this.presentLoading();
                                    this.http.get(ApiEndPoint + 'sattendance/index/' + classID).subscribe((data: any) => {
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

    getSattendanceView(studentID, classID, boolean) {

        return new Promise(resolve => {
            const storeProfileKey = 'sattendance_profile' + studentID + classID;
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'sattendance/view/' + studentID + '/' + classID).subscribe((data: any) => {
                        this.storage.set(storeProfileKey, data.data);
                        resolve(data.data);
                        this.dismiss();
                    }, err => {
                        console.log(err);
                        this.dismiss();
                    });
                }
            } else {
                this.storage.get(storeProfileKey).then((val) => {
                    if (val == null) {
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                            this.presentLoading();
                            this.http.get(ApiEndPoint + 'sattendance/view/' + studentID + '/' + classID).subscribe((data: any) => {
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
        });
    }


    PostSattendance(allData) {
        return new Promise(resolve => {
            this.http.post(ApiEndPoint + 'sattendance/add', allData).subscribe((data: any ) => {
                resolve(data.data);
            }, err => {
                console.log(err);
            });
        });

    }

    SaveSattendance(allData) {
        return new Promise(resolve => {
            this.http.post(ApiEndPoint + 'sattendance/saveattendance', allData).subscribe((data: any ) => {
                resolve(data.data);
            }, err => {
                console.log(err);
            });
        });

    }

    getTattendance(boolean, loginuserID, usertypeID) {
        return new Promise(resolve => {
            const  storageKey = 'tattendance';
            const  storageProfileKey = 'tattendanceProfile' + loginuserID + usertypeID;

            if (boolean) {
                if (loginuserID && usertypeID ) {
                    if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                        this.presentLoading();
                        this.http.get(ApiEndPoint + 'tattendance/index').subscribe((data: any) => {
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
                        this.http.get(ApiEndPoint + 'tattendance/index').subscribe((data: any) => {
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
                                this.http.get(ApiEndPoint + 'tattendance/index').subscribe((data: any) => {
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
                                this.http.get(ApiEndPoint + 'tattendance/index').subscribe((data: any) => {
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

    getTattendanceView(boolean, techearID) {

        return new Promise(resolve => {
            const storageviewKey = 'tattendanceview' + techearID;
            if (boolean) {
                this.http.get(ApiEndPoint + 'tattendance/view/' + techearID).subscribe((data: any ) => {
                    this.storage.set(storageviewKey, data.data);
                    resolve(data.data);
                }, err => {
                    console.log(err);
                });
            } else {
                this.storage.get(storageviewKey).then((val) => {
                    if (val == null) {
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                            this.presentLoading();
                            this.http.get(ApiEndPoint + 'tattendance/view/' + techearID).subscribe((data: any) => {
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

    PostTattendance(allData) {
        return new Promise(resolve => {
            this.http.post(ApiEndPoint + 'tattendance/add', allData).subscribe((data: any ) => {
                resolve(data.data);
            }, err => {
                console.log(err);
            });
        });

    }

    SaveTattendance(allData) {
        return new Promise(resolve => {
            this.http.post(ApiEndPoint + 'tattendance/saveattendance', allData).subscribe((data: any ) => {
                resolve(data.data);
            }, err => {
                console.log(err);
            });
        });

    }

    getUattendance(boolean, loginuserID, usertypeID) {
        return new Promise(resolve => {
            const  storageKey = 'uattendance';
            const  storageProfileKey = 'uattendanceProfile' + loginuserID + usertypeID;

            if (boolean) {
                if (loginuserID && usertypeID ) {
                    if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                        this.presentLoading();
                        this.http.get(ApiEndPoint + 'uattendance/index').subscribe((data: any) => {
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
                        this.http.get(ApiEndPoint + 'uattendance/index').subscribe((data: any) => {
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
                                this.http.get(ApiEndPoint + 'uattendance/index').subscribe((data: any) => {
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
                                this.http.get(ApiEndPoint + 'uattendance/index').subscribe((data: any) => {
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


    getUattendanceView(boolean, userID) {

        return new Promise(resolve => {
            const storageviewKey = 'uattendanceview' + userID;
            if (boolean) {
                this.http.get(ApiEndPoint + 'uattendance/view/' + userID).subscribe((data: any ) => {
                    this.storage.set(storageviewKey, data.data);
                    resolve(data.data);
                }, err => {
                    console.log(err);
                });
            } else {
                this.storage.get(storageviewKey).then((val) => {
                    if (val == null) {
                        if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                            this.presentLoading();
                            this.http.get(ApiEndPoint + 'uattendance/view/' + userID).subscribe((data: any) => {
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

    PostUattendance(allData) {
        return new Promise(resolve => {
            this.http.post(ApiEndPoint + 'uattendance/add', allData).subscribe((data: any ) => {
                resolve(data.data);
            }, err => {
                console.log(err);
            });
        });

    }

    SaveUattendance(allData) {
        return new Promise(resolve => {
            this.http.post(ApiEndPoint + 'uattendance/saveattendance', allData).subscribe((data: any ) => {
                resolve(data.data);
            }, err => {
                console.log(err);
            });
        });

    }
}
