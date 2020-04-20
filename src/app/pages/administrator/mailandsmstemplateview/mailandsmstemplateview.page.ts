import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-mailandsmstemplateview',
  templateUrl: './mailandsmstemplateview.page.html',
  styleUrls: ['./mailandsmstemplateview.page.scss'],
})
export class MailandsmstemplateviewPage implements OnInit {

     mailandsmstemplate: any;
    mailandsmstemplateID: any;
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
        this.mailandsmstemplateID = this.route.snapshot.paramMap.get('mailandsmstemplateID');
        this.doRefresh(false, false, this.mailandsmstemplateID);
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

    doRefresh(event, value, mailandsmstemplateID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }

            this.administratorService.getMailandsmsTemplatesview(value, mailandsmstemplateID)
                .then((data: any) => {
                    this.mailandsmstemplate = data.mailandsmstemplate;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'mailandsmstemplate')
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
