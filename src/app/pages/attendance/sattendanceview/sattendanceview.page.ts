import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AttendanceService} from '../../../service/attendance/attendance.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';
import {fileUrl} from '../../../../config/config';



@Component({
  selector: 'app-sattendanceview',
  templateUrl: './sattendanceview.page.html',
  styleUrls: ['./sattendanceview.page.scss'],
})
export class SattendanceviewPage implements OnInit {

    public siteUrl: any;
    public studentID: any;
    public classID: any;
    permission: any;
    attendances: any;
    attendanceType: any;
    attendancesMonth: any;
    subjects: any;
    totalcount: any;
    studentprofile: any;
    usertype: any;
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
      this.getSattendanceView();
  }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    doRefreshProfile(event, boolean, studentID, classID) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {

            if (studentID && classID) {
                this.attendanceService.getSattendanceView(studentID, classID, boolean)
                    .then((data: any) => {
                        this.attendanceType =  data.attendanceType;
                        this.attendances =  data.attendance;
                        this.totalcount =  data.totalcount;
                        this.attendancesMonth =  data.attendancesmonths;
                        this.subjects =  data.subjects;
                        this.studentprofile =  data.student;
                        this.usertype =  data.usertype;
                    });
            }

            this.langandpermissionService.getLangandPermissionCall(boolean, 'sattendance')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                });

        }
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


    getSattendanceView() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.studentID = this.route.snapshot.paramMap.get('studentID');
            this.classID   =   this.route.snapshot.paramMap.get('classID');

            this.attendanceService.getSattendanceView( this.studentID,  this.classID, false)
                .then((data: any) => {

                    this.attendanceType =  data.attendanceType;
                    this.attendances =  data.attendance;
                    this.totalcount =  data.totalcount;
                    this.attendancesMonth =  data.attendancesmonths;
                    this.subjects =  data.subjects;
                    this.studentprofile =  data.student;
                    this.usertype =  data.usertype;

                });

            this.langandpermissionService.getLangandPermissionCall(false, 'sattendance')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                });
        }

}
