import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildService} from '../../../service/child/child.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-activitscategory',
  templateUrl: './activitscategory.page.html',
  styleUrls: ['./activitscategory.page.scss'],
})
export class ActivitscategoryPage implements OnInit {

    activitiescategorys: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public childService: ChildService,
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
            this.childService.getActivitiesCategory(value)
                .then((data: any) => {
                    this.activitiescategorys = data.activitiescategorys;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'activitiescategory')
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
