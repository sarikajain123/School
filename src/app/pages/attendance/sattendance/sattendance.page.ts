import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService} from '../../../service/attendance/attendance.service';
import {ClassService} from '../../../service/academic/class.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-sattendance',
  templateUrl: './sattendance.page.html',
  styleUrls: ['./sattendance.page.scss'],
})
export class SattendancePage implements OnInit {

    students: any;
    siteUrl: any;
    classID: any;
    classes: any;
    language: any;
    permission: any;
    myProfile = false;
    loginuser: any;
    selectedClass: string = '';

    attendances: any;
    attendanceType: any;
    attendancesMonth: any;
    subjects: any;
    totalcount: any;
    studentprofile: any;
    usertype: any;
    value: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public attendanceService: AttendanceService,
        private network: Network,
        private toastCtrl: ToastController,
        public  loadingCtrl: LoadingController,
        public  alertCtrl: AlertController,
        public menuCtrl: MenuController,
        private storage: Storage,
        public langandpermissionService: LangandparmisionService,
        public classService: ClassService
    ) {
        this.Profile();
        this.getStudentClasses();
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

    ngOnInit() {}


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


    doRefresh(event, boolean , classID) {
        this.attendanceService.getSattendance(classID, boolean, null , null)
            .then((data: any) => {
                this.isRefresh = true;
                console.log(data);
                this.students = data.students;
                this.isLoaded = true;
            });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    getSattendanceView(studentID, classID) {
        this.router.navigate([ '/sattendanceview', studentID, classID]);
    }

    selectedClasses() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.classID = this.selectedClass;
            if ( this.classID ) {
                this.attendanceService.getSattendance( this.classID , false,  null, null)
                    .then((data:any) => {
                        this.students = data.students;
                    });
                this.langandpermissionService.getLangandPermissionCall(false, 'sattendance')
                    .then((data: any) => {
                        this.permission = data.permission;
                        this.language = data.language;
                    });
        }
    }

    getStudentClasses() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.langandpermissionService.getLangandPermissionCall(false, 'sattendance')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.attendanceService.getSattendance(null, false, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.sattendance_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.attendanceType =  data.attendanceType;
                                    this.attendances =  data.attendance;
                                    this.totalcount =  data.totalcount;
                                    this.attendancesMonth =  data.attendancesmonths;
                                    this.subjects =  data.subjects;
                                    this.studentprofile =  data.student;
                                    this.usertype =  data.usertype;

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.attendanceService.getSattendance(null, false, null,  null)
                            .then((data: any) => {
                                this.classes = data.classes;
                                this.students = data.students;
                            });
                    }

                });
    }

    doRefreshProfile(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.langandpermissionService.getLangandPermissionCall(value, 'sattendance')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 3 ) {
                        this.attendanceService.getSattendance(null, value, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.sattendance_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 3 && this.myProfile) {
                                    this.attendanceType =  data.attendanceType;
                                    this.attendances =  data.attendance;
                                    this.totalcount =  data.totalcount;
                                    this.attendancesMonth =  data.attendancesmonths;
                                    this.subjects =  data.subjects;
                                    this.studentprofile =  data.student;
                                    this.usertype =  data.usertype;

                                } else {
                                    this.classes = data.classes;
                                    this.students = data.students;
                                }
                            });
                    } else {
                        this.attendanceService.getSattendance(null, false, null,  null)
                            .then((data: any) => {
                                this.classes = data.classes;
                                this.students = data.students;
                            });
                    }

                });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


}
