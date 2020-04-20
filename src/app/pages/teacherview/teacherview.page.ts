import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../../service/teacher.service';
import { ActivatedRoute } from '@angular/router';
import {LangandparmisionService} from '../../service/langandparmision.service';
import {fileUrl} from '../../../config/config';
import {ToastController} from '@ionic/angular';
import {Network} from '@ionic-native/network/ngx';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-teacherview',
  templateUrl: './teacherview.page.html',
  styleUrls: ['./teacherview.page.scss'],
})
export class TeacherviewPage implements OnInit {

    public teacherID: any;
    public teacherprofile: any;
    private routines: any;
    private days: any;
    attendances: any;
    attendancesMonth: any;
    totalcount: any;
    make_payments: any;
    netsalary: any;
    totaldeduction: any;
    grosssalary: any;
    salaryoptions: any;
    hourly_salary: any;
    salary_template: any;
    permission: any;
    loginuser: any;
    language: any;
    usertype: any;
    private siteUrl: any;

    slideOpts = {
        autoplay: true
    };
    constructor(
        public teacherService: TeacherService,
        public langandpermissionService: LangandparmisionService,
        private route: ActivatedRoute,
        private network: Network,
        private storage: Storage,
        private toastCtrl: ToastController,

    ) {
        this.teacherID = this.route.snapshot.paramMap.get('teacherID');
        this.doRefreshProfile(false, false,  this.teacherID);
        this.siteUrl = fileUrl;
    }

  isRefresh = true;
  ngOnInit() {
  }

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

        this.storage.get('Profile').then((response) => {
            this.loginuser = response;
        });
        const daysData = [];
        this.teacherService.getTeacherView(value, teacherID)
            .then((data: any) => {
                this.teacherprofile = data.profile;
                this.attendances = data.attendance;
                this.totalcount = data.totalcount;
                this.attendancesMonth = data.attendancesmonths;
                this.hourly_salary = data.hourly_salary;
                this.salary_template =  data.salary_template;
                this.grosssalary = data.grosssalary;
                this.totaldeduction = data.totaldeduction;
                this.netsalary = data.netsalary;
                this.salaryoptions =  data.salaryoptions;
                this.make_payments = data.make_payments;

                Object.keys(data.days).forEach(function (key) {
                    daysData.push({'day': data.days[key]});
                });
                this.days = daysData;
                this.routines = data.routines;
            });

        this.langandpermissionService.getLangandPermissionCall(value, 'teacher')
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
