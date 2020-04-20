import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TeacherService} from '../../service/teacher.service';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {Storage} from '@ionic/storage';
import {Network} from '@ionic-native/network/ngx';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {fileUrl} from '../../../config/config';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {

    teachers: any;
    language: any;
    permission: any;
    loginuser: any;
    myProfile = false;
    public teacherprofile: any;
    private routines: any;
    private days: any;
    attendances: any;
    attendancesMonth: any;
    totalcount: any;
    salaryoptions: any;
    make_payments: any;
    netsalary: any;
    totaldeduction: any;
    grosssalary: any;
    hourly_salary: any;
    salary_template: any;
    usertype: any;
    private siteUrl: any;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private storage: Storage,
        public teacherService: TeacherService,
        private network: Network,
        private toastCtrl: ToastController,
        public  loadingCtrl: LoadingController,
        public  alertCtrl: AlertController,
        public langandpermissionService: LangandparmisionService,
    ) {  this.siteUrl = fileUrl; }

    public isRefresh = true;
    public teacheritems = false;
    public routineitems = true;
    public attendanceitems = true;
    public invoicesitems = true;
    public paymentsitems = true;

    isCollapsed(value) {

        this.routineitems = true;
        this.attendanceitems = true;
        this.teacheritems = value;
    }


    isCollapsedroutine(value) {

        this.teacheritems = true;
        this.attendanceitems = true;
        this.invoicesitems = true;
        this.paymentsitems = true;
        this.routineitems = value;
    }

    isCollapsedattendance(value) {


        this.teacheritems = true;
        this.attendanceitems = value;
        this.invoicesitems = true;
        this.paymentsitems = true;
        this.routineitems = true;
    }

    isCollapsedinvoices(value) {


        this.teacheritems = true;
        this.attendanceitems = true;
        this.invoicesitems = value;
        this.paymentsitems = true;
        this.routineitems = true;
    }

    isCollapsedpayments(value) {


        this.teacheritems = true;
        this.attendanceitems = true;
        this.invoicesitems = true;
        this.paymentsitems = value;
        this.routineitems = true;
    }

  ngOnInit() {
      this.Profile();
      this.getTeachers();
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
        return await this.loadingCtrl.dismiss({             'dismissed': true         });
    }

    Profile() {
        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
    }

    doRefresh(event, value) {
        this.teacherService.getTeachers(value, '', '')
            .then((data: any) => {
                this.teachers = data.teachers;
            });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    getTeacherView(teacherID) {
        this.router.navigate([ '/teacherview', teacherID]);
    }

    getTeachers() {
        if (this.network.type === 'none' || this.network.type === 'unknown') {
            this.presentToast();
        }
            this.storage.get('Profile').then((response) => {
                this.loginuser = response;
            });
            this.langandpermissionService.getLangandPermissionCall(false, 'teacher')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    const daysData = [];
                    if (this.loginuser.usertypeID == 2) {
                        this.teacherService.getTeachers(false, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.teacher_view == 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID == 2 && this.myProfile) {
                                    this.teacherprofile = data.profile;
                                    this.attendances = data.attendance;
                                    this.totalcount = data.totalcount;
                                    this.attendancesMonth = data.attendancesmonths;
                                    this.hourly_salary = data.hourly_salary;
                                    this.salary_template =  data.salary_template;
                                    this.salaryoptions =  data.salaryoptions;
                                    this.grosssalary = data.grosssalary;
                                    this.totaldeduction = data.totaldeduction;
                                    this.netsalary = data.netsalary;
                                    this.make_payments = data.make_payments;

                                    Object.keys(data.days).forEach(function (key) {
                                        daysData.push({'day': data.days[key]});
                                    });
                                    this.days = daysData;
                                    this.routines = data.routines;
                                } else {
                                    this.teachers = data.teachers;
                                }
                            });
                    } else {

                        this.teacherService.getTeachers(false, '', '')
                            .then((data: any) => {
                                this.teachers = data.teachers;
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
            this.langandpermissionService.getLangandPermissionCall(value, 'teacher')
                .then((data: any) => {
                    this.permission = data.permission;
                    this.language = data.language;
                    const daysData = [];
                    if (this.loginuser.usertypeID === 2) {
                        this.teacherService.getTeachers(value, this.loginuser.loginuserID,  this.loginuser.usertypeID)
                            .then((data: any) => {
                                if (this.permission.parents_view === 'no') {
                                    this.myProfile = true;
                                }

                                if (this.loginuser.usertypeID === 2 && this.myProfile) {
                                    this.teacherprofile = data.profile;
                                    this.attendances = data.attendance;
                                    this.totalcount = data.totalcount;
                                    this.attendancesMonth = data.attendancesmonths;
                                    this.hourly_salary = data.hourly_salary;
                                    this.salary_template =  data.salary_template;
                                    this.salaryoptions =  data.salaryoptions;
                                    this.grosssalary = data.grosssalary;
                                    this.totaldeduction = data.totaldeduction;
                                    this.netsalary = data.netsalary;
                                    this.make_payments = data.make_payments;

                                    Object.keys(data.days).forEach(function (key) {
                                        daysData.push({'day': data.days[key]});
                                    });
                                    this.days = daysData;
                                    this.routines = data.routines;
                                } else {
                                    this.teachers = data.teachers;
                                }
                            });
                    } else {

                        this.teacherService.getTeachers(false, '', '')
                            .then((data: any) => {
                                this.teachers = data.teachers;
                            });
                    }
                });
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

}
