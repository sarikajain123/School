import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndPoint} from '../../config/config';
import {Storage} from '@ionic/storage';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class LangandparmisionService {


    constructor(public http: HttpClient, private storage: Storage, public network: Network) {}

    getLangandPermissionCall(boolean, value) {
        return new Promise(resolve => {
            const token = localStorage.getItem('tokenKey');
            if (token) {
                const storageKey = 'langandpermissioncall' + value;
                if (boolean) {
                    if (this.network.type === 'none' || this.network.type === 'unknown') {
                    } else {
                        this.http.get(ApiEndPoint + 'langandpermissioncall/index/' + value).subscribe((data: any) => {
                            this.storage.set(storageKey, data.data);
                            resolve(data.data);
                        }, err => {
                            console.log(err);
                        });
                    }
                } else {
                    this.storage.get(storageKey).then((val) => {
                        if (val == null) {
                            if (this.network.type === 'none' || this.network.type === 'unknown') {
                            } else {
                                this.http.get(ApiEndPoint + 'langandpermissioncall/index/' + value).subscribe((data: any) => {
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
            }
        });
    }
}
