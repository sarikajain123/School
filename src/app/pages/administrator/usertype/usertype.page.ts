import { Component, OnInit } from '@angular/core';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.page.html',
  styleUrls: ['./usertype.page.scss'],
})
export class UsertypePage implements OnInit {


     usertypes: any;
    permission: any;
    language: any;

    constructor(
        private network: Network,
        private toastCtrl: ToastController,
        public administratorService: AdministratorService,
        public langandpermissionService: LangandparmisionService
    ) { this.doRefresh(false, false);  }

    isRefresh = true;
    ngOnInit() {

    }


    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.administratorService.getUsertype(value)
                .then((data: any) => {
                    this.usertypes = data.usertypes;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'usertype')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                });
            if (event) {
            setTimeout(() => {
                event.target.complete();
            }, 2000);
        }
    }
}
