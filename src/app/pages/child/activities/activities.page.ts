import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildService} from '../../../service/child/child.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

    siteUrl: any;
    activities: any;
    activitiesmedia: any;
    activitiescomments: any;
    user: any;
    permission: any;
    language: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public childService: ChildService,
        public langandpermissionService: LangandparmisionService
    ) {
        this.doRefresh(false, false);
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

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.childService.getActivities(value)
                .then((data: any) => {
                    this.activities = data.activities;
                    this.activitiescomments = data.activitiescomments;
                    this.activitiesmedia = data.activitiesmedia;
                    this.user = data.user;
                });
            this.langandpermissionService.getLangandPermissionCall(value, 'activities')
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
