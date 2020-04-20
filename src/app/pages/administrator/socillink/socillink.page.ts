import { Component, OnInit } from '@angular/core';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-socillink',
  templateUrl: './socillink.page.html',
  styleUrls: ['./socillink.page.scss'],
})
export class SocillinkPage implements OnInit {

     sociallinks: any;
    permission: any;
    language: any;
    siteUrl: any;
    alluser: any;

    constructor(
        private network: Network,
        private toastCtrl: ToastController,
        public administratorService: AdministratorService,
        public langandpermissionService: LangandparmisionService
    ) { this.doRefresh(false, false); this.siteUrl = fileUrl;  }

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
            this.administratorService.getSociallink(value)
                .then((data: any) => {
                    this.sociallinks = data.sociallinks;
                    this.alluser = data.alluser;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'sociallink')
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
