import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LeaveapplicationService} from '../../../service/leaveapplication/leaveapplication.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-leaveapplicationview',
  templateUrl: './leaveapplicationview.page.html',
  styleUrls: ['./leaveapplicationview.page.scss'],
})
export class LeaveapplicationviewPage implements OnInit {

    leaveapplicationID: any;
    leavecategorys: any;
    applicant: any;
    usertypes: any;
    daysArray: any;
    leaveapply: any;
    permission: any;
    language: any;
    siteUrl: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public leaveapplicationService: LeaveapplicationService,
        public langandpermissionService: LangandparmisionService,
    ) {
        this.leaveapplicationID = this.route.snapshot.paramMap.get('applicationID');
        this.siteUrl = fileUrl;

        this.doRefresh(false, false,  this.leaveapplicationID); }

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

    doRefresh(event, value, leaveapplicationID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.leaveapplicationService.getLeaveApplicationView(value, leaveapplicationID)
            .then((data: any) => {
                this.leaveapply = data.leaveapplication;
                this.applicant = data.applicant;
                this.usertypes = data.usertypes;
                this.daysArray = data.daysArray;
            });
        this.langandpermissionService.getLangandPermissionCall(value, 'leaveapplication')
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
