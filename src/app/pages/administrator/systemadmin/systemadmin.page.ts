import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-systemadmin',
  templateUrl: './systemadmin.page.html',
  styleUrls: ['./systemadmin.page.scss'],
})
export class SystemadminPage implements OnInit {

     systemadmins: any;
    permission: any;
    siteUrl: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public administratorService: AdministratorService,
        public langandpermissionService: LangandparmisionService
    ) { this.doRefresh(false, false); this.siteUrl = fileUrl; }

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
            this.administratorService.getSystemAdmin(value)
                .then((data: any) => {
                    this.systemadmins = data.systemadmins;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'systemadmin')
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
    getSystemadminView(adminID) {
        this.router.navigate([ '/systemadminview', adminID]);
    }
}
