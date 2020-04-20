import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {Storage} from '@ionic/storage';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {fileUrl} from '../../../config/config';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

    users: any;
    language: any;
    permission: any;
    loginuser: any;
    myProfile = false;
    public userprofile: any;
    attendances: any;
    attendancesMonth: any;
    totalcount: any;
    make_payments: any;
    netsalary: any;
    totaldeduction: any;
    grosssalary: any;
    salary_template: any;
    hourly_salary: any;
    salaryoptions: any;
    usertype: any;
    private siteUrl: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public userService: UserService,
        private storage: Storage,
        private network: Network,
        private toastCtrl: ToastController,
        public  loadingCtrl: LoadingController,
        public  alertCtrl: AlertController,
        public langandpermissionService: LangandparmisionService
    ) {
        this.siteUrl = fileUrl;
        this.getUser();
    }


    public useritems = false;
    public  isRefresh = true;
    public routineitems = true;
    public attendanceitems = true;
    public invoicesitems = true;
    public paymentsitems = true;

    isCollapsed(value) {

        this.attendanceitems = true;
        this.attendanceitems = true;
        this.paymentsitems = true;
        this.useritems = value;
    }


    isCollapsedattendance(value) {


        this.useritems = true;
        this.attendanceitems = value;
        this.invoicesitems = true;
        this.paymentsitems = true;
    }

    isCollapsedinvoices(value) {


        this.useritems = true;
        this.attendanceitems = true;
        this.invoicesitems = value;
        this.paymentsitems = true;
    }

    isCollapsedpayments(value) {


        this.useritems = true;
        this.attendanceitems = true;
        this.invoicesitems = true;
        this.paymentsitems = value;
    }

    async presentLoading() {

        const loading = await this.loadingCtrl.create({
            message: 'Please wait...',
            spinner: 'crescent',
        });
        await loading.present();

    }

    async presentToast() {
        const toast = await this.toastCtrl.create({
            message: 'You are offline, please connect your wifi or 3g',
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }

    async dismiss() {
        return await this.loadingCtrl.dismiss({'dismissed': true});
    }

    ngOnInit() {
        this.Profile();
    }

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }

    doRefresh(event, value) {
        this.userService.getUsers(value, '', '')
            .then((data: any) => {
                this.users = data.users;
            });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


    getUserView(userID) {
        this.router.navigate(['/userview', userID]);
    }


    getUser() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
        this.langandpermissionService.getLangandPermissionCall(false, 'user')
            .then((data: any) => {
                this.permission = data.permission;
                this.language = data.language;
                const daysData = [];
                if (this.loginuser.usertypeID != 1 && this.loginuser.usertypeID != 2 && this.loginuser.usertypeID != 3 && this.loginuser.usertypeID != 4) {
                    this.userService.getUsers(false, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                        .then((data: any) => {
                            if (this.permission.user_view === 'no') {
                                this.myProfile = true;
                            }
                            if (this.loginuser.usertypeID && this.myProfile) {
                                this.userprofile = data.profile;
                                this.attendances =  data.attendance;
                                this.totalcount =  data.totalcount;
                                this.attendancesMonth =  data.attendancesmonths;
                                this.salary_template =  data.salary_template;
                                this.hourly_salary = data.hourly_salary;
                                this.grosssalary =  data.grosssalary;
                                this.totaldeduction =  data.totaldeduction;
                                this.netsalary =  data.netsalary;
                                this.salaryoptions =  data.salaryoptions;
                                this.make_payments =  data.make_payments;
                            } else {
                                this.users = data.users;
                            }
                        });
                } else {

                    this.userService.getUsers(false, '', '')
                        .then((data: any) => {
                            this.users = data.users;
                        });
                }
            });
    }

    doRefreshProfile(event, value) {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
        this.langandpermissionService.getLangandPermissionCall(value, 'user')
            .then((data: any) => {
                this.permission = data.permission;
                this.language = data.language;
                const daysData = [];
                if (this.loginuser.usertypeID != 1 && this.loginuser.usertypeID != 2 && this.loginuser.usertypeID != 3 && this.loginuser.usertypeID != 4) {
                    this.userService.getUsers(value, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                        .then((data: any) => {
                            if (this.permission.user_view === 'no') {
                                this.myProfile = true;
                            }
                            if (this.loginuser.usertypeID && this.myProfile) {
                                this.userprofile = data.profile;
                                this.attendances =  data.attendance;
                                this.totalcount =  data.totalcount;
                                this.attendancesMonth =  data.attendancesmonths;
                                this.salary_template =  data.salary_template;
                                this.hourly_salary = data.hourly_salary;
                                this.grosssalary =  data.grosssalary;
                                this.totaldeduction =  data.totaldeduction;
                                this.netsalary =  data.netsalary;
                                this.salaryoptions =  data.salaryoptions;
                                this.make_payments =  data.make_payments;
                            } else {
                                this.users = data.users;
                            }
                        });
                } else {

                    this.userService.getUsers(false, '', '')
                        .then((data: any) => {
                            this.users = data.users;
                        });
                }
            });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

}
