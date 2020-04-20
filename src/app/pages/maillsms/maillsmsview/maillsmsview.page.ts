import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {fileUrl} from '../../../../config/config';
import {MaillsmsService} from '../../../service/maillsms.service';

@Component({
  selector: 'app-maillsmsview',
  templateUrl: './maillsmsview.page.html',
  styleUrls: ['./maillsmsview.page.scss'],
})
export class MaillsmsviewPage implements OnInit {

    mailsmsID: any;
    mailandsms: any;
    permission: any;
    siteUrl: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public mailsmsService: MaillsmsService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.mailsmsID = this.route.snapshot.paramMap.get('mailsmsID');
        this.doRefresh(false, false, this.mailsmsID );
        this.siteUrl = fileUrl;
    }


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

    doRefresh(event, value, mailsmsID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.mailsmsService.getMaillSmsView(value, mailsmsID)
            .then((data: any) => {
                this.mailandsms = data.mailandsms;
            });

        this.langandpermissionService.getLangandPermissionCall(value, 'mailandsms')
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
