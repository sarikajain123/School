import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MarkService} from '../../../service/mark/mark.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-markdistribution',
  templateUrl: './markdistribution.page.html',
  styleUrls: ['./markdistribution.page.scss'],
})
export class MarkdistributionPage implements OnInit {

    markpercentage: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public markService: MarkService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService
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

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.markService.getMarkPercentage(value)
                .then((data: any) => {
                    this.markpercentage = data.markpercentage;

                });
            this.langandpermissionService.getLangandPermissionCall(value, 'markpercentage')
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
