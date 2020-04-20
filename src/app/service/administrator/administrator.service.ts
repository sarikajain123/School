import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

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

    getSchoolyear(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'schoolyear';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'schoolyear/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'schoolyear/index').subscribe((data: any) => {
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

    getStudentGroup(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'studentgroup';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'studentgroup/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'studentgroup/index').subscribe((data: any) => {
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

    getComplains(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'complain';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'complain/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'complain/index').subscribe((data: any) => {
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
    getComplainsview(boolean, complainID) {
        return new Promise(resolve => {
            const  storageKey = 'complain' + complainID;
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'complain/view/' + complainID).subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'complain/view/' + complainID).subscribe((data: any) => {
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


    getSystemAdmin(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'systemadmin';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'systemadmin/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'systemadmin/index').subscribe((data: any) => {
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
    getSystemAdminview(boolean, userID) {
        return new Promise(resolve => {
            const  storageKey = 'systemadmin' + userID;
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'systemadmin/view/' + userID).subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'systemadmin/view/' + userID).subscribe((data: any) => {
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

    getSociallink(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'sociallink';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'sociallink/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'sociallink/index').subscribe((data: any) => {
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

    getUsertype(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'usertype';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'usertype/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'usertype/index').subscribe((data: any) => {
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

    getUpdate(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'update';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'update/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'update/index').subscribe((data: any) => {
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

    getMailandsmsTemplates(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'mailandsmstemplate';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'mailandsmstemplate/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'mailandsmstemplate/index').subscribe((data: any) => {
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
    getMailandsmsTemplatesview(boolean, mailandsmstemplateID) {
        return new Promise(resolve => {
            const  storageKey = 'mailandsmstemplate' + mailandsmstemplateID;
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'mailandsmstemplate/view/' + mailandsmstemplateID).subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'mailandsmstemplate/view/' + mailandsmstemplateID).subscribe((data: any) => {
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

    getCertificateTemplates(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'certificate_template';
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'certificate_template/index').subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'certificate_template/index').subscribe((data: any) => {
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
    getCertificateTemplatesview(boolean, certificate_templateID) {
        return new Promise(resolve => {
            const  storageKey = 'certificate_templateview' + certificate_templateID;
            if (boolean) {
              if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                   this.presentLoading();
                   this.http.get(ApiEndPoint + 'certificate_template/view/' + certificate_templateID).subscribe((data: any) => {
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
                           this.http.get(ApiEndPoint + 'certificate_template/view/' + certificate_templateID).subscribe((data: any) => {
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
