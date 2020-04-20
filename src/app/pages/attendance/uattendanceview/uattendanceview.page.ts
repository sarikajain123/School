import { Component, OnInit } from '@angular/core';
import {AttendanceService} from '../../../service/attendance/attendance.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {ActivatedRoute} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-uattendanceview',
  templateUrl: './uattendanceview.page.html',
  styleUrls: ['./uattendanceview.page.scss'],
})
export class UattendanceviewPage implements OnInit {

    public userID: any;
    siteUrl: any;
    permission: any;
    attendances: any;
    attendancesMonth: any;
    totalcount: any;
    userprofile: any;
    usertypes: any;
    language: any;
    value: any;
    constructor(
        public attendanceService: AttendanceService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,

        private route: ActivatedRoute
    ) { this.siteUrl = fileUrl; }

    public isRefresh = true;
    ngOnInit() {
        this.userID = this.route.snapshot.paramMap.get('userID');
        this.doRefreshProfile(false, false, this.userID);
    }


    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefreshProfile(event, value, userID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.attendanceService.getUattendanceView(value, userID)
            .then((data: any) => {
                this.attendances = data.attendance;
                this.totalcount = data.totalcount;
                this.attendancesMonth = data.attendancesmonths;
                this.userprofile = data.user;
                this.usertypes = data.usertypes;
            });

        this.langandpermissionService.getLangandPermissionCall(value, 'uattendance')
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
