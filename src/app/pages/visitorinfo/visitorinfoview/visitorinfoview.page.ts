import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VisitorinfoService} from '../../../service/visitorinfo/visitorinfo.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';


@Component({
  selector: 'app-visitorinfoview',
  templateUrl: './visitorinfoview.page.html',
  styleUrls: ['./visitorinfoview.page.scss'],
})
export class VisitorinfoviewPage implements OnInit {
     visitorID: any;
     visitorinfo: any;
     user: any;
     permission: any;
     siteUrl: any;
     language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public visitorinfoService: VisitorinfoService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.visitorID = this.route.snapshot.paramMap.get('visitorID');
        this.doRefresh(false, false, this.visitorID );
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

    doRefresh(event, value, visitorID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.visitorinfoService.getVisitorinfoview(value, visitorID)
                .then((data: any) => {
                    this.visitorinfo = data.visitorinfo;
                    this.user = data.name;
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
}
