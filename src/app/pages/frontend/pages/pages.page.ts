import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FrontendService} from '../../../service/frontend/frontend.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

     pagess: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public frontendService: FrontendService,
        public langandpermissionService: LangandparmisionService
    ) { this.doRefresh(false, false); }

    isRefresh = true;
    ngOnInit() {}


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
        this.frontendService.getPages(value)
            .then((data: any) => {
                this.pagess = data.pagess;
            });
        this.langandpermissionService.getLangandPermissionCall(value, 'pages')
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
