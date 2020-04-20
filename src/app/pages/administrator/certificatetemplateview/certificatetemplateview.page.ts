import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorService} from '../../../service/administrator/administrator.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-certificatetemplateview',
  templateUrl: './certificatetemplateview.page.html',
  styleUrls: ['./certificatetemplateview.page.scss'],
})
export class CertificatetemplateviewPage implements OnInit {
    certificate_templateID: any;
     certificatetemplate: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public administratorService: AdministratorService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.certificate_templateID = this.route.snapshot.paramMap.get('certificate_templateID');
        this.doRefresh(false, false, this.certificate_templateID);
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

    doRefresh(event, value, certificate_templateID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }

            this.administratorService.getCertificateTemplatesview(value, certificate_templateID)
                .then((data: any) => {
                    this.certificatetemplate = data.certificatetemplate;
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
}
