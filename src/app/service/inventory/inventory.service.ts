import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../../config/config';
import {Storage} from '@ionic/storage';
import {AlertController, LoadingController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

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


    getCategory(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'productcategory';
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'productcategory/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'productcategory/index').subscribe((data: any) => {
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

    getProducts(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'product';
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'product/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'product/index').subscribe((data: any) => {
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

    getProductWarehouse(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'productwarehouse';
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'productwarehouse/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'productwarehouse/index').subscribe((data: any) => {
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

    getProductSupplier(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'productsupplier';
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'productsupplier/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'productsupplier/index').subscribe((data: any) => {
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

    getProductPurchases(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'productpurchase';
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'productpurchase/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'productpurchase/index').subscribe((data: any) => {
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

    getProductPurchasesView(boolean, productpurchaseID) {
        return new Promise(resolve => {
            const  storageKey = 'productpurchaseview' + productpurchaseID;
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'productpurchase/view/' + productpurchaseID).subscribe((data: any) => {
                        const response = data.data;
                        let totalamount = 0;
                        response.productpurchaseitems.forEach((item, index) => {
                            const subamount = Number(item.productpurchasequantity) * Number(item.productpurchaseunitprice);
                            response.productpurchaseitems[index].subtotal =  subamount;
                            totalamount += subamount;
                        });
                        response.productpurchasepaid.totalamount = totalamount;
                        if (response.productpurchasepaid.productpurchasepaidamount == null) {
                            response.productpurchasepaid.productpurchasepaidamount = 0;
                            response.productpurchasepaid.balanceamount = totalamount;

                        } else {
                            response.productpurchasepaid.balanceamount = totalamount - Number(response.productpurchasepaid.productpurchasepaidamount);
                        }
                        this.storage.set(storageKey, response);
                        resolve(response);
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
                            this.http.get(ApiEndPoint + 'productpurchase/view/' + productpurchaseID).subscribe((data: any) => {
                                const response = data.data;
                                let totalamount = 0;
                                response.productpurchaseitems.forEach((item, index) => {
                                    const subamount = Number(item.productpurchasequantity) * Number(item.productpurchaseunitprice);
                                    response.productpurchaseitems[index].subtotal =  subamount;
                                    totalamount += subamount;
                                });
                                response.productpurchasepaid.totalamount = totalamount;
                                if (response.productpurchasepaid.productpurchasepaidamount == null) {
                                    response.productpurchasepaid.productpurchasepaidamount = 0;
                                    response.productpurchasepaid.balanceamount = totalamount;
                                } else {
                                    response.productpurchasepaid.balanceamount = totalamount - Number(response.productpurchasepaid.productpurchasepaidamount);
                                }
                                this.storage.set(storageKey, response);
                                resolve(response);
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


    getProductSale(boolean) {
        return new Promise(resolve => {
            const  storageKey = 'productsale';
            if (boolean) {
               if (this.network.type === 'none' || this.network.type === 'unknown') {
                        } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'productsale/index').subscribe((data: any) => {
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
                            this.http.get(ApiEndPoint + 'productsale/index').subscribe((data: any) => {
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

    getProductSaleView(boolean, productsaleID) {
        return new Promise(resolve => {
            const  storageKey = 'productsaleview' + productsaleID;
            if (boolean) {
                if (this.network.type === 'none' || this.network.type === 'unknown') {
                } else {
                    this.presentLoading();
                    this.http.get(ApiEndPoint + 'productsale/view/' + productsaleID).subscribe((data: any) => {
                        const response = data.data;
                        let totalamount = 0;
                        response.productsaleitems.forEach((item, index) => {
                            const subamount = Number(item.productsalequantity) * Number(item.productsaleunitprice);
                            response.productsaleitems[index].subtotal =  subamount;
                            totalamount += subamount;
                        });
                        response.productsalepaid.totalamount = totalamount;
                        if (response.productsalepaid.productsalepaidamount == null) {
                            response.productsalepaid.productsalepaidamount = 0;
                            response.productsalepaid.balanceamount = totalamount;

                        } else {
                            response.productsalepaid.balanceamount = totalamount - Number(response.productsalepaid.productsalepaidamount);
                        }
                        this.storage.set(storageKey, response);
                        resolve(response);
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
                            this.http.get(ApiEndPoint + 'productsale/view/' + productsaleID).subscribe((data: any) => {
                                const response = data.data;
                                let totalamount = 0;
                                response.productsaleitems.forEach((item, index) => {
                                    const subamount = Number(item.productsalequantity) * Number(item.productsaleunitprice);
                                    response.productsaleitems[index].subtotal =  subamount;
                                    totalamount += subamount;
                                });
                                response.productsalepaid.totalamount = totalamount;
                                if (response.productsalepaid.productsalepaidamount == null) {
                                    response.productsalepaid.productsalepaidamount = 0;
                                    response.productsalepaid.balanceamount = totalamount;
                                } else {
                                    response.productsalepaid.balanceamount = totalamount - Number(response.productsalepaid.productsalepaidamount);
                                }
                                this.storage.set(storageKey, response);
                                resolve(response);
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

    getSiteInfo() {
        return new Promise(resolve => {
            const  storageKey = 'siteinfo';
            this.storage.get(storageKey).then((val) => {
                if (val == null) {
                    if (this.network.type === 'none' || this.network.type === 'unknown') {
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
}
