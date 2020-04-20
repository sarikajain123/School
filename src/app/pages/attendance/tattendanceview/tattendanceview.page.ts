import { Component, OnInit } from '@angular/core';
import {AttendanceService} from '../../../service/attendance/attendance.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {ActivatedRoute} from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-tattendanceview',
  templateUrl: './tattendanceview.page.html',
  styleUrls: ['./tattendanceview.page.scss'],
})
export class TattendanceviewPage implements OnInit {

    public teacherID: any;
    siteUrl: any;
    permission: any;
    attendances: any;
    attendancesMonth: any;
    totalcount: any;
    teacherprofile: any;
    language: any;
    value: any;
    constructor(
        public attendanceService: AttendanceService,
        private network: Network,
        private toastCtrl: ToastController,
        public langandpermissionService: LangandparmisionService,

        private route: ActivatedRoute
    ) {  this.siteUrl = fileUrl; }

    public isRefresh = true;

    ngOnInit() {
        this.teacherID = this.route.snapshot.paramMap.get('teacherID');
        this.doRefreshProfile(false, false, this.teacherID );
    }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefreshProfile(event, value, teacherID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.attendanceService.getTattendanceView(value, teacherID)
            .then((data: any) => {
                this.attendances = data.attendance;
                this.totalcount = data.totalcount;
                this.attendancesMonth = data.attendancesmonths;
                this.teacherprofile = data.teacher;
            });

        this.langandpermissionService.getLangandPermissionCall(value, 'tattendance')
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
