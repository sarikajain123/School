import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-certificatetemplate',
  templateUrl: './certificatetemplate.page.html',
  styleUrls: ['./certificatetemplate.page.scss'],
})
export class CertificatetemplatePage implements OnInit {

    certificatetemplates: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
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
            this.administratorService.getCertificateTemplates(value)
                .then((data: any) => {
                    this.certificatetemplates = data.certificatetemplates;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'certificate_template')
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

    getCertificatetemplateview(certificate_templateID) {
        this.router.navigate([ '/certificatetemplateview', certificate_templateID]);
    }
}
