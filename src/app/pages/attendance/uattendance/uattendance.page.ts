import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AttendanceService} from '../../../service/attendance/attendance.service';
import {LangandparmisionService} from '../../../service/langandparmision.service';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {fileUrl} from '../../../../config/config';

@Component({
  selector: 'app-uattendance',
  templateUrl: './uattendance.page.html',
  styleUrls: ['./uattendance.page.scss'],
})
export class UattendancePage implements OnInit {

    users: any;
    siteUrl: any;
    permission: any;
    attendances: any;
    attendancesMonth: any;
    totalcount: any;
    userprofile: any;
    usertypes: any;
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
        this.Profile();
        this.getUsers();
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


    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    ngOnInit() {}

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }


    doRefresh(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {
            this.attendanceService.getUattendance(value, '', '')
                .then((data: any) => {
                    this.users = data.users;
                });
            setTimeout(() => {
                event.target.complete();
            }, 2000);
        }
    }

    getUserView(userID) {
        this.router.navigate([ '/uattendanceview', userID]);
    }

    getUsers() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        } else {

            this.langandpermissionService.getLangandPermissionCall(false, 'uattendance')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    if (this.loginuser.usertypeID == 1 && this.loginuser.usertypeID == 2 && this.loginuser.usertypeID == 3 && this.loginuser.usertypeID == 4) {
                        this.myProfile = false;
                        this.attendanceService.getTattendance(false, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.uattendance_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID && this.myProfile) {
                                    this.attendances =  data.attendance;
                                    this.totalcount =  data.totalcount;
                                    this.attendancesMonth =  data.attendancesmonths;
                                    this.userprofile =  data.user;
                                    this.usertypes =  data.usertypes;
                                } else {
                                    this.users = data.users;
                                }
                            });
                    } else {

                        this.attendanceService.getUattendance(false, '', '')
                            .then((data: any) => {
                                this.users = data.users;
                            });
                    }
                });

        }

    }
}
