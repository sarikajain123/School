import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VisitorinfoService} from '../../../service/visitorinfo/visitorinfo.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-visitorinfo',
  templateUrl: './visitorinfo.page.html',
  styleUrls: ['./visitorinfo.page.scss'],
})
export class VisitorinfoPage implements OnInit {
    visitorinfos: any;
    users: any;
    language: any;
    permission: any;
    siteUrl: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public visitorinfoService: VisitorinfoService,
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
            this.visitorinfoService.getVisitorinfo(value)
                .then((data: any) => {
                    this.visitorinfos = data.visitorinfos;
                    this.users = data.users;
                });

            this.langandpermissionService.getLangandPermissionCall(value, 'visitorinfo')
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

    getVisitorView(visitorID) {
        this.router.navigate([ '/visitorinfoview', visitorID]);
    }
}
