import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-complainview',
  templateUrl: './complainview.page.html',
  styleUrls: ['./complainview.page.scss'],
})
export class ComplainviewPage implements OnInit {

     complain: any;
    siteUrl: any;
    complainID: any;
    userprofile: any;
     usertypes: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public administratorService: AdministratorService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService
    ) {
        this.complainID = this.route.snapshot.paramMap.get('complainID');
        this.siteUrl = fileUrl;
        this.doRefresh(false, false, this.complainID);
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

    doRefresh(event, value, complainID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }

            this.administratorService.getComplainsview(value, complainID)
                .then((data: any) => {
                    this.complain = data.complain;
                    this.userprofile = data.user;
                    this.usertypes = data.usertypes;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'complain')
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
