import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService} from '../../../service/attendance/attendance.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-tattendance',
  templateUrl: './tattendance.page.html',
  styleUrls: ['./tattendance.page.scss'],
})
export class TattendancePage implements OnInit {

    teachers: any;
    siteUrl: any;
    permission: any;
    attendances: any;
    attendancesMonth: any;
    totalcount: any;
    teacherprofile: any;
    language: any;
    value: any;
    myProfile = false;
    loginuser: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private network: Network,
        private toastCtrl: ToastController,
        public  loadingCtrl: LoadingController,
        public  alertCtrl: AlertController,
        public menuCtrl: MenuController,
        private storage: Storage,
        public attendanceService: AttendanceService,
        public langandpermissionService: LangandparmisionService,
    ) {
        this.siteUrl = fileUrl;
        setTimeout(() => {
            this.isLoaded = true;
        }, 3000);
    }


    isLoaded = false;
    isRefresh = true;


    arrayOne(n: number): any[] {
        return Array(n);
    }
    ngOnInit() {
        this.Profile();
        this.getTeachers();
    }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }

    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.attendanceService.getTattendance(value, '', '')
                .then((data: any) => {
                    this.teachers = data.teachers;
                });
            setTimeout(() => {
                event.target.complete();
            }, 2000);
        }
    }

    getTeacherView(teacherID) {
        this.router.navigate([ '/tattendanceview', teacherID]);
    }

    getTeachers() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.langandpermissionService.getLangandPermissionCall(false, 'tattendance')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 2) {
                        this.attendanceService.getTattendance(false, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.teacher_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 2 && this.myProfile) {
                                    this.attendances =  data.attendance;
                                    this.totalcount =  data.totalcount;
                                    this.attendancesMonth =  data.attendancesmonths;
                                    this.teacherprofile =  data.teacher;
                                } else {
                                    this.teachers = data.teachers;
                                }
                            });
                    } else {

                        this.attendanceService.getTattendance(false, '', '')
                            .then((data: any) => {
                                this.teachers = data.teachers;
                            });
                    }
                });

    }

    doRefreshProfile(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.langandpermissionService.getLangandPermissionCall(value, 'tattendance')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 2) {
                        this.attendanceService.getTattendance(value, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.teacher_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 2 && this.myProfile) {
                                    this.attendances =  data.attendance;
                                    this.totalcount =  data.totalcount;
                                    this.attendancesMonth =  data.attendancesmonths;
                                    this.teacherprofile =  data.teacher;
                                } else {
                                    this.teachers = data.teachers;
                                }
                            });
                    } else {

                        this.attendanceService.getTattendance(false, '', '')
                            .then((data: any) => {
                                this.teachers = data.teachers;
                            });
                    }
                });
        }
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


}
