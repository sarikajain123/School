import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {MaillsmsService} from '../../service/maillsms.service';

@Component({
  selector: 'app-maillsms',
  templateUrl: './maillsms.page.html',
  styleUrls: ['./maillsms.page.scss'],
})
export class MaillsmsPage implements OnInit {

    mailsms: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public mailsmsService: MaillsmsService,
        public langandpermissionService: LangandparmisionService,
    ) { this.doRefresh(false, false); }


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

    getMailsmsView(mailsmsID)

    {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.router.navigate(['/maillsmsview', mailsmsID]);
        }
    }

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.mailsmsService.getMaillSms(value)
            .then((data: any) => {
                this.mailsms = data.mailandsms;
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
